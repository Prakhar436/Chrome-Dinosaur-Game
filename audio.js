import { eventBus } from "./eventEmitter.js";
let eventsRegistered = false;
let bgMusic;
let current_stage;
export let dinoSFX = {
    jump: new Howl(
        {
            src: ['audio/sfx/dinoJump2.mp3'],
            volume: 0.4
        }
    ),
    stop: new Howl(
        { src: ['audio/sfx/error2.mp3'] }
    )
}

export function setUpAudio(stage_name) {
    if (bgMusic && current_stage === stage_name) { // if the audio is already loaded, return a resolved promise
        return Promise.resolve();
    }
    if (bgMusic) {
        bgMusic.stop();
    }
    current_stage = stage_name;
    bgMusic = new Howl({ src: [`assets/stage/${current_stage}/background_music/${current_stage}_bgm.mp3`], loop: true })
    if (!eventsRegistered) { // register events only once
        eventBus.on('gameStateChange', (gameState) => {
            if (gameState === 'Running') {
                if (bgMusic.playing() == false) { // start the background music
                    bgMusic.play();
                    bgMusic.fade(0, 0.5, 2000);
                }
                else
                    bgMusic.fade(bgMusic.volume(), 0.5, 2000);
            }
            if (gameState === 'Over') {
                bgMusic.fade(bgMusic.volume(), 0.1, 2000);
            }
        });
        eventBus.on('dinoModelChange', () => {
            bgMusic.fade(bgMusic.volume(), 0, 500);
            setTimeout(() => {
                bgMusic.stop();
            }, 500);
        });
        eventBus.on('stageChange', () => {
            bgMusic.fade(bgMusic.volume(), 0, 500);
            setTimeout(() => {
                bgMusic.stop();
            }, 500);
        });
        eventsRegistered = true;
    }
    return new Promise((resolve) => {
        if (bgMusic.state() === 'loaded') {
            resolve();
        }
        else
            bgMusic.once('load', resolve);
    });
}

