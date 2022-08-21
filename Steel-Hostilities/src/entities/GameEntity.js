import Vector from "../../lib/Vector.js";

export default class GameEntity {

  static LOW_HEALTH_DIVISOR = 5;

  /**
  * The base class for game entities in this game.
  *  - Code taken from Pokemon 7 & Angry Birds 6, GameEntity.js
  * 
  * @param {object} entityDefinition 
  */
  constructor(entityDefinition = {}) {
    this.position = entityDefinition.position ?? new Vector();
    this.dimensions = entityDefinition.dimensions ?? new Vector();
    this.stateMachine = null;
    this.currentFrame = 0;
    this.sprites = [];
  }

  update(dt) {
    this.stateMachine?.update(dt);
  }

  render(x, y, scale = { x: 1, y: 1 }) {
    this.stateMachine?.render();
    this.sprites[this.currentFrame].render(x, y, scale);
  }

  changeState(state, params) {
    this.stateMachine?.change(state, params);
  }

}