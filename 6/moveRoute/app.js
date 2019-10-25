let movingBox = document.getElementById("movingBox");
let dragArea = movingBox.getElementsByTagName('h1')[0];
let tips = movingBox.getElementsByTagName('li');
let replayBtn = dragArea.getElementsByTagName('span')[0];
// 初始值：
movingBox.style.top = 211 + "px";
movingBox.style.left = 161 + "px";
let drag = false;
let distanceX = 0;
let distanceY = 0;
let routeArray = [{
    x: 161,
    y: 221
}];
// 激活移动
dragArea.onmousedown = function (event) {
    drag = true;
    // 获取鼠标点击的坐标和div的左上角坐标的间隔
    distanceX = event.clientX - movingBox.offsetLeft;
    distanceY = event.clientY - movingBox.offsetTop;

}
dragArea.onmousemove = function (event) {
    if (!drag) {
        return;
    }
    routeArray.push({
        x: event.clientX - distanceX,
        y: event.clientY - distanceY
    });
    // 鼠标位置变化时，div跟随变化位置
    movingBox.style.left = event.clientX - distanceX + "px";
    movingBox.style.top = event.clientY - distanceY + "px";
}
dragArea.onmouseup = function () {
    drag = false;
}
replayBtn.onclick = function () {
    if (routeArray.length == 1) {
        return;
    }
    timer = setInterval(() => {
        let currentPos = routeArray.pop();
        movingBox.style.left = currentPos.x + "px";
        movingBox.style.top = currentPos.y + "px";
        if (routeArray.length == 1) {
            clearInterval(timer);
        }
    }, 30);

}