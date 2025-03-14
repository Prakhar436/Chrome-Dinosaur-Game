import { eventBus } from "./eventEmitter.js";

let DNC_Settings = {
    is_animated: true,
    is_transitioning: false
}

let sun, moonLayer;
let updateFactor = 0.0005;
sun = document.getElementById('world');
moonLayer = document.getElementById("moonLayer");
let elemBrightness = document.documentElement; // selects root element containing css variable 'brightnessVal'
//giving hardcoded sun coordinates for when the game hasn't started:
let midday = " radial-gradient(circle at 679.0574902450696px 37.884068519100225px, white 0%,rgb(228, 239, 247,1) 3%, rgb(225, 240, 250,1) 5%, rgba(135, 206, 235, 1))";
let sunrise = "radial-gradient(circle at 679.0574902450696px 37.884068519100225px, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%)"
let night = `linear-gradient(to bottom, rgba(3, 3, 73,0)10%, rgba(7, 7, 92,0)30%, rgba(70, 2, 117,0) 65%, rgba(113, 1, 145,0) 90%)`;
let moon;
sun.style.background = `${night}, ${midday}, ${sunrise}`;
sun.style.backgroundSize = "contain"

let x,y;    //coordinate point for the sun
let x1,y1; // coordinate point for the moon
let CenterX = sun.offsetWidth / 2;
let CenterY = sun.offsetHeight + 10;
let a = (sun.offsetWidth/2 * 0.9); // semi major axis as half of major axis(which is the horizontal radius that occupies 80% of the play frame width)
let b = sun.offsetHeight * 0.9; //semi minor axis as half of minor axis(which is the vertical radius of the ellipse. Since semi minor axis is 80%, so minor axis is 160% of the frame height, which is why only half the ellipse is visible at any time)
let angle = Math.PI + 1.5;
// console.log(" hello there, coordinates are:",(CenterX + a * Math.cos(angle)),(CenterY + b * Math.sin(angle)));
let opacity = 1; // opacity for sunrise background
let opacity2 = 0; //opacity for night background
let lastPhase, currentPhase;
let updateFactorsData; 
eventBus.on('DNCModeChange', toggleAnimation);
eventBus.on('DNCTimeChange', setStaticTime);
eventBus.on('DNCPhaseChange', (phase) => setUpdateFactor(phase));

export function setUpDNC(stage_name, updateFactors){
    if(updateFactors != updateFactorsData){ // assign only if changed
        updateFactorsData = updateFactors;
    }
    return Promise.resolve(); // return resolved Promise (nothing to load)
}

export function DNC() {
    if (!DNC_Settings.is_animated && !DNC_Settings.is_transitioning) {
        return;
    }

    x = CenterX + a * Math.cos(angle);
    y = CenterY + b * Math.sin(angle);

    x1 = CenterX + a * Math.cos((angle + 2.67979) % (2 * Math.PI)); // moon will be at an angle difference of 153deg from the sun
    y1 = CenterY + b * Math.sin((angle + 2.67979) % (2 * Math.PI));

    if (angle >= Math.PI && angle <= 4.6416) {
        opacity = (angle - Math.PI) * 0.66; //max angle inc. = 1.5, max opacity inc = 1, so 1/1.5 = 0.66
    }
    else if (angle >= 5.2831 && angle <= 2 * Math.PI) {
        opacity = 1 - (angle - 5.2831);
    }
    else if (angle > 0 && angle < 1) {
        opacity2 = angle;
        moonLayer.style.opacity = opacity2;
        // elemBrightness.style.setProperty('--brightnessVal',1-opacity2/2); // brightness of elements varies with opacity2 and therefore, indirectly with the time of day
    }
    else if (angle > 2.1416 && angle < Math.PI) {
        opacity2 = Math.PI - angle;
        moonLayer.style.opacity = opacity2;
    }

    if (angle > 11 * Math.PI / 6 || angle < Math.PI / 6) { // targeting the time between sunset and complete midnight, it is tricky because angle after 2pi reverts back to 0, so we need two 'if' conditions to handle the angle
        if (11 * Math.PI / 6 <= angle && angle <= 2 * Math.PI) {
            elemBrightness.style.setProperty('--brightnessVal', (1 - ((angle - 11 * Math.PI / 6) * 0.4774))); // angle inc and brightness dec (hence the '1-' in the beginning, the rest just maps the range: [11pi/6, 2pi] of angle to: [0, 0.25] of brightness) 
        }
        else if (angle >= 0)
            elemBrightness.style.setProperty('--brightnessVal', (1 - ((Math.PI / 6 + angle) * 0.48)));// angle inc and brightness dec (hence the '1-' in the beginning, the rest just maps the range: [0, pi/6] of angle to: [0.25, 0.5] of brightness)
    }
    else if (angle >= 5 * Math.PI / 6 && angle <= 4.6180) { // targeting time between twilight and noon (there is a gap of '2' between the the lower and upper value of angle)
        elemBrightness.style.setProperty('--brightnessVal', 0.5 + (angle - 5 * Math.PI / 6) * 0.25);// initial brightness is 0.5, map [5pi/6, 4.6180] of angle to [0.5, 1] of brightnessVal
    }

    midday = `radial-gradient(circle at ${x}px ${y}px, white 0%,rgb(228, 239, 247,${opacity}) 3%, rgb(225, 240, 250,${opacity}) 5%, rgba(135, 206, 235, ${opacity}))`
    sunrise = `radial-gradient(circle at ${x}px ${y}px, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%)`;
    night = `linear-gradient(to bottom, rgba(3, 3, 73,${opacity2})10%, rgba(7, 7, 92,${opacity2})30%, rgba(70, 2, 117,${opacity2}) 65%, rgba(113, 1, 145,${opacity2}) 90%)`;
    moon = `radial-gradient(circle at ${x1}px ${y1}px,white 0.7%, rgba(242, 240, 240, 0.8) 1.7%,rgba(218, 217, 217, 0.6) 1.9%,rgba(182, 180, 180, 0.4) 2.5%, transparent 3.5%)`;
    sun.style.background = `${night}, ${midday}, ${sunrise}`;
    moonLayer.style.backgroundImage = `url("assets/stage/scorched_dunes/background/stars.png"),${moon}`;
    //using 'background' overrides all background properties given by css. Using 'backgroundImage' only overrides the background image and not other properties like background size: contain (we need this property for stars.png) 
    angle = (angle + updateFactor) % (2 * 3.14);
    trackDNCPhase(); //tracks changes in daytime and emits events accordingly    
}

function trackDNCPhase(){
    if(2.4 < angle && angle <= 2.9)
        currentPhase = 'dawn'
    else if(2.9 < angle && angle <= 4.0)
        currentPhase = 'sunrise'
    else if(4.0 < angle && angle <= 5.5)
        currentPhase = 'noon'
    else if(5.5 < angle || angle <= 0.15)
        currentPhase = 'sunset'
    else if(0.15 < angle && angle <= 0.48)
        currentPhase = 'dusk'
    else if(0.48 < angle && angle <= 2.4)
        currentPhase = 'night'
    
    if(lastPhase == null || lastPhase != currentPhase){ // if starting out for the first time, or if phase has changed, emit an event
        eventBus.emit('DNCPhaseChange',currentPhase);
        lastPhase = currentPhase;
    }
} 

function setUpdateFactor(phase){
    let value = updateFactorsData[phase];
    console.log("update factor value is:",value);
    updateFactor = value || 0.0005;
    console.log("update factor is now:",updateFactor);
} 

function toggleAnimation(){
    if(DNC_Settings.is_animated){
        DNC_Settings.is_animated = false;
        setStaticTime('noon');
    }
    else{
        DNC_Settings.is_animated = true;
    }
}

function setStaticTime(time){
    eventBus.emit('DNCUpdateStarted');  //disables DNC settings (refer interface.js)
    let targetAngle;
    switch(time){
        case 'noon':
            targetAngle = 4.622;
            break;
        case 'night':
            targetAngle = 1.590;
            break;
        case 'sunrise':
            targetAngle = 3.299;
            break;
        case 'dawn':
            targetAngle = 2.900;
            break;
        case 'sunset':
            targetAngle = 6.190;
            break;
        case 'dusk':
            targetAngle = 0.350;
            break;
        default:
            targetAngle = angle;
            break;
        }
        updateFactor = 0.0120; // increase speed of DNC to reach the new angle quickly
        DNC_Settings.is_transitioning = true;
        const angleCheck = setInterval(() => { // keep checking for when angle reaches targetAngle, and revert updateFactor to default value (and set 'is_transitioning' to false to stop DNC animation)
            if(angle.toPrecision(2) === targetAngle.toPrecision(2)){
                clearInterval(angleCheck);
                updateFactor = 0.0005;
                DNC_Settings.is_transitioning = false;
                eventBus.emit('DNCUpdateFinished'); //re-enables DNC settings (refer interface.js)
            }
        }
        , 16); // 16ms is the time taken for each frame at 60fps
}



/*
idea: 
- update 'is_animated' to false when static DNC is required, setting the default daytime as noon (daytime gets updated in a separate setting)
- use setInterval() to call DNC() instead of calling DNC() directly, in case of instantaneous change (inside setInterval, define a function that gives multiple calls to DNC() to update daytime smoothly yet quickly)
*/