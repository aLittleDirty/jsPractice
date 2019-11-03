let getNode = {
    byTagName: function (tagName, parent) {
        return (parent || document).getElementsByTagName(tagName);
    },
    byId: function (id) {
        return document.getElementById(id);
    },
    byClassName(className, parent) {
        return (parent || document).getElementsByClassName(className);
    }
}

let chatArea = getNode.byClassName('chatArea')[0];
let images = getNode.byTagName('img', chatArea);
let nameInput = getNode.byTagName('input', chatArea)[0];
let textarea = getNode.byTagName('textarea', chatArea)[0];
let broadcastBtn = getNode.byTagName('button', chatArea)[0];
let tips = getNode.byClassName('remainWord', chatArea)[0];

let recordBox = getNode.byClassName('recordBox')[0];
let chatRecord = getNode.byTagName('ul', recordBox)[0];
let currentImageSrc = images[0].src;

/* 目前欠缺功能：
textarea输入回删时的字数提示
插入li的动画设置
*/

// 广播按钮：添加新节点
broadcastBtn.onclick = function () {
    let newElement = createNode(currentImageSrc, getChatMessage(nameInput, textarea), getCurrentTime());
    let targetElement = chatRecord.firstElementChild;
    chatRecord.insertBefore(newElement, targetElement);
    textarea.value = "";

}

// 头像监听事件
for (let i = 0; i < images.length; i++) {

    images[i].onclick = function () {
        for (let j = 0; j < images.length; j++) {
            images[j].className = "";
        }
        currentImageSrc = this.src;
        this.className = "active";
    }
}
// 给HTML中的删除按钮添加删除功能
function deleteNode() {
    let buttons = getNode.byTagName('button', recordBox);
    for (let i = 0; i < buttons.length; i++) {

        initDelete(buttons[i]);
    }
}
deleteNode();

function initDelete(child) {
    child.onclick = function () {
        let _this = this;
        let opacity = 1;
        disappear = setInterval(() => {
            opacity -= 0.2;
            _this.parentNode.style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(disappear);
                chatRecord.removeChild(_this.parentNode);
            }
        }, 100);

    }
}

// 创造新的节点
function createNode(image, message, time) {
    if (!message) {
        return;
    }
    let newLi = document.createElement('li');
    newLi.innerHTML = "<img src=" + image + "><p class='chatContent'>" + message + "</p><span>" + time + "</span><button>删除</button>";
    let newButton = newLi.getElementsByTagName('button')[0];
    initDelete(newButton);
    return newLi;
}

// 组合姓名框和内容框的信息
function getChatMessage(nameElement, contentElement) {
    let nameMessage = nameElement.value;
    let contentMessage = contentElement.value;
    if (nameMessage.length == 0) {
        alert('请输入姓名');
        return false;
    } else if (nameMessage.length == 1) {
        alert('姓名长度为2个字符串及以上');
        return false;
    }
    if (contentMessage.length == 0) {
        alert('请输入内容');
        return false;
    }
    return nameMessage + ": " + contentMessage;
}

// 获取当前的时间
function getCurrentTime() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    return month + "月" + day + "日" + " " + hour + ":" + minute;
};