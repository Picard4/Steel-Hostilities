import Colour from "../../enums/Colour.js";
import Vector from "../../../lib/Vector.js";
import { roundedRectangle } from "../../../lib/DrawingHelpers.js";
import { context, timer } from "../../globals.js";
import Direction from "../../enums/Direction.js";

export default class ProgressBar {
	static BAR_BORDER_WIDTH = 5;
	static METER_BORDER_WIDTH = ProgressBar.BAR_BORDER_WIDTH + 0.3;

	/**
	 * A UI element that shows a fraction by rendering a meter over a bar in one of four directions.
	 * 
	 * - Taken and modified from Palmar's Pokemon assignment
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 * @param {string} fillDirection 
	 * @param {object} options
	 */
	constructor(x = 0, y = 0, width = 0, height = 0, fillDirection = Direction.Right, options = {}) {
		this.setPosition(x, y);
		this.setDimensions(width, height);
		this.setFillDirection(fillDirection);
		this.setOptions(options);
		this.meterProgress = 0;
		this.tweenTask = null;
	}

	static calculateMeterProgress(currentValue, maximumValue, meterDimension) {
		// Returns the width/height of a meter based on the sent fraction values and the dimension that the meter is meant to align with
		return (Math.min(currentValue, maximumValue) / maximumValue) * this.getMaxMeterDimension(meterDimension);
	}

	static getMaxMeterDimension(meterFillDimension) {
		// Returns the width/height needed for a full meter to display
		return meterFillDimension - ProgressBar.BAR_BORDER_WIDTH;
	}

	setPosition(x, y) {
		this.position = new Vector(x, y);
	}

	setDimensions(width, height) {
		this.dimensions = new Vector(width, height);
	}

	setOptions(options) {
		this.borderColour = options.borderColour ?? Colour.Grey;
		this.paddingColour = options.paddingColour ?? Colour.LighterBlack;
		this.meterColour = options.meterColour ?? Colour.Gold;
	}

	setFillDirection(fillDirection) {
		this.fillDirection = fillDirection;

		switch (this.fillDirection) {
			case Direction.Up:
				this.meterRenderMethod = this.renderUpwardMeter;
				this.meterDimension = this.dimensions.y;
				break;
			case Direction.Down:
				this.meterRenderMethod = this.renderDownwardMeter;
				this.meterDimension = this.dimensions.y;
				break;
			case Direction.Left:
				this.meterRenderMethod = this.renderLeftwardMeter;
				this.meterDimension = this.dimensions.x;
				break;
			default:
				this.meterRenderMethod = this.renderRightwardMeter;
				this.meterDimension = this.dimensions.x;
				break;
		}
	}

	/**
	 * Sets the position, dimensions, fillDirection, meter, and options of this ProgressBar in order to properly display it in a new environment.
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} width 
	 * @param {number} height 
	 * @param {string} fillDirection
	 * @param {number} currentValue 
	 * @param {number} maximumValue 
	 * @param {object} options
	 */
	 prepareForUseInNewEnvironment(x, y, width, height, fillDirection, currentValue, maximumValue, options = {}) {
		this.setPosition(x, y);
		this.setDimensions(width, height);
		this.setFillDirection(fillDirection);
		this.updateMeterProgress(currentValue, maximumValue);
		this.setOptions(options);
	}

	getZeroToOneRangeOfMeterFilled() {
		return this.meterProgress / ProgressBar.getMaxMeterDimension(this.meterDimension);
	}

	updateMeterProgress(currentValue, maximumValue) {
		this.meterProgress = ProgressBar.calculateMeterProgress(currentValue, maximumValue, this.meterDimension);
	}

	updateMeterProgressWithTween(currentValue, maximumValue, duration, callback = () => {}) {
		// If a tween is in progress, end it and activate its callback
		if (this.tweenTask !== null && !this.tweenTask.isDone) {
			this.tweenTask.isDone = true;
			this.tweenTask.callback();
		}

		// Start the requested tween
		this.tweenTask = timer.tween(this, ['meterProgress'], [ProgressBar.calculateMeterProgress(currentValue, maximumValue, this.meterDimension)], duration, callback);
	}

	render() {
		context.save();
		this.renderBar();
		this.renderMeter();
		context.restore();
	}

	renderBar() {
		context.strokeStyle = this.borderColour;
		context.fillStyle = this.paddingColour;
		roundedRectangle(
			context,
			this.position.x + ProgressBar.BAR_BORDER_WIDTH / 2,
			this.position.y + ProgressBar.BAR_BORDER_WIDTH / 2,
			this.dimensions.x - ProgressBar.BAR_BORDER_WIDTH,
			this.dimensions.y - ProgressBar.BAR_BORDER_WIDTH,
			ProgressBar.BAR_BORDER_WIDTH,
			true,
			true
		);
	}

	renderMeter() {
		// Do not render the meter if it is supposed to be empty
		if (this.meterProgress <= 0) {
			return;
		}

		context.fillStyle = this.meterColour;
		this.meterRenderMethod();
	}

	renderLeftwardMeter() {
		roundedRectangle(
			context,
			this.position.x + (ProgressBar.METER_BORDER_WIDTH / 2) + (ProgressBar.getMaxMeterDimension(this.meterDimension) - this.meterProgress),
			this.position.y + ProgressBar.METER_BORDER_WIDTH / 2,
			this.meterProgress,
			this.dimensions.y - ProgressBar.METER_BORDER_WIDTH,
			ProgressBar.METER_BORDER_WIDTH,
			true,
			false
		);
	}

	renderRightwardMeter() {
		roundedRectangle(
			context,
			this.position.x + ProgressBar.METER_BORDER_WIDTH / 2,
			this.position.y + ProgressBar.METER_BORDER_WIDTH / 2,
			this.meterProgress,
			this.dimensions.y - ProgressBar.METER_BORDER_WIDTH,
			ProgressBar.METER_BORDER_WIDTH,
			true,
			true
		);
	}

	renderUpwardMeter() {
		roundedRectangle(
			context,
			this.position.x + ProgressBar.METER_BORDER_WIDTH / 2,
			this.position.y + (ProgressBar.METER_BORDER_WIDTH / 2) + (ProgressBar.getMaxMeterDimension(this.meterDimension) - this.meterProgress),
			this.dimensions.x - ProgressBar.METER_BORDER_WIDTH,
			this.meterProgress,
			ProgressBar.METER_BORDER_WIDTH,
			true,
			false
		);
	}

	renderDownwardMeter() {
		roundedRectangle(
			context,
			this.position.x + ProgressBar.METER_BORDER_WIDTH / 2,
			this.position.y + ProgressBar.METER_BORDER_WIDTH / 2,
			this.dimensions.x - ProgressBar.METER_BORDER_WIDTH,
			this.meterProgress,
			ProgressBar.METER_BORDER_WIDTH,
			true,
			false
		);
	}
}
