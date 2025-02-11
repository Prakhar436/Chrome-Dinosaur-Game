const DEFAULT_FRAME_DELAY = 15;
export class Sprite {
    // when we define a variable inside constructor using this.variable = value, it implicitly defines that variable as a property of that object
    constructor(canvas, src, frameWidth, frameHeights, padding, animationData) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.spritesheet = new Image();
        this.spritesheet.src = src;
        this.frameWidth = frameWidth;
        this.padding = padding;
        this.frameHeights = frameHeights;  // Array of different heights for each row
        this.cumulativeHeights = this.getCumulativeHeights(frameHeights); // Array of souceY values for each row, precomputed to avoid repeated calculations in each draw() call
        this.loop = true; // determines whether the animation should loop or not
        this.animationData = animationData;
        this.currentAnimation = 'idle';
        this.frameIndex = 0;
        this.frameDelay = DEFAULT_FRAME_DELAY;
        this.frameCounter = 0;
    }
    getCumulativeHeights(frameHeights) {
        const cumulativeHeights = [];
        let totalHeight = this.padding[1]; // Start with the vertical padding
        for (let i = 0; i < frameHeights.length; i++) {
            cumulativeHeights.push(totalHeight);
            totalHeight += frameHeights[i] + this.padding[1];
        }
        return cumulativeHeights;
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const { row, frameCount } = this.animationData[this.currentAnimation];
        const col = this.frameIndex % frameCount;
        const sourceX = (col * this.frameWidth) + ((col + 1) * this.padding[0]);
        const sourceY = this.cumulativeHeights[row];
        this.context.drawImage(
            this.spritesheet,
            sourceX,
            sourceY,
            this.frameWidth,
            this.frameHeights[row],
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        if (this.loop || this.frameIndex < frameCount - 1) {
        // go to next frame only if the animation is set to loop OR the current frame is not the last frame
            this.frameCounter++;
            if (this.frameCounter >= this.frameDelay) { //time to update the frame
                this.frameCounter = 0; //reset the counter
                this.frameIndex = (this.frameIndex + 1) % frameCount; //update frameIndex
            }
        }
    }

    changeAnimation(animation, frameDelay, loop = true) {
        this.loop = loop;
        if (this.currentAnimation === animation && this.frameDelay === frameDelay) {
            return;
        }
        else if (this.currentAnimation === animation && this.frameDelay !== frameDelay) {
            this.frameDelay = frameDelay;
            return;
        }
        if (this.currentAnimation !== animation) {
            this.frameIndex = 0;
            this.frameDelay = frameDelay || DEFAULT_FRAME_DELAY;
            const { row } = this.animationData[animation]; // destructuring assignment
            const { row: currRow } = this.animationData[this.currentAnimation]; // destructuring assignment with alias (custom variable name)
            const height = this.frameHeights[row]; // get the height of the new row of the animation
            const currHeight = this.frameHeights[currRow]; // get the height of the current row of the animation
            // compare with the row's current height, and change the canvas height according to the ratio of the new height to the current height
            if (height != currHeight) {
                const scale_factor = height / currHeight; // get the ratio of height-change
                this.canvas.height = this.canvas.height * scale_factor; // change the canvas height in the same proportion
            }
            this.currentAnimation = animation;
        }
    }
}