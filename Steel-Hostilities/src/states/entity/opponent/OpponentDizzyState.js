import Animation from "../../../../lib/Animation.js";
import Hitbox from "../../../../lib/Hitbox.js";
import State from "../../../../lib/State.js";

export default class OpponentDizzyState extends State {
    
    
    
    /**
     * In this state, the Opponent is dizzy
     * and cannot do anything unless hit or
     * a state change is triggered outside
     * of dizzy.
     */
    constructor(opponent) {
        super();

        this.opponent = opponent;
        this.position = this.opponent.position;
        this.dimensions = this.opponent.dimensions;
        this.animation = new Animation([3, 3], 1);
        this.hurtboxes = [
            new Hitbox(this.position.x + 10, this.position.y + 10, this.dimensions.x, this.dimensions.y),
            new Hitbox(this.position.x + 10, this.position.y + 10, this.dimensions.x, this.dimensions.y)
        ];

    }

    enter() {
        // The opponent cannot hit anything while dizzy
        this.opponent.hitboxes = [];

        this.opponent.currentAnimation = this.animation;
        this.opponent.currentAnimation.refresh();
    }

    update() {
        this.opponent.hurtbox = this.hurtboxes[this.opponent.currentAnimation.currentFrame];
    }
}