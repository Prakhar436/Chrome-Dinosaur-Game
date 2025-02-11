import {setUpHill, hillMove} from './background.js';
import { setUpGround } from './ground.js';
import { setUpHurdle } from './hurdle.js';
export const STAGES = {
    'scorched_dunes': {
        hill_count: 3, //number of objects (mountains) defined for the stage
        default_hill: 'mount_1.png', // the default hill that is present during ready state
        hurdle_count: 2, //number of objects (hurdles) defined for the stage
        hurdle_sizes: {
            // hurdle_num: [width %, height %], where each percentage is relative to hurdleContainer
            hurdle_1: [100, 100],
            hurdle_2: [100, 100]
        },
        hitboxes: { // hitboxes' size and placement data for each hurdle
            // hurdle_num: [hitbox1, hitbox2, hitbox3,...] where each hitbox = [top %, left %, width %, height %], each % relative to hurdleContainer
            hurdle_1: [[59, 30, 38, 15], [7, 44, 15, 35]],
            hurdle_2: [[49, 23, 20, 15], [7, 46, 21, 35], [33, 76, 10, 15]]
        }

    },
    'arctic_tundra': {
        hill_count: 4,
        default_hill: 'mount_1.png',
        hurdle_count: 3,
        hurdle_sizes: {
            // hurdle_num: [width %, height %], where each percentage is relative to hurdleContainer
            hurdle_1: [90, 100],
            hurdle_2: [60, 110],
            hurdle_3: [100, 100]
        },
        hitboxes: { // hitboxes' size and placement data for each hurdle
            // hurdle_num: [hitbox1, hitbox2, hitbox3,...] where each hitbox = [top %, left %, width %, height %]
            hurdle_1: [[2, 32, 18, 15], [7, 81, 4, 3],[22, 0, 5, 5]],
            hurdle_2: [[-8, 14, 22, 15], [21, 1, 50, 13]],
            hurdle_3: [[2, 48, 5, 15], [28, 4, 85, 13]]
        }
    }
}

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
        setUpHill(this.stage_name, this.default_hill, this.hill_count);
        setUpGround(this.stage_name);
        setUpHurdle(this.stage_name, this.hurdle_count, this.hurdle_sizes, this.hitboxes);
        
    }
    moveStage(delta, speedScale){
        hillMove(delta, speedScale);
    }
}