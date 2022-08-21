import State from "../../../../lib/State.js";
import Animation from "../../../../lib/Animation.js";
import PlayerStateName from "../../../enums/PlayerStateName.js";
import Hitbox from "../../../../lib/Hitbox.js";
import Direction from "../../../enums/Direction.js";
import { timer } from "../../../globals.js";

export default class PlayerAttackingState extends State {
    
    
    
    /**
     * In this state, the player moves either left or right, then returns to their original position through use of tweens.
     * This state is useful for dodging enemy attacks, as most of them will aim at the player's starting position.
     */
    constructor(player) {
        super();

        this.player = player;
        this.dimensions = this.player.dimensions;

        this.dodgeTime = 0.6;
        this.animation = {
            [Direction.Left]: new Animation([12, 0], 1),
            [Direction.Right]: new Animation([13, 0], 1)
        }

    }

    enter(parameters) {
        this.player.currentAnimation = this.animation[parameters.direction];
        this.direction = parameters.direction;

        switch (parameters.direction) {
            case Direction.Left:
                this.dodgePosition = this.player.position.x - this.dimensions.x;
                break;
            default:
                this.dodgePosition = this.player.position.x + this.dimensions.x
                break;
        }

        // Move the player back and forth for a dodge
        timer.tween(this.player.position, ['x'], [this.dodgePosition], this.dodgeTime / 2, () => {
            timer.tween(this.player.position, ['x'], [this.player.startingPosition.x], this.dodgeTime / 2, () => {
                this.finishDodge();
            });
        });
    }

    update() {
        // Update player hurtbox accordingly
        if (this.direction == Direction.Left) {
            this.player.hurtbox = new Hitbox(this.player.position.x + 30, this.player.position.y + 25, this.dimensions.x - 150, this.dimensions.y);
        }
        else if (this.direction == Direction.Right) {
            this.player.hurtbox = new Hitbox(this.player.position.x + this.dimensions.x / 2, this.player.position.y + 25, this.dimensions.x - 150, this.dimensions.y);
        }
    }

    finishDodge() {
        // Change the state, unless another occurrence caused that to happen already
        if (this.player.stateMachine.currentState !== this) {
            return;
        }

        this.player.currentAnimation.refresh();
        this.player.changeState(PlayerStateName.Idle);
    }
}