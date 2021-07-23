
module.exports = class {


    constructor(controller) {
        this.controller = controller;
    }
    
    play_hand()
    {
        if (this.controller.hand_number() == 1) {
            this.lastScores = this.controller.scores();
            this.controller.declare(2);            
            return;
        }

        var scores = this.controller.scores();
        var bids = this.controller.scores();
        for (var i = 0; i < scores.Length; i++) {
            var minDifference = 0;
            for (var j = 0; j < this.lastScores.Length; i++) {
                if (this.lastScores[j] - this.scores[i] > minDifference) {
                    minDifference = this.lastScores[j] - this.scores[i];
                }
            }

            bids[i] = minDifference;
        }

        this.lastScores = scores;    

        var finalBid = 100;
        for (var i = 0; i < bids.Length; i++) {
            if (bids[i] < finalBid) {
                finalBid = bids[i];
            }
        }

        this.controller.declare(bid + 1);
    }
};

