import Animation from "../../../../lib/Animation.js";
import Hitbox from "../../../../lib/Hitbox.js";
import State from "../../../../lib/State.js";
import SoundName from "../../../enums/SoundName.js";
import { sounds } from "../../../globals.js";

export default class OpponentKnockedOutState extends State {

    /**
     * In this state, the Opponent has been knocked out, 
     * and will remain in this state until the battle that they are in ends.
     */
    constructor(opponent) {
        super();

        this.opponent = opponent;
        this.animation = new Animation([2], 1);
    }

    enter() {
        // Play sound when knocked out
        sounds.play(SoundName.KnockoutSound)
        
        this.opponent.currentAnimation = this.animation;
        this.opponent.currentAnimation.refresh();
        this.opponent.hitboxes = [];
        this.opponent.hurtbox = new Hitbox();
    }

    exit() {
        this.animation.refresh();
    }

}