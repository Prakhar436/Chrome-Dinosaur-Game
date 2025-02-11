import { SPEED_FACTOR } from "./ground.js"; // imported from ground js to maintain same speed of ground and hurdle. It is selected according to device orientation
let newHurdleTime;
let Style;
let num;
let screen = document.getElementById("world");
let FORTY_PERCENT;
let max_hurdle_number;
let currentStage;
let currentHitboxes;
let currentHurdleSizes;
const HURDLE_INTERVAL_MIN = 1000
const HURDLE_INTERVAL_MAX = 2000
// console.log(container.offsetWidth*.01);

export function setUpHurdle(stage_name, hurdle_count, hurdle_sizes, hitboxes) {
    console.log('inside setUpHurdle', 'hitboxes:', hitboxes);
    max_hurdle_number = hurdle_count;
    currentStage = stage_name;
    currentHurdleSizes = hurdle_sizes;
    currentHitboxes = hitboxes;
    newHurdleTime = HURDLE_INTERVAL_MIN
    FORTY_PERCENT = screen.offsetWidth*0.4;  // we need the pixel value of 40% of the screen width, to check if hurdle is in vicinity or not
    document.querySelectorAll("[data-hurdle]").forEach( (hurdle)=>{
        hurdle.remove();
        // console.log("hurdle removed", hurdle)
    })
}

export function hurdleMove(delta, speedScale) {
    document.querySelectorAll("[data-hurdle]").forEach((hurdle) => {
        Style = parseFloat(getComputedStyle(hurdle).getPropertyValue("--right")) || 0;
        Style = Style + delta  * speedScale *SPEED_FACTOR;
        hurdle.style.setProperty('--right',`${Style}`);
        if(Style>=100){
            hurdle.remove();
            }
    })
    if (newHurdleTime <= 0) { 
        createHurdle()
        newHurdleTime = randomNumberBetween(HURDLE_INTERVAL_MIN, HURDLE_INTERVAL_MAX) / speedScale
    }
    newHurdleTime -= delta
}


export function getHurdleRects() {
    let rectArray = null; // declared using 'let' because it should contain the rects, so it would need to be changed later
    document.querySelectorAll("[data-hurdle]").forEach((hurdle)=>{
        if(hurdle.getBoundingClientRect().left<= FORTY_PERCENT){
            const trackers = hurdle.querySelectorAll("[data-hitbox]"); // get all trackers within this particular hurdle
            rectArray = [...trackers].map(tracker => tracker.getBoundingClientRect()); // get trackers' rects
            //didn't return rectArray right here because 'return' inside the forEach loop only returns from the callback arrow function
        }
    });
    return rectArray; // if no hurdle in vicinity, just return null
  }

  function createHurdle() {    
    console.log('inside createHurdle');
    let hurdleNum = randomNumberBetween(1, max_hurdle_number); //decides which hurdle Img to select
    console.log('hurdleNum:', hurdleNum);
    const hurdle = document.createElement("div"); // creating a container for the hurdle and its trackers
    let [width, height] = currentHurdleSizes[`hurdle_${hurdleNum}`];
    console.log('width:', width, 'height:', height);
    let hitboxesData = currentHitboxes[`hurdle_${hurdleNum}`]; // get the hitboxes data for the selected hurdle
    let trackersHTML = hitboxesData.map((box, index) => {
        return `<div class="hurdleTracker" data-hitbox="true" style="top:${box[0]}%; left: ${box[1]}%; width:${box[2]}%; height:${box[3]}%;">
   </div>`;}).join('');
   hurdle.innerHTML = `<img src="assets/stage/${currentStage}/hurdles/hurdle_${hurdleNum}.png" class = "hurdle" style="width:${width}%; height:${height}%;" alt="">${trackersHTML}`;

    hurdle.dataset.hurdle = true;
    hurdle.classList.add('hurdleContainer');
    screen.append(hurdle);
    // console.log("Hello there, hurdle added to screen:",hurdle)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
