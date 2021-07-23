module.exports = class {
    constructor(controller) {
        this.controller = controller;
    }
    
    play_hand() {
        var turns = this.controller.hand_number();

        this.controller.declare(Math.round(turns * Math.log(turns)) + 4);
    }
};
