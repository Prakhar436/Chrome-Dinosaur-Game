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
        },
        DNC:{
            updateFactors: {
                noon: 0.0004,
                night: 0.0006
            },

            color_stops: {
                midday:  [ //rgb values and percentage for gradient
                    { color: [255,255,255], pct: 0 },
                    { color: [228,239,247], pct: 3 },
                    { color: [225,240,250], pct: 5 },
                    { color: [135,206,235], pct: 100 }
                ],
                sunrise: [
                    { color: [242,248,247,1], pct: 0 },
                    { color: [249,249,28,1], pct: 3 },
                    { color: [247,214,46,1], pct: 8 },
                    { color: [248,200,95,1], pct: 12 },
                    { color: [201,165,132,1], pct: 30 },
                    { color: [115,130,133,1], pct: 51 },
                    { color: [46,97,122,1], pct: 85 },
                    { color: [24,75,106,1], pct: 100 }
                ],
                night: [
                    { color: [3,3,73], pct: 10 },
                    { color: [7,7,92], pct: 30 },
                    { color: [70,2,117], pct: 65 },
                    { color: [113,1,145], pct: 90 }
                ],
                moon: [
                    { color: [237,234,234,1], pct: 1 },
                    { color: [222,220,220,0.9], pct: 1.5 },
                    { color: [218,217,217,0.6], pct: 2 },
                    { color: [182,180,180,0.3], pct: 2.5 },
                    { color: [/*empty = transparent*/], pct: 3.5 },
                ]
            }
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
        },
        DNC:{
            updateFactors: {
                noon: 0.0006,
                night: 0.0004
            },
            color_stops: {
                midday:  [ //rgb values and percentage for gradient
                    { color: [255,255,255], pct: 0 },
                    { color: [228,239,247], pct: 3 },
                    { color: [225,240,250], pct: 5 },
                    { color: [135,206,235], pct: 100 }
                ],
                sunrise: [
                    { color: [242,248,247,1], pct: 0 },
                    { color: [249,249,28,1], pct: 3 },
                    { color: [247,214,46,1], pct: 8 },
                    { color: [248,200,95,1], pct: 12 },
                    { color: [201,165,132,1], pct: 30 },
                    { color: [115,130,133,1], pct: 51 },
                    { color: [46,97,122,1], pct: 85 },
                    { color: [24,75,106,1], pct: 100 }
                ],
                night: [
                    { color: [3,3,73], pct: 10 },
                    { color: [7,7,92], pct: 30 },
                    { color: [11,55,122], pct: 65 },
                    { color: [13,86,170], pct: 90 }
                ],
                moon: [
                    { color: 'white', pct: 0.7 },
                    { color: [242,240,240,0.8], pct: 1.7 },
                    { color: [218,217,217,0.6], pct: 1.9 },
                    { color: [182,180,180,0.4], pct: 2.5 },
                    { color: [/*empty = transparent*/], pct: 3.5 },
                ]
            } 
        }
    }
}