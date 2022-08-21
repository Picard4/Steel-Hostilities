import State from "../../../../lib/State.js";
import PlayerAttackName from "../../../enums/PlayerAttackName.js";
import PlayerStateName from "../../../enums/PlayerStateName.js";
import { keys, sounds } from "../../../globals.js";
import Animation from "../../../../lib/Animation.js";
import Hitbox from "../../../../lib/Hitbox.js";
import Direction from "../../../enums/Direction.js";
import SoundName from "../../../enums/SoundName.js";

export default class PlayerIdlingState extends State {
    
    
    
    /**
     * In this state, the player is idling
     * and awaiting the user to press a 
     * button to perform an action. In this
     * state, the player is vulnerable to 
     * attack by the opponent. 
     * 
     * - some code borrowed from zelda 5 - PlayerIdlingState.js
     */
    constructor(player) {
        super();

        this.player = player;
        this.position = this.player.position;
        this.dimensions = this.player.dimensions;

        this.animation = new Animation([0, 1], 0.3);

        this.hurtboxes = [
            new Hitbox(this.position.x + 30, this.position.y + 25, this.dimensions.x, this.dimensions.y),
            new Hitbox(this.position.x + 30, this.position.y + 25, this.dimensions.x, this.dimensions.y),
        ];

    }

    enter() {
        this.player.currentAnimation = this.animation;
        this.player.currentAnimation.refresh();

        // Ensure that the player cannot break the game by forcing their position to the starting coordinates, and removing their hitboxes
        this.player.position.x = this.player.startingPosition.x;
        this.player.position.y = this.player.startingPosition.y;
        this.player.hitboxes = [];
    }

    update() {
        this.player.hurtbox = this.hurtboxes[this.player.currentAnimation.getCurrentFrame()];

        this.checkForButtonPress();
    }

    checkForButtonPress() {
        // Attacks
        if (keys.k) {
            keys.k = false;
            this.player.changeState(PlayerStateName.Attacking, { attack: PlayerAttackName.LeftPunch });
        }
        else if (keys.l) {
            keys.l = false;
            this.player.changeState(PlayerStateName.Attacking, { attack: PlayerAttackName.RightPunch });
        }
        else if (keys.i) {
            keys.i = false;
            this.player.changeState(PlayerStateName.Attacking, { attack: PlayerAttackName.LeftSword });
        }
        else if (keys.o) {
            keys.o = false;
            this.player.changeState(PlayerStateName.Attacking, { attack: PlayerAttackName.RightSword });
        }
        // Super
        else if (keys[' '] && this.player.canUseSuper()) {
            keys[' '] = false;
            
            sounds.play(SoundName.SuperActivatedSound);
            this.player.changeState(PlayerStateName.Attacking, { attack: PlayerAttackName.Super });
            if (!this.player.rushMode) {
                this.player.drainSuperMeter();
            }
        }
        // Rush Mode
        else if (keys['Enter'] && this.player.canActivateRushMode()) {
            keys['Enter'] = false;

            this.player.activateRushMode();
        }
        // Dodges
        else if (keys.a) {
            keys.a = false;
            this.player.changeState(PlayerStateName.Dodging, { direction: Direction.Left });
        }
        else if (keys.d) {
            keys.d = false;
            this.player.changeState(PlayerStateName.Dodging, { direction: Direction.Right });
        }
    }

}