let checkBoxes=document.getElementsByTagName('input');
let allCheckedBox=checkBoxes[0];
let oppositeSelectSpan=document.getElementById('oppositeSelect');
// 全选
allCheckedBox.onclick=function(){
    for(let i=1;i<checkBoxes.length;i++){
        checkBoxes[i].checked=this.checked;
    }
}
// 反选
oppositeSelectSpan.onclick=function(){
    for(let i=1;i<checkBoxes.length;i++){
        checkBoxes[i].checked=!checkBoxes[i].checked;
    }
    isAllSelected();
}
// 选择单个时，检查是否满足全选条件
for(let i=1;i<checkBoxes.length;i++){
    checkBoxes[i].onclick=function(){
        isAllSelected();
    }
}
function isAllSelected(){
    let n=checkBoxes.length-1;
    for(let i=1;i<checkBoxes.length;i++){
        if(checkBoxes[i].checked){
            n--;
        }
    }
    allCheckedBox.checked=(n==0)?true:false;
}