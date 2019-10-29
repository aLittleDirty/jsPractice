let resizeBox=document.getElementById('resizeBox');
let content = document.getElementById('content');
let dragBar = content.getElementsByTagName('h2')[0];

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
drag(dragBar,resizeBox);

