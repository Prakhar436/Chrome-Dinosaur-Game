import {setUpHill, hillMove} from './background.js';
import { setUpGround, moveGround } from './ground.js';
import { setUpHurdle, hurdleMove } from './hurdle.js';
import { STAGES } from './config.js';
import { eventBus } from './script.js';
import { setUpAudio } from './audio.js';

export class Stage{
    constructor(stage_name = 'scorched_dunes'){
        this.stage_name = stage_name;
        this.hill_count = STAGES[stage_name].hill_count; //number of objects (mountains) defined for the stage
        this.default_hill = STAGES[stage_name].default_hill; // the default hill that is present on screen during ready state
        this.hurdle_count = STAGES[stage_name].hurdle_count; //number of objects (hurdles) defined for the stage
        this.hitboxes = STAGES[stage_name].hitboxes; // hitboxes' size and placement data for each hurdle
        this.hurdle_sizes = STAGES[stage_name].hurdle_sizes; // sizes of each hurdle
    
    }
    setUpStage(){
        eventBus.emit('loadingStarted', this.stage_name);
        Promise.all([
        setUpHill(this.stage_name, this.default_hill, this.hill_count),
        setUpGround(this.stage_name),
        setUpHurdle(this.stage_name, this.hurdle_count, this.hurdle_sizes, this.hitboxes),
        setUpAudio(this.stage_name)
    ]).then(() => {
        eventBus.emit('loadingFinished');
    });
    }
    moveStage(delta, speedScale){
        hillMove(delta, speedScale);
        hurdleMove(delta, speedScale);
        moveGround(delta, speedScale);
    }
}