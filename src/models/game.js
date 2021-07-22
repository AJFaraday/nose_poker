const CLIENTS = require('../clients.js');
const Controller = require('./controller.js');
const Ogre = require('./ogre.js');
const Utils = require('./../lib/utils.js');
const FS = require('fs');

class Game {

  constructor(clients = null) {
    this.hand_number = 1;
    this.log_text = "";
    this.init_clients(clients);
    do {
      this.play_hand();
    } while (this.active_ogres.length > 1);
    this.report_final_state();
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
        this.knock_out(ogre, "Failed to bid");
      }
    });
    // They're out of np, they're out of the game.
    this.active_ogres.forEach(ogre => {
      if (ogre.np <= 0) {
        this.knock_out(ogre, "Has no nose");
      }
    });
    // The lowest bid is knocked out.
    this.active_ogres.forEach(ogre => {
      if (ogre.pokes == this.lowest_bid) {
        this.knock_out(ogre, "Cowardice!");
      }
    });
    this.active_ogres.forEach(ogre => ogre.reached_hand = this.hand_number);
  }

  log_bids() {
    console.log("\x1b[0m", `Hand ${this.hand_number}`);
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

  knock_out(ogre, reason) {
    ogre.out_reason = reason;
    this.inactive_ogres.push(ogre);
    Utils.remove_from_array(this.active_ogres, ogre);
  }

  report_final_state() {
    console.log("\x1b[5m", 'Final Score:\n')
    console.log("\x1b[0m", `${'Ogre'.padEnd(this.longest_name)} Hand  NP Reason`)

    var format;
    this.active_ogres.forEach(ogre => this.inactive_ogres.push(ogre));
    this.inactive_ogres = this.inactive_ogres.sort((a, b) => {
      return b.sort_number() - a.sort_number()
    })
    this.inactive_ogres.forEach((ogre, index) => {
      if (index == 0) {
        format = "\x1b[32m"
      } else {
        format = "\x1b[0m"
      }
      console.log(format, `${ogre.name.padEnd(this.longest_name)}    ${ogre.reached_hand.toString().padEnd(2)} ${ogre.np.toString().padStart(3)} ${ogre.out_reason}`);
    });
    this.save_as_json();
  }

  save_as_json() {
    var json = JSON.stringify(
      this.inactive_ogres.map(ogre => {
        return {
          name: ogre.name,
          hand: ogre.reached_hand,
          np: ogre.np,
          reason: ogre.out_reason
        };
      })
    );
    FS.writeFileSync(
      `${__dirname}/../../public/tables.js`,
      `ogres =  ${json}`
    );
  }
}

module.exports = Game;
