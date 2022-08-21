import Sprite from "../../lib/Sprite.js";
import GameEntity from "./GameEntity.js";
import { context, DEBUG, images } from "../globals.js";
import Animation from "../../lib/Animation.js";
import Hitbox from "../../lib/Hitbox.js";
import Colour from "../enums/Colour.js";
import ProgressBar from "../services/user-interface/ProgressBar.js";

export default class Opponent extends GameEntity {

    static SCALE = { x: 1, y: 1 };
    static ATTACK_DAMAGE_DEFAULT = 10;
    static TOTAL_HEALTH_DEFAULT = 100;
    static DEFAULT_DIZZY_TIMER = 1.5;
    static DEFAULT_BATTLE_TIME = 90;
    static DEFAULT_LEVEL = 1;
    static LEVEL_ATTACK_DAMAGE_MULTIPLIER = 1.1;

    /** 
     * The opponent whom the player faces off against.
     * - Some code borrowed from Pokemon 7 - Player.js
     */

    constructor(entityDefinition = {}) {
        super(entityDefinition);

        this.currentAnimation = new Animation([0], 1);
        this.hitboxes = [];
        this.hurtbox = new Hitbox();
        this.attackDamage = entityDefinition.attackDamage ?? Opponent.ATTACK_DAMAGE_DEFAULT;
        this.totalHealth = entityDefinition.totalHealth ?? Opponent.TOTAL_HEALTH_DEFAULT;
        this.battleTime = entityDefinition.battleTime ?? Opponent.DEFAULT_BATTLE_TIME;
        this.dizzyTimer = entityDefinition.dizzyTimer ?? Opponent.DEFAULT_DIZZY_TIMER;
        this.level = entityDefinition.level ?? Opponent.DEFAULT_LEVEL;
        this.health = this.totalHealth;

        this.healthBar = new ProgressBar();
    }

    update(dt) {
        super.update(dt);
        this.currentAnimation.update(dt);
    }

    render() {
        this.currentFrame = this.currentAnimation.getCurrentFrame();
        super.render(this.position.x, this.position.y, Opponent.SCALE);

        if (DEBUG) {
            this.hitboxes.forEach((hitbox) => {
                hitbox.render(context);
            });
            this.hurtbox.render(context, Colour.Blue);
        }
    }

    initializeStateMachine() { }

    static generateSprites(imageName, spriteWidth, spriteHeight, totalSpritesX, totalSpritesY) {
        const sprites = [];

        for (let spriteIteratorY = 0; spriteIteratorY < totalSpritesY; spriteIteratorY++) {
            for (let spriteIteratorX = 0; spriteIteratorX < totalSpritesX; spriteIteratorX++) {
                sprites.push(new Sprite(
                    images.get(imageName),
                    spriteIteratorX * spriteWidth,
                    spriteIteratorY * spriteHeight,
                    spriteWidth,
                    spriteHeight,
                ));
            }

        }

        return sprites;
    }

    isFinalBoss() {
        // The opponent who is the final boss of this game will override this method to return true
        return false;
    }
}