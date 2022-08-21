import State from "../../../lib/State.js";
import Animation from "../../../lib/Animation.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, sounds, stateMachine, timer } from "../../globals.js";
import GameStateName from "../../enums/GameStateName.js";
import Colour from "../../enums/Colour.js";
import FontName from "../../enums/FontName.js";
import { roundedRectangle } from "../../../lib/DrawingHelpers.js";
import SoundName from "../../enums/SoundName.js";
import LoseCondition from "../../enums/LoseCondition.js";
import PlaythroughManager from "../../services/PlaythroughManager.js";
import HighScoreManager from "../../services/HighScoreManager.js";

export default class GameOverState extends State {

	/**
	 * If the player is enough of a casual to fall in battle (cringe), 
	 * then this state will be reached so that their play session can be finished.
	 */
	constructor() {
		super();
	}

	enter(parameters) {
		this.battlefield = parameters.battlefield;
		this.loseConditionMessage = parameters.loseConditionMessage ?? LoseCondition.OutOfHealth;
		this.finalScore = Math.floor(this.battlefield.score);

		this.battlefield.opponent.currentAnimation = new Animation([1], 1);

		this.renderLoseText = false;
		this.standardFont = this.battlefield.opponent.isFinalBoss() ? FontName.AmongUs : FontName.QuillSword;

		timer.tween(this.battlefield.player.position, ['y'], [CANVAS_HEIGHT], 3, () => {
			this.renderLoseText = true;
			timer.wait(3, () => { 
				if (HighScoreManager.isHighScore(this.finalScore)) {
					stateMachine.change(GameStateName.EnterHighScore, { score: this.finalScore });
				}
				else {
					stateMachine.change(GameStateName.TitleScreen, { });
				}
			 });
		});

		// Erase the user's playthrough data so that they cannot reload and save scum their way to the top of the high score list
		PlaythroughManager.deletePlaythroughData();

		sounds.play(SoundName.GameOverTheme);
	}

	update(dt) {
		timer.update(dt);
	}

	render() {
		context.save();
		this.battlefield.render();
		if (this.renderLoseText) {
			this.renderLose();
		}
		context.restore();
	}

	exit() {
		sounds.stop(SoundName.GameOverTheme);
	}

	renderLose() {
		// Render lose once animation has finished
		context.save();
		context.fillStyle = Colour.Black;
		context.globalAlpha = 0.7;
		roundedRectangle(
			context,
			0,
			CANVAS_HEIGHT / 3,
			CANVAS_WIDTH,
			200,
			5,
			true,
			false,
		);

		context.globalAlpha = 1;
		context.font = `120px ${this.standardFont}`;
		context.textAlign = 'center';
		context.fillStyle = Colour.Crimson;
		context.fillText(this.loseConditionMessage, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 25);
		context.restore();
	}
}
