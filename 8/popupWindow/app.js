let resizeBox=document.getElementById('resizeBox');
let content = document.getElementById('content');
let dragBar = content.getElementsByTagName('h2')[0];
let maxiBtn=getId('maxiBtn');

function getId(id){
    return document.getElementById(id);
}
// 拖拽
function drag(handle,target){
    handle.onmousedown = function (event){
        let e = event || window.event ;
        let distanceX = e.clientX - target.offsetLeft;
        let distanceY = e.clientY - target.offsetTop;
    
        document.onmousemove = function (event){
            let e = event || window.event ;
            let currentX = e.clientX - distanceX;
            let currentY = e.clientY - distanceY; 
            // 边界条件
            let maxTop=document.documentElement.clientY-target.offsetHeight;
            let maxLeft=document.documentElement.clientX-target.offsetWidth;
            if(currentY<0){
                currentY=0;
            }
            if(currentY>maxTop){
                currentY=maxTop;
            }
            if(currentX<0){
                currentX=0;
            }
            if(currentX>maxLeft){
                currentX=maxLeft;
            }
            target.style.left =  currentX + "px" ;
            target.style.top = currentY + "px" ;
        }
    
        document.onmouseup = function (){
            document.onmousemove = null ;
            document.onmouseup = null ;
        }
    }
}
// 最大化
maxiBtn.onclick=function(){
    resizeBox.className="max";
    // 更换成缩小按钮
    let getSmallerBtn=document.createElement('button');
    getSmallerBtn.id="getSmallerBtn";
    content.replaceChild(getSmallerBtn,maxiBtn);

    getSmallerBtn.onclick=function(){
        resizeBox.className="";
        // 更换成放大按钮
        content.replaceChild(maxiBtn,getSmallerBtn);
    }
}

// 最小化
miniBtn.onclick=function(){
    resizeBox.style.display="none";

    let smallBtn=document.createElement('button');
    smallBtn.id="getLargerBtn";
    document.body.appendChild(smallBtn);

    smallBtn.onclick=function(){
        resizeBox.style.display="block";
        document.body.removeChild(smallBtn);
    }
}

// 关闭
closeBtn.onclick=function(){
    resizeBox.style.display="none";
}


drag(dragBar,resizeBox);

