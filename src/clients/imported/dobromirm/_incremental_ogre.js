module.exports = class {

  constructor(controller) {
    this.controller = controller;
  }

  play_hand() {
    var bid = this.controller.hand_number() * 10
    this.controller.declare(bid);
  }

};
