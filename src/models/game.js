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
      if (ogre.np <= 0) {
        this.knock_out(ogre);
      }
    });
    this.active_ogres = this.active_ogres.sort((a, b) => {
      return b.np - a.np;
    });
    this.remove_lowest_bid();
    console.log(`After hand ${this.hand_number}`)
    console.log(`${this.active_ogres.length} remain`)
    this.active_ogres.forEach(ogre => {
      console.log(`${ogre.name.padEnd(this.longest_name)} ${ogre.np}`);
    });
    console.log('');
    this.hand_number += 1;
  }

  remove_lowest_bid() {
    this.active_ogres.forEach(ogre => {
      if (!Number.isFinite(ogre.pokes) || ogre.pokes == 0) {
        // They didn't play, they're out.
        this.knock_out(ogre);
      }
    });
    var lowest_bid = Math.min(...this.active_ogres.map(ogre => {return ogre.pokes}));
    this.active_ogres.forEach(ogre => {
      if (ogre.pokes == lowest_bid) {
        this.knock_out(ogre);
      }
    });
  }

  knock_out(ogre) {
    this.inactive_ogres.push(ogre);
    Utils.remove_from_array(this.active_ogres, ogre);
  }
}

module.exports = Game;