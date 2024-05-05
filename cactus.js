import { SPEED_FACTOR } from "./ground.js"; // imported from ground js to maintain same speed of ground and cactus. It is selected according to device orientation
let newCactusTime;
let Style;
let num;
let screen = document.getElementById("world");
let FORTY_PERCENT;
const CACTUS_INTERVAL_MIN = 1000
const CACTUS_INTERVAL_MAX = 2000
// console.log(container.offsetWidth*.01);

export function setUpCactus() {
    newCactusTime = CACTUS_INTERVAL_MIN
    FORTY_PERCENT = screen.offsetWidth*0.4;  // we need the pixel value of 40% of the screen width, to check if cactus is in vicinity or not
    document.querySelectorAll("[data-cactus]").forEach( (cactus)=>{
        cactus.remove();
        console.log("cactus removed", cactus)
    })
}

export function cactusMove(delta, speedScale) {
    document.querySelectorAll("[data-cactus]").forEach((cactus) => {
        Style = parseFloat(getComputedStyle(cactus).getPropertyValue("--right")) || 0;
        Style = Style + delta  * speedScale *SPEED_FACTOR;
        cactus.style.setProperty('--right',`${Style}`);
        if(Style>=100){
            console.log(parseFloat(getComputedStyle(cactus).getPropertyValue("--right")), "whoops, ended");
            cactus.remove();
            }
    })
    if (newCactusTime <= 0) { 
        createCactus()
        newCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
    }
    newCactusTime -= delta
}


export function getCactusRects() {
    let rectArray = null; // declared using 'let' because it should contain the rects, so it would need to be changed later
    document.querySelectorAll("[data-cactus]").forEach((cactus)=>{
        if(cactus.getBoundingClientRect().left<= FORTY_PERCENT){
            const trackers = cactus.querySelectorAll("[data-cactusTracker]"); // get all trackers within this particular cactus
            rectArray = [...trackers].map(tracker => tracker.getBoundingClientRect()); // get trackers' rects
            //didn't return rectArray right here because 'return' inside the forEach loop only returns from the callback arrow function
        }
    });
    return rectArray; // if no cactus in vicinity, just return null
  }

  function createCactus() {
    let cactusNum = random1or2(); //decides which catus Img to select
    const cactus = document.createElement("div"); // creating a container for the cactus and its trackers
    if(cactusNum==1){
        cactus.innerHTML = `<img src="assets/obstacles/cactus${cactusNum}.png" class = "cactus" alt=""><div class="cactus${cactusNum}Tracker1"     data-cactusTracker = true></div><div class="cactus${cactusNum}Tracker2" data-cactusTracker = true></div>`;
    }
    else{
        cactus.innerHTML = `<img src="assets/obstacles/cactus${cactusNum}.png" class = "cactus" alt=""><div class="cactus${cactusNum}Tracker1"     data-cactusTracker = true></div><div class="cactus${cactusNum}Tracker2" data-cactusTracker = true></div><div class="cactus${cactusNum}Tracker3" data-cactusTracker = true></div>`;
    }
    cactus.dataset.cactus = true;
    num = random1or2(); // returns 1 or 2 randomly
    cactus.classList.add('cactusContainer');
    screen.append(cactus);
    // console.log("Hello there, cactus added to screen:",cactus)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function random1or2() {
    return Math.round(Math.random())+1; 
}