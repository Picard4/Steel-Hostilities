import Animation from "../../../../lib/Animation.js";
import Hitbox from "../../../../lib/Hitbox.js";
import State from "../../../../lib/State.js";

export default class OpponentIdlingState extends State {
    
    
    
    /**
     * In this state, the Opponent is idle and 
     * can decide to perform many actions. The 
     * player can also influence which state
     * the Opponent goes to.
     */
    constructor(opponent) {
        super();

        this.opponent = opponent;
        this.position = this.opponent.position;
        this.dimensions = this.opponent.dimensions;
        this.animation = new Animation([0], 1);
        this.hurtboxes = [new Hitbox()];
    }

    enter() {
        this.opponent.currentAnimation = this.animation;
        this.opponent.currentAnimation.refresh();

        // Remove the opponent's hitboxes in case any of them are lingering
        this.opponent.hitboxes = [];
    }

    update() {
        this.opponent.hurtbox = this.hurtboxes[this.opponent.currentAnimation.currentFrame];
    }

    exit() {
        this.animation.refresh();
    }

}