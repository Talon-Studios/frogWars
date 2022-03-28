// Frog Wars
/*^*^*^*^*^*^*^*
herpetologistsHandbook.js
A catalog of all the types of frogs.
*^*^*^*^*^*^*^*/

class HerpetologistsHandbook extends Phaser.Scene {
  constructor() {
    super("HerpetologistsHandbook");
    this.currentPage = 1;
    this.totalPages = 2;
  }
  preload() {
    this.engine = new Engine(this);

    // ---------- Load the assets ----------
    this.load.image("leftArrow", "assets/leftArrow.png");
    this.load.image("rightArrow", "assets/rightArrow.png");
    this.load.image("handbookPage1", "assets/handbookPage1.png");
    this.load.image("handbookPage2", "assets/handbookPage2.png");
  }
  create() {
    // Create cursor
    this.engine.mouseInput();
    this.cursor = this.physics.add.sprite(this.input.mousePointer.x, this.input.mousePointer.y, "cursor").setScale(8).setGravityY(-1500).setSize(2, 2).setOffset(0, 0).setOrigin(0, 0);
    this.cursor.setDepth(1);
    this.input.on("pointerdown", () => {
      this.cursor.setScale(6.5);
    });
    this.input.on("pointerup", () => {
      this.cursor.setScale(8);
    });

    // Set background color
    this.engine.setBackgroundColor(this, "#ffffff");

    // Create arrows
    this.leftArrow = this.add.image(this.engine.gameWidthCenter - 200, this.engine.gameHeight - 50, "leftArrow").setScale(8).setInteractive();
    this.rightArrow = this.add.image(this.engine.gameWidthCenter + 200, this.engine.gameHeight - 50, "rightArrow").setScale(8).setInteractive();
    this.leftArrow.on("pointerdown", () => {
      if (this.currentPage > 1) {
        this.leftArrow.setScale(6.5);
        this.currentPage--;
        this.pages.setTexture(`handbookPage${this.currentPage}`);
      }
    });
    this.leftArrow.on("pointerup", () => {
      this.leftArrow.setScale(8);
    });
    this.rightArrow.on("pointerdown", () => {
      if (this.currentPage < this.totalPages) {
        this.rightArrow.setScale(6.5);
        this.currentPage++;
        this.pages.setTexture(`handbookPage${this.currentPage}`);
      }
    });
    this.rightArrow.on("pointerup", () => {
      this.rightArrow.setScale(8);
    });

    // Create pages
    this.pages = this.add.image(this.engine.gameWidthCenter, this.engine.gameHeightCenter - 50, `handbookPage${this.currentPage}`).setScale(8);
  }
  update() {
    this.cursor.x = this.input.mousePointer.x;
    this.cursor.y = this.input.mousePointer.y;
  }
}