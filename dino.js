import { dinoSFX } from "./audio.js";
import { animateSpaceTxt } from "./interface.js";
let dino = document.getElementById('dino');
// let dinoImg = document.getElementById('dinoImg');

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const dinoImg = new Image();
dinoImg.src = 'assets/dino/spritesheet.png'; // Update this to your spritesheet path
let spriteWidth, spriteHeight;
dinoImg.onload = () => {
    spriteWidth = dinoImg.width/3; //width of one sprite = width of spriteSheet / no. of sprites in one row
    spriteHeight = dinoImg.height; // height of one sprite = height of spriteSheet / no. of sprites in one column (there's only one column in this spritesheet)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(dinoImg, 0, 0,spriteWidth, spriteHeight, 0 , 0, canvas.width, canvas.height);
    console.log(dinoImg.src);
    console.log(`Image dimensions: ${dinoImg.width}x${dinoImg.height}`);
    console.log('dino loaded')
}; 


const JUMP_SPEED = window.innerWidth>=window.innerHeight? 0.90: 0.80;
const GRAVITY = 0.0025;
let isJumping;
let yVelocity;
let currentFrameTime;
let dinoFrame;
let translateY;
let height;
const FRAMETIME = 100; //This is the time taken to change the dinoRun frames. The running animation will change frames every 100 milliseconds

export function setUpDino() {
    isJumping = false;
    yVelocity = 0;
    currentFrameTime = 0;
    dinoFrame=0;
    // jumpAudio = new Audio("./audio/sfx/dinoJump2.mp3");
    document.removeEventListener("keydown", onJump);
    dino.style.transform = `translateY(0)`;
    document.addEventListener("keydown", onJump); //remove and set up an event listener that will listen for spacebar presses throughout the game
}
function onJump(e) {
    if (e.code !== "Space" || isJumping) return
    e.preventDefault();
    yVelocity = JUMP_SPEED;
    translateY = 0;
    isJumping = true;
    height=0;
    dinoSFX.jump.play();
    animateSpaceTxt();
}

export function dinoRun(delta, speedScale) {
    run(delta, speedScale);
    jump(delta);
}

export function getDinoRect() {
    let dinoTrackers = document.querySelectorAll("[data-dinoTracker]")
    const rectArray = [...dinoTrackers].map(tracker => tracker.getBoundingClientRect());
    // console.log(rectArray);
    return rectArray;
    
}

function run(delta, speedScale) {
    if (isJumping) {
        // console.log("ITS JUMPING TIME!!!")
        dinoImg.onerror = function() {
            console.error('Noooooooooo Failed to load image at: ' + this.src);
        };
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(dinoImg, 0, 0,spriteWidth, spriteHeight, 0 , 0, canvas.width, canvas.height);
        return;
    }
    if(currentFrameTime>=FRAMETIME){
        dinoFrame = (dinoFrame%2)+1;
        // console.log("ITS THE TIME TO CHANGE THE DINOFRAME ")
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(dinoImg, dinoFrame*spriteWidth, 0,spriteWidth, spriteHeight, 0 , 0, canvas.width, canvas.height);
        dinoImg.onerror = function() {
            console.error('Noooooooooo Failed to load image at: ' + this.src);
        };
        currentFrameTime-=FRAMETIME;
    }
    currentFrameTime+=delta * speedScale;
}


function jump(delta) {
    if (!isJumping){
         return;
        }
    dino.style.transform = `translateY(-${translateY + (yVelocity * delta)}px`;
    translateY = translateY + (yVelocity * delta);
    if (translateY <= 0) {
        console.log("jump height is",height,"px");
        dino.style.transform = `translateY(0)`;
        isJumping = false;
    }
    yVelocity -= (GRAVITY * delta);
    
}

export function setDinoStop() {
    dinoSFX.stop.play(); 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(dinoImg, 0, 0,spriteWidth, spriteHeight, 0 , 0, canvas.width, canvas.height);
}
