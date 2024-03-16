let colNumber = 0;
let lastKeyNumbers = []; // Array for 2 last pushed key 
let points= document.getElementsByTagName('h1')[0];
let score = 0;

let isPressedLeft = false;
let isPressedUp = false;
let isPressedRight = false;
let isPressedDown = false;

const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const heroImg = new Image();
const appleImg = new Image();

heroImg.src = './img/hero.png';
appleImg.src = './img/apple.png';

var apple = {
    width: 680,
    height: 710,
    scaleWidth: 680 / 20,
    scaleHeight: 710 / 20,
    x: null,
    y: null,

    draw: function() {
        ctx.beginPath();
        ctx.drawImage(appleImg, 0, 0, this.width, this.height, this.x, this.y, this.scaleWidth, this.scaleHeight);
        ctx.closePath();
    },

    randomisePosition: function(){
        this.y = Math.floor(Math.random() * ((500 - this.scaleHeight) - (0 + this.scaleHeight) + 1) + this.scaleHeight);

        this.x = Math.floor(Math.random() * ((500 - this.scaleWidth) - (0 + this.scaleWidth) + 1) + this.scaleWidth);
    },

    getRandomTime: function(){
        return Math.floor(Math.random() * (6000 - 2000 + 1) + 2000);
    }
}

var hero = {
    frameWidth: 400.25,
    frameHeight: 599.25,
    scaleWidth: 400.25 / 8,
    scaleHeight: 599.25 / 8,
    x: 10,
    y: 10,
    vx: 10,
    vy: 10,

    draw: function(row, col) {
        ctx.beginPath();
        ctx.drawImage(heroImg, this.frameWidth * col, this.frameHeight * row, this.frameWidth, this.frameHeight, this.x, this.y, this.scaleWidth, this.scaleHeight);
        ctx.closePath();
    },

    move: function (row, col) {
        switch (row) {
            case 0:
                if (this.y + this.scaleHeight >= canvas.height) this.y += 0; 
                else this.y += this.vy;
                break;

            case 1:
                if (this.y < 0) this.y += 0; 
                else this.y -= this.vy;
                break;

            case 2:
                if (this.x <= 0) this.x += 0; 
                else this.x -= this.vx;
                break;
            case 3:
                if (this.x + this.scaleWidth >= canvas.width) this.x += 0;  
                else this.x += this.vx;
                break;
        }
        this.draw(row, col);
    }
}

function updateGame(rowNumber) {
    lastKeyNumbers.push(rowNumber);

    if (lastKeyNumbers.length > 1) {
        if(lastKeyNumbers[lastKeyNumbers.length - 2] != lastKeyNumbers[lastKeyNumbers.length - 1]){
            colNumber = 0;    
        }  
    }
    
    if(colNumber < 4){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hero.move(rowNumber, colNumber);
        // Colsion detection with apple
        if (hero.x < apple.x + apple.scaleWidth &&
            hero.x + hero.scaleWidth > apple.x &&
            hero.y < apple.y + apple.scaleHeight &&
            hero.y + hero.scaleHeight > apple.y){
                score++;
                points.innerHTML = score;
                apple.randomisePosition();
                apple.draw()
            }else apple.draw();
        colNumber++;
    }else{
        colNumber = 0;
        updateGame(rowNumber);
    }

    if(lastKeyNumbers.length > 2) lastKeyNumbers.shift();
}

heroImg.onload = () => {
    hero.draw(0, 0);

    window.addEventListener('keydown', e => {
        switch (e.keyCode) {
            case 37:    //ArrowLeft
                isPressedLeft = true;           
                break;
            case 38:    //ArrowUp
                isPressedUp = true;    
                break;
            case 39:    //ArrowRight
                isPressedRight = true;
                break;
            case 40:    //ArrowDown
                isPressedDown = true;
                break;
        }
    })

    window.addEventListener('keyup', e => {
        switch (e.keyCode) {
            case 37:    //ArrowLeft
                isPressedLeft = false;           
                break;
            case 38:    //ArrowUp
                isPressedUp = false;    
                break;
            case 39:    //ArrowRight
                isPressedRight = false;
                break;
            case 40:    //ArrowDown
                isPressedDown = false;
                break;
        }
    })
}

setInterval(() => {
    if (isPressedLeft) updateGame(2);
    else if (isPressedUp) updateGame(1);
    else if (isPressedRight) updateGame(3);
    else if (isPressedDown) updateGame(0);
}, 50);

appleImg.onload = () =>{
    apple.randomisePosition();
    apple.draw();
}