import { dinoSFX } from "./audio.js";
import { animateSpaceTxt } from "./interface.js";
import {Sprite} from './spriteManager.js';
import { eventBus } from "./script.js"; 


export const DINO_MODELS = {
    'default': {
        src: 'assets/dino/default_dino_spritesheet.png',
        frameHeights: [120,120,120,120],
        frameWidth: 120,
        padding: [20, 20],
        animations: {
            idle: { row: 0, frameCount: 2 },
            running: { row: 1, frameCount: 2 },
            jumping: { row: 2, frameCount: 1 },
            stop: { row: 3, frameCount: 1 }
        }
    },
    'mecha': {
        src: 'assets/dino/mecha_spritesheet.png',
        frameHeights: [350, 350, 450, 350],
        frameWidth: 450,
        padding: [50, 50],
        animations: {
            idle: { row: 0, frameCount: 2 },
            running: { row: 1, frameCount: 9 },
            jumping: { row: 2, frameCount: 6 },
            stop: { row: 3, frameCount: 6 }
        }
    }
}

const dinoContainer  = document.getElementById('dino');

export class Dino extends Sprite {
    constructor(canvas, model_name = 'default') {
        super(canvas, DINO_MODELS[model_name].src, DINO_MODELS[model_name].frameWidth, DINO_MODELS[model_name].frameHeights, DINO_MODELS[model_name].padding, DINO_MODELS[model_name].animations);
        this.currentAnimation;
        this.JUMP_SPEED = window.innerWidth>=window.innerHeight? 0.90: 0.80;
        this.GRAVITY = 0.0025;
        this.FRAMETIME = 1000;
        this.isJumping = false;
        this.yVelocity = 0;
        this.currentFrameTime = 0;
        this.dinoFrame = 0;
        this.translateY = 0;
        this.height = 0;
    }
    
    setUpDino() {
        this.isJumping = false;
        this.yVelocity = 0;
        this.currentFrameTime = 0;
        this.dinoFrame=0;
        // jumpAudio = new Audio("./audio/sfx/dinoJump2.mp3");
        document.removeEventListener("keydown", this.onJump.bind(this));
        dinoContainer.style.transform = `translateY(0)`;
        document.addEventListener("keydown", this.onJump.bind(this)); //remove and set up an event listener that will listen for spacebar presses throughout the game
    }
    standby(animation){
        if(animation === 'idle') {
            this.changeAnimation('idle', 30);}
        else if(animation === 'stop') {this.changeAnimation('stop', 10);


        }
        this.draw();
    }

    onJump(e) {
        if (e.code !== "Space" || this.isJumping) return;
        e.preventDefault();
        this.yVelocity = this.JUMP_SPEED;
        this.translateY = 0;
        this.isJumping = true;
        this.height=0;
        dinoSFX.jump.play();
        this.changeAnimation('jumping',10, false); // do not loop the animation
        animateSpaceTxt();
    }
    dinoRun(delta, speedScale) {
        this.run(delta, speedScale);
        this.jump(delta);
    }
    run(delta, speedScale) {
        if (this.isJumping){
            return;
        }
        if(this.currentAnimation !== 'running'){
            this.changeAnimation('running',10);
        }
        this.draw();
    }
    jump(delta) {
        if (!this.isJumping){
             return;
            }
        dinoContainer.style.transform = `translateY(-${this.translateY + (this.yVelocity * delta)}px`;
        this.translateY = this.translateY + (this.yVelocity * delta);
        this.draw()
        if (this.translateY <= 0) {
            dinoContainer.style.transform = `translateY(0)`;
            this.isJumping = false;
        }
        this.yVelocity -= (this.GRAVITY * delta);
        
    }
    setDinoStop() {
        dinoSFX.stop.play(); 
    }

    getDinoRect() {
        let dinoTrackers = document.querySelectorAll("[data-dinoTracker]")
        const rectArray = [...dinoTrackers].map(tracker => tracker.getBoundingClientRect());
        return rectArray;    
    }

}


 

//This is the time taken to change the dinoRun frames. The running animation will change frames every 100 milliseconds
