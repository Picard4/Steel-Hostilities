import State from "../../../lib/State.js";
import Colour from "../../enums/Colour.js";
import FontName from "../../enums/FontName.js";
import GameStateName from "../../enums/GameStateName.js";
import TitleScreenMenuOption from "../../enums/MenuOption.js";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	images,
	keys,
	sounds,
	stateMachine,
} from "../../globals.js";
import SoundName from "../../enums/SoundName.js";
import ImageName from "../../enums/ImageName.js";
import PlaythroughManager from "../../services/PlaythroughManager.js";

export default class TitleScreenState extends State {

	static GAME_TITLE_LABEL = "(Steel Hostilities)";

	constructor() {
		// Title screen state assisted by Match 3, Breakout and Pokemon implementations
		super();

		this.menuOptions = [TitleScreenMenuOption.Commence, TitleScreenMenuOption.Continue, TitleScreenMenuOption.HighScores];

		// The currently selected menu option
		this.currentMenuOption = 0;
	}

	enter() {
		sounds.play(SoundName.MenuTheme);
	}

	update(dt) {
		if (keys.w) {
			keys.w = false;
			sounds.play(SoundName.MenuShiftSound);

			// Move to the next upper Menu Option, or to the bottom one if at the top option
			this.currentMenuOption = (this.currentMenuOption === 0 ? this.menuOptions.length : this.currentMenuOption) - 1;
		}

		if (keys.s) {
			keys.s = false;
			sounds.play(SoundName.MenuShiftSound);

			// Move to the next lower Menu Option, or to the top one if at the bottom option
			this.currentMenuOption = (this.currentMenuOption + 1) % this.menuOptions.length;
		}

		if (keys.Enter) {
			keys.Enter = false;
			sounds.play(SoundName.MenuSelectSound);

			// Activate the requested process, with the default case starting a new game
			switch (this.menuOptions[this.currentMenuOption]) {
				case TitleScreenMenuOption.Continue:
					sounds.stop(SoundName.MenuTheme);
					stateMachine.change(GameStateName.Play, PlaythroughManager.loadPlaythrough());
					break;
				case TitleScreenMenuOption.HighScores:
					stateMachine.change(GameStateName.HighScore);
					break;
				default:
					sounds.stop(SoundName.MenuTheme);
					stateMachine.change(GameStateName.Play, {});
					break;
			}
		}
	}

	render() {
		context.save();
		images.render(ImageName.ForestBackground, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		this.renderTitle();
		this.renderMenu();
		context.restore();
	}

	renderTitle() {
		context.save();
		context.font = `120px ${FontName.Swordsman}`;
		context.textAlign = 'center';
		context.fillStyle = Colour.Gold;
		context.fillText(TitleScreenState.GAME_TITLE_LABEL, CANVAS_WIDTH / 2, 200);
		context.restore();
	}

	renderMenu() {
		const offSet = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 - 30 };

		this.menuOptions.forEach((menuOption, index) => {
			this.renderMenuOption(menuOption, offSet.x, offSet.y + 150 * index, index)
		});
	}

	renderMenuOption(text, x, y, index) {
		context.save();
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.font = `100px ${FontName.QuillSwordLight}`;
		if (this.currentMenuOption === index) {
			context.fillStyle = Colour.LightBlue;
		}
		else {
			context.fillStyle = Colour.DarkBlue;
		}
		context.fillText(text, x + 0, y + 1);
		context.fillText(text, x + 1, y + 1);
		context.fillText(text, x + 1, y + 2);
		context.fillText(text, x + 2, y + 1);
		context.fillText(text, x + 2, y + 2);
		context.restore();
	}
}
