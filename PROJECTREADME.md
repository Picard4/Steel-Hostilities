# Project

- 💯**Worth**:
  - **Proposal**: 10%
  - **Implementation**: 20%
- 📅**Due**:
  - **Proposal**:
    - **Draft**: November 15, 2021 @ 23:59
    - **Final**: November 22, 2021 @ 23:59
  - **Implementation**: December 13, 2021 @ 23:59
- 🙅🏽‍**Penalty**: Late submissions lose 10% per day to a maximum of 3 days. Nothing is accepted after 3 days and a grade of 0% will be given.

## 🎯 Objectives

- Combine everything you've learned during this course to create your own video game.

## ✒️ Description

This is it - the culmination of all the skills and knowledge about game development over this past semester. It's like fighting the [final boss](https://img-9gag-fun.9cache.com/photo/awMrL1D_460s.jpg) at the end of a game. I know you have everything it takes to conquer it! 😉

This project can be done, at most, in pairs. If you choose to do it individually, know that you will be doing the work that was meant for 2 people on your own. No, you do not have to work with someone from your own section.

The game itself is largely up to you - I want you to get creative! If you're having trouble thinking of ideas, mash 2 genres together and see if that sparks anything. Maybe you'll make a 2D side-scrolling platformer with puzzle elements? Maybe you'll make an endless runner dungeon-crawler with a physics engine?

[The sky is the limit](https://en.wikipedia.org/wiki/List_of_video_game_genres)!

## 📐 Proposal

I ask that you go about your design and architecture in a meaningful and purpose-driven way. For this reason, I'm asking you to first write a proposal for your game. This will make you think about the different states, classes, relationships, design patterns, etc. that you will have to adhere to when it comes time for the implementation.

> ❗ While the due date for the final proposal is **November 22**, I want a draft of your proposal submitted by **November 15**. This is so I can look it over and confirm that you're planning to meet all the proper criteria for the implementation phase. If there are things you're missing or need to fix, I will let you know so that you can incorporate my feedback by **November 22**.

- The proposal document should be the `README.md` for your repo.
  - **Please look in the `Sample-Proposal` folder** of this repo to get an idea of how your proposal should look.
  - If you're not familiar with writing markdown (`.md`) then please do this [short tutorial](https://www.markdowntutorial.com/). You can also look at any of the `README.md` files I've written for you over the course of this semester for reference.
- The proposal must include the following sections:
  1. **Description** including the premise, the genre (ex. puzzle/action/adventure/shooter/etc.), the control scheme (ex. `mouse` to shoot, `w` `a` `s` `d` to move, `spacebar` to jump, etc.), and the gameplay.
  2. **Requirements** about what the player should be able to do in your game.
  3. **Diagrams**
     - [**State Diagrams**](https://www.youtube.com/watch?v=_6TFVzBW7oo) including game states (ex. [Breakout]((https://jac-cs-game-programming-f21.github.io/Notes/#/2-Breakout/?id=breakout-state-flow))) and entity states (ex. [_Mario_](https://jac-cs-game-programming-f21.github.io/Notes/#/4-Mario/?id=state-diagram) or [_Zelda_](https://jac-cs-game-programming-f21.github.io/Notes/#/5-Zelda/?id=state-diagram)).
     - [**Class Diagram**](https://www.youtube.com/watch?v=3cmzqZzwNDM&list=RDCMUCwRXb5dUK4cvsHbx-rGzSgw&index=3) where you outline:
       - All classes in your game and the relationships between the classes
       - Inheritance and polymorphism
       - [Factory pattern]((https://refactoring.guru/design-patterns/factory-method))
     - If you're curious how I do mine, I use [PlantUML](https://plantuml.com/) to write out my diagrams in plaintext and then render them using [PlantText](https://www.planttext.com/).
     - If you'd rather use a GUI, [app.diagrams.net](https://app.diagrams.net/) and [Lucidchart](https://www.lucidchart.com/pages/) are good free tools. You could even use PowerPoint like I did initially for the [Breakout state diagram](https://jac-cs-game-programming-f21.github.io/Notes/#/2-Breakout/?id=breakout-state-flow)!
  4. **Wireframes** to give yourself a rough idea of what the game will look like and to give me a preview of what to expect.
     - These can be hand drawn (paper or tablet) or digitally drawn using tools like MSPaint, Photoshop - whatever is easiest for you!
       - If you go hand drawn then please scan in photos of your drawings to include in the proposal document.
     - [Here's a great example video](https://www.youtube.com/watch?v=GE_ozc2BhMo) of game wireframes.
  5. **Assets** describing which images, sounds, and fonts you'll be using for your game and **where** you'll get them from.
     - It's imperative to **always cite your sources**!
  6. **And any other sections** you think are relevant to explain the implementation details of your game.
     - Maybe you're using an [external library](https://confettijs.org/)?
     - Maybe you're not using canvas and using something else like [Unity](https://unity.com/)?
     - Maybe you're implementing an [interesting algorithm](https://youtu.be/0ZONMNUKTfU)?
     - Make sure to explain it all in detail here!

## 🔨 Implementation

This is where the fun begins! As I said, the game itself is all up to you, however, I want to see specific elements in your code that show me you've progressed as a developer and aren't writing [first-year](https://gist.github.com/pixeldesu/f6c8bd3c2d2b09f177c196a826b18dd2) level code! 🙈

Depending on the game you decide to make, you may not be able to fulfil all of the requirements just by the very nature of the game itself. If this is the case, **come talk to me and we can figure out a compromise**.

### 📃 Requirements

- 🤖 **State Machines**
  - At the very least, you should have one [global state machine](https://jac-cs-game-programming-f21.github.io/Notes/#/1-Flappy-Bird/?id=%f0%9f%a4%96-flappy-bird-7-the-quotstate-machinequot-update) that controls the state of the game.
  - The bare minimum for states are `TitleScreenState`, `PlayState`, `VictoryState`, and `GameOverState`, (you can rename them if you wish) though I expect you'll have more for your game.
  - As we saw in [_Mario_](https://jac-cs-game-programming-f21.github.io/Notes/#/4-Mario/?id=%f0%9f%a4%96-mario-5-the-quotstateful-heroquot-update) and [_Zelda_](https://jac-cs-game-programming-f21.github.io/Notes/#/5-Zelda/?id=state-diagram), individual entities can have their own state machines as well.
- 🧱 **Inheritance & Polymorphism**
  - I want to see good object-oriented practices in your code. As soon as you have different "types" of anything in your game, that's the telltale sign that you need to use inheritance and polymorphism.
  - Check out my feedback on your _Breakout_ assignment on Gradescope for reference.
- 🏭 **Factory Design Pattern**
  - To create all of the aforementioned "types" of something in your game, a good idea is to stick the creation logic inside its own dedicated [Factory](https://refactoring.guru/design-patterns/factory-method) class.
  - See [`EnemyFactory` from _Zelda_](https://jac-cs-game-programming-f21.github.io/Notes/#/5-Zelda/?id=the-factory-design-pattern) or [`BirdFactory` from _Angry Birds_](https://jac-cs-game-programming-f21.github.io/Notes/#/6-Angry-Birds/?id=important-code-3) as an example.
- 🔢 **Enums**
  - Get rid of any magic numbers or strings from your code using enums.
  - Almost every game we've done has had at least some enums so refer to those as an example.
- ⭐ **Game Entities & Game Objects**
  - Starting from _Mario_ we learned about [entities](https://jac-cs-game-programming-f21.github.io/Notes/#/4-Mario/?id=entities) and [objects](https://jac-cs-game-programming-f21.github.io/Notes/#/4-Mario/?id=game-objects). Usually, entities are more "intelligent" than objects. Entities can interact with objects that are collidable, solid, or consumable. You should know the deal by now!
- 🎯 **Collision Detection & Hitboxes**
  - Whether it's [AABB](https://jac-cs-game-programming-f21.github.io/Notes/#/0-Pong/?id=aabb-collision-detection), [tilemap collision](https://jac-cs-game-programming-f21.github.io/Notes/#/4-Mario/?id=tile-collision), or using a [physics engine](https://jac-cs-game-programming-f21.github.io/Notes/#/6-Angry-Birds/?id=physics-engines), I want to see some form of collision detection in your game.
  - To make your collisions more realistic and interesting, use the [`Hitbox`](https://jac-cs-game-programming-f21.github.io/Notes/#/5-Zelda/?id=hitboxes) library class.
- 💾 **Persistance**
  - [Remember in Breakout where we persisted high scores](https://jac-cs-game-programming-f21.github.io/Notes/#/2-Breakout/?id=%f0%9f%8e%89-breakout-6-the-quothigh-scorequot-update)? I want your game to use persistance as well. You can save scores, game options, or even the entire state of your game so that a player can come back and start off where they left!
- 🎉 **Win & Loss Conditions**
  - The fundamental thing that makes a game a game is the fact that you can win or lose. This should be pretty self-explanatory.
- 🏆 **Score/Points/Prizes**
  - Maybe your character gains points as they kill enemies, maybe they accumulate a number of wins per round or level, maybe they're awarded some kind of medal or trophy at the end - who knows! It's all up to you.
- 👾 **Sprites**
  - Your game should be nice to look at - no coloured canvas shapes! There is tons of free sprite work you can find online.
  - A lot of the sprites for the games in this course have come from [itch.io](https://itch.io/game-assets) and [opengameart.org](https://opengameart.org/).
  - Be sure to provide the proper credit to the creators of the art! This can be done like I did for all the games so far at the top of the `main.js` files.
- 🏃🏾‍♂️ **Animations**
  - Give the appearance that your sprites/entities have life by iterating over multiple sprites in a spritesheet.
  - Use the `Animation.js` library class to achieve this and go back to the [notes](https://jac-cs-game-programming-f21.github.io/Notes/#/4-Mario/?id=%f0%9f%8f%83%e2%99%82%ef%b8%8f-mario-4-the-quotanimated-heroquot-update) if you need a refresher.
- ➡️ **Tweens**
  - There should be elements in your game whose values need to be changed over a given period of time. These can be things like the `Pot` position from the _Zelda_ assignment or the [`Tile` elements](https://jac-cs-game-programming-f21.github.io/Notes/#/3-Match-3/?id=important-code-8) from Match 3.
  - Use the `Timer.js` library class to achieve this and go back to the [notes](https://jac-cs-game-programming-f21.github.io/Notes/#/3-Match-3/?id=tweens) if you need a refresher.
- 🎵 **Sounds & Music**
  - Sounds always adds that extra bit of polish to a game. I want to see sound effects for things like UI element selection, walking, fighting, shooting, jumping, winning, losing, you name it, whatever makes sense for your game!
  - The sounds for the games in this course were largely taken from [freesound.org](https://freesound.org) and [opengameart.org](https://opengameart.org/).
  - Be sure to provide the proper credit to the creators of the sounds! This can be done like I did for all the games so far at the top of the `main.js` files.
- 🖋️ **Fonts**
  - Like sounds, fonts also contribute to the polish factor of your game. Have different fonts for your title screen and the various UI elements in the game.
  - I got mine from [dafont](https://www.dafont.com/) and [Google Fonts](https://fonts.google.com/).
  - Be sure to provide the proper credit to the creators of the fonts! This can be done like I did for all the games so far at the top of the `main.js` files.

### 🍽️ Template

I've provided a `Game-Template` that you can use as the base of your game. It's up to you if you want to use it or not, but I think it's a great starting point!

All the code should be contained in this repo itself. If you're working with a partner, only one of you has to accept the GitHub classroom assignment, and then that person can [add the other to this repo using the GitHub settings](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-user-account/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository).

## 🌿 Git

You can use either the Git CLI or you can also use VSC's built-in Git GUI client.

### 🖱️ GUI

1. In VSC, click on the third icon down in the left navigation bar to see a list of files that have changed and are ready to be staged.
2. Hover over where it says _Changes_ (right below the commit textbox) and click `+` to stage all the modified files to be committed. Alternatively, you can add specific files by clicking the `+` next to the individual file.
3. Type a commit message into the textbox and click the checkmark above it to commit all the files that were just staged.
4. Click `...` and then `push` to push the commit(s) up to GitHub.

### ⌨️ CLI

1. Run `git status` to see a list of files that have changed and are ready to be staged.
2. Run `git add .` to stage all the modified files to be committed. Alternatively, you can add specific files like this: `git add src/Project.js`.
3. Run `git commit -m "A descriptive message here."` (including the quotes) to commit all the files that were just staged.
4. Run `git push` to push the commit(s) up to GitHub.

Regardless of the method you choose, it is very important that you commit frequently because:

- If you end up breaking your code, it is easy to revert back to a previous commit and start over.
- It provides a useful log of your work so that you (and your teammates if/when you're on a team) can keep track of the work that was done.

## 📥 Submission

Once you've made your final `git push` to GitHub, here's what you have to do to submit:

1. Ensure that the `README.md` for your repo is the proposal document.
2. Ensure that the game folders are at the root of the repo directory. In other words, I don't want to see a `Game-Template` folder in the final submission.
3. Schedule a demonstration appointment with me (online or in person) where I'll be grading your submission on the spot using a grading rubric.
   - Details for how to schedule the demo will be available closer to the deadline.
   - The grading rubric will also be made available closer to the deadline so you know what to expect.
