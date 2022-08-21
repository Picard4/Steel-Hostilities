import Hitbox from "../../../../../lib/Hitbox.js";
import OpponentIdlingState from "../OpponentIdlingState.js";
import Animation from "../../../../../lib/Animation.js";
import { didSucceedPercentChance } from "../../../../../lib/RandomNumberHelpers.js";
import OpponentStateName from "../../../../enums/OpponentStateName.js";

export default class SkeletonIdleState extends OpponentIdlingState {

    static ATTACK_CHANCE = 0.05;

    static NORMAL_COUNTERABLE_STAB_ATTACK_ID = 0;
    static NORMAL_STAB_ATTACK_ID = 1;
    static TRICKY_STAB_ATTACK_ID = 2;
    static SUPER_MOVE_ATTACK_ID = 3;

    static PHASE_ONE_HEALTH_MULTIPLIER = 0.90;
    static PHASE_ONE_COUNTERABLE_NORMAL_STAB_CHANCE = 0.70;

    static PHASE_TWO_HEALTH_MULTIPLIER = 0.40;
    static PHASE_TWO_COUNTERABLE_NORMAL_STAB_CHANCE = 0.50;
    static PHASE_TWO_NORMAL_STAB_CHANCE = 0.50

    static PHASE_THREE_NORMAL_STAB_CHANCE = 0.50;
    static PHASE_THREE_TRICKY_STAB_CHANCE = 0.50;

    /**
     * This class defines the uniques attacks and behaviors which
     * the Skeleton will perform while idle.
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
            new Animation([6, 6, 6, 7, 8, 8, 0], 0.3, 1, true),
            new Animation([7, 7, 8, 8, 0], 0.3, 1, true),
            new Animation([7, 7, 9, 9, 9, 8, 8, 0], 0.3, 1, true),
            new Animation([10, 10, 11, 11, 0], 0.5, 1, true)
        ]

        this.attacks = [
            {
                Hitboxes: [
                    [],
                    [],
                    [],
                    [],
                    [new Hitbox(this.position.x + this.dimensions.x / 2, this.dimensions.y / 2 + 200, 10, 80)],
                    [],
                    [],
                ],
                Hurtboxes: [
                    this.defaultHurtbox,
                    this.defaultHurtbox,
                    this.defaultHurtbox,
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
                ],
                Damage: 20
            },
            {
                Hitboxes: [
                    [],
                    [],
                    [new Hitbox(this.position.x + this.dimensions.x / 2, this.dimensions.y / 2 + 200, 10, 80)],
                    [],
                    [],
                ],
                Hurtboxes: [
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
                ],
                Damage: 10
            },
            {
                Hitboxes: [
                    [],
                    [],
                    [],
                    [],
                    [],
                    [new Hitbox(this.position.x + this.dimensions.x / 2, this.dimensions.y / 2 + 200, 10, 80)],
                    [],
                    [],
                ],
                Hurtboxes: [
                    new Hitbox(),
                    new Hitbox(),
                    this.defaultHurtbox,
                    this.defaultHurtbox,
                    this.defaultHurtbox,
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
                ],
                Damage: 30
            },
            {
                Hitboxes: [
                    [],
                    [],
                    [new Hitbox(this.position.x + this.dimensions.x / 2, this.dimensions.y / 2 + 200, 10, 80)],
                    [new Hitbox(this.position.x + this.dimensions.x / 2, this.dimensions.y / 2 + 200, 10, 80)],
                    [],
                ],
                Hurtboxes: [
                    this.defaultHurtbox,
                    this.defaultHurtbox,
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
                ],
                Damage: 40
            },
        ]


    }

    update() {
        super.update();

        // Random chance to attack
        if (didSucceedPercentChance(SkeletonIdleState.ATTACK_CHANCE)) {
            let attackId = SkeletonIdleState.NORMAL_COUNTERABLE_STAB_ATTACK_ID;

            // Phase 1
            if (this.opponent.health >= this.opponent.totalHealth * SkeletonIdleState.PHASE_ONE_HEALTH_MULTIPLIER) {
                if (didSucceedPercentChance(SkeletonIdleState.PHASE_ONE_COUNTERABLE_NORMAL_STAB_CHANCE)) {
                    //Normal Counterable Stab
                    attackId = SkeletonIdleState.NORMAL_COUNTERABLE_STAB_ATTACK_ID;
                }
                else {
                    //Normal Stab
                    attackId = SkeletonIdleState.NORMAL_STAB_ATTACK_ID;
                }
            }
            // Phase 2
            else if (this.opponent.health >= this.opponent.totalHealth * SkeletonIdleState.PHASE_TWO_HEALTH_MULTIPLIER) {
                if (didSucceedPercentChance(SkeletonIdleState.PHASE_TWO_COUNTERABLE_NORMAL_STAB_CHANCE)) {
                    //Normal Counterable Stab
                    attackId = SkeletonIdleState.NORMAL_COUNTERABLE_STAB_ATTACK_ID;
                }
                else if (didSucceedPercentChance(SkeletonIdleState.PHASE_TWO_NORMAL_STAB_CHANCE)) {
                    //Normal Stab
                    attackId = SkeletonIdleState.NORMAL_STAB_ATTACK_ID;
                }
                else {
                    //Tricky Stab
                    attackId = SkeletonIdleState.TRICKY_STAB_ATTACK_ID;
                }
            }
            // Phase 3
            else {
                if (didSucceedPercentChance(SkeletonIdleState.PHASE_THREE_NORMAL_STAB_CHANCE)) {
                    //Normal Stab
                    attackId = SkeletonIdleState.NORMAL_STAB_ATTACK_ID;
                }
                else if (didSucceedPercentChance(SkeletonIdleState.PHASE_THREE_TRICKY_STAB_CHANCE)) {
                    //Tricky Stab
                    attackId = SkeletonIdleState.TRICKY_STAB_ATTACK_ID;
                }
                else {
                    //Super Move
                    attackId = SkeletonIdleState.SUPER_MOVE_ATTACK_ID;
                }
            }

            this.opponent.changeState(OpponentStateName.Attacking, { attack: this.attacks[attackId], animation: this.attackAnimations[attackId] });
        }
    }
}