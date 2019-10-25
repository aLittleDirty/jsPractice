let displayBox=document.getElementById('displayBox');
let lists=displayBox.getElementsByTagName('li');
let images=displayBox.getElementsByTagName('img');
let spans=displayBox.getElementsByTagName('span');
for(let i=0;i<lists.length;i++){
    lists[i].onmouseover=function(){
      images[i].style.display="block";
      spans[i].style.display="none";  
    }
    lists[i].onmouseleave=function(){
        images[i].style.display="none";
        spans[i].style.display="block";
    }
}