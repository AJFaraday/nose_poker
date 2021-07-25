module.exports = class {
    constructor(controller) {
        this.controller = controller;
    }
    
    play_hand() {
        if(this.controller.hand_number() == 1)
        {
            // Go Home Bot makes everybody else need to do this nonsense on the first turn rather than really try.
            this.controller.declare(2);
            return;
        }
        if(this.controller.hand_number() == 2)
        {
            // Get rid of the other not-really-competing bot.
            this.controller.declare(3);
            return;
        }
        var myscore = this.controller.np();
        var sscore = myscore;
        var scores = this.controller.scores();
        var ctr = 0;
        for (var i = 0; i < scores.length; i++) {
            var score = scores[i];
            if (score != 0)
                if (score == sscore)
                    sscore = 0;
                else
                    ctr+=1;
        }
        var value = (ctr < 2) ? 0
             : Math.floor(myscore / ctr);
        this.controller.declare(value);
    }
};
