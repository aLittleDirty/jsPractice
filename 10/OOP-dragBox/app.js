let get = {
    byId(id = "") {
        return document.getElementById(id);
    },
    byClassName(className = "", parent = document) {
        return parent.getElementsByClassName(className);
    },
    byTagName(tagName = "", parent = document) {
        return parent.getElementsByTagName(tagName);
    }
}

class DragBox {
    constructor(id, handle, {
        limit = false,
        lockX = false,
        lockY = false,
        lock = false
    } = {}) {
        this.box = get.byId(id);
        this.initListener();
        this.initHandle(handle);
    }
    // 添加监听事件时,函数不能传参;否则,无法移除
    initListener() {
        this._start = this.start.bind(this);
        this._moving = this.moving.bind(this);
        this._stop = this.stop.bind(this);
    }
    // 添加移动事件
    initHandle(handle) {
        this.handle = get.byClassName(handle, this.box)[0];
        this.handle.addEventListener('mousedown', this._start);
    }
    start(event = window.event) {
        tipsValue.innerText = '开始拖拽';
        this.box.disX = event.clientX - this.box.offsetLeft;
        this.box.disY = event.clientY - this.box.offsetTop;
        document.addEventListener('mousemove', this._moving);
        document.addEventListener('mouseup', this._stop);
    }
    moving(event = window.event) {
        if (this.lock) {
            return;
        }
        let maxContainer = document.documentElement || document.body;
        let maxLeft = maxContainer.clientWidth - this.box.offsetWidth;
        let maxTop = maxContainer.clientHeight - this.box.offsetHeight;
        let oldBoxLeft = this.box.style.left;
        let oldBoxTop = this.box.style.top;
        this.box.style.left = event.clientX - this.box.disX + "px";
        this.box.style.top = event.clientY - this.box.disY + "px";

        if (this.lockX) {
            this.box.style.left = oldBoxLeft;
        }
        if (this.lockY) {
            this.box.style.top = oldBoxTop;
        }
        if (this.limit) {
            if (this.box.offsetTop < 0) {
                this.box.style.top = 0;
            }
            if (this.box.offsetTop > maxTop) {
                this.box.style.top = maxTop + "px";
            }
            if (this.box.offsetLeft < 0) {
                this.box.style.left = 0;
            }
            if (this.box.offsetLeft > maxLeft) {
                this.box.style.left = maxLeft + "px";
            }
        }
        tipsValue.innerText = `top : ${this.box.offsetTop} left : ${this.box.offsetLeft}`;
    }
    stop() {
        document.removeEventListener('mousemove', this._moving);
        document.removeEventListener('mouseup', this._stop);
        tipsValue.innerText = "结束拖拽";
    }
}

let options = {};
let tips = get.byId('tips');
let tipsValue = get.byTagName('span', tips)[0];
let buttons = get.byTagName('button');

let orangeBox = new DragBox('dragBox', 'handle', options);

buttons[0].onclick = function () {
    orangeBox.limit = !orangeBox.limit;
    this.innerHTML = orangeBox.limit ? "取消锁定范围" : "锁定范围";
}
buttons[1].onclick = function () {
    orangeBox.lockX = !orangeBox.lockX;
    this.innerHTML = orangeBox.lockX ? "取消水平锁定" : "水平锁定";
}

buttons[2].onclick = function () {
    orangeBox.lockY = !orangeBox.lockY;
    this.innerHTML = orangeBox.lockY ? "取消垂直锁定" : "垂直锁定";
}

buttons[3].onclick = function () {
    orangeBox.lock = !orangeBox.lock;
    this.innerHTML = orangeBox.lock ? "取消锁定位置" : "锁定位置";
}