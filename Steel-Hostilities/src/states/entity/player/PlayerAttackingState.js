import State from "../../../../lib/State.js";
import Animation from "../../../../lib/Animation.js";
import PlayerAttackName from "../../../enums/PlayerAttackName.js";
import PlayerStateName from "../../../enums/PlayerStateName.js";
import Hitbox from "../../../../lib/Hitbox.js";
import Player from "../../../entities/Player.js";
import SoundName from "../../../enums/SoundName.js";

export default class PlayerAttackingState extends State {

    static STANDARD_ATTACK_INTERVAL = 0.2;
    static SWORD_ATTACK_INTERVAL = 0.3;
    static RUSH_ATTACK_INTERVAL = 0.1;

    static STANDARD_HITSTUN_TIME = 0.4;
    static SWORD_HITSTUN_TIME = 0.7;
    static SUPER_PREP_HITSTUN_TIME = 0.3;
    static SUPER_HITSTUN_TIME = 0.5;
    static STANDARD_RUSH_HITSTUN_TIME = 0.075;

    /**
     * In this state, the player is attacking
     * the opponent. Depending on what button
     * the player pressed, a different attack
     * will occur.
     * 
     * - Some code borrowed from zelda 5 - PlayerSwordSwingingState.js
     */
    constructor(player) {
        super();

        this.player = player;
        this.position = this.player.position;
        this.dimensions = this.player.dimensions;

        this.defaultPlayerHurtbox = new Hitbox(this.position.x + 25, this.position.y + 25, this.dimensions.x, this.dimensions.y);

        this.standardAnimation = {
            [PlayerAttackName.LeftPunch]: new Animation([2, 3, 0], PlayerAttackingState.STANDARD_ATTACK_INTERVAL, 1),
            [PlayerAttackName.RightPunch]: new Animation([4, 5, 0], PlayerAttackingState.STANDARD_ATTACK_INTERVAL, 1),
            [PlayerAttackName.LeftSword]: new Animation([9, 10, 10, 11, 11, 0], PlayerAttackingState.SWORD_ATTACK_INTERVAL, 1),
            [PlayerAttackName.RightSword]: new Animation([6, 7, 7, 8, 8, 0], PlayerAttackingState.SWORD_ATTACK_INTERVAL, 1),
            [PlayerAttackName.Super]: new Animation([6, 7, 8, 16, 14, 0], PlayerAttackingState.STANDARD_ATTACK_INTERVAL, 1)
        }

        this.rushAnimation = {
            [PlayerAttackName.LeftPunch]: new Animation([2, 3, 0], PlayerAttackingState.RUSH_ATTACK_INTERVAL, 1),
            [PlayerAttackName.RightPunch]: new Animation([4, 5, 0], PlayerAttackingState.RUSH_ATTACK_INTERVAL, 1),
            [PlayerAttackName.LeftSword]: new Animation([9, 10, 11, 0], PlayerAttackingState.RUSH_ATTACK_INTERVAL, 1),
            [PlayerAttackName.RightSword]: new Animation([6, 7, 8, 0], PlayerAttackingState.RUSH_ATTACK_INTERVAL, 1),
            [PlayerAttackName.Super]: new Animation([6, 7, 16, 14, 0], PlayerAttackingState.RUSH_ATTACK_INTERVAL, 1)
        }

        // Attack Definitions
        this.standardAttacks = {
            [PlayerAttackName.LeftPunch]: {
                Hitboxes: [
                    [],
                    [new Hitbox(this.position.x, this.position.y + 100, 75, 75)],
                    []
                ],
                Hurtboxes: [
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox
                ],
                Damage: [
                    0,
                    Player.PUNCH_ATTACK_DAMAGE,
                    0
                ],
                Hitstun: [
                    0,
                    PlayerAttackingState.STANDARD_HITSTUN_TIME,
                    0
                ],
                Sounds: [
                    SoundName.PunchHitSound,
                    SoundName.PunchHitSound,
                    SoundName.PunchHitSound
                ]
            },
            [PlayerAttackName.RightPunch]: {
                Hitboxes: [
                    [],
                    [new Hitbox(this.position.x + 200, this.position.y + 100, 75, 75)],
                    []
                ],
                Hurtboxes: [
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox
                ],
                Damage: [
                    0,
                    Player.PUNCH_ATTACK_DAMAGE,
                    0
                ],
                Hitstun: [
                    0,
                    PlayerAttackingState.STANDARD_HITSTUN_TIME,
                    0
                ],
                Sounds: [
                    SoundName.PunchHitSound,
                    SoundName.PunchHitSound,
                    SoundName.PunchHitSound
                ]
            },
            [PlayerAttackName.LeftSword]: {
                Hitboxes: [
                    [],
                    [],
                    [],
                    [new Hitbox(this.position.x, this.position.y + 100, 75, 200)],
                    [],
                    [],
                ],
                Hurtboxes: [
                    new Hitbox(),
                    new Hitbox(),
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox
                ],
                Damage: [
                    0,
                    0,
                    0,
                    Player.SWORD_ATTACK_DAMAGE,
                    0,
                    0
                ],
                Hitstun: [
                    0,
                    0,
                    0,
                    PlayerAttackingState.SWORD_HITSTUN_TIME,
                    0,
                    0
                ],
                Sounds: [
                    SoundName.SwordHitSound,
                    SoundName.SwordHitSound,
                    SoundName.SwordHitSound,
                    SoundName.SwordHitSound,
                    SoundName.SwordHitSound,
                    SoundName.SwordHitSound
                ]
            },
            [PlayerAttackName.RightSword]: {
                Hitboxes: [
                    [],
                    [],
                    [],
                    [new Hitbox(this.position.x + 200, this.position.y + 100, 75, 200)],
                    [],
                    [],
                ],
                Hurtboxes: [
                    new Hitbox(),
                    new Hitbox(),
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox
                ],
                Damage: [
                    0,
                    0,
                    0,
                    Player.SWORD_ATTACK_DAMAGE,
                    0,
                    0
                ],
                Hitstun: [
                    0,
                    0,
                    0,
                    PlayerAttackingState.SWORD_HITSTUN_TIME,
                    0,
                    0
                ],
                Sounds: [
                    SoundName.SwordHitSound,
                    SoundName.SwordHitSound,
                    SoundName.SwordHitSound,
                    SoundName.SwordHitSound,
                    SoundName.SwordHitSound,
                    SoundName.SwordHitSound
                ]
            },
            [PlayerAttackName.Super]: {
                Hitboxes: [
                    [],
                    [],
                    [new Hitbox(this.position.x + 100, this.position.y + 100, 75, 200)],
                    [new Hitbox(this.position.x + 100, this.position.y + 100, 75, 200)],
                    [],
                    []
                ],
                Hurtboxes: [
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox
                ],
                Damage: [
                    0,
                    0,
                    Player.SWORD_ATTACK_DAMAGE,
                    Player.SUPER_ATTACK_DAMAGE,
                    0,
                    0
                ],
                Hitstun: [
                    0,
                    0,
                    PlayerAttackingState.SUPER_PREP_HITSTUN_TIME,
                    PlayerAttackingState.SUPER_HITSTUN_TIME,
                    0,
                    0
                ],
                Sounds: [
                    SoundName.SuperHitSound,
                    SoundName.SuperHitSound,
                    SoundName.SwordHitSound,
                    SoundName.SuperHitSound,
                    SoundName.SuperHitSound,
                    SoundName.SuperHitSound
                ]
            }
        }

        // Rush attack definitions
        // The opponent generally experiences hitstun for less time if they were hit while the player was in rush mode
        // This is done to encourage the player to combo the opponent
        this.rushAttacks = {
            [PlayerAttackName.LeftPunch]: {
                Hitboxes: [
                    [],
                    [new Hitbox(this.position.x, this.position.y + 100, 75, 75)],
                    []
                ],
                Hurtboxes: [
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox
                ],
                Damage: [
                    0,
                    Player.PUNCH_ATTACK_DAMAGE,
                    0
                ],
                Hitstun: [
                    0,
                    PlayerAttackingState.STANDARD_RUSH_HITSTUN_TIME,
                    0
                ],
                Sounds: [
                    SoundName.PunchHitSound,
                    SoundName.PunchHitSound,
                    SoundName.PunchHitSound
                ]
            },
            [PlayerAttackName.RightPunch]: {
                Hitboxes: [
                    [],
                    [new Hitbox(this.position.x + 200, this.position.y + 100, 75, 75)],
                    []
                ],
                Hurtboxes: [
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox
                ],
                Damage: [
                    0,
                    Player.PUNCH_ATTACK_DAMAGE,
                    0
                ],
                Hitstun: [
                    0,
                    PlayerAttackingState.STANDARD_RUSH_HITSTUN_TIME,
                    0
                ],
                Sounds: [
                    SoundName.PunchHitSound,
                    SoundName.PunchHitSound,
                    SoundName.PunchHitSound
                ]
            },
            [PlayerAttackName.LeftSword]: {
                Hitboxes: [
                    [],
                    [],
                    [new Hitbox(this.position.x, this.position.y + 100, 75, 200)],
                    []
                ],
                Hurtboxes: [
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox
                ],
                Damage: [
                    0,
                    0,
                    Player.SWORD_ATTACK_DAMAGE,
                    0
                ],
                Hitstun: [
                    0,
                    0,
                    PlayerAttackingState.STANDARD_RUSH_HITSTUN_TIME,
                    0
                ],
                Sounds: [
                    SoundName.SwordHitSound,
                    SoundName.SwordHitSound,
                    SoundName.SwordHitSound,
                    SoundName.SwordHitSound
                ]
            },
            [PlayerAttackName.RightSword]: {
                Hitboxes: [
                    [],
                    [],
                    [new Hitbox(this.position.x + 200, this.position.y + 100, 75, 200)],
                    []
                ],
                Hurtboxes: [
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox
                ],
                Damage: [
                    0,
                    0,
                    Player.SWORD_ATTACK_DAMAGE,
                    0
                ],
                Hitstun: [
                    0,
                    0,
                    PlayerAttackingState.STANDARD_RUSH_HITSTUN_TIME,
                    0
                ],
                Sounds: [
                    SoundName.SwordHitSound,
                    SoundName.SwordHitSound,
                    SoundName.SwordHitSound,
                    SoundName.SwordHitSound
                ]
            },
            [PlayerAttackName.Super]: {
                Hitboxes: [
                    [],
                    [],
                    [new Hitbox(this.position.x + 100, this.position.y + 100, 75, 200)],
                    [],
                    []
                ],
                Hurtboxes: [
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox,
                    this.defaultPlayerHurtbox
                ],
                Damage: [
                    0,
                    0,
                    Player.SUPER_ATTACK_DAMAGE,
                    0,
                    0
                ],
                Hitstun: [
                    0,
                    0,
                    PlayerAttackingState.SUPER_HITSTUN_TIME,
                    0,
                    0
                ],
                Sounds: [
                    SoundName.SuperHitSound,
                    SoundName.SuperHitSound,
                    SoundName.SuperHitSound,
                    SoundName.SuperHitSound,
                    SoundName.SuperHitSound
                ]
            }
        }
    }

    enter(parameters) {

        // Change the properties of the player's attack depending on whether they are in Rush Mode or not
        if (this.player.rushMode) {
            this.player.checkAttackWithRequiredRushModeInputs(parameters.attack);
            this.player.currentAnimation = this.rushAnimation[parameters.attack];
            this.currentAttack = this.rushAttacks[parameters.attack];
        }
        else {
            this.player.currentAnimation = this.standardAnimation[parameters.attack];
            this.currentAttack = this.standardAttacks[parameters.attack];
        }

        // Set the name of the attack that the player is currently executing
        this.player.currentAttackName = parameters.attack;
    }

    update() {
        // Update the player's hitboxes and hurtboxes to match the animation
        this.player.hitboxes = this.currentAttack.Hitboxes[this.player.currentAnimation.currentFrame];
        this.player.hurtbox = this.currentAttack.Hurtboxes[this.player.currentAnimation.currentFrame];

        // Update the damage and hitstun time that the player can output along with the corresponding sound effect to match their current move
        this.player.currentAttackDamageOutput = this.currentAttack.Damage[this.player.currentAnimation.currentFrame];
        this.player.currentAttackHitstunTime = this.currentAttack.Hitstun[this.player.currentAnimation.currentFrame];
        this.player.currentAttackSoundEffect = this.currentAttack.Sounds[this.player.currentAnimation.currentFrame];

        // Switch to idle state once the attack is complete, unless a state change has already occurred
        if (this.player.currentAnimation.isDone() && this.player.stateMachine.currentState === this) {
            this.player.currentAnimation.refresh();
            this.player.changeState(PlayerStateName.Idle);
        }
    }

    exit() {
        this.player.currentAnimation.refresh();
    }

}