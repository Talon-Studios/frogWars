// Frog Wars
/*^*^*^*^*^*^*^*
herpetologistsHandbook.js
A catalog of all the types of frogs.
*^*^*^*^*^*^*^*/

class HerpetologistsHandbook extends Phaser.Scene {
  constructor() {
    super("HerpetologistsHandbook");
  }
  preload() {
    // ---------- Load the assets ----------
    this.load.image("leftArrow", "assets/leftArrow.png");
    this.load.image("rightArrow", "assets/rightArrow.png");
  }
  create() {
    // Set background color
    this.engine.setBackgroundColor(this, "#ffffff");
  }
  update() {

  }
}
