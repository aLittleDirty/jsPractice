(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

// 颗粒类
class Dot {
    constructor(target, position, workPlace) {
        this.target = target;
        this.position = position;
        this.workPlace = workPlace;
        this.initTarget();
        this.setColor();
        this.spread();
    }
    initTarget() {
        this.workPlace.appendChild(this.target);
        this.target.className = "dot";
        this.target.style.left = this.position.x + "px";
        this.target.style.top = this.position.y + "px";
    }
    setColor() {
        let colors = [];
        for (let i = 0; i < 3; i++) {
            colors[i] = Math.floor(Math.random() * 256).toString();
            while (colors[i].length < 3) {
                colors[i] = "0" + colors[i];
            }
        }
        this.target.style.backgroundColor = `rgba(${colors[0]},${colors[1]},${colors[2]},1)`;
    }
    
    // 颗粒从中心沿随机路线散布(散布路线的设置)
    spread() {
        let speedX = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 16 + 1);
        let speedY = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 20 + 1);
        let i = 3;
        this.target.timer = setInterval(() => {
            i++;
            this.target.style.left = this.target.offsetLeft + speedX + "px";
            this.target.style.top = this.target.offsetTop + speedY + i + "px";
            // 若超出范围,则删除节点
            if(this.target.offsetLeft + this.target.offsetWidth > this.workPlace.offsetWidth || this.target.offsetLeft < 2 || this.target.offsetTop + this.target.offsetHeight > this.workPlace.offsetHeight || this.target.offsetTop < 2){
                clearInterval(this.target.timer);
                this.workPlace.removeChild(this.target);
            }
        },30)
    }
}

module.exports = Dot;
},{}],2:[function(require,module,exports){
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


},{"./dot":1}]},{},[2]);
