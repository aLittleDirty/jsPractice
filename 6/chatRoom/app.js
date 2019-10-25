let chatArea = document.getElementsByClassName('chatArea')[0];
let images = chatArea.getElementsByTagName('img');
let nameInput = chatArea.getElementsByTagName('ul')[0];
let textarea = chatArea.getElementsByTagName('textarea')[0];
let sharingBtn = chatArea.getElementsByTagName('button')[0];

let chatUl = document.getElementsByClassName('chatRecordList')[0].getElementsByTagName('ul')[0];
let currentImageSrc="";

// sharingBtn.onclick = function () {
//     let newElement = createNode(currentImageSrc,getChatMessage(nameInput, textarea),getCurrentTime());
//     let targetElement = chatUl.firstElementChild;
//     chatUl.insertBefore(newElement, targetElement);
// }
// function createNode(image,message,time){
//     // 判断是否存在message
//     if(!message){
//         return;
//     }
//     let li=document.createElement('li');
//     li.innerHTML=`<img src=${image}>
//     <p class="chatContent">${message}<p/>
//     <span>${time}</span>`;
// return li;   
// }
// function getCurrentTime(){
//     let date = new Date();
//     let month=date.getMonth()+1;
//     let day=date.getDay();
//     let hour=date.getHours();
//     let minute=date.getMinutes();
//     return month+"月"+day+"日"+" "+hour+":"+minute;
// };

// function getCurrentImage(){
//     for(let i=0;i<images.length;i++){

//         images[i].onclick=function(){
//             currentImageSrc=this.src;
//         }

//     }
// }
// getCurrentImage();


function getChatMessage(nameElement, contentElement) {
    let nameMessage = nameElement.innerHTML;
    let contentMessage = contentElement.innerHTML;
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