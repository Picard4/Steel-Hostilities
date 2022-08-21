import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import { context, sounds, timer } from "../../globals.js";
import Battlefield from "../../objects/Battlefield.js";
import OpponentFactory from "../../services/OpponentFactory.js";
import OpponentType from "../../enums/OpponentType.js";
import ImageName from "../../enums/ImageName.js";
import SoundName from "../../enums/SoundName.js";

export default class PlayState extends State {

	/**
	 * The game state used for managing battles between a player and an individual opponent.
	 */
	constructor() {
		super();
	}

	enter(parameters) {
		this.score = parameters.score ?? 0;
		this.opponentLevel = parameters.opponentLevel ?? 1;
		this.player = parameters.player ?? new Player();
		this.opponentType = parameters.opponentType ?? OpponentType.RatKing;

		// Decide background based on the upcoming opponent
		switch (this.opponentType) {
			case OpponentType.Skeleton:
				this.background = ImageName.SkeletonStage;
				break;
			case OpponentType.BigChungus:
				this.background = ImageName.BigChungusStage;
				break;
			default:
				this.background = ImageName.RatKingStage;
				break;
		}

		this.battlefield = new Battlefield(this.player, OpponentFactory.createInstance(this.opponentType, { level: this.opponentLevel }),
			this.score, this.background);

		sounds.play(SoundName.BattleTheme);
	}

	update(dt) {
		timer.update(dt);
		this.battlefield.update(dt);
	}

	render() {
		context.save();
		this.battlefield.render();
		context.restore();
	}

	exit() {
		sounds.stop(SoundName.BattleTheme);
	}
}
