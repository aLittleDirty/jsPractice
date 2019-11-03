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
// let remainNumber=140;

/* 目前欠缺功能：
textarea输入时的字数提示
插入新li的动画设置
*/

// 广播按钮监听事件
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
// 初始化在HTML中添加的删除按钮
function deleteNode(){
    let deleteButtons = getNode.byTagName('button',recordBox);
    for(let i = 0;i < deleteButtons.length ; i++ ){

        deleteButtons[i].onclick = function () {
            chatRecord.removeChild(this.parentNode);
        }
    }
}
deleteNode();

// 创造新的节点
function createNode(image, message, time) {
    if (!message) {
        return;
    }
    let newLi = document.createElement('li');
    newLi.innerHTML = "<img src=" + image + "><p class='chatContent'>" + message + "</p><span>" + time + "</span><button>删除</button>";
    let newButton = newLi.getElementsByTagName('button')[0];
    newButton.onclick = function () {
        chatRecord.removeChild(this.parentNode);
    }
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
    return nameMessage + ":" + contentMessage;
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
// 剩余字数提示
// 没支持中文输入。
// 没支持字数回删操作
// textarea.onkeydown=function(event){
//    let e=event||document.event;
//     if(e.keycode===8){
//         console.log('aaa');
//         remainNumber++;
//     }else{
//         remainNumber--;
//     }
//     tips.innerHTML=remainNumber;
// }
// 删除按钮