let photos = document.getElementById('photos');
let options = photos.getElementsByTagName('img');
let puzzleBox = document.getElementById('puzzle');
let startButton = document.getElementsByTagName('button');
let imgPath = 0;
// 设置拼图下标
let imageData = [];
for (let i = 0; i < 15; i++) {
    imageData.push(i + 1);
}

// 初始化缩略图
for (let i = 0; i < options.length; i++) {
    options[i].onclick = function () {

        for (let j = 0; j < options.length; j++) {
            options[j].className = "";
        }
        this.className = "selected";
        imgPath = i;
        startButton.innerHTML = "开始游戏";
    }
}

// 添加拼图
function addPuzzle() {
    puzzleBox.innerHTML = "";

    let fragment = document.createDocumentFragment();
    for (let i = 0; i < imageData.length; i++) {
        let li = document.createElement('li');
        let img = document.createElement('img');
        img.src = "http://www.fgm.cc/learn/lesson9/img/girl" + imgPath + "/" + (i + 1) + ".png";
        li.appendChild(img);
        fragment.appendChild(li);
    }
    // 事实上是添加了fragment的所有子元素
    puzzleBox.appendChild(fragment);
    puzzleBox.style.background = "url(http://www.fgm.cc/learn/lesson9/img/girl" + imgPath + "/bg.png)  no-repeat";
}

// 遮罩
function createMask() {
    let mask = document.createElement('div');
    mask.id = "mask";
    puzzleBox.appendChild(mask);
}

function showMask() {
    let mask = puzzleBox.getElementById('mask');
    mask.style.display = "block";
}

function hideMask() {
    let mask = puzzleBox.getElementById('mask');
    mask.style.display = "none";
}

function playGame(isReady) {
    if (isReady) {
        imageData.sort(() => {
            return Math.random() > 0.5 ? 1 : -1
        });
    }
    addPuzzle();
    createMask();
    console.log(imageData);
}
playGame(false);