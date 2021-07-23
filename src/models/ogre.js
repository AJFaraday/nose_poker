const Controller = require('./controller.js');

class Ogre {

  constructor(game, name, client_class) {
    this.game = game;
    this.name = name;
    this.np = 500;
    this.old_np = 500;
    this.reached_hand = 0;
    this.out_reason = "Winner!"
    this.controller = new Controller(game, this);
    this.client = new client_class(this.controller);
    this.active = true;
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
    if ((!this.game.all_the_same && this.pokes == this.game.lowest_bid) || this.np <= 0) {
      format = "\x1b[31m"
    } else {
      format = "\x1b[0m"
    }
    console.log(format, `${this.name.padEnd(this.game.longest_name)} ${this.old_np.toString().padStart(3)} - ${this.pokes.toString().padStart(3)} = ${this.np.toString().padStart(3)}`);
  }

  sort_number() {
    return (this.reached_hand * 1000) + this.np;
  }

}

module.exports = Ogre;