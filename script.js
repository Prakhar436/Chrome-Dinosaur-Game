import { DNS } from "./day-night-cycle.js";
import { moveGround } from "./ground.js";
import { setUpDino, dinoRun, getDinoRect, setDinoStop } from "./dino.js";
import { setUpCactus, cactusMove, getCactusRects } from "./cactus.js";
import { setUpGround } from "./ground.js";
import { setUpHill, hillMove } from "./background.js";
import { bgMusic } from "./audio.js";
import { switchText, animateSpaceTxt } from "./interface.js";
// console.log(getComputedStyle(document.querySelector(".ground")).getPropertyValue("height"));

// let spaceButton3d = document.querySelector(".space");

let speedScale;
let currentScore;
let SPEED_UP_FACTOR = 0.00001;
var startScreenElem;
let score;
let hiScoreFlag; // determines if a new hi-score is achieved or not. Used with start-screen element.
let container = document.getElementById("world");
const hiScoreElem = document.querySelector("[data-hiscore]");


let isSpacePressed = (event) => {
    console.log('space pressed to start game')
    if (event.key === ' ') {
        animateSpaceTxt();
        gameStart();
    }
}

document.addEventListener('keydown',isSpacePressed);

let lastTime;
function update(time) {
    if (lastTime == null) {
        lastTime = time;
        // console.log(lastTime);
        window.requestAnimationFrame(update);
        return;
    }
    const delta = time - lastTime;
    switchText(1);
    moveGround(delta, speedScale);
    dinoRun(delta, speedScale);
    cactusMove(delta, speedScale);
    hillMove(delta, speedScale);
    updateScore(delta);
    speedUp(delta);
    DNS();
    if (CollisionCheck())
        return gameStop(); // return statement ensures that requestAnimationFrame returns and is not called again
    lastTime = time;
    window.requestAnimationFrame(update);

}

function gameStart() {
    document.removeEventListener("keydown",isSpacePressed);
    if(startScreenElem){ // remove the "restart" msg div, if present
        startScreenElem.parentNode.removeChild(startScreenElem);
    }
    speedScale = 1;
    hiScoreFlag = false;
    setUpGround();
    setUpDino();
    setUpCactus();
    setUpHill();
    setUpScore();
    if(bgMusic.playing() == false) {
        bgMusic.play();
        bgMusic.fade(0, 0.5, 2000);
    }
    window.requestAnimationFrame(update);
}

function CollisionCheck() {
    let collision = false; 
    const dinoRect = getDinoRect();
    const cactusRect = getCactusRects();
    // console.log('dino', dinoRect,"cactus:",cactusRect);
    if(cactusRect == null){ // meaning there is no cactus in vicinity
        // console.log("whoops gotta return");
        return false;
    }
    // console.log("checking for collision");
    dinoRect.forEach(dinoTracker => {  // for each dinotracker check collision
        if(cactusRect.some((cactusTracker)=> isColliding(cactusTracker, dinoTracker))) // if any cactusTracker is colliding with this dinoTracker
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
    setDinoStop();//changes the dino image to the losing one
    refreshHiScore();
    switchText(2);
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


}

function speedUp(delta) {
    speedScale += delta * SPEED_UP_FACTOR;
}

