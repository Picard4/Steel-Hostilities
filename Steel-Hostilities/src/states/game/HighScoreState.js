import State from "../../../lib/State.js";
import Colour from "../../enums/Colour.js";
import FontName from "../../enums/FontName.js";
import GameStateName from "../../enums/GameStateName.js";
import ImageName from "../../enums/ImageName.js";
import SoundName from "../../enums/SoundName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, keys, sounds, stateMachine } from "../../globals.js";
import HighScoreManager from "../../services/HighScoreManager.js";


export default class HighScoreState extends State {

	static HIGH_SCORE_LABEL = "High Scores"

	/**
	 * This game state is used for viewing the top high scores that have been saved for this game.
	 */
	constructor() {
		// High Score State assisted by the Breakout implementation
		super();
	}

	enter(parameters) {
		this.highScores = HighScoreManager.loadHighScores();
	}

	update(dt){
		// Return to the Title Screen if Escape or Enter is pressed
		if (keys.Escape || keys.Enter){
			keys.Escape = false;
			keys.Enter = false;
			sounds.play(SoundName.MenuSelectSound);

			stateMachine.change(GameStateName.TitleScreen);
		}
	}

	render() {
		context.save();
		images.render(ImageName.MoonBackground,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

		context.fillStyle = Colour.DarkBlue;
		context.font = `110px ${FontName.QuillSword}`;
		context.textAlign = "center";
		context.fillText(HighScoreState.HIGH_SCORE_LABEL, CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.15);
		
		const startingHeight = 180;
		const dividingMultiplier = 52;
		context.fillStyle = Colour.LightBlue;
		context.font = `75px ${FontName.QuillSwordLight}`;
		for (let highScoreIterator = 0; highScoreIterator < HighScoreManager.MAX_HIGH_SCORES; highScoreIterator++){
			const name = this.highScores[highScoreIterator].name ?? '---';
			const score = this.highScores[highScoreIterator].score ?? '---';

			context.textAlign = 'left';
			context.fillText(`${highScoreIterator + 1}.`, CANVAS_WIDTH * 0.25, startingHeight + highScoreIterator * dividingMultiplier);
			context.textAlign = 'center';
			context.fillText(`${name}`, CANVAS_WIDTH * 0.5, startingHeight + highScoreIterator * dividingMultiplier);
			context.textAlign = 'right';
			context.fillText(`${score}`, CANVAS_WIDTH * 0.75, startingHeight + highScoreIterator * dividingMultiplier);
		}

		context.font = `50px ${FontName.QuillSwordLight}`;
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillStyle = Colour.DarkBlue;
		context.fillText(`PRESS ENTER TO EXIT TO TITLE SCREEN`, CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.95);
		context.restore();
	}
}
