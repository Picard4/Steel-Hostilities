import Opponent from "../entities/Opponent.js";
import Player from "../entities/Player.js";
import { context, images, sounds, stateMachine, timer } from "../globals.js";
import GameStateName from "../enums/GameStateName.js";
import PlayerStateName from "../enums/PlayerStateName.js";
import OpponentStateName from "../enums/OpponentStateName.js";
import UserInterface from "../services/user-interface/UserInterface.js";
import LoseCondition from "../enums/LoseCondition.js";
import GameEntity from "../entities/GameEntity.js";
import SoundName from "../enums/SoundName.js";


export default class Battlefield {

	static HEALTH_LOSS_TWEEN_DURATION = 0.6;

	/**
	 * A location where the player and their opponent do battle. 
	 * Oversees the player, the opponent, and the general rules of the game.
	 * 
	 * - Assistance provided by the Dungeon class from the Zelda assignment.
	 * 
	 * @param {Player} player 
	 * @param {Opponent} opponent 
	 * @param {number} score 
	 * @param {string} background
	 */
	constructor(player, opponent, score, background) {
		this.player = player;
		this.opponent = opponent;
		this.score = score;
		this.background = background;
		this.userInterface = new UserInterface(player, opponent, 1 / GameEntity.LOW_HEALTH_DIVISOR);

		this.dizzyTimer = opponent.dizzyTimer;
		this.battleTimeRemaining = opponent.battleTime;

		// Start the battle timer
		this.battleTimer = timer.addTask(() => { this.battleTimeRemaining -= 1 }, 1,
			this.battleTimeRemaining, () => {
				sounds.play(SoundName.TimeOverSound);
				stateMachine.change(GameStateName.GameOver, { battlefield: this, loseConditionMessage: LoseCondition.OutOfTime });
			});
	}

	update(dt) {
		this.player.update(dt);
		this.opponent.update(dt);

		this.evaluateCollisions();
		this.userInterface.update(dt);
		this.checkForKnockout();
	}

	evaluateCollisions() {
		// Check to see if any collisions happen

		// Collisions from the Player to the Opponent
		for (let playerHitboxIterator = 0; playerHitboxIterator < this.player.hitboxes.length; playerHitboxIterator++) {
			if (this.player.hitboxes[playerHitboxIterator].didCollide(this.opponent.hurtbox)) {
				
				if (this.opponent.stateMachine.currentState.name === OpponentStateName.Idle && !this.player.rushMode) {
					// If the opponent is hit while idle, they will block the attack.
					// Any attacks performed in rush mode are unblockable
					this.opponent.changeState(OpponentStateName.Blocking, { hitstunTime: this.player.currentAttackHitstunTime });
	
					// The player loses super meter for having their attack blocked to discourage spamming
					this.player.superProgress = Math.max(0, this.player.superProgress - this.player.currentAttackDamageOutput);
					this.userInterface.updatePlayerSuperMeter();
				}
				else if (this.opponent.stateMachine.currentState.name === OpponentStateName.Dizzy) {
					// If the opponent is hit while dizzy, they will experience hitstun
					this.opponent.changeState(OpponentStateName.Hitstun, { damage: this.player.currentAttackDamageOutput, hitstunTime: this.player.currentAttackHitstunTime, soundEffect: this.player.currentAttackSoundEffect });
	
					// The player gains super meter for landing their attack, if they are currently able to do so
					if (this.player.isCurrentlyPossibleToGainSuperMeter()) {
						this.player.superProgress = Math.min(this.player.superThreshold, this.player.superProgress + this.player.currentAttackDamageOutput);
						this.userInterface.updatePlayerSuperMeter();
					}
	
					// Give the player points for landing an attack successfully
					this.score += this.player.currentAttackDamageOutput;
				}
				else {
					// If the opponent is hit while in any other state, they will become dizzy for a set period of time, and experience hitstun
					this.opponent.changeState(OpponentStateName.Hitstun, { damage: this.player.currentAttackDamageOutput, hitstunTime: this.player.currentAttackHitstunTime, soundEffect: this.player.currentAttackSoundEffect });
					timer.wait(this.dizzyTimer, () => {
						if (this.opponent.health > 0) {
							this.opponent.changeState(OpponentStateName.Idle);
						}
					});
	
					// The player gains super meter for landing their attack, if they are currently able to do so
					if (this.player.isCurrentlyPossibleToGainSuperMeter()) {
						this.player.superProgress = Math.min(this.player.superThreshold, this.player.superProgress + this.player.currentAttackDamageOutput);
						this.userInterface.updatePlayerSuperMeter();
					}
	
					// Give the player points for landing an attack successfully
					this.score += this.player.currentAttackDamageOutput;
				}
	
				// Update the opponent's health meter with a tween
				this.userInterface.opponentHealthBar.updateMeterProgressWithTween(this.opponent.health, this.opponent.totalHealth, Battlefield.HEALTH_LOSS_TWEEN_DURATION);
				
				// As the opponent has now been hit, there is no need to keep evaluating the player's hitboxes
				break;
			}
		}

		// Collisions from the Opponent to the Player
		for (let opponentHitboxIterator = 0; opponentHitboxIterator < this.opponent.hitboxes.length; opponentHitboxIterator++) {
			if (this.opponent.hitboxes[opponentHitboxIterator].didCollide(this.player.hurtbox)) {
				this.player.changeState(PlayerStateName.Hitstun, { damage: this.opponent.attackDamage });

				// Update the player's health meter with a tween
				this.userInterface.playerHealthBar.updateMeterProgressWithTween(this.player.health, this.player.totalHealth, Battlefield.HEALTH_LOSS_TWEEN_DURATION);

				// As the player is now in hitstun, there is no need to keep evaluating the Opponent's hitboxes
				break;
			}
		}
	}

	checkForKnockout() {
		// Check if either the player or opponent lost
		if (this.player.health <= 0) {
			this.battleTimer.isDone = true;
			stateMachine.change(GameStateName.GameOver, { battlefield: this, loseConditionMessage: LoseCondition.OutOfHealth });
		}
		if (this.opponent.health <= 0) {
			this.battleTimer.isDone = true;
			stateMachine.change(GameStateName.Victory, { battlefield: this });
		}
	}

	render() {
		// Render the background stage
		images.render(this.background, 0, 0);

		// Render player on top of opponent (render opponent first)
		this.opponent.render();
		this.player.render();

		// Render the user interface
		this.userInterface.render();
		UserInterface.renderBattleTimeRemainingPanel(this.battleTimeRemaining);
		UserInterface.renderScore(this.score);
		UserInterface.renderOpponentLevel(this.opponent.level);

		context.restore();
	}
}