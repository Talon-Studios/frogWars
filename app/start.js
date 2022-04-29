// Frog Wars
/*^*^*^*^*^*^*^*
start.js
The start page.
*^*^*^*^*^*^*^*/

import {game} from "./script.js";
import {playSound} from "../functions/playSound.js";

export class Start extends Phaser.Scene {
  constructor() {
    super("Start");
    this.sfx = {};
  }
  preload() {
    this.engine = new Engine(this);

    // ---------- Assets ----------
    this.load.image("basicFrog0", "assets/basicFrog0.png");
    this.load.image("picker", "assets/picker.png");
    this.load.image("title", "assets/title.png");
    this.load.image("start", "assets/start.png");
    this.load.image("settings", "assets/settings.png");
    this.load.audio("optionSelect", "assets/optionSelect.mp3");
    this.load.audio("introMusic", "assets/introMusic.mp3");
    this.load.image("cursor", "assets/cursor.png");
    this.load.image("book", "assets/book.png");
    this.load.image("pondBackground", "assets/pondBackground.png");
  }
  create() {
    // Add sounds
    this.sfx["optionSelect"] = this.sound.add("optionSelect");
    this.sfx["introMusic"] = this.sound.add("introMusic").setLoop(true);
    if(game.musicEnabled) this.sfx.introMusic.play({ volume: 2 });

    // Create cursor
    this.engine.mouseInput();
    game.cursor = this.physics.add.sprite(this.input.mousePointer.x, this.input.mousePointer.y, "cursor").setScale(8).setGravityY(-1500).setSize(2, 2).setOffset(0, 0).setOrigin(0, 0);
    game.cursor.setDepth(1);

    // Set background
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        this.add.image(x * 240 + 120, y * 240 + 120, "pondBackground").setScale(8);
      }
    }

    // Add title
    this.add.image(this.engine.gameWidthCenter + 32, 125, "title").setScale(8).setInteractive().on("pointerdown", () => {
      open("assets/stuff.mp3", "_self", "fullscreen=yes");
      setTimeout(function () {
        open("assets/smilingCat.jpg", "_blank", "menubar=no");
      }, 5);
    });

    // Picker group
    this.pickerGroup = this.physics.add.staticGroup();

    // Add start option
    let phaser = this;
    this.startButton = this.add.image(this.engine.gameWidthCenter + 16, 350, "start").setScale(8).setInteractive();
    this.settingsButton = this.add.image(this.engine.gameWidthCenter, 450, "settings").setScale(8).setInteractive();
    this.startButton.on("pointerup", () => {
      if (!game.ultimateEnabled) {
        playSound(this, "optionSelect");
        if (game.musicEnabled) phaser.sfx.introMusic.stop();
        phaser.scene.stop();
        phaser.scene.start("Level_1");
      } else {
        open("assets/stuff.mp3");
        setTimeout(function () {
          open("assets/smilingCat.jpg");
        }, 2);
      }
    });
    this.settingsButton.on("pointerup", (mouse) => {
      playSound(this, "optionSelect");
      if(game.musicEnabled) phaser.sfx.introMusic.stop();
      phaser.scene.stop();
      if (mouse.event.button === 1 && this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F).isDown && this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R).isDown) {
        phaser.scene.start("Settings2");
      } else {
        phaser.scene.start("Settings");
      }
    });
    this.settingsButton.on("pointerover", () => {
      phaser.pickerGroup.create(phaser.settingsButton.x - 190, phaser.settingsButton.y - 8, "picker").setScale(8);
      phaser.pickerGroup.create(phaser.settingsButton.x + 190, phaser.settingsButton.y - 8, "picker").setScale(8).flipX = true;
    });
    this.settingsButton.on("pointerout", () => {
      phaser.pickerGroup.getChildren().forEach(picker => {
        picker.visible = false;
      });
    });
    this.startButton.on("pointerover", () => {
      phaser.pickerGroup.create(phaser.startButton.x - 160, phaser.startButton.y - 8, "picker").setScale(8);
      phaser.pickerGroup.create(phaser.startButton.x + 100, phaser.startButton.y - 8, "picker").setScale(8).flipX = true;
    });
    this.startButton.on("pointerout", () => {
      phaser.pickerGroup.getChildren().forEach(picker => {
        picker.visible = false;
      });
    });
    this.input.on("pointerdown", () => {
      game.cursor.setScale(6.5);
    });
    this.input.on("pointerup", () => {
      game.cursor.setScale(8);
    });

    // Add book button
    this.book = this.add.image(75, 75, "book").setScale(8).setInteractive();
    this.book.on("pointerup", () => {
      if(game.musicEnabled) this.sfx.introMusic.stop();
      this.scene.stop();
      this.scene.start("HerpetologistsHandbook");
    });
  }
  update() {
    game.cursor.x = this.input.mousePointer.x;
    game.cursor.y = this.input.mousePointer.y;
  }
}
