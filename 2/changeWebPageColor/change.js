    let selections=document.getElementById('colorful').getElementsByTagName('li');
    let currentHref=document.getElementsByTagName('link')[0];
    for(let i=0;i<selections.length;i++){
        selections[i].onclick=function(){
            currentHref['href']=this.id+'.css';
        }
    }
