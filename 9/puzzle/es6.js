let get = {
    byTagName: function (tagName, parent = document) {
        return parent.getElementsByTagName(tagName);
    },
    byId: function (id) {
        return document.getElementById(id);
    },
    byClassName: function (className, parent = document) {
        return parent.getElementsByClassName(className);
    }
}

class Puzzle {
    constructor(callback) {
        this.posData = [];
        this.disX = 0;
        this.disY = 0;
        this.zIndex = 1;
        this.initListener();
        this.indexes = [];
        this.callback = callback;
    }
    order() {
        let indexData = [];
        for (let i = 0; i < 15; i++) {
            indexData.push(i + 1);
        }
        return indexData;
    }
    disorder() {
        return this.indexes.sort(() => {
            return Math.random() > 0.5 ? 1 : -1;
        })
    }
    addRandom(choice) {
        this.indexes = this.disorder();
        this.addPuzzles(choice);
        this.initPuzzles();
    }
    addOrder(choice) {
        this.indexes = this.order();
        this.addPuzzles(choice);
        this.createMask();
    }
    addPuzzles(choice) {
        let tempArray = [];
        for (let i = 0; i < this.indexes.length; i++) {
            let li = `<li><img src="http://www.fgm.cc/learn/lesson9/img/girl${choice}/${this.indexes[i]}.png"/></li>`
            tempArray.push(li);
        }
        puzzleBox.innerHTML = tempArray.join(',');
        puzzleBox.style.background = `url("http://www.fgm.cc/learn/lesson9/img/girl${choice}/bg.png") no-repeat`;
    }
    createMask() {
        let mask = document.createElement('div');
        mask.setAttribute('id', 'mask');
        puzzleBox.appendChild(mask);
    }
    // 设置每张图片都可以移动
    initPuzzles() {
        for (let i = 0; i < pieces.length; i++) {
            pieces[i].style.top = pieces[i].offsetTop + "px";
            pieces[i].style.left = pieces[i].offsetLeft + "px";
            this.posData.push({
                "left": pieces[i].offsetLeft,
                "top": pieces[i].offsetTop
            });
            // 每个元素设置index值,和posData中的值形成映射
            pieces[i].index = i;
        }
        for (let i = 0; i < pieces.length; i++) {
            pieces[i].style.position = "absolute";
            pieces[i].addEventListener('mousedown', this._start);
        }
    }
    initListener() {
        this._start = this.start.bind(this);
        this._move = this.move.bind(this);
        this._stop = this.stop.bind(this);
    }

    // 这些mouse事件,放在这里面不能使用事件委托,应该是作用域的原因
    start(event = window.event) {
        let target = event.target.parentNode;
        this.disX = event.clientX - target.offsetLeft;
        this.disY = event.clientY - target.offsetTop;
        target.style.zIndex = this.zIndex++;
        target.addEventListener('mousemove', this._move);
        target.addEventListener('mouseup', this._stop);
        event.preventDefault && event.preventDefault();
        target.setCapture && target.setCapture();
        // console.log('start');


    }
    move(event = window.event) {
        let target = event.target.parentNode;
        // 对移动中的拼图碎片设置限定范围不超过大拼图
        this.setLimit(event,target);

        // 获取离移动中的拼图的最近的拼图
        this.nearPiece = this.findNear(target);
    

        // 高亮显示 
        this.hightLight(this.nearPiece);
        event.preventDefault && event.preventDefault();
    }

    stop(event = window.event) {
        let target = event.target.parentNode;        
        target.removeEventListener('mousemove', this._move, false);
        target.removeEventListener('mouseup', this._stop, false);
        target.releaseCapture && target.releaseCapture();
        if(!this.nearPiece){
            return;
        }
        this.swap(target,this.nearPiece);
        this.nearPiece.className = "";
        
    }


    hightLight(nearPiece) {
        for (let i = 0; i < pieces.length; i++) {
            pieces[i].className = "";
        }
        nearPiece.className = "hightLight";
    }


    setLimit(event = window.event ,target){
        target.style.top = event.clientY - this.disY + "px";
        target.style.left = event.clientX - this.disX + "px";
        let maxTop = puzzleBox.clientHeight - target.offsetHeight;
        let maxLeft = puzzleBox.clientWidth - target.offsetWidth;
        if (target.offsetTop > maxTop) {
            target.style.top = maxTop + "px";
        }
        if (target.offsetTop < 0) {
            target.style.top = 0;
        }

        if (target.offsetLeft > maxLeft) {
            target.style.left = maxLeft + "px";
        }
        if (target.offsetLeft < 0) {
            target.style.left = 0;
        }

    }

   
    finish() {
        let win = true;
       
        for (let i = 0; i < this.indexes.length; i++) {
            let count = this.indexes[i]-1;
            if (i !== count) {
                win = false;
                break;
            }
        }
        return win;
    }

    findNear(target) {
        // 寻找最近的元素
        let tempArray = [];
        let minDistance = Number.MAX_VALUE;
        let nearest = null;
        for (let i = 0; i < pieces.length; i++) {
            if(target == pieces[i]){
                continue;
            }
            if (this.isOverLap(target, pieces[i])) {
                tempArray.push(pieces[i]);
            }
        }
        // 遍历数组,计算每个元素与移动元素的中心点的位置返回最小值
        for (let i = 0; i < tempArray.length; i++) {
    
            let currentDistance = this.getDistance(target,tempArray[i]);
            if (currentDistance < minDistance) {
                minDistance = currentDistance;
                nearest = tempArray[i];
            }
        }
        return nearest;
    }
    // 判断两个元素是否重叠
    isOverLap(obj1, obj2) {
        let L1 = obj1.offsetLeft;
        let T1 = obj1.offsetTop;
        let R1 = obj1.offsetLeft + obj1.offsetWidth;
        let B1 = obj1.offsetTop + obj1.offsetHeight;

        let L2 = obj2.offsetLeft;
        let T2 = obj2.offsetTop;
        let R2 = obj2.offsetLeft + obj1.offsetWidth;
        let B2 = obj2.offsetTop + obj2.offsetHeight;

        return !(T1 > B2 || R1 < L2 || B1 < T2 || L1 > R2);
    }
    // 返回两个元素之间的距离
   
    getDistance(obj1,obj2){
        let a = (obj1.offsetLeft + obj1.offsetWidth/2) - (obj2.offsetLeft +obj2.offsetWidth/2);
        let b = (obj1.offsetTop + obj1.offsetHeight/2) - (obj2.offsetTop+obj2.offsetHeight/2);

        return Math.sqrt(a*a +b*b);
    }

    swap(obj1, obj2) {
        [obj1.index,obj2.index] = [obj2.index,obj1.index];
        this.startMove(obj1, this.posData[obj1.index]);
        this.startMove(obj2, this.posData[obj2.index],()=>{
            if (this.finish()) {
                this.callback();
                this.createMask();
            }
        });
        // 交换indexes数组的位置
        let index1 = obj1.index;
        let index2 = obj2.index;
        [this.indexes[index1],this.indexes[index2]] = [this.indexes[index2],this.indexes[index1]];
    }
    startMove(target, position,fnEnd) {
        clearInterval(target.timer);
        target.timer = setInterval(() => {
            this.doMove(target, position,fnEnd);
        }, 30);
    }
    doMove(target, position,fnEnd) {
        let eachStepX = (position.left-target.offsetLeft )/5;
        let eachStepY = (position.top- target.offsetTop )/5;  
        eachStepX = eachStepX > 0 ? Math.ceil(eachStepX) : Math.floor(eachStepX);
        eachStepY = eachStepY > 0 ? Math.ceil(eachStepY) : Math.floor(eachStepY);
        if (target.offsetTop == position.top && target.offsetLeft == position.left) {
            fnEnd && fnEnd();
            clearInterval(target.timer);
        } else {
            target.style.left = target.offsetLeft + eachStepX + 'px';
            target.style.top = target.offsetTop + eachStepY + "px";
        }

    }

}

// 游戏流程
let selectedBox = get.byId('selectedBox');
let selectors = get.byTagName('img', selectedBox);
let puzzleBox = get.byId('puzzle');
// pieces是图片碎片
let pieces = get.byTagName("li", puzzleBox);
let startButton = get.byTagName('button')[0];
let puzzleGame = new Puzzle(win);
puzzleGame.addOrder(0);
let choice = 0;
for (let i = 0; i < selectors.length; i++) {
    selectors[i].onclick = function () {

        for (let j = 0; j < selectors.length; j++) {
            selectors[j].className = "";
        }
        this.className = 'selected';
        this.innerHTML = "开始游戏";
        choice = i;
        puzzleGame.addOrder(i);

    }
}

startButton.onclick = function () {
    playGame(choice);
    this.innerHTML = "重新开始";
}

function playGame(choice, isStart = true) {
    isStart ? puzzleGame.addRandom(choice) : puzzleGame.addOrder(choice);
}

function win() {
    alert('you win!');
}

