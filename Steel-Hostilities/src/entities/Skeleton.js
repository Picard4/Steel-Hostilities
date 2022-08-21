import StateMachine from "../../lib/StateMachine.js";
import Vector from "../../lib/Vector.js";
import ImageName from "../enums/ImageName.js";
import OpponentStateName from "../enums/OpponentStateName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../globals.js";
import SkeletonIdleState from "../states/entity/opponent/idleDef/SkeletonIdleState.js";
import OpponentAttackingState from "../states/entity/opponent/OpponentAttackingState.js";
import OpponentBlockingState from "../states/entity/opponent/OpponentBlockingState.js";
import OpponentDizzyState from "../states/entity/opponent/OpponentDizzyState.js";
import OpponentHitstunState from "../states/entity/opponent/OpponentHitstunState.js";
import OpponentKnockedOutState from "../states/entity/opponent/OpponentKnockedOutState.js";
import Opponent from "./Opponent.js";


export default class Skeleton extends Opponent{

    static TOTAL_SPRITES_X = 6;
    static TOTAL_SPRITE_Y = 2
    static WIDTH = 500;
    static HEIGHT = 550;
    static SPRITE_WIDTH = 500;
    static SPRITE_HEIGHT = 550;
    static TOTAL_HEALTH = 400;
    static RENDER_OFFSET = {x: -50, y: 0};
    static BATTLE_TIME = 70;

    /** 
     * The second opponent which the player faces off against.
     * - Some code borrowed from Pokemon 7 - Player.js
     * - Assisted by the Bird class in the Angry Birds assignment
     */

     constructor(entityDefinition = {}) {
        entityDefinition.position = entityDefinition.position ?? new Vector(CANVAS_WIDTH / 2 - Skeleton.WIDTH / 2, CANVAS_HEIGHT - Skeleton.HEIGHT);
        entityDefinition.dimensions = entityDefinition.dimensions ?? new Vector(Skeleton.WIDTH, Skeleton.HEIGHT);
        entityDefinition.totalHealth = entityDefinition.totalHealth ?? Skeleton.TOTAL_HEALTH;
        entityDefinition.battleTime = entityDefinition.battleTime ?? Skeleton.BATTLE_TIME;
        super(entityDefinition);

        this.sprites = Opponent.generateSprites(ImageName.SkeletonSprites, Skeleton.SPRITE_WIDTH, Skeleton.SPRITE_HEIGHT, Skeleton.TOTAL_SPRITES_X, Skeleton.TOTAL_SPRITE_Y);
        this.stateMachine = this.initializeStateMachine();
    }

    update(dt) {
        super.update(dt);
    }

    render() {
        super.render();  
    }
    
    initializeStateMachine() {
        const stateMachine = new StateMachine();

        stateMachine.add(OpponentStateName.Idle, new SkeletonIdleState(this));
        stateMachine.add(OpponentStateName.Hitstun, new OpponentHitstunState(this));
        stateMachine.add(OpponentStateName.Attacking, new OpponentAttackingState(this));
        stateMachine.add(OpponentStateName.Blocking, new OpponentBlockingState(this));
        stateMachine.add(OpponentStateName.Dizzy, new OpponentDizzyState(this));
        stateMachine.add(OpponentStateName.KnockedOut, new OpponentKnockedOutState(this));
        
        stateMachine.change(OpponentStateName.Idle);

        return stateMachine;
    }
}