# [KotH] Play a game of Nose Poker

Nose Poker is an ogre game played by a group of ogres. Each ogre brings a large nose
and a small club.

On each hand, all the ogres will declare how many times they will poke their nose with the
club. 

Each time, the lowest bid(s) will be knocked out of the game, then the remaining
ogres will poke their nose with the club their declared number of times.

Any ogre who has run out of nose will also be knocked out of the game.

## The Challenge

Write the JavaScript code to play Nose Poker. You'll write a client class which
plays the role of an ogre and makes the decision how to bid on each hand.

Your ogre starts the game with 500 nose points (np), and there is no way to recover np
during the game. Each turn you will call `controller.declare(pokes)` and either
fall out of the competition if you declare the lowest number of pokes, or your troll
will lose the declared amount of np. 

The goal is to stay in the game as long as you can by avoiding making the lowest bid or
running out of np.

## The Controller

Your client class will be passed a `controller` object which acts as it's interface to the game.

Here are the four functions it provides:

**np()**: The current amount of nose points that your ogre has.

```js
this.controller.np();
// 450
```

**hand_number()** The number of the current hand the game is on.

```js
this.controller.hand_number();
// 2
```

**scores()** An array of the amount of np each currently active ogre has.

```js
this.controller.scores();
// [450, 250, 20]
```

**declare(pokes)** Here's the important one. Declare how many times your ogre will poke itself
in the nose with a club.

```js
this.controller.declare(10);
```

## Getting the app

* `git clone `

## Writing a Client

Here's the template for your client class:

```js
module.exports = class {

  constructor(controller) {
    this.controller = controller;
  }

  play_hand() {
  }

};
```



