// Frog Wars
/*^*^*^*^*^*^*^*
script.js
The main script for Frog Wars.
*^*^*^*^*^*^*^*/

// ********** Game Scene **********
let game = {
  width: 17,
  height: 7,
  TILESIZE: 64,
  topMargin: 167,
  sfx: {},
  musicEnabled: true,
  sfxEnabled: true,
  frogTypes: {
    "cannon": {
      path: "cannonFrog0",
      name: "cannon"
    },
    "basic": {
      path: "basicFrog0",
      name: "basic"
    },
    "launcher": {
      path: "launcherFrog",
      name: "launcher"
    },
    "toad": {
      path: "toad",
      name: "toad"
    },
    "water": {
      path: "waterFrog0",
      name: "water"
    },
    "bird": {
      path: "bird0",
      name: "bird"
    }
  },
  robotTypes: {
    normalRobot: {
      speed: 0.6,
      health: 5
    },
    armoredRobot: {
      speed: 0.6,
      health: 10
    },
    speedRobot: {
      speed: 1.8,
      health: 3
    },
    cannonRobot: {
      speed: 0.3,
      health: 5
    }
  },
  currencies: {
    flies: 0,
    lilyPads: 0
  },
  currentSelection: "cannon",
  projectileStats: {
    "cannon": {
      damage: 1
    },
    "launcher": {
      damage: 0.5
    },
    "water": {
      damage: 1
    }
  }
};
class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }
  preload() {
    // ********** Images **********
    // ---------- Frogs ----------
    this.load.image("basicFrog0", "assets/basicFrog0.png");
    this.load.image("basicFrog1", "assets/basicFrog1.png");
    this.load.image("basicFrog2", "assets/basicFrog2.png");
    this.load.image("basicFrog3", "assets/basicFrog3.png");
    this.load.image("cannonFrog0", "assets/cannonFrog0.png");
    this.load.image("cannonFrog1", "assets/cannonFrog1.png");
    this.load.image("cannonProjectile", "assets/cannonProjectile.png");
    this.load.image("launcherFrog", "assets/launcherFrog.png");
    this.load.image("launcherProjectile", "assets/launcherProjectile.png");
    this.load.image("toad", "assets/toad.png");
    this.load.image("waterFrog0", "assets/waterFrog0.png");
    this.load.image("waterFrog1", "assets/waterFrog1.png");
    this.load.image("water", "assets/water.png");

    // ---------- Robots ----------
    this.load.image("basicRobot0", "assets/basicRobot0.png");
    this.load.image("basicRobot1", "assets/basicRobot1.png");
    this.load.image("hurtRobot", "assets/hurtRobot.png");
    this.load.image("armoredRobot0", "assets/armoredRobot0.png");
    this.load.image("armoredRobot1", "assets/armoredRobot1.png");
    this.load.image("speedRobot0", "assets/speedRobot0.png");
    this.load.image("speedRobot1", "assets/speedRobot1.png");
    this.load.image("hurtSpeedRobot", "assets/speedRobot2.png");
    this.load.image("cannonRobot0", "assets/cannonRobot0.png");
    this.load.image("cannonRobot1", "assets/cannonRobot1.png");
    this.load.image("hurtCannonRobot", "assets/hurtCannonRobot.png");

    // ---------- Other ----------
    this.load.image("tile0", "assets/tile0.png");
    this.load.image("tile1", "assets/tile1.png");
    this.load.image("tile0select", "assets/tile0select.png");
    this.load.image("tile1select", "assets/tile1select.png");
    this.load.image("explosion0", "assets/explosion0.png");
    this.load.image("explosion1", "assets/explosion1.png");
    this.load.image("explosion2", "assets/explosion2.png");
    this.load.image("explosion3", "assets/explosion3.png");
    this.load.image("bird0", "assets/bird0.png");
    this.load.image("bird1", "assets/bird1.png");
    this.load.image("cursor", "assets/cursor.png");
    this.load.image("optionBorder0", "assets/optionBorder0.png");
    this.load.image("optionBorder1", "assets/optionBorder1.png");
    this.load.image("optionBorder2", "assets/optionBorder2.png");

    // ********** Sounds **********
    // ---------- Music ----------
    this.load.audio("music1-10", "assets/music1-10.wav");

    // ---------- SFX ----------
    this.load.audio("cannonFrogShoot", "assets/cannonFrogShoot.wav");
    this.load.audio("launcherFrogShoot", "assets/launcherFrogShoot.wav");
    this.load.audio("robotDie", "assets/robotDie.wav");
    this.load.audio("robotHit", "assets/robotHit.wav");
    this.load.audio("basicFrogJump", "assets/basicFrogJump.wav");
  }
  create() {
    this.engine = new Engine(this);

    // Add sounds
    game.sfx.cannonFrogShoot = this.sound.add("cannonFrogShoot");
    game.sfx.launcherFrogShoot = this.sound.add("launcherFrogShoot");
    game.sfx.robotDie = this.sound.add("robotDie");
    game.sfx.robotHit = this.sound.add("robotHit");
    game.sfx.basicFrogJump = this.sound.add("basicFrogJump");
    game.sfx.music1 = this.sound.add("music1-10").setLoop(true);
    if (game.musicEnabled) game.sfx.music1.play({ volume: 2 });

    // Create cursor
    this.engine.mouseInput();
    game.cursor = this.physics.add.sprite(this.input.mousePointer.x, this.input.mousePointer.y, "cursor").setScale(8).setGravityY(-1500).setSize(2, 2).setOffset(0, 0).setOrigin(0, 0);
    game.cursor.setDepth(1);

    // Create tiles
    game.tiles = this.physics.add.staticGroup();
    let tileCount = 0;
    for (var x = game.TILESIZE / 2; x < game.width * game.TILESIZE; x += game.TILESIZE) {
      for (var y = (game.TILESIZE / 2) + game.topMargin; y < (game.height * game.TILESIZE) + game.topMargin; y += game.TILESIZE) {
        if (tileCount % 2 == 0) {
          let tile = game.tiles.create(x, y, "tile0").setScale(8).setInteractive();
          tile.textureKey = "tile0";
        } else {
          let tile = game.tiles.create(x, y, "tile1").setScale(8).setInteractive();
          tile.textureKey = "tile1";
        }
        tileCount++;
      }
    }

    // Create choices to put in game
    game.choices = this.physics.add.staticGroup();
    game.choiceBorders = this.physics.add.staticGroup();
    let frogCount = 0;
    const frogs = ["cannon", "basic", "launcher", "toad", "water", "bird"];
    for (var x = 80; x < frogs.length * (game.TILESIZE + 25); x += game.TILESIZE + 25) {
      console.log(x);
      let border = game.choiceBorders.create(x, game.TILESIZE, "optionBorder0").setScale(8).setInteractive();
      border.clicked = false;
      if (frogs[frogCount] === game.currentSelection) {
        border.clicked = true;
        border.setTexture("optionBorder2");
      }
      let choice = game.choices.create(x, game.TILESIZE, game.frogTypes[frogs[frogCount]].path).setScale(8).setInteractive();
      choice.frogType = game.frogTypes[frogs[frogCount]].name;
      choice.border = border;
      frogCount++;
    }

    // Create groups
    game.frogs = this.physics.add.group();
    game.robots = this.physics.add.group();
    game.projectiles = this.physics.add.group();
    game.cannonRobotProjectiles = this.physics.add.group();
    game.removalBirds = this.physics.add.group();

    // ---------- Animation ----------
    // Walking
    this.engine.addAnimation("basicRobotWalk", 5, false, false, "basicRobot0", "basicRobot1");
    this.engine.addAnimation("armoredRobotWalk", 5, false, false, "armoredRobot0", "armoredRobot1");
    this.engine.addAnimation("speedRobotWalk", 5, false, false, "speedRobot0", "speedRobot1");
    this.engine.addAnimation("cannonRobotWalk", 5, false, false, "cannonRobot0", "cannonRobot1");

    // Other
    this.engine.addAnimation("jump", 10, false, false, "basicFrog0", "basicFrog1", "basicFrog2", "basicFrog0");
    this.engine.addAnimation("shootCannonball", 5, false, true, "cannonFrog0", "cannonFrog1");
    this.engine.addAnimation("explode", 10, false, false, "explosion0", "explosion1", "explosion2", "explosion3");
    this.engine.addAnimation("shootWater", 5, false, true, "waterFrog0", "waterFrog1");

    // ---------- Interaction ----------
    game.tiles.getChildren().forEach(tile => {
      tile.on("pointerover", () => {
        tile.setTexture(tile.textureKey + "select");
      });
      tile.on("pointerout", () => {
        tile.setTexture(tile.textureKey);
      });
      tile.on("pointerdown", (pointer) => {
        if (!tile.frog) {
          if (game.currentSelection !== "bird") {
            let frog = game.frogs.create(tile.x, tile.y, game.frogTypes[game.currentSelection].path).setScale(8).setGravityY(-1500).setSize(7, 8).setOffset(0, 0).setImmovable();
            frog.type = game.currentSelection;
            frog.isDead = false;
            frog.health = 10;
            frog.touchedBird = false;
            tile.frog = frog;
          }
        } else {
          if (game.currentSelection === "bird" && !tile.frog.isDead) {
            let bird = game.removalBirds.create(0, tile.y - game.TILESIZE + (game.TILESIZE / 8), "bird1").setScale(8).setGravityY(-config.physics.arcade.gravity.y).setVelocityX(500).setSize(3, 8).setOffset(0, 0);
            bird.flipX = true;
            bird.touchedFrog = false;
            tile.frog.isDead = true;
          }
        }
      });
    });
    game.choices.getChildren().forEach(choice => {
      choice.on("pointerdown", () => {
        if (!choice.border.clicked) {
          game.choiceBorders.getChildren().forEach(x => {
            x.clicked = false;
            x.setTexture("optionBorder0");
          });
          game.currentSelection = choice.frogType;
          choice.border.clicked = true;
          choice.border.setTexture("optionBorder2");
        }
      });
      choice.on("pointerover", () => {
        if (!choice.border.clicked) {
          choice.border.setTexture("optionBorder1");
        }
      });
      choice.on("pointerout", () => {
        if (!choice.border.clicked) {
          choice.border.setTexture("optionBorder0");
        }
      });
    });
    game.choiceBorders.getChildren().forEach(border => {
      border.on("pointerdown", () => {
        if (!border.clicked) {
          game.choiceBorders.getChildren().forEach(x => {
            x.clicked = false;
            x.setTexture("optionBorder0");
          });
          border.clicked = true;
          border.setTexture("optionBorder2");
        }
      });
      border.on("pointerover", () => {
        if (!border.clicked) {
          border.setTexture("optionBorder1");
        }
      });
      border.on("pointerout", () => {
        if (!border.clicked) {
          border.setTexture("optionBorder0");
        }
      });
    });
    this.input.on("pointerdown", () => {
      game.cursor.setScale(6.5);
    });
    this.input.on("pointerup", () => {
      game.cursor.setScale(8);
    });

    // ---------- Colliders ----------
    game.frogRobotCollider = this.physics.add.collider(game.frogs, game.robots, (frog, robot) => {
      if (frog.type === "basic") {
        frog.destroy();
        killRobot(this, game, robot, 5);
      }
    });
    this.physics.add.overlap(game.projectiles, game.robots, (projectile, robot) => {
      projectile.destroy();
      killRobot(this, game, robot, game.projectileStats[projectile.type].damage, () => {
        if (projectile.type === "water" && robot.speed > 0.3) {
          robot.speed -= 0.05;
        }
      });
    });
    this.physics.add.overlap(game.frogs, game.removalBirds, (frog, bird) => {
      if (frog.isDead) {
        bird.setVelocityX(0);
        bird.touchedFrog = true;
        frog.touchedBird = true;
        frog.body.enable = false;
      }
    });
    this.physics.add.overlap(game.cannonRobotProjectiles, game.frogs, (projectile, frog) => {
      projectile.destroy();
    });

    // ---------- Intervals ----------
    this.time.addEvent({
      delay: 1500,
      callback: () => {
        game.tiles.getChildren().forEach(tile => {
          let hasFrog = null;
          game.frogs.getChildren().forEach(frog => {
            if (frog.x == tile.x && frog.y == tile.y) {
              hasFrog = frog;
            }
          });
          tile.frog = hasFrog;
        });
        game.frogs.getChildren().forEach(frog => {
          switch (frog.type) {
            case "basic":
              if(game.sfxEnabled) game.sfx.basicFrogJump.play();
              frog.anims.play("jump", true);
              setTimeout(function() {
                frog.x += game.tiles.getChildren()[0].width * 8;
              }, 50);
              break;
            case "cannon":
              frog.anims.play("shootCannonball", true);
              setTimeout(function() {
                let projectile = game.projectiles.create(frog.x, frog.y, "cannonProjectile").setScale(8).setGravityY(-1500).setVelocityX(300);
                projectile.type = "cannon";
              }, 200);
              break;
            case "launcher":
              if(game.sfxEnabled) game.sfx.launcherFrogShoot.play();
              let numOfSprite = 5;
              for (var i = 0; i < numOfSprite; i++) {
                let projectile = game.projectiles.create(frog.x, frog.y, "launcherProjectile").setScale(8).setGravityY(-1500);
                projectile.type = "launcher";
                projectile.angle = i * 360 / numOfSprite;
                projectile.setVelocityX(300 * Math.cos(projectile.rotation - 67.5));
                projectile.setVelocityY(300 * Math.sin(projectile.rotation - 67.5));
                projectile.setSize(2, 2);
                projectile.setOffset(0, 0);
              }
              break;
            case "water":
              frog.anims.play("shootWater", true);
              setTimeout(function() {
                let projectile = game.projectiles.create(frog.x + 58, frog.y + 48, "water").setScale(8).setGravityY(-1500).setVelocityX(300).setSize(1, 1).setOffset(0, 0);
                projectile.type = "water";
              }, 100);
              break;
          }
        });
      },
      callbackScope: this,
      repeat: -1
    });
    this.time.addEvent({
      delay: this.engine.randomBetween(1000, 3000),
      callback: () => {
        let row = Math.floor(Math.random() * game.height);
        let randomPercentage = Math.random() * 100;
        let type;
        let health;
        let speed;
        if (randomPercentage < 50) {
          type = "basic";
          health = game.robotTypes.normalRobot.health;
          speed = game.robotTypes.normalRobot.speed;
        } else if (randomPercentage >= 50 && randomPercentage < 75) {
          type = "armored";
          health = game.robotTypes.armoredRobot.health;
          speed = game.robotTypes.armoredRobot.speed;
        } else if (randomPercentage >= 75 && randomPercentage < 87.5) {
          type = "speed";
          health = game.robotTypes.speedRobot.health;
          speed = game.robotTypes.speedRobot.speed;
        } else if (randomPercentage >= 87.5) {
          type = "cannon";
          health = game.robotTypes.cannonRobot.health;
          speed = game.robotTypes.cannonRobot.speed;
        }
        let robot = game.robots.create(game.width * game.TILESIZE, (game.TILESIZE / 2 + game.TILESIZE * row) + game.topMargin, `${type}Robot0`).setScale(8).setGravityY(-1500).setSize(4, 8).setOffset(2, 0);
        robot.type = type;
        robot.health = health;
        robot.speed = speed;
        robot.dead = false;
      },
      callbackScope: this,
      repeat: -1
    });
    this.time.addEvent({
      delay: 1500,
      callback: () => {
        game.robots.getChildren().forEach(robot => {
          if (robot.type === "cannon") {
            let projectile = game.cannonRobotProjectiles.create(robot.x - 40, robot.y + 20, "cannonProjectile").setScale(8).setGravityY(-1500).setVelocityX(-300);
            projectile.setSize(2, 2);
            projectile.setOffset(6, 2);
          }
        });
      },
      callbackScope: this,
      repeat: -1
    });
  }
  update() {
    game.cursor.x = this.input.mousePointer.x;
    game.cursor.y = this.input.mousePointer.y;
    game.robots.getChildren().forEach(robot => {
      if (!robot.dead) {
        robot.setVelocityX(-robot.speed * 45);
        switch (robot.type) {
          case "basic":
            robot.anims.play("basicRobotWalk", true);
            break;
          case "armored":
            robot.anims.play("armoredRobotWalk", true);
            break;
          case "speed":
            robot.anims.play("speedRobotWalk", true);
            break;
          case "cannon":
            robot.anims.play("cannonRobotWalk", true);
            break;
        }
      }
    });
    game.tiles.getChildren().forEach(tile => {
      let hasFrog = null;
      game.frogs.getChildren().forEach(frog => {
        if (frog.x == tile.x && frog.y == tile.y) {
          hasFrog = frog;
        }
      });
      tile.frog = hasFrog;
    });
    game.frogs.getChildren().forEach(frog => {
      if (frog.x > game.width * game.TILESIZE) {
        frog.destroy();
      }
      if (frog.touchedBird) {
        frog.y -= 8;
      }
    });
    game.removalBirds.getChildren().forEach(bird => {
      if (bird.x > game.width * game.TILESIZE) {
        bird.destroy();
      }
      if (bird.touchedFrog) {
        bird.y -= 8;
      }
    });
    game.projectiles.getChildren().forEach(projectile => {
      if (projectile.x > game.width * game.TILESIZE || projectile.y > (game.height * game.TILESIZE) + game.topMargin || projectile.y < game.topMargin) {
        projectile.destroy();
      }
    });
  }
}

// ********** Start Scene **********
class Start extends Phaser.Scene {
  constructor() {
    super("Start");
    this.sfx = {};
  }
  preload() {
    // ---------- Assets ----------
    this.load.image("picker", "assets/picker.png");
    this.load.image("title", "assets/title.png");
    this.load.image("start", "assets/start.png");
    this.load.image("settings", "assets/settings.png");
    this.load.audio("optionSelect", "assets/optionSelect.wav");
    this.load.audio("introMusic", "assets/introMusic.mp3");
    this.load.image("cursor", "assets/cursor.png");
  }
  create() {
    this.engine = new Engine(this);

    // Add sounds
    this.sfx.optionSelect = this.sound.add("optionSelect");
    this.sfx.introMusic = this.sound.add("introMusic").setLoop(true);
    if(game.musicEnabled) this.sfx.introMusic.play({ volume: 2 });

    // Create cursor
    this.engine.mouseInput();
    game.cursor = this.physics.add.sprite(this.input.mousePointer.x, this.input.mousePointer.y, "cursor").setScale(8).setGravityY(-1500).setSize(2, 2).setOffset(0, 0).setOrigin(0, 0);
    game.cursor.setDepth(1);

    // Set background color
    this.engine.setBackgroundColor(this, "#ffffff");

    // Add title
    this.add.image(this.engine.gameWidthCenter + 32, 125, "title").setScale(8);

    // Picker group
    this.pickerGroup = this.physics.add.staticGroup();

    // Add start option
    let phaser = this;
    this.startButton = this.add.image(this.engine.gameWidthCenter + 16, 350, "start").setScale(8).setInteractive();
    this.settingsButton = this.add.image(this.engine.gameWidthCenter, 450, "settings").setScale(8).setInteractive();
    this.startButton.on("pointerup", () => {
      if(game.sfxEnabled) phaser.sfx.optionSelect.play();
      if(game.musicEnabled) phaser.sfx.introMusic.stop();
      phaser.scene.stop();
      phaser.scene.start("Game");
    });
    this.settingsButton.on("pointerup", () => {
      if(game.sfxEnabled) phaser.sfx.optionSelect.play();
      if(game.musicEnabled) phaser.sfx.introMusic.stop();
      phaser.scene.stop();
      phaser.scene.start("Settings");
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
  }
  update() {
    game.cursor.x = this.input.mousePointer.x;
    game.cursor.y = this.input.mousePointer.y;
  }
}

// ********** Settings Scene **********
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
      } else {
        this.musicCheckbox.setTexture("checkboxUnchecked");
      }
    });
    this.sfxCheckbox.on("pointerdown", () => {
      game.sfxEnabled = !game.sfxEnabled;
      if (game.sfxEnabled) {
        this.sfxCheckbox.setTexture("checkboxChecked");
      } else {
        this.sfxCheckbox.setTexture("checkboxUnchecked");
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
