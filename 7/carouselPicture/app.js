let container = document.getElementById("carouselBox");
let imagesBox = container.getElementsByTagName('ul')[0];
let imageLists = imagesBox.getElementsByTagName('li');
let indexBox = container.getElementsByTagName('ol')[0];
let containerTop = container.offsetTop;
let eachImageHeight = imagesBox.children[0].offsetHeight;

for (let i = 0; i < imageLists.length; i++) {

    // 为每张图片添加下标，并狗日下标添加onmouseover事件
    let indexLi = document.createElement('li');
    indexLi.innerText = i + 1;
    indexBox.appendChild(indexLi);


    indexLi.onmouseover = function () {
        // 清空所有下标的样式
        for (let j = 0; j < indexBox.children.length; j++) {
            indexBox.children[j].className = "";
        }
        this.className = "active";

        let targetPosition = containerTop-(i*eachImageHeight);
        animatePlay(imagesBox, targetPosition);
    }
}
// 自动轮播

// function autoplay(element,index){
//     while(index<imageLists.length){
//         index++;
//         let targetPosition=containerTop-(index*eachImageHeight);
//         animatePlay(element,targetPosition);
//       // 回到第一张图片，再次轮播
//         if(index==imageLists.length-1){
//             element.style.top=0+"px";
//             index=0;
//         }  
//     }
// }
autoplay(imagesBox,0);

function animatePlay(element, targetPosition) {
    let step = 10;
   
    play = setInterval(()=>{
        let current = element.offsetTop;

        step=current>targetPosition?-step:step;

        console.log("targetPosition:"+targetPosition);
        console.log("current:"+current);
        console.log("step:"+step);

        current+=step;
        if(Math.abs(current-targetPosition)>Math.abs(step)){
            element.style.top=current+"px";
        }else{
            clearInterval(play);
            element.style.top=targetPosition+"px";
        }
        
    }, 30)

}