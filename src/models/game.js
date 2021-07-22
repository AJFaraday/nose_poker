const CLIENTS = require('../clients.js');
const Controller = require('./controller.js');
const Ogre = require('./ogre.js');
const Utils = require('./../lib/utils.js');

class Game {

  constructor(clients = null) {
    this.hand_number = 1;
    this.init_clients(clients);
    do {
      this.play_hand();
    } while (this.active_ogres.length > 1);
  }

  init_clients(clients = null) {
    var game = this;
    this.inactive_ogres = [];
    if (!clients) {
      clients = CLIENTS;
    }
    this.active_ogres = Object.keys(clients).map(
      client_name => {
        var ogre = new Ogre(game, client_name, clients[client_name]);
        var controller = new Controller(game, ogre);
        ogre.controller = controller;
        return ogre;
      }
    );
    this.longest_name = this.active_ogres.sort((a, b) => {
      return b.name.length - a.name.length;
    })[0].name.length;
  }

  play_hand() {
    this.active_ogres.forEach(ogre => {
      ogre.play_hand();
    });
    this.get_lowest_bid();
    this.log_bids();
    this.remove_ogres();
    console.log("\x1b[0m", `${this.active_ogres.length} remain`)
    console.log('');
    this.hand_number += 1;
  }

  remove_ogres() {
    // They didn't play, they're out.
    this.active_ogres.forEach(ogre => {
      if (!Number.isFinite(ogre.pokes) || ogre.pokes == 0) {
        // They didn't play, they're out.
        this.knock_out(ogre);
      }
    });
    // They're out of np, they're out of the game.
    this.active_ogres.forEach(ogre => {
      if (ogre.np <= 0) {
        this.knock_out(ogre);
      }
    });
    // The lowest bid is knocked out.
    this.active_ogres.forEach(ogre => {
      if (ogre.pokes == this.lowest_bid) {
        this.knock_out(ogre);
      }
    });
    this.active_ogres.forEach(ogre => ogre.reached_hand = this.hand_number);
  }

  log_bids() {
    console.log("\x1b[0m", `After hand ${this.hand_number}`)
    this.active_ogres = this.active_ogres.sort((a, b) => {
      return b.np - a.np;
    });
    this.active_ogres.forEach((ogre, index) => {
      ogre.log_move();
    });
  }

  get_lowest_bid() {
    this.lowest_bid = Math.min(...this.active_ogres.map(ogre => {
      return ogre.pokes
    }));
  }

  knock_out(ogre) {
    this.inactive_ogres.push(ogre);
    Utils.remove_from_array(this.active_ogres, ogre);
  }
}

module.exports = Game;
