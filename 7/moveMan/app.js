let flyMan = document.getElementById('flyMan');
let tips = document.getElementsByTagName('p')[0];
let buttons = document.getElementsByTagName('button');
let straightBtn = buttons[0];
let curveBtn = buttons[1];

straightBtn.onclick = function (event) {
    // 阻止冒泡事件
    (event || window.event).stopPropagation();
    clearEvent();
    this.innerHTML += "(已激活)";
    tips.innerHTML = "鼠标点击页面， 人物将移动至鼠标位置！";

    // 点击页面移动人物
    document.onclick = function (event) {
        flyMan.className = "active";

        let targetPos = {
            x: event.clientX,
            y: event.clientY
        };
        let stopStatus = function () {
            flyMan.className = "";
        };
        startMove(flyMan, targetPos, stopStatus);
    }
}

curveBtn.onclick = function (event) {
    (event || window.event).stopPropagation();
    clearEvent();
    this.innerHTML += "(已激活)";
    tips.innerHTML = "按住鼠标左键，在页面划动，人物将按照鼠标轨迹移动。"
    let route = [];
    route.push({x:flyMan.offsetLeft,y:flyMan.offsetTop});

    document.onmousedown = function (event){
        let e = event || window.event;
        route.push({x:e.clientX,y:e.clientY});

        // onmousemove事件必须在onmousedown事件内，否则，onclick事件后，这两者的监听事件的触发不分前后
        document.onmousemove = function (event){
            let e = event || window.event;
            route.push({x:e.clientX,y:e.clientY});
        };
    };
    
    document.onmouseup = function (){
        document.onmousemove = null;
        flyMan.timer = setInterval(()=>{
            if(route.length > 0){
                let templatePos = route.shift();
                flyMan.style.left = templatePos.x + "px";
                flyMan.style.top = templatePos.y +"px";
            }else{
                clearInterval(flyMan.timer);
            }
        },30);
    }
}

function clearEvent() {
    document.onclick = null;
    document.onmousedown = null;
    document.onmousemove = null;
    document.onmouseup = null;

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerHTML = buttons[i].innerHTML.replace('(已激活)','');
        buttons[i].onmouseup =buttons[i].onmousedown = function (event){
            (event || window.event).stopPropagation();
        }
    }
}

// 防抖函数
function startMove(obj, targetPos, fnEnd) {
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        doMove(obj, targetPos, fnEnd)
    }, 30);
}

// 执行函数
function doMove(obj, targetPos, fnEnd) {
    // eachStep因obj的offset动态变化而逐渐趋近零
    let eachStepX = (targetPos.x - obj.offsetLeft) / 5;
    let eachStepY = (targetPos.y - obj.offsetTop) / 5;

    eachStepX = (eachStepX > 0) ? Math.ceil(eachStepX) : Math.floor(eachStepX);
    eachStepY = (eachStepY > 0) ? Math.ceil(eachStepY) : Math.floor(eachStepY);

    if (obj.offsetLeft == targetPos.x && obj.offsetTop == targetPos.y) {
        clearInterval(obj.timer);
        fnEnd && fnEnd();
    } else {
        obj.style.left = obj.offsetLeft + eachStepX + "px";
        obj.style.top = obj.offsetTop + eachStepY + "px";
    }

}