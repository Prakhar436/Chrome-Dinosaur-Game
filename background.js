let newHillTime;
let hillNumber;
let Style;
let screen = document.getElementById("world");
const HILL_INTERVAL_MIN = 5000
const HILL_INTERVAL_MAX = 9000
const HILL_SPEED = window.innerWidth>window.innerHeight ? 0.006 : 0.018;

export function setUpHill() {
    newHillTime = HILL_INTERVAL_MIN
    document.querySelectorAll("[data-mount]").forEach((hill)=>{
        hill.remove();
    });
    if(document.getElementById('mount')==null){
        console.log('reached here, creating element')
        const mount =  document.createElement("img");
        mount.dataset.hill = true;
        
        mount.src = 'assets/background/mount4.png';
        mount.classList.add('mount');
        console.log("created element: ", mount);
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
    hillNumber = random123();
    hill.src = `assets/background/mount${hillNumber}.png`;
    hill.style.setProperty("opacity","1");
    hill.classList.add('newMount');
    screen.append(hill);
    // console.log('creating a cactus');

}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function random123() {
    const randomDecimal = Math.random();
    // Scale the random decimal from range [0,1] to [0,3] by multiplying it by 3
    // You can use Math.floor or Math.ceil to ensure integers if needed
    const randomNumber = Math.floor(randomDecimal * 3) + 1;
    return randomNumber;
}