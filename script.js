import { DNS } from "./day-night-cycle.js";
import { Dino } from "./dino.js";
import { getHurdleRects } from "./hurdle.js";
import { switchText, animateSpaceTxt, toggleAccordion, updateAccordionAccess } from "./interface.js";
import { EventEmitter } from "./eventEmitter.js";
import { Stage } from "./stageSelector.js";

// let spaceButton3d = document.querySelector(".space");

let speedScale;
let gameState;
let currentScore;
let SPEED_UP_FACTOR = 0.00001;
var startScreenElem;
let score;
let hiScoreFlag; // determines if a new hi-score is achieved or not. Used with start-screen element.
let container = document.getElementById("world");
let canvas;
let dinosaur;
let stage;
const hiScoreElem = document.querySelector("[data-hiscore]");
const GAME_STATES = ["Ready", "Running", "Over"];

export const eventBus = new EventEmitter();

eventBus.on('dinoModelChange', (model_name) =>{
    //assign the dinosaur variable to a new Dino object
    dinosaur = new Dino(canvas, model_name);
    setUpGame(); // bring the game back to Ready state
    cancelAnimationFrame(idleAnimationId); // stop the 'Over' state animations (since it does not include dino idle animations)
    runIdleAnimations('idle'); // play ready state animations
});
eventBus.on('stageChange', (stage_name) =>{
    stage = new Stage(stage_name);
    setUpGame(); // bring the game back to Ready state
    cancelAnimationFrame(idleAnimationId); // stop the 'Over' state animations (since it does not include dino idle animations)
    runIdleAnimations('idle'); // play ready state animations
});

eventBus.on('loadingStarted', (stage_name) => {
    document.querySelector(".game-window-loader").classList.add("active");
});
eventBus.on('loadingFinished', () => {
    document.querySelector(".game-window-loader").classList.remove("active");
}); 

//-------------Interface event listeners -------------
document.querySelector(".accordion").addEventListener("click", toggleAccordion);

//-------------Interface event listeners END-------------


//---------------preloader---------------

// use the promise from audio.js to check if audio is loaded, before adding the event listener
// also load hurdle images
// function preloadImage(url) {
//     return new Promise((resolve, reject) => {
//         const img = new Image();
//         img.onload = () => resolve(url);
//         img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
//         img.src = url;
//     });
// }
// const imageUrls = [
//     'assets/stage/scorched_dunes/hurdles/hurdle_1.png',
//     'assets/stage/scorched_dunes/hurdles/hurdle_2.png',
//     'assets/stage/scorched_dunes/background/mount_1.png',
//     'assets/stage/scorched_dunes/background/mount_2.png',
//     'assets/stage/scorched_dunes/background/mount_3.png'
// ];

// const preloadPromises = imageUrls.map(preloadImage);
// Promise.all(preloadPromises).then(() => { 
//     document.querySelector('.loaderBody').style.display = "none";
// }).catch((err) => {
//     console.error(err);
// });

// --------------------preloader END--------------------


//--------------Idle Animations----------------
let idleAnimationId; // to store the requestAnimationFrame id for idle animations (this is needed to stop the idle animations when game starts)
let runIdleAnimations = (animation) => {
    dinosaur.standby(animation);
    DNS();
    idleAnimationId = requestAnimationFrame(() => runIdleAnimations(animation));
}
//--------------Idle Animations END----------------



window.addEventListener('load', ()=> {
    document.querySelector('.loaderBody').style.display = "none";
    document.addEventListener('keydown',isSpacePressed);
    canvas = document.querySelector('canvas'); // get canvas element and put it in the global variable
    setUpGame(); // ready up the game
    runIdleAnimations('idle'); // play idle animations in ready (idle) state
});

function setUpGame(){
    if(startScreenElem){ // remove the "restart" msg div, if present
        startScreenElem.parentNode.removeChild(startScreenElem); // remove startScreenElem from the DOM
        startScreenElem = null; // set it to null to remove the reference still present in it
    }
    if(dinosaur == null){ // if setting up for the first time, create a Dino object
        dinosaur = new Dino(canvas);
    }
    if(stage == null){ // if setting up for the first time, create a Stage object
        stage = new Stage();
    }
    speedScale = 1;
    hiScoreFlag = false;
    dinosaur.setUpDino();
    stage.setUpStage();
    setUpScore();
    gameState = GAME_STATES[0]; // Ready state
    eventBus.emit('gameStateChange', gameState);
}

let isSpacePressed = (event) => {
    if (event.key === ' ') {
        event.preventDefault();
        cancelAnimationFrame(idleAnimationId); // stop the idle animations when game starts
        animateSpaceTxt();
        gameStart();
    }
}
function gameStart() {
    document.removeEventListener("keydown",isSpacePressed); 
    if(gameState != "Ready"){
        setUpGame();
    }
    // if(bgMusic.playing() == false) { // start the background music
    //     bgMusic.play();
    //     bgMusic.fade(0, 0.5, 2000);
    // }
    gameState = GAME_STATES[1]; // Running state
    eventBus.emit('gameStateChange', gameState);
    updateAccordionAccess(false); // disable access to accordion
    window.requestAnimationFrame(update);
}
let lastTime;
let updateId; // id of the requestAnimationFrame, needed to cancel the animation
function update(time) {
    if (lastTime == null) {
        lastTime = time;
        updateId = window.requestAnimationFrame(update);
        return;
    }
    const delta = time - lastTime;
    switchText(1);
    dinosaur.dinoRun(delta, speedScale);
    stage.moveStage(delta, speedScale);
    // hillMove(delta, speedScale);
    updateScore(delta);
    speedUp(delta);
    DNS();
    if (CollisionCheck())
        return gameStop(); // return statement ensures that requestAnimationFrame returns and is not called again
    lastTime = time;
    updateId = window.requestAnimationFrame(update);

}

function CollisionCheck() {
    let collision = false; 
    const dinoRect = dinosaur.getDinoRect();
    const hurdleRect = getHurdleRects();
    if(hurdleRect == null){ // meaning there is no hurdle in vicinity
        return false;
    }
    dinoRect.forEach(dinoTracker => {  // for each dinotracker check collision
        if(hurdleRect.some((hurdleTracker)=> isColliding(hurdleTracker, dinoTracker))) // if any hurdleTracker is colliding with this dinoTracker
            collision = true;
    });
    return collision; // if no collision return false
}

function isColliding(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top)
}

function setUpScore() {
    score = 0;
    if(!currentScore){
    currentScore = document.createElement("div");
    currentScore.dataset.score = true;
    document.querySelector(".score").appendChild(currentScore);
    }
    currentScore.textContent = "Current: 0"; 
}

function updateScore(delta) {
    score += delta * 0.005
    currentScore.textContent = "Current: " + Math.floor(score)
  }
function refreshHiScore() {
    let prevHiScore = hiScoreElem.textContent.substring(4);
    if(Math.floor(score) > prevHiScore){
        hiScoreElem.textContent = "Hi: " + Math.floor(score);
        hiScoreFlag = true; // tells the start-screen elem to show the new hi-score message
    }
}

function gameStop() {
    dinosaur.setDinoStop();//changes the dino image to the losing one
    cancelAnimationFrame(updateId); // stop the game loop
    runIdleAnimations('stop');
    refreshHiScore();
    switchText(2);
    updateAccordionAccess(true); // enable access to accordion
    lastTime = null; // if lastTime is not made null on gameStop(), the n delta can be huge when game restarts, causing unwanted effects!
    // spaceButton3d.classList.remove("pressed");
    setTimeout(() => {
        document.addEventListener("keydown", isSpacePressed);
        startScreenElem = document.createElement('div'); // create the "restart" msg div
        startScreenElem.className = "start-screen";
        let restartMsg = document.createElement('div');
        restartMsg.textContent = "Press Space To Restart";
        startScreenElem.appendChild(restartMsg);
        if(hiScoreFlag){ // if new hi-score is achieved, show hi-score message too:
            let newHiScore = document.createElement('div');
            newHiScore.textContent = "New hi-score: " + `${Math.floor(score)}`;
            startScreenElem.appendChild(newHiScore);
        }
        container.appendChild(startScreenElem);

    }, 100);
    gameState = GAME_STATES[2]; // Over state
    eventBus.emit('gameStateChange', gameState);
}

function speedUp(delta) {
    speedScale += delta * SPEED_UP_FACTOR;
}

