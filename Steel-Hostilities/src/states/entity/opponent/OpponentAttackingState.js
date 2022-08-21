import State from "../../../../lib/State.js";
import Opponent from "../../../entities/Opponent.js";
import OpponentStateName from "../../../enums/OpponentStateName.js";

export default class OpponentAttackingState extends State {
    
    
    
    /**
     * In this state, the opponent performs an attack
     * to hit the player. Once the move is finished, the
     * opponent returns to the idle state.
     */
    constructor(opponent) {
        super();

        this.opponent = opponent;
        this.currentAttack = null;
    }

    enter(parameters) {
        this.opponent.currentAnimation = parameters.animation;
        this.opponent.currentAnimation.refresh();
        this.currentAttack = parameters.attack;
    }

    update() {
        // Update the opponent's hitboxes and hurtboxes to match the animation
        this.opponent.hitboxes = this.currentAttack.Hitboxes[this.opponent.currentAnimation.currentFrame];
        this.opponent.hurtbox = this.currentAttack.Hurtboxes[this.opponent.currentAnimation.currentFrame];
        this.opponent.attackDamage = this.calculateAttackDamage();

        if (this.opponent.currentAnimation.isDone()) {
            this.opponent.currentAnimation.refresh();
            this.opponent.changeState(OpponentStateName.Idle);
        }
    }

    exit() {
        this.opponent.currentAnimation.refresh();
        this.opponent.attackDamage = Opponent.ATTACK_DAMAGE_DEFAULT;
    }

    calculateAttackDamage() {
        // This formula will increase the damage that an opponent can deal based on their level. 
        // The standard amount of damage is dealt at level 1
        return this.currentAttack.Damage * (Math.pow(Opponent.LEVEL_ATTACK_DAMAGE_MULTIPLIER, this.opponent.level - 1));
    }

}