import OpponentIdlingState from "../OpponentIdlingState.js";
import { didSucceedPercentChance } from "../../../../../lib/RandomNumberHelpers.js"
import OpponentStateName from "../../../../enums/OpponentStateName.js";
import Animation from "../../../../../lib/Animation.js";
import Hitbox from "../../../../../lib/Hitbox.js";

export default class RatKingIdleState extends OpponentIdlingState {

    static ATTACK_CHANCE = 0.05;

    static NORMAL_STAB_ATTACK_ID = 0;
    static SIDE_STAB_ATTACK_ID = 1;
    static UPPERCUT_ATTACK_ID = 2;

    static PHASE_TWO_HEALTH_DIVISOR = 3;
    static PHASE_TWO_NORMAL_STAB_CHANCE = 0.50;
    static PHASE_THREE_UPPERCUT_CHANCE = 0.90;

    /**
     * This class defines the unique attacks and behaviors which
     * the Rat King will perform while idle.
     */
    constructor(opponent) {
        super(opponent);

        this.defaultHurtbox = new Hitbox(this.position.x + 10, this.position.y + 10, this.dimensions.x, this.dimensions.y)

        //Idle definitions
        this.animation = new Animation([0, 1], 0.2);

        this.hurtboxes = [
            this.defaultHurtbox,
            this.defaultHurtbox
        ];

        //Attack definitions
        this.attackAnimations = [
            new Animation([8, 8, 9, 9, 9, 0], 0.3, 1, true),
            new Animation([6, 6, 6, 7, 7, 7, 0], 0.3, 1, true),
            new Animation([10, 11, 11, 11, 0], 0.4, 1, true),
        ]

        this.attacks = [
            {
                Hitboxes: [
                    [],
                    [],
                    [new Hitbox(this.position.x + this.dimensions.x / 2, this.dimensions.y / 2 + 200, 10, 80)],
                    [],
                    [],
                    []
                ],
                Hurtboxes: [
                    this.defaultHurtbox,
                    this.defaultHurtbox,
                    this.defaultHurtbox,
                    this.defaultHurtbox,
                    this.defaultHurtbox,
                    this.defaultHurtbox
                ],
                Damage: 10
            },
            {
                Hitboxes: [
                    [],
                    [],
                    [],
                    [new Hitbox(this.position.x, this.dimensions.y / 2 + 200, this.dimensions.x / 2, 80)],
                    [],
                    [],
                    [],
                    []
                ],
                Hurtboxes: [
                    new Hitbox(this.position.x + 10, this.position.y + 10, this.dimensions.x / 3, this.dimensions.y),
                    new Hitbox(this.position.x + 10, this.position.y + 10, this.dimensions.x / 3, this.dimensions.y),
                    new Hitbox(this.position.x + 10, this.position.y + 10, this.dimensions.x / 3, this.dimensions.y),
                    new Hitbox(this.position.x + 10, this.position.y + 10, this.dimensions.x / 3, this.dimensions.y),
                    new Hitbox(this.position.x + 10, this.position.y + 10, this.dimensions.x / 3, this.dimensions.y),
                    new Hitbox(this.position.x + 10, this.position.y + 10, this.dimensions.x / 3, this.dimensions.y),
                    new Hitbox(this.position.x + 10, this.position.y + 10, this.dimensions.x / 3, this.dimensions.y),
                    new Hitbox(this.position.x + 10, this.position.y + 10, this.dimensions.x / 3, this.dimensions.y)
                ],
                Damage: 20
            },
            {
                Hitboxes: [
                    [],
                    [new Hitbox(this.position.x + this.dimensions.x / 2, this.dimensions.y / 2, 10, this.dimensions.y)],
                    [],
                    [],
                    [],
                ],
                Hurtboxes: [
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(this.position.x + 10, this.position.y + 10, this.dimensions.x, this.dimensions.y),
                    new Hitbox(this.position.x + 10, this.position.y + 10, this.dimensions.x, this.dimensions.y),
                    new Hitbox(),
                ],
                Damage: 30
            },
        ]

    }

    update() {
        super.update();

        // Random chance to do an attack
        if (didSucceedPercentChance(RatKingIdleState.ATTACK_CHANCE)) {
            let attackId = RatKingIdleState.NORMAL_STAB_ATTACK_ID;

            // Phase 1
            if (this.opponent.health === this.opponent.totalHealth) {
                // Normal stab
                attackId = RatKingIdleState.NORMAL_STAB_ATTACK_ID;
            }
            // Phase 2
            else if (this.opponent.health > this.opponent.totalHealth / RatKingIdleState.PHASE_TWO_HEALTH_DIVISOR) {
                if (didSucceedPercentChance(RatKingIdleState.PHASE_TWO_NORMAL_STAB_CHANCE)) {
                    // Normal stab
                    attackId = RatKingIdleState.NORMAL_STAB_ATTACK_ID;
                }
                else {
                    // Side stab
                    attackId = RatKingIdleState.SIDE_STAB_ATTACK_ID;
                }
            }
            // Phase 3
            else {
                if (didSucceedPercentChance(RatKingIdleState.PHASE_THREE_UPPERCUT_CHANCE)) {
                    // Uppercut
                    attackId = RatKingIdleState.UPPERCUT_ATTACK_ID;
                }
                else {
                    // Normal stab
                    attackId = RatKingIdleState.NORMAL_STAB_ATTACK_ID;
                }
            }
            
            this.opponent.changeState(OpponentStateName.Attacking, { attack: this.attacks[attackId], animation: this.attackAnimations[attackId] });
        }
    }
}