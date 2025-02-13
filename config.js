/**************** DINO CONFIG *********************/
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

/**************** STAGE CONFIG *****************/
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