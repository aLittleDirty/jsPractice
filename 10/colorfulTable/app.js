let get = {
    byTagName: function (tagName, parent = document) {
        return parent.getElementsByTagName(tagName);
    },
    byClassName: function (className, parent = document) {
        return parent.getElementsByClassName(className);
    },
    byId: function (id) {
        return document.getElementById(id);
    }
}

class ColorfulTable {
    constructor(rows, cols, table = "table",callBack) {
        this.rows = rows;
        this.cols = cols;
        this.table = get.byTagName(table)[0];
        this.callBack = callBack;
        this.initTable();
        this.initListener();
    }
    // 创建table
    initTable() {
        let trArray = [];
        for (let i = 0; i < this.rows; i++) {
            let tdArray = [];
            for (let j = 0; j < this.cols; j++) {
                let td = `<td style="background-color:rgb(${this.newColor(0,255)});">${this.newValue(1,15)}</td>`;
                tdArray.push(td);
            }
            let tr = "<tr>" + tdArray.join('') + "</tr>";
            trArray.push(tr);
        }
        this.table.innerHTML = trArray.join('');
    }
    // 初始化监听事件
    initListener() {
        this.table.addEventListener('click', this.showMessage.bind(this), false);
    }
    showMessage(event = window.event) {
        let target = event.target;
        console.log(target.style.backgroundColor);
        let selectedColor = target.style.backgroundColor;
        let selectedValue = target.innerText;
        if (target.tagName.toUpperCase() === "TD") {
            this.callBack(selectedValue,selectedColor);
           
        }
    }

    newColor() {
        let tempData = [];
        for (let i = 0; i < 3; i++) {
            let singleColor = this.getRandom(0, 255).toString();
            while (singleColor.length < 3) {
                singleColor = "0" + singleColor;
            }
            tempData.push(singleColor);
        }
        return tempData.join(',');
    }

    newValue() {
        return this.getRandom(1, 15);
    }

    getRandom(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

}



let createBtn = get.byTagName('button')[0];
let message = get.byTagName('p')[0];

createBtn.onclick = function () {
    let rows = get.byTagName('input')[0].value;
    let cols = get.byTagName('input')[1].value;
    new ColorfulTable(rows, cols,undefined,(value,color)=>{
        message.innerHTML = `<p>你选择的区域的数字是:${value},颜色为:<div style="background-color:${color};"></div><span>${color}</span></p>`
    });
}