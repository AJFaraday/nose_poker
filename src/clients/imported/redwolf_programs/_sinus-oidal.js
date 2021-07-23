module.exports = class {
    constructor(controller) {
        this.controller = controller;
    }
    
    play_hand() {
        var turn = this.controller.hand_number();
        var multiply = Math.sin(turn * Math.PI / 4);

        this.controller.declare(Math.floor(2 ** (multiply + 1)));
    }
};
