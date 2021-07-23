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
        else if (this.controller.hand_number() == 2) {
            this.lastScores = this.controller.scores();
            /* Adaptive will bid 3 since 2 is the lowest number. Thus, bidding 4 will eliminate Adaptive */
            this.controller.declare(4);            
            return;
        }

        var scores = this.controller.scores();
        var finalBid = 100;
        for (var i = 0; i < scores.Length; i++) {
            for (var j = 0; j < this.lastScores.Length; j++) {
                if (this.lastScores[j] - this.scores[i] < finalBid) {
                    finalBid = this.lastScores[j] - this.scores[i];
                }
            }
        }

        this.lastScores = scores;    

        this.controller.declare(finalBid + 1);
    }
};
