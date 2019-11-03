let frame = document.getElementById("carouselBox");
let imagesBox = frame.getElementsByTagName('ul')[0];
let images = imagesBox.getElementsByTagName('li');
let indexBox = frame.getElementsByTagName('ol')[0];
let timer = null;
let autoPlay = null;
let isUpper = false;
let currentIndex = 0;

// 为每张图片添加下标
for (let i = 0; i < images.length; i++) {
    let imgIndex = document.createElement('li');
    imgIndex.innerText = i + 1;
    indexBox.appendChild(imgIndex);
}

// 初始化下标的onmouseover事件
let indexLists = indexBox.getElementsByTagName('li');
for (let i = 0; i < indexLists.length; i++) {
    indexLists[i].index = i;
    indexLists[i].onmouseover = function () {
        for (let j = 0; j < indexLists.length; j++) {
            indexLists[j].className = "";
        }
        this.className = "active";
        currentIndex = this.index;
        toggle();
    }
}
//获得下一张图片的位置，初始化自动播放
next();
autoPlay = setInterval (toggle,2000);

// 初始化鼠标移入移出播放框事件
frame.onmouseover = function (){
    clearInterval(autoPlay);
}

frame.onmouseout = function () {
    autoPlay=setInterval(toggle,2000);
}

function toggle() { 
    for(let i = 0;i < indexLists.length;i++ ){
        indexLists[i].className = "";
    }
    indexLists[currentIndex].className = "active";
    let targetPosition = (-currentIndex) * images[0].offsetHeight;
    startMove(targetPosition);
    next();
}

function next() {
    if (currentIndex == indexLists.length - 1) {
        isUpper = true;
    }
    if (currentIndex == 0) {
        isUpper = false;
    }
    isUpper ? currentIndex-- : currentIndex++;
}

// 防抖函数
function startMove(targetPosition) {
    clearInterval(timer);
    timer = setInterval(() => {
        doMove(targetPosition);
    }, 30);
}

// 执行函数
function doMove(targetPosition) {
    let eachStep = (targetPosition - imagesBox.offsetTop) / 5;
    eachStep = (eachStep > 0) ? Math.ceil(eachStep) : Math.floor(eachStep);
    if (imagesBox.offsetTop == targetPosition) {
        clearInterval(timer);
    } else {
        imagesBox.style.top = imagesBox.offsetTop + eachStep + "px";
    }
}