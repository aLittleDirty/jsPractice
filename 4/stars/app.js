let starsBox = document.getElementById('lightStars');
let stars = starsBox.getElementsByTagName('li');
let starArea = starsBox.getElementsByTagName('ul')[0];
let tips=starsBox.getElementsByTagName('P')[0];
let result=starsBox.getElementsByTagName('span')[1];
let starsNumber = 0;

let scoreMessage=[{
    summary: "很不满意",
    detail: "差得太离谱，与卖家描述的严重不符，非常不满"
},{
    summary: "一般",
    detail: "质量一般，没有卖家描述的那么好"
},{
    summary: "不满意",
    detail: "部分有破损，与卖家描述的不符"
},{
    summary:"满意",
    detail:"质量不错，与卖家描述的基本一致，还是挺满意的"
},{
    summary:"非常满意",
    detail:"质量非常好，与卖家描述的完全一致，非常满意"
}];

for (let i = 0; i < stars.length; i++) {
    stars[i].onmouseover = function () {
        lightStars(i + 1);

        // 显示提示框
        tips.style.display="block";
        tips.innerHTML="<strong>"+i+'分  '+scoreMessage[i].summary+"</strong>"+'<br/>'+scoreMessage[i].detail;
        tips.style.left=70+25*i+"px";
    }
    stars[i].onclick = function () {
        starsNumber = i + 1;
        result.innerHTML='<strong>'+i+'分 '+'</strong>'+'('+scoreMessage[i].summary+' , '+scoreMessage[i].detail+')';
        tips.style.display="none";
    }
}
starArea.onmouseout = function () {
    lightStars();
    tips.style.display="none";
}

function lightStars(index) {
    let starNum = index || starsNumber;
    for (let i = 0; i < stars.length; i++) {
        stars[i].className = (i < starNum) ? "lighting" : "";
    }
}