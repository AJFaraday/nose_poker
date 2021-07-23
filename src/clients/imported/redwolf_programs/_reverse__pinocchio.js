module.exports = class {
    constructor(controller) {
        this.controller = controller;
    }
    
    play_hand() {
        this.controller.declare(Math.round(4 ** ((this.controller.hand_number() + 1) / 2)));
    }
};
