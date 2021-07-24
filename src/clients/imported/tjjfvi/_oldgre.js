module.exports = class {
  
  constructor(controller) {
    this.controller = controller;
  }

  play_hand() {
    const x = this.controller.hand_number();
    this.controller.declare(
      -     0.000006858186 * x ** 11
      -     0.000199732658 * x ** 10
      +     0.024797517263 * x ** 9
      -     0.737278798843 * x ** 8
      +    11.416562524617 * x ** 7
      -   107.788528491826 * x ** 6
      +   656.517974108233 * x ** 5
      -  2615.799102867764 * x ** 4
      +  6707.381768918599 * x ** 3
      - 10515.725107130049 * x ** 2
      +  8997.738815265786 * x ** 1
      -  3130.528128281523 * x ** 0
    );
  }

};
