module.exports = class {
    constructor(controller) {
        this.controller = controller;
    }
    
    play_hand() {
        this.controller.declare(2);
    }
};
