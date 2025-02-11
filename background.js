let newHillTime;
let hillNumber;
let MAX_HILL_NUMBER;
let STAGE_NAME;
let Style;
let screen = document.getElementById("world");
const HILL_INTERVAL_MIN = 5000
const HILL_INTERVAL_MAX = 9000
const HILL_SPEED = window.innerWidth>window.innerHeight ? 0.006 : 0.018;

export function setUpHill(stage_name, default_hill, hill_count) {
    newHillTime = HILL_INTERVAL_MIN
    STAGE_NAME = stage_name; // store the value of stage name in a global variable
    MAX_HILL_NUMBER = hill_count; // store the value of object count in a global variable
    document.querySelectorAll("[data-mount]").forEach((hill)=>{ // selects only dynamically created hills
        hill.remove();
    });
    const defaultHill = document.getElementById('mount'); // select the default HTML hill
    if(defaultHill && defaultHill.src !== `assets/stage/${STAGE_NAME}/background/${default_hill}`){ // if avaialble but not updated, update it
        defaultHill.src = `assets/stage/${STAGE_NAME}/background/${default_hill}`;
    }
    else if(!defaultHill){ // if removed during the previous run, recreate it
        const mount =  document.createElement("img");
        mount.dataset.hill = true;
        mount.style.height = 'initial';
        mount.src = `assets/stage/${STAGE_NAME}/background/${default_hill}`;
        mount.classList.add('mount');
        mount.id = 'mount';
        screen.append(mount);
        // console.log("created element: ", mount);
    }
}

export function hillMove(delta, speedScale) {
    document.querySelectorAll("[data-hill]").forEach((hill) => {
        Style = parseFloat(getComputedStyle(hill).getPropertyValue("--right")) || 0;
        Style = Style + delta  * speedScale * HILL_SPEED;
        hill.style.setProperty('--right',`${Style}`);
        if(Style>=100){
            hill.remove();
            }
    })
    if (newHillTime <= 0) {
        createHill()
        newHillTime = randomNumberBetween(HILL_INTERVAL_MIN, HILL_INTERVAL_MAX) / speedScale
    }
    newHillTime -= delta
}

function createHill() {
    const hill = document.createElement("img");
    hill.classList.add("mount");
    hill.dataset.hill = true; // used to move every hill during hillMove() operation
    hill.dataset.mount = true;//used to remove js hills but not html hill during setupHill() operation
    hillNumber = randomNumberBetween(1, MAX_HILL_NUMBER);
    console.log('creating a hill with address:', `assets/stage/${STAGE_NAME}/background/mount_${hillNumber}.png`);
    hill.src = `assets/stage/${STAGE_NAME}/background/mount_${hillNumber}.png`;
    hill.style.setProperty("opacity","1");
    hill.classList.add('newMount');
    screen.append(hill);
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
