const Controller = require('./controller.js');

class Ogre {

  constructor(game, name, client_class) {
    this.game = game;
    this.name = name;
    this.np = 500;
    this.controller = new Controller(game, this);
    this.client = new client_class(this.controller);
  }

  play_hand() {
    this.pokes = 0;
    this.client.play_hand();
    this.poke(this.pokes);

  }

  declare(pokes) {
    this.pokes = pokes;
  }

  dead() {
    this.np <= 0;
  }

  poke(n) {
    this.np -= n;
    if(this.np <= 0) {
      this.np = 0;
    }
  }

}

module.exports = Ogre;