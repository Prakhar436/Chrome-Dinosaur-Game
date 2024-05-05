import { dinoSFX } from "./audio.js";
import { animateSpaceTxt } from "./interface.js";
let dino = document.getElementById('dino');
let dinoImg = document.getElementById('dinoImg');


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
        dinoImg.src=`assets/dino/YellowDino.png`;
        return;
    }
    if(currentFrameTime>=FRAMETIME){
        dinoFrame = (dinoFrame+1)%2;
        dinoImg.src=`assets/dino/YellowDinoRun-${dinoFrame}.png`;
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
    dinoImg.src=`assets/dino/YellowDino.png`;   
}
