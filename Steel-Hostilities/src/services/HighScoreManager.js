/**
 * This class is responsible for reading and writing the high scores
 * of our game to and from the browser's local storage. Local storage
 * is a simple way to store small key/value pairs (kind of like cookies)
 * for a particular domain on your browser.
 * 
 * Class imported from the Breakout assignment.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 */
 export default class HighScoreManager {

    static LOCAL_STORAGE_KEY = "steelHostilitiesHighScores"
    static MAX_HIGH_SCORES = 10;
    static DEFAULT_HIGH_SCORE_INDEX_MULTIPLIER = 100;
    static PLACEHOLDER_HIGH_SCORE_NAME = 'AAA';

	static loadHighScores() {
		/**
		 * Since the high scores are being saved as a string containing JSON,
		 * we must parse the string into a valid JavaScript object in order
		 * to manipulate it.
		 */
		const highScores = JSON.parse(localStorage.getItem(HighScoreManager.LOCAL_STORAGE_KEY)) ?? [];

		if (highScores.length === 0) {
			// If there are no scores, we want to populate the scores array with placeholders.
			for (let i = HighScoreManager.MAX_HIGH_SCORES; i > 0; i--) {
				highScores.push({ name: HighScoreManager.PLACEHOLDER_HIGH_SCORE_NAME, score: i * HighScoreManager.DEFAULT_HIGH_SCORE_INDEX_MULTIPLIER });
			}

			/**
			 * Since the high scores are represented as a JavaScript object,
			 * we must turn the object into a string in order to be able to
			 * save it using local storage.
			 */
			localStorage.setItem(HighScoreManager.LOCAL_STORAGE_KEY, JSON.stringify(highScores));
		}

		return highScores;
	}

	static addHighScore(name, score) {
		let highScores = HighScoreManager.loadHighScores();

		// Add the new score to the high scores array.
		highScores.push({ name: name, score: score });

		/**
		 * Sort the scores from highest to lowest.
		 *
		 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
		 */
		highScores = highScores.sort((a, b) => b.score - a.score);

		/**
		 * Only keep the top 10 scores.
		 *
		 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
		 */
		highScores = highScores.slice(0, HighScoreManager.MAX_HIGH_SCORES);

		/**
		 * Since the high scores are represented as a JavaScript object,
		 * we must turn the object into a string in order to be able to
		 * save it using local storage.
		 */
		localStorage.setItem(HighScoreManager.LOCAL_STORAGE_KEY, JSON.stringify(highScores));
	}

	/**
	 * Determines if the sent score is a high score or not, and returns the result.
	 * Implementation taken from Breakout's GameOverState.
	 * 
	 * The some() method tests whether at least one element in the array passes the
	 * test implemented by the provided function. It returns true if, in the array,
	 * it finds an element for which the provided function returns true; otherwise
	 * it returns false. It doesn't modify the array.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
	 * 
	 * @param {number} score The score to be compared against the saved high scores.
	 * @returns Whether the sent score is greater than any current high score.
	 */
	static isHighScore(score) {
		return HighScoreManager.loadHighScores().some((highScore) => score > highScore.score);
	}
}