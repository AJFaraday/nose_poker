module.exports = class {

  constructor(controller) {
    this.controller = controller;
  }

    play_hand() {
    // Beat the simple bots
    if(this.controller.hand_number() <= 5) {
        this.bid(this.controller.hand_number() + 1);
    }
    var scores = this.other_scores();
    var bid = Math.floor(this.median(scores) / scores.length) + 1; // Add 1 to win once there's only 1 opponent left
    this.bid(bid);
    }
  
  other_scores() {
    var scores = this.controller.scores();
    var myIndex = scores.indexOf(this.controller.np());
    scores.splice(myIndex, 1);
    return scores;
  }
  
  median(scores) {
    var half = Math.floor(scores.length / 2);
    return scores[half];
  }
    
    bid(value) {
        // Never bid more than the weakest player has
        var weak = Math.min(...this.controller.scores());
        // Never bid more than I have
    var me = this.controller.np();
    var final_bid = Math.min(value, weak + 1, me);
    this.controller.declare(final_bid);
    }

};