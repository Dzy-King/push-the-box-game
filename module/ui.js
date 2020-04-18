//该模块用于将地图显示到页面上

import * as map from "./map.js";
const div = document.getElementsByClassName("game")[0];
//每一个小块的宽度
//每一个小块的高度
const pieceHeight = 45;
const pieceWidth = 45;

// 设置div的宽度
function setDivSize() {
    div.style.width = pieceWidth * map.rowNum + "px";
    div.style.height = pieceHeight *map.colNum + "px";
}
//判断是否是正确的位置
function isCorrect(row,col) {
    for (var i=0;i<map.correct.length;i++){
        var obj = map.correct[i];
        if(obj.row===row && obj.col===col){
            return true
        }
    }
    return false;
}
//根据行和列，创建一个div加入到容器
function creatDiv(row,col) {
    var value = map.content[row][col];
    var divPiece = document.createElement("div");
    divPiece.className="item";
    var correct = isCorrect(row,col);
    if(value===map.SPACE){
        if(correct){
            divPiece.classList.add("correct");
        }
        else return;
    }
    else if (value===map.WALL){
        divPiece.classList.add("wall");
    }
    else if (value===map.BOX){
        if (correct){
            divPiece.classList.add("correct-box");
        }
        else divPiece.classList.add("box");

    }
    else if (value===map.PLAYER){
        divPiece.classList.add("player");

    }
    divPiece.style.left = col *pieceWidth + "px";
    divPiece.style.top = row *pieceHeight + "px";
    div.appendChild(divPiece);
}
//设置地图的样式,12行，9列
function setContent() {
    //1. 清空容器
    div.innerHTML = "";
    //2. 遍历地图内容，设置元素
   for (var col=0;col<map.colNum;col++){
       for(var row=0;row<map.rowNum;row++){
           creatDiv(row,col);
       }
   }

}
//显示地图
export default function () {
    setDivSize();
    setContent();
}