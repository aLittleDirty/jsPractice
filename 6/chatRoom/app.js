let chatArea = document.getElementsByClassName('chatArea')[0];
let images = chatArea.getElementsByTagName('img');
let nameInput = chatArea.getElementsByTagName('input')[0];
let textarea = chatArea.getElementsByTagName('textarea')[0];
let sharingBtn = chatArea.getElementsByTagName('button')[0];

let chatUl = document.getElementsByClassName('chatRecordList')[0].getElementsByTagName('ul')[0];
let currentImageSrc="http://www.fgm.cc/learn/lesson6/img/face1.gif";

/* 目前欠缺功能：
还能输入多少个字的提示
插入新li的动画设置
li的删除功能
*/ 

// 将新节点插入到ul的第一个位置
sharingBtn.onclick = function () {
    let newElement = createNode(currentImageSrc,getChatMessage(nameInput, textarea),getCurrentTime());
    let targetElement = chatUl.firstElementChild;
    chatUl.insertBefore(newElement, targetElement);
}
// 创造新的节点
function createNode(image,message,time){
    // 判断是否存在message
    if(!message){
        return;
    }
    let li=document.createElement('li');
    li.innerHTML="<img src="+image+"><p class='chatContent'>"+message+"</p><span>"+time+"</span>";
    return li;   
}
// 获取当前的时间
function getCurrentTime(){
    let date = new Date();
    let month=date.getMonth()+1;
    let day=date.getDate();
    let hour=date.getHours();
    let minute=date.getMinutes();
    return month+"月"+day+"日"+" "+hour+":"+minute;
};
// 初始化，选择当前的图片
function getCurrentImage(){
    // 初始化起始图片
    let cacheImage=images[0];
    cacheImage.className="active";
    for(let i=0;i<images.length;i++){

// 每次点击时，保存当前图片的链接，将当前图片设置为缓存图片(旧图片)

        images[i].onclick=function(){
            cacheImage.className="";
            currentImageSrc=this.src;
            this.className="active";
            cacheImage=this;  

        }

    }
}
getCurrentImage();

// 组合姓名框和内容框信息
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