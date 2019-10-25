let rightMenu=document.getElementById('rightMenu');
let menuLists=rightMenu.getElementsByTagName('li');
for(let i=0;i<menuLists.length;i++){
    //li onmouseover时，下级子菜单出现
    menuLists[i].onmouseover=function(){
        console.log("over");
        if(this.getElementsByTagName('ul')[0]){
            this.getElementsByTagName('ul')[0].style.display="block";
        }
        
    }
    // li onmouseleave时，消失
    //作为子元素的ul消失，当其作为父元素时，不消失。 
    menuLists[i].onmouseleave=function(){
        console.log('leave');
        if(this.getElementsByTagName('ul')[0]){
                this.getElementsByTagName('ul')[0].style.display="none";

            
        }   
    }
}