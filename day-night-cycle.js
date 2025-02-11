let sun, moonLayer;
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
export function DNS() {
    x = CenterX + a * Math.cos(angle);
    y = CenterY + b * Math.sin(angle);

    x1 = CenterX + a * Math.cos((angle+2.67979)%(2*Math.PI)); // moon will be at an angle difference of 153deg from the sun
    y1 = CenterY + b * Math.sin((angle+2.67979)%(2*Math.PI));

    if (angle >= Math.PI && angle <= 4.6416) {
        opacity = (angle - Math.PI)*0.66; //max angle inc. = 1.5, max opacity inc = 1, so 1/1.5 = 0.66
    }
    else if (angle >= 5.2831 && angle <= 2 * Math.PI) {
        opacity = 1 - (angle - 5.2831);
    }
    else if(angle>0 && angle<1){
        opacity2 = angle;
        moonLayer.style.opacity = opacity2;
        // elemBrightness.style.setProperty('--brightnessVal',1-opacity2/2); // brightness of elements varies with opacity2 and therefore, indirectly with the time of day

    }
    else if(angle>2.1416 && angle<Math.PI){
        opacity2 = Math.PI-angle;
        moonLayer.style.opacity = opacity2;
    }

    if(angle>11*Math.PI/6 || angle<Math.PI/6){ // targeting the time between sunset and complete midnight, it is tricky because angle after 2pi reverts back to 0, so we need two 'if' conditions to handle the angle
        if(11*Math.PI/6<=angle && angle<=2*Math.PI){
            elemBrightness.style.setProperty('--brightnessVal',(1 -((angle - 11*Math.PI/6)*0.4774))); // angle inc and brightness dec (hence the '1-' in the beginning, the rest just maps the range: [11pi/6, 2pi] of angle to: [0, 0.25] of brightness) 
        }
        else if(angle>=0)
            elemBrightness.style.setProperty('--brightnessVal',(1 - ((Math.PI/6 + angle)*0.48)));// angle inc and brightness dec (hence the '1-' in the beginning, the rest just maps the range: [0, pi/6] of angle to: [0.25, 0.5] of brightness)
    }
    else if(angle>=5*Math.PI/6 && angle<=4.6180){ // targeting time between twilight and noon (there is a gap of '2' between the the lower and upper value of angle)
            elemBrightness.style.setProperty('--brightnessVal', 0.5 + (angle-5*Math.PI/6)*0.25);// initial brightness is 0.5, map [5pi/6, 4.6180] of angle to [0.5, 1] of brightnessVal
    }

    midday = `radial-gradient(circle at ${x}px ${y}px, white 0%,rgb(228, 239, 247,${opacity}) 3%, rgb(225, 240, 250,${opacity}) 5%, rgba(135, 206, 235, ${opacity}))`
    sunrise = `radial-gradient(circle at ${x}px ${y}px, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%)`;
    night = `linear-gradient(to bottom, rgba(3, 3, 73,${opacity2})10%, rgba(7, 7, 92,${opacity2})30%, rgba(70, 2, 117,${opacity2}) 65%, rgba(113, 1, 145,${opacity2}) 90%)`;
    moon = `radial-gradient(circle at ${x1}px ${y1}px,white 0.7%, rgba(242, 240, 240, 0.8) 1.7%,rgba(218, 217, 217, 0.6) 1.9%,rgba(182, 180, 180, 0.4) 2.5%, transparent 3.5%)`;
    sun.style.background = `${night}, ${midday}, ${sunrise}`;
    moonLayer.style.backgroundImage = `url("assets/stage/scorched_dunes/background/stars.png"),${moon}`;
    //using 'background' overrides all background properties given by css. Using 'backgroundImage' only overrides the background image and not other properties like background size: contain (we need this property for stars.png) 
    angle = (angle + 0.0005) % (2 * 3.14);
            
        }