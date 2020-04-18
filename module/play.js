import * as map from "./map.js";


/**
 * 0. 空白
 * 1. 玩家
 * 2. 墙
 * 3. 箱子
 */
//得到玩家的位置信息
function getPlayer() {
    for(var row=0;row<map.content.length;row++){
        for (var col=0;col<map.content.length;col++){
            if(map.content[row][col]===map.PLAYER){
                return {
                    row:row,
                    col:col
                }
            }
        }
    }
}
//玩家移动
export function playerMove(direction) {
    var player = getPlayer();
    var next = nextInfo(player.row,player.col,direction);
    //判断不能移动的条件
    if(next.value===map.WALL){
        return;
    }
    else if (next.value===map.BOX){
        var nextNext = nextInfo(next.row,next.col,direction);
        if(nextNext.value === map.SPACE){
            move(next,nextNext);
            move(player,next);
        }
        else return;
    }
    else if (next.value===map.SPACE){
        move(player,next);
        console.log(player,next)
    }
}
//物体移动
function move(point1,point2) {
    var tmp = map.content[point1.row][point1.col];
    map.content[point1.row][point1.col] = map.content[point2.row][point2.col];
    map.content[point2.row][point2.col]=tmp;
}

//玩家移动的下一个位置信息
function nextInfo(row,col,direction) {
    if(direction==="right"){
        return {
            row:row,
            col:col+1,
            value:map.content[row][col+1]
        }
    }
    else if (direction==="left"){
        return {
            row:row,
            col:col-1,
            value:map.content[row][col-1]
        }
    }
    else if (direction==="up"){
        return {
            row:row-1,
            col:col,
            value:map.content[row-1][col]
        }
    }
    else{
        return {
            row:row+1,
            col:col,
            value:map.content[row+1][col]
        }
    }
}
//判断游戏是否胜利
export function isWin(){
//判断正确的位置是否有箱子
    for (var i=0;i<map.correct.length;i++){
        var r = map.correct[i];//位置坐标
        if(map.content[r.row][r.col]!= map.BOX){
            console.log(map.content[r.row][r.col]);
            return false;
        }
    }
    return true;
}

// export function isWin() {
//     //是否每个正确位置都有箱子
//     for (var i = 0; i < map.correct.length; i++) {
//         var point = map.correct[i];
//         if (map.content[point.row][point.col] !== map.BOX) {
//             //该正确位置上没有箱子
//             return false;
//         }
//     }
//     return true;
// }