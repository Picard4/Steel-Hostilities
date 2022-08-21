import State from "../../../lib/State.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, keys, sounds, stateMachine, timer } from "../../globals.js";
import Animation from "../../../lib/Animation.js";
import GameStateName from "../../enums/GameStateName.js";
import FontName from "../../enums/FontName.js";
import Colour from "../../enums/Colour.js";
import { roundedRectangle } from "../../../lib/DrawingHelpers.js";
import OpponentStateName from "../../enums/OpponentStateName.js";
import OpponentType from "../../enums/OpponentType.js";
import Skeleton from "../../entities/Skeleton.js"
import RatKing from "../../entities/RatKing.js"
import SoundName from "../../enums/SoundName.js";
import PlaythroughManager from "../../services/PlaythroughManager.js";

export default class VictoryState extends State {

	static DEFAULT_CONTINUE_TEXT_SIZE = 60;
	static AMONG_US_CONTINUE_TEXT_SIZE = 30;

	/**
	 * When the player beats the opponent,
	 * the victory state autosaves the user's progress, performs some
	 * animations and then transitions
	 * to the next stage. The user's score
	 * is updated and show to the user as
	 * well.
	 * 
	 * - Some code borrowed from assignment 3 - match 3
	 */
	constructor() {
		super();
	}

	enter(parameters) {
		this.battlefield = parameters.battlefield;
		this.victoryMessage = parameters.victoryMessage ?? "KO";

		this.battlefield.opponent.changeState(OpponentStateName.KnockedOut);

		this.renderWinText = false;
		this.renderResultsText = false;
		this.renderContinueText = false;

		// End the player's rush mode if it is active
		if (this.battlefield.player.rushMode) {
			this.battlefield.player.endRushMode();
		}

		// Calculate bonus
		this.bonusPoints = Math.floor(this.battlefield.player.health + this.battlefield.battleTimeRemaining);
		this.scoreAfterBonus = this.battlefield.score + this.bonusPoints;

		// Determine the type of the next opponent
		this.nextOpponentType = this.getNextOpponentType();

		// Determine which font to use for rendering some of the UI, and the next opponent's level
		// This behaviour is chosen depending on whether the final boss was defeated or not
		this.nextOpponentLevel = this.battlefield.opponent.level;
		this.standardFont = FontName.QuillSword;
		this.continueTextSize = VictoryState.DEFAULT_CONTINUE_TEXT_SIZE;
		this.continueText = "Press Enter To Continue";

		if (this.battlefield.opponent.isFinalBoss()) {
			this.nextOpponentLevel++;
			this.standardFont = FontName.AmongUs;
			this.continueTextSize = VictoryState.AMONG_US_CONTINUE_TEXT_SIZE;
			this.continueText = this.continueText.toUpperCase();
		}

		// Autosave the player's progress up to this point
		PlaythroughManager.saveCurrentPlaythrough(this.scoreAfterBonus, this.nextOpponentLevel, this.nextOpponentType);

		// Do ko animation
		timer.tween(this.battlefield.opponent.position, ['y'], [100], 2, () => {
			// Show win text
			this.battlefield.opponent.currentAnimation = new Animation([4], 1);
			this.renderWinText = true;
			timer.wait(1, () => {
				// Show results
				this.renderResultsText = true;
				// Tween score with bonus points
				timer.tween(this.battlefield, ['score'], [this.scoreAfterBonus], 3, () => {
					// Wait, then continue
					this.renderContinueText = true;
				})
			})
		});

		sounds.play(SoundName.VictoryTheme);
	}

	update(dt) {
		timer.update(dt);
		this.battlefield.opponent.update();

		// Check to continue game 
		if (this.renderContinueText && keys.Enter) {
			keys.Enter = false;
			sounds.play(SoundName.MenuSelectSound);

			this.battlefield.player.getReadyForTheNextBattle();
			stateMachine.change(GameStateName.Play,
				{
					player: this.battlefield.player, score: this.battlefield.score, opponentLevel: this.nextOpponentLevel,
					opponentType: this.nextOpponentType
				});
		}
	}

	render() {
		context.save();
		this.battlefield.render();
		if (this.renderWinText) {
			this.renderWin();
		}
		if (this.renderResultsText) {
			this.renderResults();
		}
		if (this.renderContinueText) {
			this.renderContinue();
		}
		context.restore();
	}

	exit() {
		sounds.stop(SoundName.VictoryTheme);
	}

	renderWin() {
		// Render results once animation has finished
		context.save();
		context.font = `120px ${this.standardFont}`;
		context.textAlign = 'center';
		context.fillStyle = Colour.Black;
		context.fillText(this.victoryMessage, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 100);

		context.font = `110px ${this.standardFont}`;
		context.textAlign = 'center';
		context.fillStyle = Colour.Gold;
		context.fillText(this.victoryMessage, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 100);
		context.restore();
	}

	renderResults() {
		let scoreText = `+ ${Math.round(this.bonusPoints)}`;

		context.save();
		context.fillStyle = Colour.Black;
		context.globalAlpha = 0.7;
		roundedRectangle(
			context,
			CANVAS_WIDTH / 3 - 40,
			CANVAS_HEIGHT / 2 - 60,
			500,
			300,
			5,
			true,
			false,
		);
		context.globalAlpha = 1;
		context.font = `60px ${this.standardFont}`;
		context.textAlign = 'center';
		context.fillStyle = Colour.White;
		context.fillText("BONUS", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
		context.font = `60px ${FontName.QuillSword}`;
		context.fillText(scoreText, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 100);
		context.restore();
	}

	renderContinue() {
		context.save();
		context.font = `${this.continueTextSize}px ${this.standardFont}`;
		context.textAlign = 'center';
		context.fillStyle = Colour.White;
		context.fillText(this.continueText, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 200);
	}

	getNextOpponentType() {
		if (this.battlefield.opponent instanceof RatKing) {
			return OpponentType.Skeleton;
		}
		else if (this.battlefield.opponent instanceof Skeleton) {
			return OpponentType.BigChungus;
		}
		else {
			return OpponentType.RatKing;
		}
	}
}
