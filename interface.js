let start = document.querySelector(".start");
let jump = document.querySelector(".jump");
let restart = document.querySelector(".restart");
let spaceButton3d = document.querySelector(".space");

export function switchText(id) {
    if(id==1){
        if(getComputedStyle(start).getPropertyValue("opacity")==1){
        start.style.transform = "translate3d(0,50px,0)"
        start.style.opacity = 0;
        // console.log("inside start if")
        }
        else {
            // console.log("Welp, start is done for lol");
            restart.style.transform = "translate3d(0,50px,0)"
            restart.style.opacity = 0;
        }
        jump.style.transform = "translate3d(0,0,0)"
        jump.style.opacity = 1;
    }
    else if(id==2){
        jump.style.transform = "translate3d(0,-50px,0)"
        jump.style.opacity = "0";
        // console.log("restart is coming from: ", getComputedStyle(restart).getPropertyValue("transform"));
        restart.style.transform = "translate3d(0,0,0)"
        restart.style.opacity = "1";
    } 
}

spaceButton3d.addEventListener("animationend", ()=>{
    // console.log("animation has ended");
    spaceButton3d.classList.remove("pressed");
});

export function animateSpaceTxt() {
        spaceButton3d.classList.add("pressed");
    }
