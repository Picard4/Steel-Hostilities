import State from "../../../lib/State.js";
import Colour from "../../enums/Colour.js";
import FontName from "../../enums/FontName.js";
import GameStateName from "../../enums/GameStateName.js";
import ImageName from "../../enums/ImageName.js";
import SoundName from "../../enums/SoundName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, keys, sounds, stateMachine } from "../../globals.js";
import HighScoreManager from "../../services/HighScoreManager.js";

export default class EnterHighScoreState extends State {

	static MINIMUM_ASCII_CHARACTER = 48;
	static STARTING_ASCII_CHARACTER = 65;
	static MAXIMUM_ASCII_CHARACTER = 90;

	/**
 	* Screen that allows us to input a new high score in the form of three characters, arcade-style.
 	* Enter High Score State heavily assisted by the equivalent Breakout implementation.
	* Some design choices inspired by Puyo Puyo Champions.
 	*/
	constructor() {
		super();

		// Individual characters of our name string.
		this.nameCharacters = [EnterHighScoreState.STARTING_ASCII_CHARACTER, EnterHighScoreState.STARTING_ASCII_CHARACTER, EnterHighScoreState.STARTING_ASCII_CHARACTER];
	}

	enter(parameters) {
		// The user's score
		this.score = parameters.score;

		// Character in the name string that is currently highlighted.
		this.highlightedNameCharacter = 0;

		sounds.play(SoundName.MenuTheme);
	}

	update(dt) {
		// Save and view the high score
		if (keys.Enter) {
			keys.Enter = false;
			sounds.play(SoundName.MenuSelectSound);

			let name = "";
			for (let nameIterator = 0; nameIterator < this.nameCharacters.length; nameIterator++) {
				name += String.fromCharCode(this.nameCharacters[nameIterator])
			}

			HighScoreManager.addHighScore(name, this.score);

			stateMachine.change(GameStateName.HighScore);
		}

		// Scroll through character slots.
		if (keys.a && this.highlightedNameCharacter > 0) {
			keys.a = false;
			sounds.play(SoundName.MenuShiftSound);
			this.highlightedNameCharacter = this.highlightedNameCharacter - 1;
		}
		else if (keys.d && this.highlightedNameCharacter < this.nameCharacters.length - 1) {
			keys.d = false;
			sounds.play(SoundName.MenuShiftSound);
			this.highlightedNameCharacter = this.highlightedNameCharacter + 1;
		}

		// Scroll through characters.
		if (keys.s) {
			keys.s = false;
			sounds.play(SoundName.MenuShiftSound);

			// Advance to the next available character, then move to the minimum character if sent out of range
			this.nameCharacters[this.highlightedNameCharacter] += 1;
			if (this.nameCharacters[this.highlightedNameCharacter] > EnterHighScoreState.MAXIMUM_ASCII_CHARACTER) {
				this.nameCharacters[this.highlightedNameCharacter] = EnterHighScoreState.MINIMUM_ASCII_CHARACTER;
			}
		}
		else if (keys.w) {
			keys.w = false;
			sounds.play(SoundName.MenuShiftSound);

			// Advance to the previous available character, then move to the maximum character if sent out of range
			this.nameCharacters[this.highlightedNameCharacter] -= 1;
			if (this.nameCharacters[this.highlightedNameCharacter] < EnterHighScoreState.MINIMUM_ASCII_CHARACTER) {
				this.nameCharacters[this.highlightedNameCharacter] = EnterHighScoreState.MAXIMUM_ASCII_CHARACTER;
			}
		}
	}

	render() {
		context.save();
		images.render(ImageName.MoonBackground, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		context.fillStyle = Colour.DarkBlue;
		context.font = `100px ${FontName.QuillSwordLight}`;
		context.textAlign = 'center';
		context.fillText(`Your high score: ${this.score}`, CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.15);
		context.font = `80px ${FontName.QuillSwordLight}`;
		context.fillText(`W/S to choose a character`, CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.35);
		context.fillText(`A/D to change slot`, CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5);


		let widthMultiplier = 0.4;
		let heightMultiplier = 0.7;
		context.font = `50px ${FontName.ComicSansMSGras}`;
		for (let nameIterator = 0; nameIterator < this.nameCharacters.length; nameIterator++) {
			context.fillStyle = this.highlightedNameCharacter === nameIterator ? Colour.LightBlue : Colour.DarkBlue;
			context.fillText(`${String.fromCharCode(this.nameCharacters[nameIterator])}`, CANVAS_WIDTH * widthMultiplier, CANVAS_HEIGHT * heightMultiplier);
			widthMultiplier += 0.1;
		}

		context.fillStyle = Colour.DarkBlue;
		context.font = `70px ${FontName.QuillSwordLight}`;
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText(`Press Enter to save your score`, CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.9);
		context.restore();
	}
}