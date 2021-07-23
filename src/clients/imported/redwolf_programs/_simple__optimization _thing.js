module.exports = class {
    constructor(controller) {
        this.controller = controller;
    }
    
    play_hand() {
        var count = this.controller.scores().length;
        var min = Math.min(...this.controller.scores());

        this.controller.declare(min / count);
    }
};
