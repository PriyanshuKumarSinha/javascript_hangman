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
        starter();
    }
)

function manageWidth(){
    div.style.width = canvas.width;
    div.style.marginTop = `${canvas.height / 4}px`;
    // div.style.margin = 'auto';

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
    drawRib(0,up);
    drawHead(0,up);
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
    starter(0,0,0,10);
    stage1(10);
    message();
}

function message(){
    c.beginPath();
    c.rect(150, 135, 70, 40)
    c.fillStyle = 'rgb(255, 196, 4)'
    c.fill();
    c.lineWidth = 2;
    c.stroke();

    c.font = 'bold 20px Arial'
    c.fillStyle = 'red'
    c.fillText("HELP!" ,155,163)
}

function stage3(){
    alive(20);
    stage1(20);
    animation();
}

function stage4(){
    isDead = true;
    animation2(isDead);
}

function stage5(isDead){
    isDead = false;
    callanimation2(isDead);
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
function callanimation2(){
    var isDead = isDead
    animation2(isDead)
}
async function animation2(isDead=true){
    await sleep(200);
    console.log(isDead)
    if (isDead === true){
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
        window.requestAnimationFrame(callanimation2);
    }
    else{
        isDead = false;
        window.cancelAnimationFrame(window.requestAnimationFrame(animation2));
    }
}
function starter(shiftX1 = 0,shiftX2 = 0, shiftY=0, up = 0){
    alive(up);
    drawHands(shiftX1, shiftX2, shiftY,up);
}



//divSideProgramming
var chancesLeft = 5;

var words = {
    'word': 'your hint here',
    'another word' : 'your other hint here',
}

var divHint = div.querySelector('.hint');
var divWord = div.querySelector('.guessed-word');

var randomWord = Object.keys(words)[Math.floor(Math.random()*(Object.keys(words)).length)];
divHint.innerHTML = `('${words[randomWord]}')`;

divWord.innerHTML = '';

for (let i = 0; i<randomWord.length; i++){
    if (randomWord[i]===' '){
        divWord.innerHTML += '&nbsp;&nbsp;';
    }
    divWord.innerHTML += ' ';
    divWord.innerHTML += `<span id='letter${i}'>${randomWord[i].toUpperCase()}</span>`;
    document.querySelectorAll('span')[i].style.color = 'white';
    document.querySelectorAll('span')[i].style.textDecoration = 'underline';
    document.querySelectorAll('span')[i].style.textDecorationColor = 'black';
}



function find(letter){
    if ((divWord.innerText).indexOf(letter) !== -1){
        let j=0;
        for (let i=0; i < (divWord.innerText).length; i=i+2){
            if (divWord.innerText[i]===letter){
                document.querySelectorAll('span')[j].style.color = 'black'
            }
            j++;
        }
    }
    else{
        chancesLeft--;
    }
}
chances();

var alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
function createButtons(className,value = '', func = 'fun(this.id)' ){
    var button = document.createElement('button');

    button.setAttribute('class',`btn btn-lg ${className}`);
    button.setAttribute('id', `${value}`);
    button.setAttribute('onclick',func);
    
    button.innerHTML = `<b> <span>${value}</span> </b>`;
    
    var calcBody = document.querySelector('.input');
    calcBody.appendChild(button);

}

for (let i = 0; i < alphabets.length; i++){
    createButtons('button1', alphabets[i], 'fun(this.id)')
}

function fun(buttonValue){
    find(buttonValue)
    chances(chancesLeft)

}


function chances(chancesLeft){
    switch (chancesLeft) {
        case 4:
            stage1();
            break;
        case 3:
            stage2();
            break;
        case 2:
            stage3();
            break;
        case 1:
            stage4();
            break;
        case 0:
            stage5(isDead);
            break;
        default:
            // starter function   
            stand();
            starter();
            break;
    }
}