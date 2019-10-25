let tabsBox = document.getElementById('tabsBox');
let navList = tabsBox.getElementsByTagName('a');
let contentList = document.getElementById("content").getElementsByTagName('ul');
for (let i = 0; i < navList.length; i++) {
    navList[i].onmouseover = function () {
        for (let j = 0; j < contentList.length; j++) {
            contentList[j].style.display = "none";
        }
        contentList[i].style.display="block";
    }
}