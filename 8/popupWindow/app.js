let resizeBox = getId('resizeBox');
let content = getId('content');
let dragBar = content.getElementsByTagName('h2')[0];
let maxiBtn = getId('maxiBtn');
let barT = getId('T-Bar');
let barR = getId('R-Bar');
let barB = getId('B-Bar');
let barL = getId('L-Bar');
let barTL = getId('TL-Bar');
let barTR = getId('TR-Bar');
let barBL = getId('BL-Bar');
let barBR = getId('BR-Bar');
let minHeight = 200;
let minWidth = 300;

function getId(id) {
    return document.getElementById(id);
}
// 拖拽
function drag(handle, target) {
    handle.onmousedown = function (event) {
        let e = event || window.event;
        let distanceX = e.clientX - target.offsetLeft;
        let distanceY = e.clientY - target.offsetTop;

        document.onmousemove = function (event) {
            let e = event || window.event;
            let currentX = e.clientX - distanceX;
            let currentY = e.clientY - distanceY;
            // 边界条件
            let maxTop = document.documentElement.clientY - target.offsetHeight;
            let maxLeft = document.documentElement.clientX - target.offsetWidth;
            if (currentY < 0) {
                currentY = 0;
            }
            if (currentY > maxTop) {
                currentY = maxTop;
            }
            if (currentX < 0) {
                currentX = 0;
            }
            if (currentX > maxLeft) {
                currentX = maxLeft;
            }
            target.style.left = currentX + "px";
            target.style.top = currentY + "px";
        }

        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
            this.setCapture && this.setCapture();
        }
    }
}
// 最大化
maxiBtn.onclick = function () {
    resizeBox.className = "max";

    let getSmallerBtn = document.createElement('button');
    getSmallerBtn.id = "getSmallerBtn";
    content.replaceChild(getSmallerBtn, maxiBtn);

    getSmallerBtn.onclick = function () {
        resizeBox.className = "";
        content.replaceChild(maxiBtn, getSmallerBtn);
    }
}

// 最小化
miniBtn.onclick = function () {
    resizeBox.style.display = "none";

    let smallBtn = document.createElement('button');
    smallBtn.id = "getLargerBtn";
    document.body.appendChild(smallBtn);

    smallBtn.onclick = function () {
        resizeBox.style.display = "block";
        document.body.removeChild(smallBtn);
    }
}

// 关闭
closeBtn.onclick = function () {
    resizeBox.style.display = "none";
}

// 改变窗口大小
function resize(target, handle, isLeft, isTop, lockX, lockY) {

    handle.onmousedown = function (event) {
        let e = event || window.event;
        // realClientX和realClientY是去除handle和target之间的距离后的clientX和clientY
        let realClientX = e.clientX - handle.offsetLeft;
        let realClientY = e.clientY - handle.offsetTop;
        let oldTargetLeft = target.offsetLeft;
        let oldTargetTop = target.offsetTop;
        let oldTargetWidth = target.offsetWidth;
        let oldTargetHeight = target.offsetHeight;

        document.onmousemove = function (event) {
            let e = event || window.event;

            //获取移动前后的clientX和clientY的距离(往左或上拖动，矢量可得，movedX和movedY为负数)
            let movedX = e.clientX - realClientX;
            let movedY = e.clientY - realClientY;
            if (isLeft) {
                target.style.left = oldTargetLeft + movedX + "px";
            }
            if (isTop) {
                target.style.top = oldTargetTop + movedY + "px";
            }
            // 获取新窗口宽度和高度(往左或上拖动，矢量可得，movedX和movedY为负数)
            let newTargetWidth = isLeft ? oldTargetWidth - movedX : handle.offsetWidth + movedX;
            let newTargetHeight = isTop ? oldTargetHeight - movedY : handle.offsetHeight + movedY;

            //两个max值随着新窗口的offsetLeft和offsetHeight的变化而动态变化
            let maxWidth = document.documentElement.clientWidth - target.offsetLeft - 2;
            let maxHeight = document.documentElement.clientHeight - target.offsetTop - 2;
            // 边界条件
            if (newTargetWidth > maxWidth) {
                newTargetHeight = maxWidth;
            }
            if (newTargetWidth < minWidth) {
                newTargetWidth = minWidth;
            }
            if (newTargetHeight > maxHeight) {
                newTargetHeight = maxHeight;
            }
            if (newTargetHeight < minHeight) {
                newTargetHeight = minHeight;
            }
            // 设置新窗口的高度和宽度
            if (!lockX) {
                target.style.width = newTargetWidth + "px";
            }
            if (!lockY) {
                target.style.height = newTargetHeight + "px";
            }
            // 用户拖到最小值时，move事件失效
            if ((isLeft && newTargetWidth == minWidth) || (isTop && newTargetHeight == minHeight)) {
                document.onmousemove = null;
            }

        }
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null ;
            this.setCapture && this.setCapture();
        }
    }
}

// 初始化拖拽事件和各个方向的放缩事件
drag(dragBar, resizeBox);
// 四边
resize(resizeBox, barT, false, true, true, false);
resize(resizeBox, barR, false, false, false, true);
resize(resizeBox, barB, false, false, true, false);
resize(resizeBox, barL, true, false, false, true);
// 四角
resize(resizeBox, barTL, true, true, false, false);
resize(resizeBox, barTR, false, true, false, false);
resize(resizeBox, barBR, false, false, false, false);
resize(resizeBox, barBL, true, false, false, false);

