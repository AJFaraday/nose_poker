class Controller {

  constructor(game, ogre) {
    this.game = game;
    this.ogre = ogre;
  }

  np() {
    return this.ogre.np;
  }

  hand_number() {
    return this.game.hand_number;
  }

  scores() {
    return this.game.ogres.map(ogre => {
      return ogre.score;
    }).sort((a, b) => {
      return b - a;
    });
  }

  declare(pokes) {
    if(!Number.isFinite(pokes)) {
      return
    }
    var np = this.ogre.np;
    var pokes = Math.floor(pokes);
    if(pokes >= np) {
      pokes = np
    } else if (pokes <= 0) {
      pokes = 1;
    }
    this.ogre.pokes = pokes;
  }

}

module.exports = Controller;
