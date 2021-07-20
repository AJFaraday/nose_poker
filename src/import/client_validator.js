const Game = require('../../src/models/game.js');
const Clients = require('../../src/clients.js');

class ClientValidator {

  constructor(client_body, path) {
    this.path = path;
    this.client_body = client_body;
    this.errors = [];
    this.valid = true;
    this.messages = [];
    this.validate();
  }

  client_class() {
    if (this.cached_class) {
      return this.cached_class;
    } else {
      try {
        eval(`this.cached_class = ${this.client_body}`);
        return this.cached_class;
      } catch (error) {
        this.add_error(`Error evaluating code: ${error}`)
      }
    }
  }

  validate() {
    this.validate_game_not_used();
    this.validate_terms_not_used()
    // Validate presence of turn and end_turn functions
    if (this.valid) {
      this.validate_completes_games();
    }
    return this.valid;
  }

  validate_terms_not_used() {
    ['Math.random', 'setTimeout', 'setInterval', 'eval', 'import'].forEach(term => {
      if (this.client_body.includes(term)) {
        this.add_error(`Use of \`${term}\` is forbidden`);
      }
    });
  }

  validate_game_not_used() {
    if (this.client_body.includes('game.')) {
      this.add_error('Use of the `game` global variable is forbidden');
    }
  }

  validate_completes_games() {
    try {
      var game = new Game(
        {
          default: Clients['default/go_big'],
          test_subject: eval(this.client_body)
        }
      );
    } catch (error) {
      this.add_error(error);
      console.log(error)
    }
  }

  add_error(error) {
    this.errors.push(error);
    this.valid = false;
  }

}

module.exports = ClientValidator;