// Frog Wars
/*^*^*^*^*^*^*^*
herpetologistsHandbook.js
A catalog of all the types of frogs.
*^*^*^*^*^*^*^*/

export class HerpetologistsHandbook extends Phaser.Scene {
  constructor() {
    super("HerpetologistsHandbook");
    this.currentPage = 1;
    this.totalPages = 3;
  }
  preload() {
    this.engine = new Engine(this);

    // ---------- Load the assets ----------
    this.load.image("leftArrow", "assets/leftArrow.png");
    this.load.image("rightArrow", "assets/rightArrow.png");
    this.load.image("leftArrowDisabled", "assets/leftArrowDisabled.png");
    this.load.image("rightArrowDisabled", "assets/rightArrowDisabled.png");
    this.load.image("backSetting", "assets/backSetting.png");
    for (var i = 1; i < this.totalPages + 1; i++) {
      this.load.image(`handbookPage${i}`, `assets/handbookPage${i}.png`);
    }
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

    // Fade in
    this.cameras.main.fadeIn(500, 0, 0, 0);

    // Create arrows
    this.leftArrow = this.add.image(this.engine.gameWidthCenter - 200, this.engine.gameHeight - 50, "leftArrowDisabled").setScale(8).setInteractive();
    this.rightArrow = this.add.image(this.engine.gameWidthCenter + 200, this.engine.gameHeight - 50, "rightArrow").setScale(8).setInteractive();
    this.leftArrow.on("pointerdown", () => {
      if (this.currentPage > 1) {
        this.leftArrow.setScale(6.5);
        this.currentPage--;
        this.pages.setTexture(`handbookPage${this.currentPage}`);
        this.leftArrow.setTexture("leftArrow");
      }
      if (this.currentPage < this.totalPages) {
        this.rightArrow.setTexture("rightArrow");
      }
    });
    this.leftArrow.on("pointerup", () => {
      this.leftArrow.setScale(8);
      if (this.currentPage <= 1) {
        this.leftArrow.setTexture("leftArrowDisabled");
      }
    });
    this.rightArrow.on("pointerdown", () => {
      if (this.currentPage < this.totalPages) {
        this.rightArrow.setScale(6.5);
        this.currentPage++;
        this.pages.setTexture(`handbookPage${this.currentPage}`);
        this.rightArrow.setTexture("rightArrow");
      }
      if (this.currentPage > 1) {
        this.leftArrow.setTexture("leftArrow");
      }
    });
    this.rightArrow.on("pointerup", () => {
      this.rightArrow.setScale(8);
      if (this.currentPage >= this.totalPages) {
        this.rightArrow.setTexture("rightArrowDisabled");
      }
    });

    // Create pages
    this.pages = this.add.image(this.engine.gameWidthCenter, this.engine.gameHeightCenter - 50, `handbookPage${this.currentPage}`).setScale(8);

    // Create backbutton
    this.backButton = this.add.image(180, 80, "backSetting").setScale(8).setInteractive();
    this.backButton.on("pointerup", () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.scene.stop();
        this.scene.start("Start");
      });
    });
  }
  update() {
    this.cursor.x = this.input.mousePointer.x;
    this.cursor.y = this.input.mousePointer.y;
  }
}
