let searchBox=document.getElementById('searchBox');
let input=searchBox.getElementsByTagName('input')[0];
let spareUL=searchBox.getElementsByTagName('ul')[0];
let spareLists=spareUL.getElementsByTagName('li');
input.onclick=function(){
    spareUL.style.display="block";
}
for(let i=0;i<spareLists.length;i++){
    spareLists[i].onclick=function(){
        input.value=spareLists[i].innerHTML;
        spareUL.style.display="none";
    }
}
