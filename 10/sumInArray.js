// 在Array原型中添加sum方法和max方法
Array.prototype.sum=function(){
    let sum=0;
    for(let i=0;i<this.length;i++){
        sum+=parseInt(this[i]);
    }
    return sum;
}
Array.prototype.max=function(){
    let max=this[0];
    for(let i=1;i<this.length;i++){
        if(max<this[i]){
            max=this[i];
        }
    }
    return max;
}

let arr1 = [0,1,2,30,-20,5,7,10,2];
console.log(arr1.sum());
console.log(arr1.max());
let arr2=[-1,-2,-3,-5];
console.log(arr2.sum());
console.log(arr2.max());