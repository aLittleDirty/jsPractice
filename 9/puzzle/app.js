let photos = document.getElementById('photos');
let options = photos.getElementsByTagName('img');
let puzzleBox = document.getElementById('puzzle');
let imgPath = 0;
// 设置拼图下标
let imageData = [];
for (let i = 0; i < 15; i++) {
    imageData.push(i + 1);
}

// 初始化界面
for (let i = 0; i < options.length; i++) {
    options[i].onclick = function () {

        for (let j = 0; j < options.length; j++) {
            options[j].className = "";
        }

        this.className = "selected";
        imgPath = i;
        initVersion();
    }
}

function initVersion() {
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
    oBox.style.background = "url(img/girl" + imgPath + "/bg.png)  no-repeat";
}
initVersion(0);