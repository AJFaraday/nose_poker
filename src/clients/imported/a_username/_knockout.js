module.exports = class {

    constructor(controller) {
      this.controller = controller;
    }
  
    play_hand() {
      let hand = this.controller.hand_number()
      this.controller.declare(500 / (this.controller.scores().length + hand + 1) + (hand > 7 ? 20 : 0) + (hand > 10 ? 20 : 0))
    }
  
  };
