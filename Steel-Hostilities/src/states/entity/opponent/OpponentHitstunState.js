import State from "../../../../lib/State.js";
import Animation from "../../../../lib/Animation.js";
import Hitbox from "../../../../lib/Hitbox.js";
import OpponentStateName from "../../../enums/OpponentStateName.js";
import { sounds } from "../../../globals.js";
import SoundName from "../../../enums/SoundName.js";

export default class OpponentHitstunState extends State {



    /**
     * In this state the opponent is in hitstun and
     * cannot do anything until the hitstun time is over.
     * The opponent is also invincible during this time.
     */
    constructor(opponent) {
        super();

        this.opponent = opponent;
        this.attackSoundEffect = SoundName.PunchHitSound;
    }

    enter(parameters) {

        // Set the opponent's hitstun animation, and then remove their hitboxes and hurtbox
        this.opponent.currentAnimation = new Animation([2, 3], parameters.hitstunTime, 1);
        this.opponent.currentAnimation.refresh();
        this.opponent.hurtbox = new Hitbox();
        this.opponent.hitboxes = [];

        // Damage the opponent
        this.opponent.health -= parameters.damage;

        // Stop the last sound effect that was used for the opponent getting hit
        sounds.stop(this.attackSoundEffect);

        // Play a sound effect when the opponent gets hit, corresponding to the attack that was used against them
        this.attackSoundEffect = parameters.soundEffect ?? SoundName.PunchHitSound;
        sounds.play(this.attackSoundEffect);
    }

    update() {
        // Switch the opponent to the dizzy state once their hitstun concludes
        // Health check for victory state animations
        if (this.opponent.currentAnimation.isDone() && this.opponent.health > 0) {
            this.opponent.currentAnimation.refresh();
            this.opponent.changeState(OpponentStateName.Dizzy);
        }
    }

}