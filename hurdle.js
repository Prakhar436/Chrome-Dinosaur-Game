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
let hurdlePool = [];
let POOL_SIZE;
const HURDLE_INTERVAL_MIN = 1000
const HURDLE_INTERVAL_MAX = 2000


export function setUpHurdle(stage_name, hurdle_count, hurdle_sizes, hitboxes) {
    max_hurdle_number = hurdle_count;
    currentStage = stage_name;
    currentHurdleSizes = hurdle_sizes;
    currentHitboxes = hitboxes;
    POOL_SIZE = 2 * hurdle_count;
    hurdlePool.length = 0; // reset the pool
    newHurdleTime = HURDLE_INTERVAL_MIN
    FORTY_PERCENT = screen.offsetWidth * 0.4;  // we need the pixel value of 40% of the screen width, to check if hurdle is in vicinity or not
    document.querySelectorAll("[data-hurdle]").forEach((hurdle) => {
        hurdle.remove();
    })
    populateHurdlePool(); // fill the pool with assets
}

export function hurdleMove(delta, speedScale) {
    document.querySelectorAll('[data-hurdle = "true"]').forEach((hurdle) => {
        Style = parseFloat(getComputedStyle(hurdle).getPropertyValue("--right")) || 0;
        Style = Style + delta * speedScale * SPEED_FACTOR;
        hurdle.style.setProperty('--right', `${Style}`);
        if (Style >= 100) {
            releaseHurdle(hurdle); // push back into the asset pool
        }
    })
    if (newHurdleTime <= 0) {
        reserveHurdle(); // get new hurdle from pool
        newHurdleTime = randomNumberBetween(HURDLE_INTERVAL_MIN, HURDLE_INTERVAL_MAX) / speedScale
    }
    newHurdleTime -= delta
}


export function getHurdleRects() {
    let rectArray = null; // declared using 'let' because it should contain the rects, so it would need to be changed later
    document.querySelectorAll('[data-hurdle = "true"]').forEach((hurdle) => {
        if (hurdle.getBoundingClientRect().left <= FORTY_PERCENT) {
            const trackers = hurdle.querySelectorAll("[data-hitbox]"); // get all trackers within this particular hurdle
            rectArray = [...trackers].map(tracker => tracker.getBoundingClientRect()); // get trackers' rects
            //didn't return rectArray right here because 'return' inside the forEach loop only returns from the callback arrow function
        }
    });
    return rectArray; // if no hurdle in vicinity, just return null
}

function populateHurdlePool() {
    return new Promise((resolve) => {
        let loadedHurdles = 0;
        for (let i = 0; i < POOL_SIZE; i++) {
            let hurdleNum = Math.floor(i / 2) + 1;
            const hurdle = document.createElement("div"); // creating a container for the hurdle and its trackers
            let [width, height] = currentHurdleSizes[`hurdle_${hurdleNum}`];
            let hitboxesData = currentHitboxes[`hurdle_${hurdleNum}`]; // get the hitboxes data for the selected hurdle
            let trackersHTML = hitboxesData.map((box, index) => {
                return `<div class="hurdleTracker" data-hitbox="true" style="top:${box[0]}%; left: ${box[1]}%; width:${box[2]}%; height:${box[3]}%;">
   </div>`;
            }).join('');
            const img = new Image();
            img.src = `assets/stage/${currentStage}/hurdles/hurdle_${hurdleNum}.png`;
            img.classList.add('hurdle');
            img.style.width = `${width}%`;
            img.style.height = `${height}%`;
            img.onload = () => {// add onload event handler to img
                loadedHurdles++;
                if (loadedHurdles === POOL_SIZE) {
                    resolve(); // resolve the promise when all hurdles are loaded
                }
            }
            //hurdle.innerHTML = `<img src="" class = "hurdle" style="width:${width}%; height:${height}%;" alt="">${trackersHTML}`;
            hurdle.innerHTML = trackersHTML; // add trackers
            hurdle.appendChild  (img); // add hurdle image as a sibling to trackers 
            hurdle.classList.add('hurdleContainer');
            hurdlePool.push(hurdle);
            screen.append(hurdle);
        }
    });
}
function reserveHurdle() {
    if (hurdlePool.length === 0)
        return;
    const randomIndex = randomNumberBetween(0, hurdlePool.length - 1);
    console.log('randomIndex:', randomIndex);
    const hurdle = hurdlePool.splice(randomIndex, 1)[0]; // remove from pool
    hurdle.dataset.hurdle = true; // used to select every reserved hurdle during hurdleMove() operation   
}

function releaseHurdle(hurdle) {
    hurdle.style.setProperty('--right', '-10');
    hurdle.dataset.hurdle = false; // set to false to disable selection during hurdleMove() 
    hurdlePool.push(hurdle);
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
