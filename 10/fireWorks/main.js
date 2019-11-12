let Dot = require('./dot');
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

    // 发射器获取信号,触发放烟花的类别
    getSignal(signal) {
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
        this.type = "auto";
        this.timer = setInterval(() => {
            this.shoot();
        }, 1000);

    }
    manualPlay() {
        this.type = "manual";
        clearInterval(this.timer);
        this.workPlace.addEventListener('click', this._shoot);
    }
    stop() {
        this.type = "stop";
        clearInterval(this.timer);
        this.workPlace.removeEventListener('click', this._shoot);
    }
    // 烟花上升至爆炸
    shoot(event) {
        let fire = document.createElement('div');
        fire.className = "fire";
        this.workPlace.appendChild(fire);
        let targetPos = this.getPosition(event);
        if (targetPos) {
            this.raise(fire, targetPos);
        }

    }
    // 根据类型值设置定位:
    // 1.自动:随机位置
    // 2.手动:获取鼠标位置
    getPosition(event) {
        
        if (this.type === "auto") {
            let T = this.workPlace.offsetTop;
            let L = this.workPlace.offsetLeft;
            let R = this.workPlace.offsetLeft + this.workPlace.offsetWidth;
            let B = this.workPlace.offsetTop + this.workPlace.offsetHeight;
            return ({
                x: Math.ceil(Math.random() * (R - L) + L),
                y: Math.ceil(Math.random() * (B - T) + T)
            });
        } else if (this.type === "manual") {
            return event ? {
                x: event.clientX,
                y: event.clientY
            } : false;

        } else {
            return false;
        }
    }
    // 将烟花从发射位置升至爆点位置
    raise(target, endPos) {
        target.style.top = this.workPlace.offsetTop + this.workPlace.offsetHeight + "px";
        target.style.left = endPos.x + "px";
        this.startMove(target, endPos, () => {
            this.workPlace.removeChild(target);
            this.explore(endPos);
        });
    }
    // 创建多个烟花颗粒
    explore(position) {
        for (let i = 0; i < 80; i++) {
            let dot = document.createElement('div');
            new Dot(dot,position,this.workPlace);
        }

    }
    startMove(target, endPos, fnEnd) {
        clearInterval(target.timer);
        target.timer = setInterval(() => {
            this.doMove(target, endPos, fnEnd);
        }, 30);
    }

    doMove(target, endPos, fnEnd) {
        let eachStepY = (endPos.y - target.offsetTop) / 5;
        eachStepY = eachStepY < 0 ? Math.floor(eachStepY) : Math.ceil(eachStepY);
        if (target.offsetTop === endPos.y) {
            fnEnd && fnEnd();
            clearInterval(target.timer);
        } else {
            target.style.top = target.offsetTop + eachStepY + "px";
            target.style.left = endPos.x + "px";

        }
    }
}


let sky = get.byId('sky');
let buttons = get.byTagName('a');
let firework = new FireWorks(sky);

//按钮样式
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = "";
        }
        this.className = "active";
    })
}
// 按钮控制烟花类型
buttons[0].addEventListener('click', () => {
    firework.getSignal('manual');
})
buttons[1].addEventListener('click', () => {
    firework.getSignal('auto');
})
buttons[2].addEventListener('click', () => {
    firework.getSignal('stop');
})

