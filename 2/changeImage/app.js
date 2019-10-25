let album=document.getElementById('album');
let images=album.getElementsByTagName('img');
let biggerPhoto=images[0];
for(let i=1;i<images.length;i++){
    images[i].onmouseover=function(){
        images[0].src=this.src.replace(/small/,"big");
    }
}