let photos = document.getElementById('photos');
let options = photos.getElementsByTagName('img');
let puzzleBox = document.getElementById('puzzle');
let startButton = document.getElementsByTagName('button')[0];
let imgPath = 0;
let posData = [];
// 初始化拼图顺序
let imageData = [];
function order(){
    imageData.length = 0;
    for (let i = 0; i < 15; i++) {
        imageData.push(i + 1);
    }
}
order();

// 初始化缩略图
for (let i = 0; i < options.length; i++) {
    options[i].onclick = function () {

        for (let j = 0; j < options.length; j++) {
            options[j].className = "";
        }
        this.className = "selected";
        imgPath = i;
        order();
        startButton.innerHTML = "开始游戏";
        addPuzzle();
        createMask();
    }
}

// 初始化开始游戏按钮
startButton.onclick=function(){
    playGame(true);
    startButton.innerHTML = "重新开始";
  
}

function playGame(isReady) {
    if(isReady){
        disorder();
        addPuzzle();
    }else{
        addPuzzle();
        createMask();
    }
}
playGame(false);


function disorder(){
    imageData.sort(() => {
        return Math.random() > 0.5 ? 1 : -1;
    })
}

// 添加拼图
function addPuzzle() {
    puzzleBox.innerHTML = "";
    puzzleBox.style.background = "url(http://www.fgm.cc/learn/lesson9/img/girl" + imgPath + "/bg.png)  no-repeat";
    console.log(puzzleBox);

    let fragment = document.createDocumentFragment();
    for (let i = 0; i < imageData.length; i++) {
        let li = document.createElement('li');
        let img = document.createElement('img');
        img.src = "http://www.fgm.cc/learn/lesson9/img/girl" + imgPath + "/" + imageData[i] + ".png";
        li.appendChild(img);
        fragment.appendChild(li);
    }
    puzzleBox.appendChild(fragment);
    // 给每张图片设置绝对定位，以便进行移动
    setAbsolutePos();

}

function setAbsolutePos() {
    let lists = puzzleBox.getElementsByTagName('li');
    for (let i = 0; i < lists.length; i++) {
        lists[i].style.left = lists[i].offsetLeft + "px";
        lists[i].style.top = lists[i].offsetTop + "px";
        posData.push({
            "left": lists[i].offsetLeft,
            "top": lists[i].offsetTop
        });
    }
    for (let i = 0; i < lists.length; i++) {
        lists[i].style.position = "absolute";
    }
}

// 遮罩
function createMask() {
    let mask = document.createElement('div');
    mask.id = "mask";
    puzzleBox.appendChild(mask);
}

/*移动拼图位置,(边界条件:不可移出整个puzzle)
获取移动中的拼图的最近的元素,高亮处理,图片透明度降低
释放鼠标时,将其与最近的元素进行交换(交换index值和图片碎片),动画效果
每次交换完成,都需要检查index值是否全部归位,如果归位,则完成游戏
*/ 