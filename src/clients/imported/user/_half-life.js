module.exports = class {
    constructor(controller) {
        this.controller = controller;
    }
    
    play_hand() {
        this.controller.declare(Math.max(1, Math.floor(this.controller.np() / 2)));
    }
};
