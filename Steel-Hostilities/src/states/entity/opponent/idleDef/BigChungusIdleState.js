import OpponentIdlingState from "../OpponentIdlingState.js";
import { didSucceedPercentChance, getRandomPositiveInteger } from "../../../../../lib/RandomNumberHelpers.js"
import OpponentStateName from "../../../../enums/OpponentStateName.js";
import Animation from "../../../../../lib/Animation.js";
import Hitbox from "../../../../../lib/Hitbox.js";

export default class BigChungusIdleState extends OpponentIdlingState {

    static ATTACK_CHANCE = 0.04;

    /**
     * This class defines the unique attacks and behaviors which
     * Big Chungus will perform while idle.
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
            // Rat King
            new Animation([18, 8, 8, 9, 9, 9, 0], 0.3, 1, true),
            new Animation([18, 6, 6, 6, 7, 7, 7, 0], 0.3, 1, true),
            new Animation([18, 10, 11, 11, 11, 0], 0.4, 1, true),
            // Skeleton
            new Animation([18, 12, 12, 12, 13, 14, 14, 0], 0.3, 1, true),
            new Animation([18, 13, 13, 14, 14, 0], 0.3, 1, true),
            new Animation([18, 13, 13, 15, 15, 15, 14, 14, 0], 0.3, 1, true),
            new Animation([18, 16, 16, 17, 17, 0], 0.5, 1, true),
            // Big Chungus
            new Animation([18, 19], 0.5, 1, true) 
        ]

        this.attacks = [
            // Rat King
            {   
                Hitboxes: [
                    [],
                    [],
                    [],
                    [new Hitbox(this.position.x + this.dimensions.x / 2, this.dimensions.y / 2 + 200, 10, 80)],
                    [],
                    [],
                    []
                ],
                Hurtboxes: [
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
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
                    [],
                    [new Hitbox(this.position.x, this.dimensions.y / 2 + 200, this.dimensions.x / 2, 80)],
                    [],
                    [],
                    [],
                    []
                ],
                Hurtboxes: [
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
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
                    [],
                    [new Hitbox(this.position.x + this.dimensions.x / 2, this.dimensions.y / 2, 10, this.dimensions.y)],
                    [],
                    [],
                    [],
                ],
                Hurtboxes: [
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(this.position.x + 10, this.position.y + 10, this.dimensions.x, this.dimensions.y),
                    new Hitbox(this.position.x + 10, this.position.y + 10, this.dimensions.x, this.dimensions.y),
                    new Hitbox(),
                ],
                Damage: 30
            },
            // Skeleton
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
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
                    this.defaultHurtbox,
                    this.defaultHurtbox
                ],
                Damage: 20
            },
            {
                Hitboxes: [
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
                    new Hitbox(),
                    new Hitbox(),
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
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
                    this.defaultHurtbox,
                    this.defaultHurtbox,
                ],
                Damage: 30
            },
            {
                Hitboxes: [
                    [],
                    [],
                    [],
                    [new Hitbox(this.position.x + this.dimensions.x / 2, this.dimensions.y / 2 + 200, 10, 80)],
                    [new Hitbox(this.position.x + this.dimensions.x / 2, this.dimensions.y / 2 + 200, 10, 80)],
                    [],
                ],
                Hurtboxes: [
                    new Hitbox(),
                    this.defaultHurtbox,
                    this.defaultHurtbox,
                    new Hitbox(),
                    new Hitbox(),
                    new Hitbox(),
                ],
                Damage: 40
            },
            // Big Chungus
            {
                Hitboxes: [
                    [],
                    [new Hitbox(this.position.x + this.dimensions.x - 100, this.dimensions.y / 2 + 200, 500, 80),
                    new Hitbox(this.position.x - 360, this.dimensions.y / 2 + 200, 500, 80)],
                ],
                Hurtboxes: [
                    new Hitbox(),
                    this.defaultHurtbox,
                ],
                Damage: 50
            }
        ]

    }

    update() {
        super.update();

        if (didSucceedPercentChance(BigChungusIdleState.ATTACK_CHANCE)) {
            let attackId = getRandomPositiveInteger(0, this.attacks.length - 1);

            this.opponent.changeState(OpponentStateName.Attacking, { attack: this.attacks[attackId], animation: this.attackAnimations[attackId] });
        }
    }
}