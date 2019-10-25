
let smallImgLists=document.getElementById("smallImg").getElementsByTagName('li');
let bigImgLists=document.getElementById("bigImg").getElementsByTagName('li');
console.log(smallImgLists);
console.log(bigImgLists);
for(let i=0;i<smallImgLists.length;i++){
    smallImgLists[i].onmouseover=function(){
        console.log(bigImgLists[i]);
        bigImgLists[i].style.display="block";    
    }
    smallImgLists[i].onmousemove=function(event){
        let e=event || window.event;

        bigImgLists[i].style.left=e.clientX+"px";
        bigImgLists[i].style.top=e.clientY+"px";
    }
    smallImgLists[i].onmouseout=function(){
        bigImgLists[i].style.display="none";
    }
}