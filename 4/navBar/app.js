let navBar=document.getElementById("navBar");
let titles=navBar.getElementsByTagName('span');
let navs=navBar.getElementsByTagName('nav');
for(let i=0;i<titles.length;i++){
    titles[i].onmouseover=function(){
        navs[i].style.display="block";
        
    }
}