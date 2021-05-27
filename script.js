var canvas = document.querySelector('canvas');
var div = document.querySelector('.keys');

canvas.width = window.innerWidth/2 ;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

manageWidth();

window.addEventListener('resize', 
    function(){
        canvas.width = window.innerWidth/2 ;
        canvas.height = window.innerHeight;
        manageWidth();
        alive();
    }
)

function manageWidth(){
    div.style.width = canvas.width;
}

var up = 0;
var standPosXMoveTo = [50,30,30];
var standPosXLineTo = [50,200,200];
var standPosYMoveTo = [100,350,125];
var standPosYLineTo = [350,350,125];

var width = 10;

function stand(){
    for (let i = 0; i<standPosXLineTo.length; i++){
        c.beginPath();
        c.moveTo(standPosXMoveTo[i],standPosYMoveTo[i])
        c.lineTo(standPosXLineTo[i],standPosYLineTo[i])
        c.lineWidth = width;
        c.stroke();
    }
}

function clearScreen(){
    c.clearRect(0,0,innerWidth, innerHeight);
}
// LIVE
function drawHands(shiftX1 = 0, shiftX2 = 0, shiftY = 0, up = 0){
    var shiftX = [shiftX1 , shiftX2]
    var handWidth = 8;
    var handPosX = [100, 150];
    for (let i = 0; i<standPosXLineTo.length; i++){
        c.beginPath();
        c.moveTo(125,225-up);
        c.lineTo(handPosX[i] - shiftX[i],275 - shiftY - up)
        c.lineWidth = handWidth;
        c.stroke();

    }
}


function drawLegs(shiftX1 = 0, shiftX2 = 0,up=0){
    var shiftX = [shiftX1 , shiftX2]
    var legWidth = 8;
    var legPosX = [100, 150];
    for (let i = 0; i<standPosXLineTo.length; i++){
        c.beginPath();
        c.moveTo(125,275-up);
        c.lineTo(legPosX[i] - shiftX[i],350-up)
        c.lineWidth = legWidth;
        c.stroke();
    }
}
function drawRib(upX=0, up = 0){
    c.beginPath();
    c.moveTo(125, 175-upX)
    c.lineTo(125, 275-up)
    c.lineWidth = 8;
    c.stroke();
}
function drawHead(shift=0, up =0){
    c.beginPath();
    c.arc(125-shift,200 + shift -up,25,0,Math.PI * 2 ,false)
    c.lineWidth = 8;
    c.fillStyle = 'white';
    c.fill();
    c.stroke();
}
function alive(up=0){
    clearScreen();
    stand();
    drawLegs(0,0,up);
    drawRib(up);
    drawHead(up);
}

function stage1(up=0){
    c.beginPath();
    c.moveTo(125, 125)
    c.lineTo(125, 175-up)
    c.lineWidth = 8;
    c.stroke();
}

function dead(up = 0){
    clearScreen();
    stand();
    // drawHands(-10,10, -5, up)
    drawLegs(-10, 10, up)
    drawRib(50,up);
    drawHead(25);
    isDead = true;
}

function stage2(){
    alive(10);
    stage1(10);
    message();
}

function message(){
    c.beginPath();
    c.rect(150, 135, 70, 40)
    // c.moveTo(125, 125)
    // c.lineTo(125, 275-up)
    c.fillStyle = 'rgb(255, 196, 4)'
    c.fill();
    c.lineWidth = 4;
    c.stroke();

    c.font = 'bold 20px Arial'
    c.fillStyle = 'red'
    c.fillText("HELP!" ,155,160)
}

function stage3(){
    alive(20);
    stage1(20);
    animation();
}

function stage4(){
    isDead = true;
    animation2()
}

function stage5(){
    isDead = false;
    animation2();
    console.log(isDead);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var isDead = false;

function animator(shiftX1, shiftX2, shiftY, up){
    starter(shiftX1, shiftX2, shiftY, up);
    stage1(up);
}

async function animation(){
    var up = 20;
    await sleep(200);
    if (!isDead){
        up = 20;
        animator(0,0,0,up);

        await sleep(200);
        clearScreen();

        up = 21;
        shiftX1 = 20;
        shiftX2 = -20;
        shiftY = 60;

        animator(shiftX1, shiftX2, shiftY, up);
        window.requestAnimationFrame(animation)
    }
    else{
        window.cancelAnimationFrame(window.requestAnimationFrame(animation));
        dead(up);
    }
}
function animatorDead(shiftX1 = 0,shiftX2 = shiftX1, shiftY=0, up = 0){
    dead(up);
    stage1(up);
    drawHands(shiftX1, shiftX2, shiftY,up=0)
}
async function animation2(){
    await sleep(200);
    if (isDead){
        up = 20;
        shiftX1 = -10;
        shiftX2 = 10;
        shiftY = -5;
        animatorDead(shiftX1, shiftX2, shiftY, up);
        
        await sleep(200);

        clearScreen();

        up = 20;
        shiftX1 = -5;
        shiftX2 = 5;
        shiftY = -5;
        animatorDead(shiftX1, shiftX2, shiftY, up);
        window.requestAnimationFrame(animation2);
    }
    else{
        isDead = false;
        window.cancelAnimationFrame(window.requestAnimationFrame(animation2));
    }
}
function starter(shiftX1 = 0,shiftX2 = shiftX1, shiftY=0, up = 0){
    alive(up);
    drawHands(shiftX1, shiftX2, shiftY,up=0);
}

// starter function   
stand();
starter();

// 5 chance
//1 --> rope stage1()
//2 --> up = 10 + message;
//3 --> alive() + animation();
//4 --> dead() + animation2();
//5 --> dead()