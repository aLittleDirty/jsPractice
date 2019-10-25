let chatArea = document.getElementsByClassName('chatArea')[0];
let images = chatArea.getElementsByTagName('img');
let nameInput = chatArea.getElementsByTagName('input')[0];
let textarea = chatArea.getElementsByTagName('textarea')[0];
let sharingBtn = chatArea.getElementsByTagName('button')[0];

let chatUl = document.getElementsByClassName('chatRecordList')[0].getElementsByTagName('ul')[0];
let currentImageSrc="http://www.fgm.cc/learn/lesson6/img/face1.gif";

/* 目前欠缺功能：
头像点击后，维持红色边框;
还能输入多少个字的提示
插入新li的动画设置
li的删除功能
*/ 
sharingBtn.onclick = function () {
    let newElement = createNode(currentImageSrc,getChatMessage(nameInput, textarea),getCurrentTime());
    let targetElement = chatUl.firstElementChild;
    chatUl.insertBefore(newElement, targetElement);
}
function createNode(image,message,time){
    // 判断是否存在message
    if(!message){
        return;
    }
    let li=document.createElement('li');
    li.innerHTML="<img src="+image+"><p class='chatContent'>"+message+"</p><span>"+time+"</span>";
return li;   
}
function getCurrentTime(){
    let date = new Date();
    let month=date.getMonth()+1;
    let day=date.getDate();
    let hour=date.getHours();
    let minute=date.getMinutes();
    return month+"月"+day+"日"+" "+hour+":"+minute;
};

function getCurrentImage(){
    for(let i=0;i<images.length;i++){

        images[i].onclick=function(){
            currentImageSrc=this.src;
            console.log(currentImageSrc);
        }

    }
}
getCurrentImage();


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