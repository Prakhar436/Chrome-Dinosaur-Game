let newHillTime;
let hillNumber;
let MAX_HILL_NUMBER;
let STAGE_NAME;
let Style;
let screen = document.getElementById("world");
const hillPool = []; // asset pool for hills
let POOL_SIZE;
const HILL_INTERVAL_MIN = 5000
const HILL_INTERVAL_MAX = 9000
const HILL_SPEED = window.innerWidth > window.innerHeight ? 0.006 : 0.018;

export function setUpHill(stage_name, default_hill, hill_count) {
    newHillTime = HILL_INTERVAL_MIN
    STAGE_NAME = stage_name; // store the value of stage name in a global variable
    MAX_HILL_NUMBER = hill_count; // store the value of object count in a global variable
    POOL_SIZE = 2 * hill_count; // set the pool size to twice the number of objects
    document.querySelectorAll("[data-mount]").forEach((hill) => { // selects only dynamically created hills
        hill.remove();
    });
    const defaultHill = document.getElementById('default_mount'); // select the default HTML hill
    if (defaultHill && defaultHill.src !== `assets/stage/${STAGE_NAME}/background/${default_hill}`) { // if avaialble but not updated, update it
        defaultHill.src = `assets/stage/${STAGE_NAME}/background/${default_hill}`;
    }
    else if (!defaultHill) { // if removed during the previous run, recreate it
        const mount = document.createElement("img");
        mount.dataset.movable = true;
        mount.style.height = 'initial';
        mount.src = `assets/stage/${STAGE_NAME}/background/${default_hill}`;
        mount.classList.add('mount');
        mount.id = 'default_mount';
        screen.append(mount);
        // console.log("created element: ", mount);
    }
    hillPool.length = 0;  // reset pool
    return populateHillPool(); // fill the pool with assets (this function returns a Promise, so return that Promise to setUpStage())
}

export function hillMove(delta, speedScale) {
    document.querySelectorAll('[data-movable = "true"]').forEach((hill) => {
        Style = parseFloat(getComputedStyle(hill).getPropertyValue("--right")) || 0;
        Style = Style + delta * speedScale * HILL_SPEED;
        hill.style.setProperty('--right', `${Style}`);
        if (Style >= 100) {
            if (hill.id === 'default_mount')
                hill.remove(); // remove the default hill
            else
                releaseHill(hill); // put back into the asset pool
        }
    })
    if (newHillTime <= 0) {
        reserveHill(); // reserve a hill from the pool
        newHillTime = randomNumberBetween(HILL_INTERVAL_MIN, HILL_INTERVAL_MAX) / speedScale
    }
    newHillTime -= delta
}

function populateHillPool() {
    return new Promise((resolve) => {
        let loadedHills = 0;
        for (let i = 0; i < POOL_SIZE; i++) {
            const hill = document.createElement("img");
            hill.classList.add("mount");
            hill.dataset.mount = true;//used to remove js hills but not html hill during setupHill() operation
            hillNumber = Math.floor(i / 2) + 1;
            hill.src = `assets/stage/${STAGE_NAME}/background/mount_${hillNumber}.png`;
            hill.style.setProperty("opacity", "1");
            hill.classList.add('newMount');
            hill.onload = () => { // add onload event handler to the hill
                loadedHills++;
                if (loadedHills === POOL_SIZE) {
                    resolve(); // resolve the promise when all hills are loaded
                }
            }
            hillPool.push(hill);
            screen.append(hill);
        }
    });
}
function reserveHill() { // reserve a hill from the pool to use 
    if (hillPool.length === 0)
        return;
    const randomIndex = randomNumberBetween(0, hillPool.length - 1);
    const hill = hillPool.splice(randomIndex, 1)[0]; // remove from pool
    hill.dataset.movable = true; // used to select every reserved hill (and default hill) during hillMove() operation   

}

function releaseHill(hill) {
    hill.style.setProperty('--right', '-25');
    hill.dataset.movable = false; // set to false to disable selection during hillMove() 
    hillPool.push(hill);
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
