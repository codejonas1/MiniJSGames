const PLAYER1 = 1;
const PLAYER2 = 2;
var turn = 1;
var diagrams = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let gameBox = document.getElementsByClassName('gameBox')[0];
let resetButton = document.getElementById('resetButton');
var boxes = document.getElementsByClassName('box');
var allBoxesArr = [];

function resetPoints () {
    sessionStorage.setItem('scoreP1', 0);
    sessionStorage.setItem('scoreP2', 0);
}

resetButton.onclick = () => {resetPoints(); document.location.reload();};

window.onload = function () {
    if(!sessionStorage.getItem('scoreP1') && !sessionStorage.getItem('scoreP2')){
        resetPoints();
    }
    document.getElementsByTagName('h1')[0].innerHTML += sessionStorage.getItem('scoreP1');
    document.getElementsByTagName('h1')[1].innerHTML += sessionStorage.getItem('scoreP2');
}

for (let i = 0; i < boxes.length; i++) {
    allBoxesArr[i] = boxes[i];
}

function checkAllBoxes (box){
    return box.hasAttribute('data-userid');
}

function checkDiagram(){
    for (let i = 0; i < diagrams.length; i++) {
        if(boxes[diagrams[i][0]].dataset.userid == PLAYER1 && boxes[diagrams[i][1]].dataset.userid == PLAYER1 &&  boxes[diagrams[i][2]].dataset.userid == PLAYER1){

            let pointsP1 = sessionStorage.getItem('scoreP1');
            sessionStorage.setItem('scoreP1', ++pointsP1);

            alert('The winner is: Player' + PLAYER1 + ' (cross)');
            document.location.reload();
        }
        
        if(boxes[diagrams[i][0]].dataset.userid == PLAYER2 && boxes[diagrams[i][1]].dataset.userid == PLAYER2 &&  boxes[diagrams[i][2]].dataset.userid == PLAYER2){

            let pointsP2 = sessionStorage.getItem('scoreP2');
            sessionStorage.setItem('scoreP2', ++pointsP2);
            
            alert('The winner is: Player' + PLAYER2 + ' (circle)');
            document.location.reload();
        }
        
        if(allBoxesArr.every(checkAllBoxes)){
            document.location.reload();
        }
    }

}

gameBox.addEventListener('click', function(e){
    let target = e.target;
    if(turn > 2) turn = 1; 

    if(target.classList.contains("cross") || target.classList.contains("circle") || target.classList.contains("gameBox")) return false; 
    
    switch (turn) {
            case 1:
                target.className += ' cross';
                target.setAttribute('data-userid', PLAYER1);
                break;
            case 2:
                target.className += ' circle';
                target.setAttribute('data-userid', PLAYER2);
            default:
                break;
        }
        setTimeout(checkDiagram, 15);
    turn++;
})