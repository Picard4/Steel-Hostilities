import ImageName from "../enums/ImageName.js";
import Opponent from "./Opponent.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../globals.js";
import Vector from "../../lib/Vector.js";
import OpponentStateName from "../enums/OpponentStateName.js";
import StateMachine from "../../lib/StateMachine.js";
import OpponentHitstunState from "../states/entity/opponent/OpponentHitstunState.js";
import OpponentAttackingState from "../states/entity/opponent/OpponentAttackingState.js";
import OpponentBlockingState from "../states/entity/opponent/OpponentBlockingState.js";
import OpponentDizzyState from "../states/entity/opponent/OpponentDizzyState.js";
import OpponentKnockedOutState from "../states/entity/opponent/OpponentKnockedOutState.js";
import BigChungusIdleState from "../states/entity/opponent/idleDef/BigChungusIdleState.js";

export default class BigChungus extends Opponent {

    static TOTAL_SPRITES_X = 6;
    static TOTAL_SPRITE_Y = 4;
    static WIDTH = 500;
    static HEIGHT = 550;
    static SPRITE_WIDTH = 500;
    static SPRITE_HEIGHT = 550;
    static TOTAL_HEALTH = 500;
    static RENDER_OFFSET = {x: -50, y: 0};
    static BATTLE_TIME = 100;
    static DIZZY_TIMER = 0.8;

    /** 
     * The secret opponent... The final boss!
     * - Some code borrowed from Pokemon 7 - Player.js
     * - Assisted by the Bird class in the Angry Birds assignment
     */

    constructor(entityDefinition = {}) {
        entityDefinition.position = entityDefinition.position ?? new Vector(CANVAS_WIDTH / 2 - BigChungus.WIDTH / 2, CANVAS_HEIGHT - BigChungus.HEIGHT);
        entityDefinition.dimensions = entityDefinition.dimensions ?? new Vector(BigChungus.WIDTH, BigChungus.HEIGHT);
        entityDefinition.totalHealth = entityDefinition.totalHealth ?? BigChungus.TOTAL_HEALTH;
        entityDefinition.battleTime = entityDefinition.battleTime ?? BigChungus.BATTLE_TIME;
        entityDefinition.dizzyTimer = entityDefinition.dizzyTimer ?? BigChungus.DIZZY_TIMER;
        super(entityDefinition);

        this.sprites = Opponent.generateSprites(ImageName.BigChungusSprites, BigChungus.SPRITE_WIDTH, BigChungus.SPRITE_HEIGHT, BigChungus.TOTAL_SPRITES_X, BigChungus.TOTAL_SPRITE_Y);
        this.stateMachine = this.initializeStateMachine();
    }

    update(dt) {
        super.update(dt);
    }

    render() {
        super.render();  
    }

    isFinalBoss() {
        return true;
    }

    initializeStateMachine(){
        const stateMachine = new StateMachine();

        stateMachine.add(OpponentStateName.Idle, new BigChungusIdleState(this));
        stateMachine.add(OpponentStateName.Hitstun, new OpponentHitstunState(this));
        stateMachine.add(OpponentStateName.Attacking, new OpponentAttackingState(this));
        stateMachine.add(OpponentStateName.Blocking, new OpponentBlockingState(this));
        stateMachine.add(OpponentStateName.Dizzy, new OpponentDizzyState(this));
        stateMachine.add(OpponentStateName.KnockedOut, new OpponentKnockedOutState(this));
        
        stateMachine.change(OpponentStateName.Idle);

        return stateMachine;
    }
}