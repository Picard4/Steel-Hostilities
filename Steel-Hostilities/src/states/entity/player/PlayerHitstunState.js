import State from "../../../../lib/State.js";
import Animation from "../../../../lib/Animation.js";
import PlayerStateName from "../../../enums/PlayerStateName.js";
import Hitbox from "../../../../lib/Hitbox.js";
import { sounds, timer } from "../../../globals.js";
import SoundName from "../../../enums/SoundName.js";

export default class PlayerHitstunState extends State {
   
   
   
    /**
     * In this state, the player must is in
     * hitstun and cannot do anything until
     * the set hitstun time has ended. The player will then
     * change to idle state upon the time limit's expiration.
     */
    constructor(player) {
        super();

        this.player = player;
        this.dimensions = this.player.dimensions;

        this.hitstunTime = 1;
        this.animation = new Animation([4, 0], 1);
    }

    enter(parameters) {
        this.player.currentAnimation.refresh();
        this.player.currentAnimation = this.animation;
        this.player.currentAnimation.refresh();
        this.player.hurtbox = new Hitbox();
        this.player.hitboxes = [];

        // End the player's rush mode if they had it active
        this.player.endRushMode();

        // Lose health
        this.player.health -= parameters.damage;

        // Tween hitstun unless the player is already dead
        this.hitstunStartingPosition = this.player.position.y;
        if (this.player.health > 0) {
            timer.tween(this.player.position, ['y'], [this.hitstunStartingPosition + this.dimensions.y / 2], this.hitstunTime / 2, () => {
                timer.tween(this.player.position, ['y'], [this.player.startingPosition.y], this.hitstunTime / 2, () => {
                    this.finishHitstun();
                });
            });
        }

        // Play sound when player gets hit
        sounds.stop(SoundName.PlayerDamagedSound);
        sounds.play(SoundName.PlayerDamagedSound);
    }

    finishHitstun() {
        // Change the state, unless another occurrence caused that to happen already
        if (this.player.stateMachine.currentState !== this) {
            return;
        }

        this.player.currentAnimation.refresh();
        this.player.changeState(PlayerStateName.Idle);
    }
}