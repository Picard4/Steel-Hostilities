import Animation from "../../../../lib/Animation.js";
import Hitbox from "../../../../lib/Hitbox.js";
import State from "../../../../lib/State.js";
import OpponentStateName from "../../../enums/OpponentStateName.js";
import SoundName from "../../../enums/SoundName.js";
import { sounds } from "../../../globals.js";

export default class OpponentBlockingState extends State {

    static BLOCKING_TIME_HITSTUN_ADDITION = 0.075;

    /**
     * In this state, the Opponent blocks
     * the player's attack and takes no
     * damage. Usually triggered from idle
     * state.
     */
    constructor(opponent) {
        super();

        this.opponent = opponent;
    }

    enter(parameters) {
        // Set the opponent's blocking animation, with the time varying based on the blocked attack's hitstun time
        this.opponent.currentAnimation = new Animation([5, 0], parameters.hitstunTime + OpponentBlockingState.BLOCKING_TIME_HITSTUN_ADDITION, 1);
        this.opponent.currentAnimation.refresh();

        // The opponent cannot hit anything while blocking, but they are also invincible
        this.opponent.hitboxes = [];
        this.opponent.hurtbox = new Hitbox();

        // Play the blocking sound
        sounds.stop(SoundName.BlockedHitSound);
        sounds.play(SoundName.BlockedHitSound);
    }

    update() {
        // Return to idle state once blocking concludes
        if (this.opponent.currentAnimation.isDone()) {
            this.opponent.currentAnimation.refresh();
            this.opponent.changeState(OpponentStateName.Idle);
        }
    }

}