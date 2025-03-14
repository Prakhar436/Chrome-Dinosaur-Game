import { eventBus } from "./eventEmitter.js";

let start = document.querySelector(".start");
let jump = document.querySelector(".jump");
let restart = document.querySelector(".restart");
let spaceButton3d = document.querySelector(".space");

document.querySelector('.dino_select').addEventListener('click', (e) => {
    const dinoOption = e.target.closest('[data-dinosaur]')
    if (!dinoOption || dinoOption.classList.contains('selected'))
        return; // if dino element wasn't clicked or the dino clicked on is already selected
    document.querySelectorAll('[data-dinosaur]').forEach(d => d.classList.remove('selected'));
    console.log('dino has changed', dinoOption.dataset.dinosaur);
    eventBus.emit('dinoModelChange', dinoOption.dataset.dinosaur);
    dinoOption.classList.add('selected');
});
document.querySelector('.stage_select').addEventListener('click', (e) => {
    const stageOption = e.target.closest('[data-stage]')
    if (!stageOption || stageOption.classList.contains('selected'))
        return; // if stage element wasn't clicked or the stage clicked on is already selected
    document.querySelectorAll('[data-stage]').forEach(s => s.classList.remove('selected'));
    console.log('stage has changed', stageOption.dataset.stage);
    eventBus.emit('stageChange', stageOption.dataset.stage);
    stageOption.classList.add('selected');
});

document.querySelector('form .item.dnc-type').addEventListener('click', (e) => {
    document.querySelector('.radio-grp').classList.toggle('disabled');
    document.querySelectorAll('.radio-grp input').forEach((r)=>{
        r.checked = false;
    });
    if(!e.target.checked){
        document.getElementById('a').checked = true;
    }
    console.log('emitting dnc change event');
    eventBus.emit('DNCModeChange',e.target.checked);
});
document.querySelector('form .item.radio-grp').addEventListener('change', (e) => {
    console.log('emitting staticTime change event');
    eventBus.emit('DNCTimeChange', e.target.value);
});   

eventBus.on('DNCUpdateStarted', () => {
    document.querySelectorAll('.item.radio-grp, .item.dnc-type').forEach ((elem) =>{
        elem.classList.add('disabled');
    });
}
);
eventBus.on('DNCUpdateFinished', () => {
    document.querySelectorAll('.item.radio-grp, .item.dnc-type').forEach ((elem) =>{
        elem.classList.remove('disabled');
    });}
);

export function switchText(id) { // switch .prompt text between 'start', 'jump', and 'restart'
    if (id == 1) {
        if (getComputedStyle(start).getPropertyValue("opacity") == 1) {
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
    else if (id == 2) {
        jump.style.transform = "translate3d(0,-50px,0)"
        jump.style.opacity = "0";
        // console.log("restart is coming from: ", getComputedStyle(restart).getPropertyValue("transform"));
        restart.style.transform = "translate3d(0,0,0)"
        restart.style.opacity = "1";
    }
}

spaceButton3d.addEventListener("animationend", () => {
    // console.log("animation has ended");
    spaceButton3d.classList.remove("pressed");
});

export function animateSpaceTxt() {
    spaceButton3d.classList.add("pressed");
}

export function toggleAccordion(e) {
    if (e.target.closest('.accordionContent')) return; // Exit if the clicked element is not a header
    const accordionItem = e.target.closest('.accordionItem'); // Get the parent accordion item
    const panel = accordionItem.querySelector('.accordionContent'); // Get the panel of the clicked header
    console.log('panel=', panel);
    console.log(panel.style.maxHeight);
    console.log('the target:', e.target);
    // close all panels except the one clicked
    const allPanels = document.querySelectorAll('.accordionContent');
    allPanels.forEach(p => {
        if (p !== panel) {
            p.style.maxHeight = 0;  // Collapse any open panels
            p.closest('.accordionItem').classList.remove('active');  // Remove active class from the accordion item
        }
    });
    accordionItem.classList.toggle('active'); // toggle 'active' class to the accordion item
    if (!panel.style.maxHeight || panel.style.maxHeight === '0px') {
        panel.style.maxHeight = panel.scrollHeight + "px";
    } else {
        panel.style.maxHeight = 0;
    }
}
export function updateAccordionAccess(access) {
    if (access == false) // disable access to accordion
    {
        const accordionItems = document.querySelectorAll('.accordionItem');
        accordionItems.forEach(item => {
            item.classList.remove('active');
            item.querySelector('.accordionContent').style.maxHeight = 0;
        });

        document.querySelector('.accordion').classList.add('disabled');
    }
    else {
        document.querySelector('.accordion').classList.remove('disabled');
    }

}
