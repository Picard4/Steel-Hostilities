import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import GameEntity from "./GameEntity.js";
import { context, DEBUG, CANVAS_HEIGHT, CANVAS_WIDTH, images, timer, sounds } from "../globals.js";
import StateMachine from "../../lib/StateMachine.js";
import PlayerStateName from "../enums/PlayerStateName.js";
import PlayerIdlingState from "../states/entity/player/PlayerIdlingState.js";
import PlayerAttackingState from "../states/entity/player/PlayerAttackingState.js";
import PlayerDodgingState from "../states/entity/player/PlayerDodgingState.js";
import Animation from "../../lib/Animation.js";
import Hitbox from "../../lib/Hitbox.js";
import Vector from "../../lib/Vector.js";
import PlayerHitstunState from "../states/entity/player/PlayerHitstunState.js";
import Colour from "../enums/Colour.js";
import PlayerAttackName from "../enums/PlayerAttackName.js";
import ProgressBar from "../services/user-interface/ProgressBar.js";
import SoundName from "../enums/SoundName.js";

export default class Player extends GameEntity {

    static TOTAL_SPRITES_X = 6;
    static TOTAL_SPRITES_Y = 3;
    static WIDTH = 200;
    static HEIGHT = 400;
    static SPRITE_WIDTH = 250;
    static SPRITE_HEIGHT = 400;
    static PLAYER_ALPHA = 0.7;
    static SCALE = { x: 1, y: 1 };
    static PLAYER_DEFAULT_POSITION = new Vector(CANVAS_WIDTH / 2 - Player.SPRITE_WIDTH / 2, CANVAS_HEIGHT - Player.SPRITE_HEIGHT);

    static TOTAL_HEALTH = 200;
    static SUPER_THRESHOLD = 100;

    static PUNCH_ATTACK_DAMAGE = 10;
    static SWORD_ATTACK_DAMAGE = 25;
    static SUPER_ATTACK_DAMAGE = 50;

    static SUPER_ACTIVATED_TWEEN_DURATION = 0.3;
    static RUSH_MODE_TIME_LIMIT = 2.5;
    static RUSH_MODE_ENDED_TWEEN_DURATION = 0.1;

    /** 
     * The character which the player controls. 
     * - Some code borrowed from Pokemon 7 - Player.js
     */
    constructor(entityDefinition = {}) {
        entityDefinition.position = entityDefinition.position ?? new Vector(CANVAS_WIDTH / 2 - Player.SPRITE_WIDTH / 2, CANVAS_HEIGHT - Player.SPRITE_HEIGHT);
        entityDefinition.dimensions = entityDefinition.dimensions ?? new Vector(Player.WIDTH, Player.HEIGHT);
        super(entityDefinition);

        this.startingPosition = new Vector(entityDefinition.position.x, entityDefinition.position.y);
        this.totalHealth = entityDefinition.totalHealth ?? Player.TOTAL_HEALTH;
        this.superThreshold = entityDefinition.superThreshold ?? Player.SUPER_THRESHOLD;

        this.healthBar = new ProgressBar();
        this.superBar = new ProgressBar();

        this.sprites = Player.generateSprites();
        this.alpha = Player.PLAYER_ALPHA;
        this.currentAnimation = new Animation([0], 1);

        this.stateMachine = this.initializeStateMachine();

        // The moves that the player must perform to make the most of Rush Mode
        // Inspired by: https://www.youtube.com/watch?v=w5WXN27xSN4
        this.requiredRushModeInputs = [PlayerAttackName.LeftPunch, PlayerAttackName.LeftPunch, PlayerAttackName.RightPunch, PlayerAttackName.RightPunch,
            PlayerAttackName.LeftSword, PlayerAttackName.LeftSword, PlayerAttackName.RightSword, PlayerAttackName.RightSword, PlayerAttackName.Super];
        
        this.getReadyForTheNextBattle();
    }

    update(dt) {
        super.update(dt);
        this.currentAnimation.update(dt);
    }

    render() {
        if (DEBUG) {
            this.hitboxes.forEach((hitbox) => {
                hitbox.render(context);
            });
            this.hurtbox.render(context, Colour.Blue);
        }

        context.save();

        context.globalAlpha = this.alpha;
        this.currentFrame = this.currentAnimation.getCurrentFrame();
        super.render(this.position.x, this.position.y, Player.SCALE);

        // Fully render the Player's super sprites if they are using their super
        if (this.currentAnimation.getCurrentFrame() == 16 || this.currentAnimation.getCurrentFrame() == 14) {
            this.sprites[15].render(this.position.x - 1, this.position.y - Player.SPRITE_HEIGHT);
        }

        context.restore();
    }

    getReadyForTheNextBattle() {
        // Reset some of the player's values to prepare for a new battle
        this.health = this.totalHealth;
        this.superProgress = 0;
        this.position = new Vector(this.startingPosition.x, this.startingPosition.y);
        this.hitboxes = [];
        this.hurtbox = new Hitbox();
        this.currentAttackName = PlayerAttackName.RightPunch;
        this.currentAttackDamageOutput = 0;
        this.currentAttackHitstunTime = 0;
        this.currentAttackSoundEffect = SoundName.PunchHitSound;
        this.stateMachine.change(PlayerStateName.Idle);
    }

    isCurrentlyPossibleToGainSuperMeter() {
        // The player cannot gain super meter while in rush mode
        if (this.rushMode) {
            return false;
        }

        // The player should not be able to gain super meter if they are currently using a super attack
        switch (this.currentAttackName) {
            case PlayerAttackName.Super:
                return false;
            default:
                return true;
        }
    }

    canUseSuper() {
        // The player can use their super if they have a full super meter, or if they are in rush mode and are meant to use their super next
        return this.superProgress >= this.superThreshold || (this.requiredRushModeInputs[this.requiredRushModeInputsIterator] === PlayerAttackName.Super && this.rushMode);
    }

    canActivateRushMode() {
        // The player can activate rush mode when they have a full super meter, and are at low health
        return this.superProgress >= this.superThreshold && (this.totalHealth / GameEntity.LOW_HEALTH_DIVISOR) >= this.health;
    }

    drainSuperMeter() {
        // Drain the player's Super meter as they unleash their super
        this.superProgress = 0;
        this.superBar.updateMeterProgressWithTween(this.superProgress, this.superThreshold, Player.SUPER_ACTIVATED_TWEEN_DURATION);
    }

    activateRushMode() {
        // Start rush mode, then drain the player's super meter at the same pace as the time which they have to unleash the full capabilities of rush mode
        this.rushMode = true;
        this.requiredRushModeInputsIterator = 0;
        this.superProgress = 0;
        sounds.play(SoundName.RushModeStartedSound);
        this.superBar.updateMeterProgressWithTween(this.superProgress, this.superThreshold, Player.RUSH_MODE_TIME_LIMIT, () => { this.endRushMode(); });
    }

    checkAttackWithRequiredRushModeInputs(attackType) {
        if (attackType === this.requiredRushModeInputs[this.requiredRushModeInputsIterator]) {
            // If the player performed the next required input, advance the iterator to the next input
            this.requiredRushModeInputsIterator++;
        }
        else {
            // End rush mode if the player performed the incorrect input
            this.endRushMode();
        }

        if (this.requiredRushModeInputsIterator >= this.requiredRushModeInputs.length) {
            // End rush mode if the player performed every input successfully
            this.endRushMode();
        }
    }

    endRushMode() {
        // There is no need to end rush mode if it is not active
        if (!this.rushMode) {
            return;
        }

        // Throw the player out of rush mode, then quickly tween their super meter and play a sound effect to indicate that rush mode has expired
        this.rushMode = false;
        this.requiredRushModeInputsIterator = 0;
        sounds.play(SoundName.RushModeEndedSound);
        this.superBar.updateMeterProgressWithTween(this.superProgress, this.superThreshold, Player.RUSH_MODE_ENDED_TWEEN_DURATION);
    }

    static generateSprites() {
        const sprites = [];

        for (let y = 0; y < Player.TOTAL_SPRITES_Y; y++) {
            for (let x = 0; x < Player.TOTAL_SPRITES_X; x++) {
                sprites.push(new Sprite(
                    images.get(ImageName.PlayerSprites),
                    x * Player.SPRITE_WIDTH,
                    y * Player.SPRITE_HEIGHT,
                    Player.SPRITE_WIDTH,
                    Player.SPRITE_HEIGHT,
                ));
            }
        }

        return sprites;
    }

    initializeStateMachine() {
        const stateMachine = new StateMachine();

        stateMachine.add(PlayerStateName.Idle, new PlayerIdlingState(this));
        stateMachine.add(PlayerStateName.Attacking, new PlayerAttackingState(this));
        stateMachine.add(PlayerStateName.Dodging, new PlayerDodgingState(this));
        stateMachine.add(PlayerStateName.Hitstun, new PlayerHitstunState(this));

        stateMachine.change(PlayerStateName.Idle);

        return stateMachine;
    }
}