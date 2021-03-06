
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
        var finalBid = 100;
        for (var i = 0; i < scores.Length; i++) {
            for (var j = 0; j < this.lastScores.Length; j++) {
                if (this.lastScores[j] - scores[i] < finalBid) {
                    finalBid = this.lastScores[j] - scores[i];
                }
            }
        }

        this.lastScores = scores;    

        this.controller.declare(finalBid + 1);
    }
};

