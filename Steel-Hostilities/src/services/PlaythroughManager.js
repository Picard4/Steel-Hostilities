/**
 * This class is responsible for reading and writing the defining values of one's playthrough to and from the browser's local storage.
 * By managing one's playthrough, the user can resume where they left off after shutting down the game. 
 * 
 * - Class assisted by the HighScoreManager in the Breakout assignment.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 */
 export default class PlaythroughManager {

    static LOCAL_STORAGE_KEY = "steelHostilitiesPlaythrough"

	static loadPlaythrough() {
		/**
		 * Since the playthrough data is being saved as a string containing JSON,
		 * we must parse the string into a valid JavaScript object in order
		 * to manipulate it.
		 */
		const playthroughData = JSON.parse(localStorage.getItem(PlaythroughManager.LOCAL_STORAGE_KEY)) ?? {};

		// To prevent save scumming, delete the user's playthrough data upon loading it
		PlaythroughManager.deletePlaythroughData();

		return playthroughData;
	}

	static saveCurrentPlaythrough(score, level, opponentType) {
		/**
		 * Create an object out of the sent values and save it in local storage as a string.
		 */
		localStorage.setItem(PlaythroughManager.LOCAL_STORAGE_KEY, JSON.stringify({
			score: score,
			opponentLevel: level,
			opponentType: opponentType
		}));
	}

	static deletePlaythroughData() {
		localStorage.removeItem(PlaythroughManager.LOCAL_STORAGE_KEY);
	}
}