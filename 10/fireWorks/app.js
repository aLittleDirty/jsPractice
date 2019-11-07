let get = {
    byId: function (id) {
        return document.getElementById(id);
    },
    byTagName: function (tagName, parent = document) {
        return parent.getElementsByTagName(tagName);
    },
    byClassName: function (className, parent = document) {
        return parent.getElementsByClassName(className);
    }
}

class FireWorks {
    constructor(workPlace) {
        this.type = "stop";
        this.timer = null;
        this.workPlace = workPlace;
        this._shoot = this.shoot.bind(this);
    }

    fire(signal) {
        // 用户提供放烟花的信号
        // 发射器获取信号,触发放烟花的类别
        this.getSignal(signal);
    }

    getSignal(signal) {
        // 根据传进来的type,决定放烟花的方式
        switch (signal) {
            case "auto":
                this.autoPlay();
                break;
            case "manual":
                this.manualPlay();
                break;
            case "stop":
                this.stop();
                break;
            default:
                break;
        }
    }
    autoPlay() {
        // 设置烟花方式为自动
        this.type = "auto";
        // 发射器设置定时器
        // 发射器定时发射烟花
        this.timer = setInterval(() => {
            this.shoot();
        }, 1000);

    }
    manualPlay() {
        // 设置烟花方式为手动
        this.type = "manual";
        // 发射器清除定时器
        clearInterval(this.timer);
        // 初始化监听事件,当用户点击烟花区域时,发射烟花
        this.workPlace.addEventListener('click', this._shoot);

    }
    stop() {
        // 设置烟花方式为停止
        this.type = "stop";
        // 清除定时器
        clearInterval(this.timer);
        // 移除烟花区域的监听事件
        this.workPlace.removeEventListener('click', this._shoot);
    }
    shoot(event) {

        // 创造一个烟花
        let fire = document.createElement('div');
        fire.className = "fireWork";
        this.workPlace.appendChild(fire);
        // 获取位置
        let targetPos = this.getPosition(event);
        if (targetPos) {

            // 烟花上升
            this.raise(fire, targetPos);
            // 终点位置:烟花散开
            this.spread(endPos);
            // 烟花下降
            this.down();
        }

    }
    getPosition(event) {
        // 根据类型值设置定位:
        // 1.自动:随机位置
        // 2.手动:获取鼠标位置
        if (this.type === "auto") {
            // 获取烟花区域的范围
            let T = this.workPlace.offsetTop;
            let L = this.workPlace.offsetLeft;
            let R = this.workPlace.offsetLeft + this.workPlace.offsetWidth;
            let B = this.workPlace.offsetTop + this.workPlace.offsetHeight;
            // 放烟花不能在这个范围以外 
            return ({
                x: Math.ceil(Math.random() * (R - L) + L),
                y: Math.ceil(Math.random() * (B - T) + T)
            });
        } else if (this, type === "manual") {
            // 获取鼠标点击的位置,返回该位置
            let target = event.target;
            return ({
                x: target.clientX,
                y: target.clientY
            });
        } else {
            return false;
        }
    }
    raise(target, endPos) {
        // 根据定位的x,获得相应的发射起始位置
        // 根据定位的y,将烟花颗粒逐步移动到爆点位置
        target.style.top = 0;
        target.style.left = endPos.x;
        this.startMove(target, endPos);

    }
    spread(pos) {
        // 到达爆点位置,获得爆炸范围
        // 颗粒从中心向四周散布(散布路线的设置)
    }
    down() {
        // 烟花颗粒消失
        // 超出范围消失
    }
    startMove(target, endPos) {
        clearInterval(target.timer);
        target.timer = setInterval(() => {
            this.doMove(target, endPos)
        }, 30);
    }

    doMove(target, endPos) {
        //烟花横坐标一直没有发生变化
        let eachStepY = (target.offsetTop - endPos.y) / 5;
        eachStepY = eachStepY > 0 ? Math.floor(eachStepY) : Math.ceil(eachStepY);
        if (target.offsetTop === endPos.y) {
            clearInterval(target.timer);
        } else {
            target.style.top = target.offsetTop + eachStepY + "px";
            target.style.left = endPos.x + "px";

        }
    }

}




let sky = get.byId('sky');
let buttons = get.byTagName('a');

//按钮功能初始化
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {

        for (let j = 0; j < buttons.length; j++) {
            buttons[j].className = "";
        }
        this.className = "active";

    }
}