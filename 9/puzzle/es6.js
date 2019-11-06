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
/*
在类中定义:
mousedown:获得距离,添加move事件
mousemove:获得距移动元素最近的元素,高亮处理;边界条件:不可超过puzzleBox
mouseup:交换两个元素的位置和index值,每次交换完都需要检查一下indexes的顺序,如果恢复,则完成游戏
*/

/*
1.为每个li添加监听事件
2.为能在边界条件内移动,不溢出
3.获两个最近的元素
4.交换元素位置和indexes值
*/

class Puzzle {
    constructor() {
        this.posData = [];
        this.disX = 0;
        this.disY = 0;
        this.initListener();
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
    addRandom(choice){
        this.indexes = this.disorder();
        this.addPuzzles(choice);
        this.initPuzzles();
    }
    addOrder(choice){
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
        for (let i = 0; i < images.length; i++) {
            images[i].style.top = images[i].offsetTop + "px";
            images[i].style.left = images[i].offsetLeft + "px";
            this.posData.push({
                "left": images[i].offsetLeft,
                "top": images[i].offsetTop
            });
        }
        for (let i = 0; i < images.length; i++) {
            images[i].style.position = "absolute";
            images[i].addEventListener('mousedown', this._start, false);
            images[i].addEventListener('mouseup', this._stop, false);
        }
    }
    initListener() {
        this._start = this.start.bind(this);
        this._move = this.move.bind(this);
        this._stop = this.stop.bind(this);
    }
    start(event = window.event) {
        let target = event.target.parentNode;
        this.disX = event.clientX - target.offsetTop;
        this.disY = event.clientY - target.offsetLeft;
        target.addEventListener('mousemove', this._move, false);
    }
    move(event = window.event) {
        let target = event.target.parentNode;
        target.style.top = event.clientY - this.disY + "px";
        target.style.left = event.clientX - this.disX + "px";
    }
    stop(){
        this.swap();
        for(let i = 0; i < 15; i++){
           if(this.indexes[i] !==(i+1))  {
               break;
           } 
           if(this.indexes[i] === 15){
               alert('win!');
           }
        }
    }
    swap(){
        // 3.获两个最近的元素
        // 4.交换元素位置和indexes值
        
    }

}

// 游戏流程
let selectedBox = get.byId('selectedBox');
let selectors = get.byTagName('img', selectedBox);
let puzzleBox = get.byId('puzzle');
let images = get.byTagName("li", puzzleBox);
let startButton = get.byTagName('button')[0];
let puzzleGame = new Puzzle();
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

function playGame(choice,isStart = true) {
    isStart?puzzleGame.addRandom(choice):puzzleGame.addOrder(choice);
}