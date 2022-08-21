import { roundedRectangle } from "../../../lib/DrawingHelpers.js";
import Colour from "../../enums/Colour.js";
import Direction from "../../enums/Direction.js";
import FontName from "../../enums/FontName.js";
import { context } from "../../globals.js";


export default class UserInterface {

	static PLAYER_HEALTH_BAR_X = 50;
	static OPPONENT_HEALTH_BAR_X = 750;
	static HEALTH_BAR_Y = 20;

	static HEALTH_BAR_WIDTH = 500;
	static HEALTH_BAR_HEIGHT = 60;

	static PLAYER_SUPER_METER_X = 50;
	static PLAYER_SUPER_METER_Y = 200;
	static PLAYER_SUPER_METER_WIDTH = 75;
	static PLAYER_SUPER_METER_HEIGHT = 500;

	static BATTLE_TIME_REMAINING_PANEL_X = 550;
	static BATTLE_TIME_REMAINING_PANEL_Y = 5;
	static BATTLE_TIME_REMAINING_PANEL_WIDTH = 200;
	static BATTLE_TIME_REMAINING_PANEL_HEIGHT = 100;
	static BATTLE_TIME_REMAINING_PANEL_RADIUS = 25;
	static BATTLE_TIME_REMAINING_NUMBER_X = 100;
	static BATTLE_TIME_REMAINING_NUMBER_Y = 80;

	static STATISTIC_DISPLAY_Y = 120;
	static SCORE_DISPLAY_X = 80;
	static OPPONENT_LEVEL_DISPLAY_X = 1220;

	/**
	 * Displays all statistics that must be shown to the user during a battle.
	 */
	constructor(player, opponent, lowHealthZeroToOneRange) {
		this.player = player;
		this.opponent = opponent;
		this.lowHealthZeroToOneRange = lowHealthZeroToOneRange;

		this.playerHealthBar = this.player.healthBar;
		this.opponentHealthBar = this.opponent.healthBar;
		this.playerSuperBar = this.player.superBar;

		// Prepare each bar to be displayed on screen
		this.playerHealthBar.prepareForUseInNewEnvironment(UserInterface.PLAYER_HEALTH_BAR_X, UserInterface.HEALTH_BAR_Y,
			UserInterface.HEALTH_BAR_WIDTH, UserInterface.HEALTH_BAR_HEIGHT, Direction.Left, this.player.health,
			this.player.totalHealth, { paddingColour: Colour.LostHealthBlack });

		this.opponentHealthBar.prepareForUseInNewEnvironment(UserInterface.OPPONENT_HEALTH_BAR_X, UserInterface.HEALTH_BAR_Y,
			UserInterface.HEALTH_BAR_WIDTH, UserInterface.HEALTH_BAR_HEIGHT, Direction.Right, this.opponent.health,
			this.opponent.totalHealth, { paddingColour: Colour.LostHealthBlack });

		this.playerSuperBar.prepareForUseInNewEnvironment(UserInterface.PLAYER_SUPER_METER_X, UserInterface.PLAYER_SUPER_METER_Y,
			UserInterface.PLAYER_SUPER_METER_WIDTH, UserInterface.PLAYER_SUPER_METER_HEIGHT, Direction.Up, this.player.superProgress,
			this.player.superThreshold, { meterColour: Colour.FillSuperBlue });
	}

	update(dt) {
		this.updateHealthMeterColour(this.playerHealthBar);
		this.updateHealthMeterColour(this.opponentHealthBar);
	}

	updateHealthMeterColour(progressBar) {
		if (progressBar.getZeroToOneRangeOfMeterFilled() <= this.lowHealthZeroToOneRange) {
			progressBar.meterColour = Colour.Crimson;
		}
		else {
			progressBar.meterColour = Colour.Gold;
		}
	}

	updatePlayerSuperMeter() {
		this.playerSuperBar.updateMeterProgress(this.player.superProgress, this.player.superThreshold);
		if (this.playerSuperBar.getZeroToOneRangeOfMeterFilled() >= 1 || this.player.rushMode) {
			this.playerSuperBar.meterColour = Colour.FullSuperRed;
		}
		else {
			this.playerSuperBar.meterColour = Colour.FillSuperBlue;
		}
	}

	render() {
		this.playerHealthBar.render();
		this.opponentHealthBar.render();
		this.playerSuperBar.render();
	}

	static renderBattleTimeRemainingPanel(battleTimeRemaining) {
		// Assisted by the user interface in the Match 3 assignment
		context.save();
		context.fillStyle = Colour.PanelGrey;
		context.translate(UserInterface.BATTLE_TIME_REMAINING_PANEL_X, UserInterface.BATTLE_TIME_REMAINING_PANEL_Y);
		roundedRectangle(
			context,
			0,
			0,
			UserInterface.BATTLE_TIME_REMAINING_PANEL_WIDTH,
			UserInterface.BATTLE_TIME_REMAINING_PANEL_HEIGHT,
			UserInterface.BATTLE_TIME_REMAINING_PANEL_RADIUS,
			true,
			true,
		);
		context.fillStyle = Colour.UserInterfaceTextYellow;
		context.font = `100px ${FontName.QuillSword}`;
		context.textAlign = 'center';
		context.fillText(battleTimeRemaining, UserInterface.BATTLE_TIME_REMAINING_NUMBER_X, UserInterface.BATTLE_TIME_REMAINING_NUMBER_Y);
		context.restore();
	}

	static renderScore(score) {
		context.save();
		context.fillStyle = Colour.UserInterfaceTextYellow;
		context.font = `50px ${FontName.ComicSansMSGras}`;
		context.textAlign = 'left';
		context.fillText(`Score: ${Math.floor(score)}`, UserInterface.SCORE_DISPLAY_X, UserInterface.STATISTIC_DISPLAY_Y);
		context.restore();
	}

	static renderOpponentLevel(opponentLevel) {
		context.save();
		context.fillStyle = Colour.UserInterfaceTextYellow;
		context.font = `50px ${FontName.ComicSansMSGras}`;
		context.textAlign = 'right';
		context.fillText(`Level: ${opponentLevel}`, UserInterface.OPPONENT_LEVEL_DISPLAY_X, UserInterface.STATISTIC_DISPLAY_Y);
		context.restore();
	}
}