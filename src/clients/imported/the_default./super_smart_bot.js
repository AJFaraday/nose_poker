module.exports = class {
    constructor(controller) {
        this.controller = controller;
    }
    try_certain_win()
    {
        //we need to have more points than everyone else combined, plus 1 per player (though this bound is probably too weak)
        //bid as many points as the lowest-NP player has, plus 1
        let tcost = 0;
        let mcost = 999;
        let skipped = false;
        let other_scores = this.controller.scores().filter(a => skipped ? true : (a == this.controller.np() ? (skipped = true)*0 : true));
        for(let c of other_scores)
        {
            tcost += c + 1;
            if(c + 1 < mcost) mcost = c + 1;
        }
        if(this.controller.np() <= tcost)
            return false;
        this.controller.declare(mcost);
        return true;
    }
    min_safe_bid()
    {
        let skipped = false;
        let other_scores = this.controller.scores().filter(a => skipped ? true : (a == this.controller.np() ? (skipped = true)*0 : true));
        let res = Math.min(...other_scores) + 1;
        return res;
    }
    play_hand() {
        if(this.controller.hand_number() == 1)
        {
            this.controller.declare(2);
            return;
        }
        let scores = this.controller.scores();
        if(scores.length == 2) //optimal because this is the last round
        {
            this.controller.declare(this.controller.np() - 1);
            return;
        }
        if(this.try_certain_win()) return;
        let bid = this.controller.np() / this.controller.scores().length;
        bid = Math.min(bid, this.min_safe_bid());
        this.controller.declare(bid);
    }
};
