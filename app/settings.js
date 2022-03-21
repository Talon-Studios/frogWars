// Frog Wars
/*^*^*^*^*^*^*^*
settings.js
The settings page for sfx and music.
*^*^*^*^*^*^*^*/

class Settings extends Phaser.Scene {
  constructor() {
    super("Settings");
    this.sfx = {};
  }
  preload() {
    this.load.audio("optionSelect", "assets/optionSelect.wav");
    this.load.audio("introMusic", "assets/introMusic.mp3");
    this.load.image("cursor", "assets/cursor.png");
    this.load.image("checkboxChecked", "assets/checkboxChecked.png");
    this.load.image("checkboxUnchecked", "assets/checkboxUnchecked.png");
    this.load.image("musicSetting", "assets/musicSetting.png");
    this.load.image("sfxSetting", "assets/sfxSetting.png");
    this.load.image("backSetting", "assets/backSetting.png");
  }
  create() {
    this.engine = new Engine(this);

    // Add sounds
    this.sfx.optionSelect = this.sound.add("optionSelect");

    // Create cursor
    this.engine.mouseInput();
    game.cursor = this.physics.add.sprite(this.input.mousePointer.x, this.input.mousePointer.y, "cursor").setScale(8).setGravityY(-1500).setSize(2, 2).setOffset(0, 0).setOrigin(0, 0);
    game.cursor.setDepth(1);

    // Set background color
    this.engine.setBackgroundColor(this, "#ffffff");

    // Create text
    this.musicSetting = this.add.image(this.engine.gameWidthCenter + 42, 200, "musicSetting").setScale(8).setInteractive();
    this.sfxSetting = this.add.image(this.engine.gameWidthCenter + 70, 300, "sfxSetting").setScale(8).setInteractive();

    // Create checkboxes
    this.musicCheckbox = this.add.image(this.engine.gameWidthCenter - 180, 190, "checkboxUnchecked").setScale(8).setInteractive();
    if (game.musicEnabled) this.musicCheckbox.setTexture("checkboxChecked");
    this.sfxCheckbox = this.add.image(this.engine.gameWidthCenter - 180, 290, "checkboxUnchecked").setScale(8).setInteractive();
    if (game.sfxEnabled) this.sfxCheckbox.setTexture("checkboxChecked");

    // Create backbutton
    this.backSetting = this.add.image(this.engine.gameWidthCenter, 490, "backSetting").setScale(8).setInteractive();

    // Interaction
    this.musicCheckbox.on("pointerdown", () => {
      game.musicEnabled = !game.musicEnabled;
      if (game.musicEnabled) {
        this.musicCheckbox.setTexture("checkboxChecked");
        localStorage.setItem("musicEnabled", true);
      } else {
        this.musicCheckbox.setTexture("checkboxUnchecked");
        localStorage.setItem("musicEnabled", false);
      }
    });
    this.sfxCheckbox.on("pointerdown", () => {
      game.sfxEnabled = !game.sfxEnabled;
      if (game.sfxEnabled) {
        this.sfxCheckbox.setTexture("checkboxChecked");
        localStorage.setItem("sfxEnabled", true);
      } else {
        this.sfxCheckbox.setTexture("checkboxUnchecked");
        localStorage.setItem("sfxEnabled", false);
      }
    });
    this.backSetting.on("pointerup", () => {
      this.scene.stop();
      this.scene.start("Start");
    });
    this.input.on("pointerdown", () => {
      game.cursor.setScale(6.5);
    });
    this.input.on("pointerup", () => {
      game.cursor.setScale(8);
    });
  }
  update() {
    game.cursor.x = this.input.mousePointer.x;
    game.cursor.y = this.input.mousePointer.y;
  }
}

// Nothing here... hehe...
class Settings2 extends Phaser.Scene {
  constructor() {
    super("Settings2");
    this.sfx = {};
  }
  preload() {
    this.load.audio("optionSelect", "assets/optionSelect.wav");
    this.load.audio("introMusic", "assets/introMusic.mp3");
    this.load.image("cursor", "assets/cursor.png");
    this.load.image("checkboxChecked", "assets/checkboxChecked.png");
    this.load.image("checkboxUnchecked", "assets/checkboxUnchecked.png");
    this.load.image("backSetting", "assets/backSetting.png");
    this.load.image("frogsText", "assets/frogsText.png");
    this.load.image("funText", "assets/funText.png");
    this.load.image("ultimateText", "assets/ultimateText.png");
  }
  create() {
    this.engine = new Engine(this);

    // Add sounds
    this.sfx.optionSelect = this.sound.add("optionSelect");

    // Create cursor
    this.engine.mouseInput();
    game.cursor = this.physics.add.sprite(this.input.mousePointer.x, this.input.mousePointer.y, "cursor").setScale(8).setGravityY(-1500).setSize(2, 2).setOffset(0, 0).setOrigin(0, 0);
    game.cursor.setDepth(1);

    // Set background color
    this.engine.setBackgroundColor(this, "#ffffff");

    // Create options
    this.add.image(this.engine.gameWidthCenter + 42, 200, "frogsText").setScale(8).setInteractive();
    this.add.image(this.engine.gameWidthCenter + 30, 300, "funText").setScale(8).setInteractive();
    this.add.image(this.engine.gameWidthCenter + 50, 400, "ultimateText").setScale(8).setInteractive();

    // Create checkboxes
    this.frogCheckbox = this.add.image(this.engine.gameWidthCenter - 180, 190, "checkboxUnchecked").setScale(8).setInteractive();
    if (game.frogsEnabled) this.frogCheckbox.setTexture("checkboxChecked");
    game.funCheckbox = this.add.image(this.engine.gameWidthCenter - 180, 290, "checkboxUnchecked").setScale(8).setInteractive();
    if (game.funEnabled) game.funCheckbox.setTexture("checkboxChecked");
    game.ultimateCheckbox = this.add.image(this.engine.gameWidthCenter - 180, 390, "checkboxUnchecked").setScale(8).setInteractive();
    if (game.ultimateEnabled) game.ultimateCheckbox.setTexture("checkboxChecked");
    this.frogCheckbox.on("pointerdown", () => {
      game.frogsEnabled = !game.frogsEnabled;
      if (game.frogsEnabled) {
        this.frogCheckbox.setTexture("checkboxChecked");
        localStorage.setItem("frogs", true);
      } else {
        this.frogCheckbox.setTexture("checkboxUnchecked");
        localStorage.setItem("frogs", false);
      }
    });
    game.funCheckbox.on("pointerdown", () => {
      game.funEnabled = !game.funEnabled;
      if (game.funEnabled) {
        game.funCheckbox.setTexture("checkboxChecked");
        localStorage.setItem("fun", true);
      } else {
        game.funCheckbox.setTexture("checkboxUnchecked");
        localStorage.setItem("fun", false);
      }
    });
    game.ultimateCheckbox.on("pointerdown", () => {
      game.ultimateEnabled = !game.ultimateEnabled;
      if (game.ultimateEnabled) {
        game.ultimateCheckbox.setTexture("checkboxChecked");
        localStorage.setItem("ultimate", true);
      } else {
        game.ultimateCheckbox.setTexture("checkboxUnchecked");
        localStorage.setItem("ultimate", false);
      }
    });

    // Create backbutton
    this.backSetting = this.add.image(this.engine.gameWidthCenter, 490, "backSetting").setScale(8).setInteractive();
    this.backSetting.on("pointerup", () => {
      this.scene.stop();
      this.scene.start("Start");
    });
    this.input.on("pointerdown", () => {
      game.cursor.setScale(6.5);
    });
    this.input.on("pointerup", () => {
      game.cursor.setScale(8);
    });
  }
  update() {
    game.cursor.x = this.input.mousePointer.x;
    game.cursor.y = this.input.mousePointer.y;
  }
}
