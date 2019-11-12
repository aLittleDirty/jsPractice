
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