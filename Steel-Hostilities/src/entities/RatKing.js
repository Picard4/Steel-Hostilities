import ImageName from "../enums/ImageName.js";
import Opponent from "./Opponent.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../globals.js";
import Vector from "../../lib/Vector.js";
import OpponentStateName from "../enums/OpponentStateName.js";
import StateMachine from "../../lib/StateMachine.js";
import OpponentHitstunState from "../states/entity/opponent/OpponentHitstunState.js";
import OpponentAttackingState from "../states/entity/opponent/OpponentAttackingState.js";
import RatKingIdleState from "../states/entity/opponent/idleDef/RatKingIdleState.js";
import OpponentBlockingState from "../states/entity/opponent/OpponentBlockingState.js";
import OpponentDizzyState from "../states/entity/opponent/OpponentDizzyState.js";
import OpponentKnockedOutState from "../states/entity/opponent/OpponentKnockedOutState.js";

export default class RatKing extends Opponent {

    static TOTAL_SPRITES_X = 6;
    static TOTAL_SPRITE_Y = 2
    static WIDTH = 500;
    static HEIGHT = 550;
    static SPRITE_WIDTH = 500;
    static SPRITE_HEIGHT = 550;
    static TOTAL_HEALTH = 300;
    static RENDER_OFFSET = {x: -50, y: 0};
    static BATTLE_TIME = 60;

    /** 
     * The first opponent which the player faces off against.
     * - Some code borrowed from Pokemon 7 - Player.js
     * - Assisted by the Bird class in the Angry Birds assignment
     */

    constructor(entityDefinition = {}) {
        entityDefinition.position = entityDefinition.position ?? new Vector(CANVAS_WIDTH / 2 - RatKing.WIDTH / 2, CANVAS_HEIGHT - RatKing.HEIGHT);
        entityDefinition.dimensions = entityDefinition.dimensions ?? new Vector(RatKing.WIDTH, RatKing.HEIGHT);
        entityDefinition.totalHealth = entityDefinition.totalHealth ?? RatKing.TOTAL_HEALTH;
        entityDefinition.battleTime = entityDefinition.battleTime ?? RatKing.BATTLE_TIME;
        super(entityDefinition);

        this.sprites = Opponent.generateSprites(ImageName.RatKingSprites, RatKing.SPRITE_WIDTH, RatKing.SPRITE_HEIGHT, RatKing.TOTAL_SPRITES_X, RatKing.TOTAL_SPRITE_Y);
        this.stateMachine = this.initializeStateMachine();
    }

    update(dt) {
        super.update(dt);
    }

    render() {
        super.render();  
    }

    initializeStateMachine(){
        const stateMachine = new StateMachine();

        stateMachine.add(OpponentStateName.Idle, new RatKingIdleState(this));
        stateMachine.add(OpponentStateName.Hitstun, new OpponentHitstunState(this));
        stateMachine.add(OpponentStateName.Attacking, new OpponentAttackingState(this));
        stateMachine.add(OpponentStateName.Blocking, new OpponentBlockingState(this));
        stateMachine.add(OpponentStateName.Dizzy, new OpponentDizzyState(this));
        stateMachine.add(OpponentStateName.KnockedOut, new OpponentKnockedOutState(this));
        
        stateMachine.change(OpponentStateName.Idle);

        return stateMachine;
    }
}