import {playerMove,isWin} from "./play.js";
import ui from "./ui.js";
ui()


window.onkeydown = function (e) {
    var result = false;
    var over = false;
    if(isWin()){
        return;

    }
    if (e.key==="ArrowUp"){
        result=playerMove("up");
    }
    else if (e.key==="ArrowRight"){
        result=playerMove("right");
    }
    else if (e.key==="ArrowLeft"){
        result=playerMove("left");
    }
    else {
        result=playerMove("down");
    }
    if (result!==false){
        ui();
        if(isWin()){
            alert("游戏胜利！");
            over = true;
        }
    }
}