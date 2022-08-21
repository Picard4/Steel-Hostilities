import BigChungus from "../entities/BigChungus.js";
import RatKing from "../entities/RatKing.js";
import Skeleton from "../entities/Skeleton.js";
import OpponentType from "../enums/OpponentType.js";


export default class OpponentFactory {
	/**
	 * Encapsulates the instantiation logic for creating opponents.
	 * This method should be called when creating any new opponents.
	 *
	 * - Implementation assisted by the BirdFactory class from the Angry Birds assignment.
	 * 
	 * @param {String} opponentType Uses the OpponentType enum.
	 * @returns An instance of an Opponent.
	 */
	 static createInstance(opponentType, entityDefinition = {}) {
		switch (opponentType) {
			case OpponentType.Skeleton:
				return new Skeleton(entityDefinition);
			case OpponentType.BigChungus:
				return new BigChungus(entityDefinition);
			default:
				return new RatKing(entityDefinition);
		}
	}
}
