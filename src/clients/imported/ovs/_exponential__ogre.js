module.exports = class {

    constructor(controller) {
        this.controller = controller;
    }

    play_hand() {
        let bid = 1 << this.controller.hand_number();
        this.controller.declare(bid);
    }

};
