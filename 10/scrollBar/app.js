let get = {
    byId:function(id){
        return document.getElementById(id);
    },
    byTagName:function(tagName,parent = document){
        return parent.getElementsByTagName(tagName);
    },
    byClassName:function (className,parent =document) {
        return parent.getElementsByClassName(className);
    }
}

class ScrollBar {
    constructor(obj){
        this.obj = obj;
        this.upBtn = get.byClassName('up',this.obj)[0];
        this.downBtn = get.byClassName('down',this.obj)[0];
        this.list = get.byClassName('list')[0];
        this.items = this.list.children;
        this.oneHeight = this.items[0].offsetHeight;
        this.timer= null;
        this.initButton();
    }
    initButton(){
        this.upBtn.addEventListener('click',this.up.bind(this));
        this.downBtn.addEventListener('click',this.down.bind(this));
    }
    up(){
      this.list.insertBefore(this.items[this.items.length-1],this.items[0]);
      this.list.style.top = - this.oneHeight + "px";
      this.doMove(0);
    }
    down(){
        this.doMove(-this.oneHeight,()=>{
            this.list.appendChild(this.items[0]);
            this.list.style.top = 0 ;
        })
    }
    doMove(targetPos,callback){
        clearInterval(this.timer);
        this.timer = setInterval(()=>{
            let speech = (targetPos - this.list.offsetTop)/5;
            speech = speech < 0 ? Math.floor(speech):Math.ceil(speech);
            if(targetPos == this.list.offsetTop){
                callback && callback();
                clearInterval(this.timer);
            } else{
                this.list.style.top = this.list.offsetTop + speech + "px";
            }
        },100);
       
    }
}



let obj = get.byId('scrollBar');
let myScroll = new ScrollBar(obj);

