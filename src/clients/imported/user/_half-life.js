module.exports = class {
    constructor(controller) {
        this.controller = controller;
    }
    
    play_hand() {
        var np = this.controller.np()
        var bid = np < 10 ? np - 1 : Math.floor(np / 2);
        this.controller.declare(bid);
    }
};
