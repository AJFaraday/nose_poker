const Controller = require('./controller.js');

class Ogre {

  constructor(game, name, client_class) {
    this.game = game;
    this.name = name;
    this.np = 500;
    this.old_np = 500;
    this.reached_hand = 0;
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
    this.old_np = this.np;
    this.np -= n;
    if(this.np <= 0) {
      this.np = 0;
    }
  }

  log_move() {
    var format;
    if (this.pokes == this.game.lowest_bid || this.np <= 0) {
      format = "\x1b[31m"
    } else {
      format = "\x1b[0m"
    }
    console.log(format, `${this.name.padEnd(this.longest_name)} ${this.old_np} - ${this.pokes} = ${this.np}`);
  }

}

module.exports = Ogre;