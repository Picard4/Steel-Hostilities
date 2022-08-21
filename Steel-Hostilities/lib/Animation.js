import Timer from "./Timer.js";

export default class Animation {
	/**
	 * Uses the Timer class to flip to a new "frame" after a
	 * set interval of time has elapsed. This "frame" can be
	 * used to render different sprites in a sprite sheet.
	 * 
	 * - This edition of the Animation class is from Palmar's Angry Birds assignment
	 *
	 * @param {array} frames Array of numbers corresponding to locations in a sprite sheet.
	 * @param {number} interval Switch to the next frame after this amount of time.
	 * @param {number} cycles The amount of times to run the animation.
	 * @param {boolean} includeLastFrame If true, fully shows the last frame that was provided before considering a cycle to be done. 
	 * 								     Ends a cycle upon appearance of the last frame otherwise.
	 */
	constructor(frames, interval, cycles = 0, includeLastFrame = false) {
		this.frames = frames;
		this.interval = interval;
		this.cycles = cycles;
		this.timer = new Timer();
		this.currentFrame = 0;
		this.timesPlayed = 0;

		// Extra fields I added to make sure that Animations can show the last frame before finishing a cycle
		this.lastFrameShown = false;
		this.includeLastFrame = includeLastFrame;

		this.startTimer();
	}

	update(dt) {
		// No need to update if animation is only one frame.
		if (this.frames.length === 1) {
			return;
		}

		this.timer.update(dt);
	}

	/**
	 * After each interval of time, increment the current frame number.
	 * If at the end of the array of frames, loop back to the beginning.
	 */
	startTimer() {
		this.timer.addTask(() => {
			if (this.cycles === 0 || this.timesPlayed < this.cycles) {
				this.currentFrame++;
				this.currentFrame %= this.frames.length;

				if (this.currentFrame === this.frames.length - 1) {
					this.lastFrameShown = true;
					if (!this.includeLastFrame)
						this.timesPlayed++;
				}
				else if (this.currentFrame === 0 && this.lastFrameShown) {
					this.lastFrameShown = false;
					if (this.includeLastFrame)
						this.timesPlayed++;
				}
			}
		}, this.interval);
	}

	getCurrentFrame() {
		return this.frames[this.currentFrame];
	}

	refresh() {
		this.currentFrame = 0;
		this.timesPlayed = 0;
	}

	isDone() {
		return this.timesPlayed === this.cycles;
	}

	isHalfwayDone() {
		return this.currentFrame >= this.frames.length / 2;
	}
}
