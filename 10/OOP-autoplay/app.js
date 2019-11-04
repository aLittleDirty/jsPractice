let get = {
    byId: function (id) {
        return document.getElementById(id);
    },
    byTagName: function (tagName, parent = document) {
        return parent.getElementsByTagName(tagName);
    }
}
class autoPlay {
    constructor(id) {
        this.imageFrame = get.byId(id);
        this.imagesBox = get.byTagName('div', this.imageFrame)[0];
        this.images = get.byTagName('img', this.imagesBox);
        this.isUpper = false;
        this.timer = null;
        this.currentIndex =1;
        this.createIndex();
        this.initIndex();   
        this.play = setInterval(this.toggle.bind(this), 1000);
        this.initFrame();
    }

// 播放框的监听事件
initFrame() {
    this.imageFrame.addEventListener('mouseover', () => {
        clearInterval(this.play);
    })
    this.imageFrame.addEventListener('mouseout', () => {
        this.play = setInterval(this.toggle.bind(this), 1000);
    })
}
    
    // 添加下标
    createIndex() {
        this.indexLists = document.createElement('ul');
        for (let i = 0; i < this.images.length; i++) {
            let index = document.createElement('li');
            index.innerText = i + 1;
            this.indexLists.appendChild(index);
        }
        this.imageFrame.appendChild(this.indexLists);
    }
    // 初始化下标的监听事件
    initIndex() {
        this.indexes = get.byTagName('li', this.indexLists);
        for (let i = 0; i < this.indexes.length; i++) {
            this.indexes[i].addEventListener('mouseover', () => {
                this.currentIndex = i;
                this.toggle();
            });
        }
    }
    
    // 切换图片
    toggle() {
        for (let i = 0; i < this.indexes.length; i++) {
            this.indexes[i].className = "";
        }
        this.indexes[this.currentIndex].className = "active";
        let targetPosition = (-this.currentIndex) * this.images[0].offsetHeight;
        this.startMove(targetPosition);
        this.next();
    }
    next() {
        if (this.currentIndex === this.indexes.length - 1) {
            this.isUpper = true;
        }
        if (this.currentIndex === 0) {
            this.isUpper = false;
        }
        this.isUpper ? this.currentIndex-- : this.currentIndex++;
    }
    // 防抖函数
    startMove(targetPosition) {
        let _this = this;
        clearInterval(_this.timer);
        _this.timer = setInterval(() => {
            this.doMove(targetPosition);
        }, 30);
    }
// 执行切换图片位置
    doMove(targetPosition) {
        let eachStep = (targetPosition - this.imagesBox.offsetTop) / 5;
        eachStep = (eachStep > 0) ? Math.ceil(eachStep) : Math.floor(eachStep);
        
            this.imagesBox.style.top = this.imagesBox.offsetTop + eachStep + "px";
    
    }

}
window.onload = function () {
    new autoPlay('showBox');
}