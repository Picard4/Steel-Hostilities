/**
 * Title: Steel Hostilities
 *
 * Authors
 * Ryan Bujold and Palmarino DiMarco
 *
 * Brief description
 * In this sports/fighting game, you play as a warrior tasked with defeating as many opponents as possible in a combat tournament.
 * Use dodges (a, d) to avoid attacks from your opponents, then counterattack with punches (k, l) and sword slashes (i, o).
 * Punches come out quickly but do little damage, whereas sword slashes are slow, yet can deal more damage, and make you invincible during some of the startup frames.
 * If your accuracy with attacks is high, you will fill a super meter that allows you to perform one strong attack with the Spacebar.
 * Meter is gained by landing attacks, and lost upon your attacks being blocked.
 * Should you find yourself with low health and have a full super meter, try activating Rush Mode with Enter! 
 * It is difficult to take full advantage of Rush Mode, but it can tremendously turn the tides of battle if used well.
 * 
 * Asset sources
 * 
 * Backgrounds:
 * https://www.renderosity.com/rr/mod/bcs/medieval-hallway/10386
 * https://opengameart.org/content/background-night
 * https://opengameart.org/content/background-5
 * https://pixabay.com/photos/corridor-cave-arena-roman-tunnel-4415517/
 * 
 * Sprites:
 * https://big-chungus.fandom.com/wiki/Big_Chungus_(Character)
 * https://en.wikipedia.org/wiki/Trollface
 * 
 * Fonts:
 * https://www.wfonts.com/font/comic-sans-ms
 * https://www.dafont.com/quill-sword.font
 * https://www.dafont.com/swordsman.font
 * https://www.dafont.com/among-us.font
 * 
 * Songs:
 * https://opengameart.org/content/setting-relaxing-orchestra
 * https://opengameart.org/content/boss-battle-emotional-uplifting-metal-rock
 * https://opengameart.org/content/victory-1
 * https://opengameart.org/content/game-over
 * 
 * Sounds:
 * https://www.bfxr.net/
 * https://clideo.com/cut-audio
 * https://freesound.org/people/Eponn/sounds/547042/
 * https://freesound.org/people/SlavicMagic/sounds/446014/
 * https://freesound.org/people/timmy_h123/sounds/160394/
 * https://freesound.org/people/Syna-Max/sounds/54985/
 * https://freesound.org/people/nekoninja/sounds/370204/
 * https://freesound.org/people/smokebomb99/sounds/147288/
 * https://freesound.org/people/nekoninja/sounds/512785/
 */

import GameStateName from "./enums/GameStateName.js";
import Game from "../lib/Game.js";
import {
	canvas,
	context,
	fonts,
	images,
	keys,
	sounds,
	stateMachine,
} from "./globals.js";

import PlayState from "./states/game/PlayState.js";
import GameOverState from "./states/game/GameOverState.js";
import VictoryState from "./states/game/VictoryState.js";
import TitleScreenState from "./states/game/TitleScreenState.js";
import HighScoreState from "./states/game/HighScoreState.js";
import EnterHighScoreState from "./states/game/EnterHighScoreState.js";


// Fetch the asset definitions from config.json.
fetch('./src/config.json').then((response) => response.json())
	.then (response => {
		const {
			images: imageDefinitions,
			fonts: fontDefinitions,
			sounds: soundDefinitions,
			// @ts-ignore
		} = response;
		
		// Load all the assets from their definitions.
		images.load(imageDefinitions);
		fonts.load(fontDefinitions);
		sounds.load(soundDefinitions);
		
		// Add all the game states to the state machine.
		stateMachine.add(GameStateName.TitleScreen, new TitleScreenState());
		stateMachine.add(GameStateName.Play, new PlayState());
		stateMachine.add(GameStateName.HighScore, new HighScoreState());
		stateMachine.add(GameStateName.Victory, new VictoryState());
		stateMachine.add(GameStateName.GameOver, new GameOverState());
		stateMachine.add(GameStateName.EnterHighScore, new EnterHighScoreState());
		
		stateMachine.change(GameStateName.TitleScreen);
		
		// Add event listeners for player input.
		canvas.addEventListener('keydown', event => {
			keys[event.key] = true;
		});
		
		canvas.addEventListener('keyup', event => {
			keys[event.key] = false;
		});
		
		const game = new Game(stateMachine, context, canvas.width, canvas.height);
		
		game.start();
		
		// Focus the canvas so that the player doesn't have to click on it.
		canvas.focus();
	});
