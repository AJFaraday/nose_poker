# Controller Interface

The following methods can be called on the controller passed in to your Ogre class.

* `np()` 
* `hand_number()`
* `scores()`
* `declare(pokes)`


# Functions

## np()

The current amount of nose points that your ogre has.

```js
this.controller.np();
// 450
```

## hand_number()

The number of the current hand the game is on.

```js
this.controller.hand_number();
// 2
```

## scores()

An array of the amount of np each currently active ogre has.

```js
this.controller.scores();
// [450, 250, 20]
```

## declare(pokes)

Here's the important one. Declare how many times your ogre will poke itself
in the nose with a club.

Your np will be reduced by this amount.

If this is the lowest bid, you will be knocked out of the tournament.

```js
this.controller.declare(10);
```

