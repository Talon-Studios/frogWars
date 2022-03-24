// Frog Wars
/*^*^*^*^*^*^*^*
script.js
The main script for Frog Wars.
*^*^*^*^*^*^*^*/

// ********** Game Scene **********
let game = {
  width: 20,
  height: 7,
  TILESIZE: 64,
  topMargin: 167,
  sfx: {},
  musicEnabled: (localStorage.getItem("musicEnabled") !== null) ? JSON.parse(localStorage.getItem("musicEnabled")) : true,
  sfxEnabled: (localStorage.getItem("sfxEnabled") !== null) ? JSON.parse(localStorage.getItem("sfxEnabled")) : true,
  frogsEnabled: (localStorage.getItem("frogs") !== null) ? JSON.parse(localStorage.getItem("frogs")) : false,
  funEnabled: (localStorage.getItem("fun") !== null) ? JSON.parse(localStorage.getItem("fun")) : false,
  ultimateEnabled: (localStorage.getItem("ultimate") !== null) ? JSON.parse(localStorage.getItem("ultimate")) : false,
  frogTypes: {
    "cannon": {
      path: "cannonFrog0",
      health: 10,
      name: "cannon",
      price: 30
    },
    "basic": {
      path: "basicFrog0",
      health: Infinity,
      name: "basic",
      price: 40
    },
    "launcher": {
      path: "launcherFrog",
      health: 5,
      name: "launcher",
      price: 45
    },
    "toad": {
      path: "toad",
      health: 20,
      name: "toad",
      price: 100
    },
    "water": {
      path: "waterFrog0",
      health: 5,
      name: "water",
      price: 50
    },
    "fire": {
      path: "fireFrog0",
      health: 5,
      name: "fire",
      price: 250
    },
    "commander": {
      path: "commanderFrog",
      health: 10,
      name: "commander",
      price: 100
    },
    "topHat": {
      path: "topHatFrog",
      health: 30,
      name: "topHat",
      price: 35
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
    },
    dodgerRobot: {
      speed: 0.8,
      health: 7
    }
  },
  currencies: {
    flies: Infinity,
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
    },
    "fireball": {
      damage: 2
    }
  }
};
class Game extends Phaser.Scene {
  constructor(sceneKey) {
    super(sceneKey);
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
    this.load.image("hurtCannonFrog", "assets/hurtCannonFrog.png");
    this.load.image("cannonProjectile", "assets/cannonProjectile.png");
    this.load.image("launcherFrog", "assets/launcherFrog.png");
    this.load.image("hurtLauncherFrog", "assets/hurtLauncherFrog.png");
    this.load.image("launcherProjectile", "assets/launcherProjectile.png");
    this.load.image("toad", "assets/toad.png");
    this.load.image("hurtToad", "assets/hurtToad.png");
    this.load.image("waterFrog0", "assets/waterFrog0.png");
    this.load.image("waterFrog1", "assets/waterFrog1.png");
    this.load.image("hurtWaterFrog", "assets/hurtWaterFrog.png");
    this.load.image("water", "assets/water.png");
    this.load.image("fireFrog0", "assets/fireFrog0.png");
    this.load.image("fireFrog1", "assets/fireFrog1.png");
    this.load.image("fireFrog2", "assets/fireFrog2.png");
    this.load.image("fireball0", "assets/fireball0.png");
    this.load.image("fireball1", "assets/fireball1.png");
    this.load.image("hurtFireFrog", "assets/hurtFireFrog.png");
    this.load.image("commanderFrog", "assets/commanderFrog.png");
    this.load.image("topHatFrog", "assets/topHatFrog.png");
    this.load.image("hurtTopHatFrog", "assets/hurtTopHatFrog.png");

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
    this.load.image("dodgerRobot0", "assets/dodgerRobot0.png");
    this.load.image("dodgerRobot1", "assets/dodgerRobot1.png");
    this.load.image("hurtDodgerRobot", "assets/hurtDodgerRobot.png");

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
    this.load.image("fireHat0", "assets/fireHat0.png");
    this.load.image("fireHat1", "assets/fireHat1.png");
    this.load.image("fireHat2", "assets/fireHat2.png");
    this.load.image("X", "assets/X.png");

    // ********** Sounds **********
    // ---------- Music ----------
    this.load.audio("music1-10", "assets/music1-10.wav");

    // ---------- SFX ----------
    this.load.audio("cannonFrogShoot", "assets/cannonFrogShoot.wav");
    this.load.audio("launcherFrogShoot", "assets/launcherFrogShoot.wav");
    this.load.audio("waterFrogShoot", "assets/waterFrogShoot.wav");
    this.load.audio("robotDie", "assets/robotDie.wav");
    this.load.audio("robotHit", "assets/robotHit.wav");
    this.load.audio("basicFrogJump", "assets/basicFrogJump.wav");
  }
  create() {
    this.engine = new Engine(this);

    // Add sounds
    game.sfx["cannonFrogShoot"] = this.sound.add("cannonFrogShoot");
    game.sfx["launcherFrogShoot"] = this.sound.add("launcherFrogShoot");
    game.sfx["waterFrogShoot"] = this.sound.add("waterFrogShoot");
    game.sfx["robotDie"] = this.sound.add("robotDie");
    game.sfx["robotHit"] = this.sound.add("robotHit");
    game.sfx["basicFrogJump"] = this.sound.add("basicFrogJump");
    game.sfx["music1"] = this.sound.add("music1-10").setLoop(true);
    if (game.musicEnabled) game.sfx.music1.play({volume: 0.5});

    // Nothing here...
    if (game.frogsEnabled) new froggies();

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
    const frogs = ["cannon", "topHat", "basic", "launcher", "toad", "water", "fire", "commander", "bird"];
    for (var x = 80; x < frogs.length * (game.TILESIZE + 25); x += game.TILESIZE + 25) {
      let border = game.choiceBorders.create(x, game.TILESIZE, "optionBorder0").setScale(8).setInteractive();
      border.clicked = false;
      if (frogs[frogCount] === game.currentSelection) {
        border.clicked = true;
        border.setTexture("optionBorder2");
      }
      let choice = game.choices.create(x, game.TILESIZE, game.frogTypes[frogs[frogCount]].path).setScale(8).setInteractive();
      choice.frogType = game.frogTypes[frogs[frogCount]].name;
      choice.border = border;
      border.frogType = choice.frogType;
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
    this.engine.addAnimation("dodgerRobotWalk", 5, false, false, "dodgerRobot0", "dodgerRobot1");

    // Other
    this.engine.addAnimation("jump", 10, false, false, "basicFrog0", "basicFrog1", "basicFrog2", "basicFrog0");
    this.engine.addAnimation("shootCannonball", 5, false, true, "cannonFrog0", "cannonFrog1");
    this.engine.addAnimation("explode", 10, false, false, "explosion0", "explosion1", "explosion2", "explosion3");
    this.engine.addAnimation("shootCannonball", 5, false, true, "cannonFrog0", "cannonFrog1");
    this.engine.addAnimation("fireFrog", 12, true, false, "fireFrog0", "fireFrog1", "fireFrog2");
    this.engine.addAnimation("shootWater", 5, false, true, "waterFrog0", "waterFrog1");
    this.engine.addAnimation("fireball", 5, true, false, "fireball0", "fireball1");

    // ---------- Interaction ----------
    // Create frogs
    game.tiles.getChildren().forEach(tile => {
      tile.on("pointerover", () => {
        tile.setTexture(tile.textureKey + "select");
      });
      tile.on("pointerout", () => {
        tile.setTexture(tile.textureKey);
      });
      tile.on("pointerdown", (pointer) => {
        if (!tile.frog && game.currentSelection) {
          if (game.currentSelection !== "bird") {
            let frog = game.frogs.create(tile.x, tile.y, game.frogTypes[game.currentSelection].path).setScale(8).setGravityY(-1500).setSize(7, 8).setOffset(0, 0).setImmovable();
            frog.type = game.currentSelection;
            frog.isDead = false;
            frog.health = game.frogTypes[frog.type].health;
            frog.touchedBird = false;
            frog.actionTimer = 200;
            frog.actionTimerMax = frog.actionTimer;
            frog.commanded = false;
            if (frog.type === "launcher") {
              frog.launchNum = 5
            }
            tile.frog = frog;
            game.currencies.flies -= game.frogTypes[frog.type].price;
            let canBuySomething = false;
            Object.keys(game.frogTypes).forEach(frogType => {
              if (game.frogTypes[frogType].price <= game.currencies.flies) {
                canBuySomething = true;
              }
            });
            if (!canBuySomething) {
              game.currentSelection = "";
              game.choiceBorders.getChildren().forEach(border => {
                border.clicked = false;
                border.setTexture("optionBorder0");
              });
            }
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

    // Choose active frog
    game.choices.getChildren().forEach(choice => {
      choice.on("pointerdown", () => {
        if (!choice.border.clicked && (game.currencies.flies >= game.frogTypes[choice.frogType].price || choice.frogType === "bird")) {
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
        if (!choice.border.clicked && (game.currencies.flies >= game.frogTypes[choice.frogType].price || choice.frogType === "bird")) {
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
        if (!border.clicked && (game.currencies.flies >= game.frogTypes[border.frogType].price || border.frogType === "bird")) {
          game.choiceBorders.getChildren().forEach(x => {
            x.clicked = false;
            x.setTexture("optionBorder0");
          });
          game.currentSelection = border.frogType;
          border.clicked = true;
          border.setTexture("optionBorder2");
        }
      });
      border.on("pointerover", () => {
        if (!border.clicked && (game.currencies.flies >= game.frogTypes[border.frogType].price || border.frogType === "bird")) {
          border.setTexture("optionBorder1");
        }
      });
      border.on("pointerout", () => {
        if (!border.clicked) {
          border.setTexture("optionBorder0");
        }
      });
    });

    // Change cursor size
    this.input.on("pointerdown", () => {
      game.cursor.setScale(6.5);
    });
    this.input.on("pointerup", () => {
      game.cursor.setScale(8);
    });

    // ---------- Colliders ----------
    this.physics.add.collider(game.frogs, game.robots, (frog, robot) => {
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
        } else if (projectile.type === "fireball" && !robot.fireDamage) {
          robot.fireDamage = true;
          robot.fireHat = this.add.image(robot.x, robot.y, "fireHat0").setScale(8);
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
      killFrog(this, game, frog, 1);
    });

    // ---------- Intervals ----------
    // Robot actions
    this.time.addEvent({
      delay: 1500,
      callback: () => {
        game.robots.getChildren().forEach(robot => {
          if (robot.type === "cannon") {
            let projectile = game.cannonRobotProjectiles.create(robot.x - 40, robot.y + 20, "cannonProjectile").setScale(8).setGravityY(-1500).setVelocityX(-300);
            projectile.setSize(2, 2);
            projectile.setOffset(6, 2);
          } else if (robot.type === "dodger") {
            let randomDir = Math.floor(Math.random() * 2);
            if (randomDir === 0) {
              robot.y -= game.TILESIZE;
              if (robot.y < game.topMargin) {
                robot.y += game.TILESIZE * 2;
              }
            } else {
              robot.y += game.TILESIZE;
              if (robot.y > (game.height * game.TILESIZE) + game.topMargin) {
                robot.y -= game.TILESIZE * 2;
              }
            }
          }
          if (robot.fireDamage) {
            killRobot(this, game, robot, 0.1);
          }
        });
      },
      callbackScope: this,
      repeat: -1
    });

    // Spawn robots
    this.time.addEvent({
      delay: !game.funEnabled ? this.engine.randomBetween(1000, 3000) : 100,
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
        } else if (randomPercentage >= 75 && randomPercentage < 82.7) {
          type = "speed";
          health = game.robotTypes.speedRobot.health;
          speed = game.robotTypes.speedRobot.speed;
        } else if (randomPercentage >= 82.7 && randomPercentage < 91.7) {
          type = "cannon";
          health = game.robotTypes.cannonRobot.health;
          speed = game.robotTypes.cannonRobot.speed;
        } else if (randomPercentage >= 91.7) {
          type = "dodger";
          health = game.robotTypes.dodgerRobot.health;
          speed = game.robotTypes.dodgerRobot.speed;
        }
        let robot = game.robots.create(game.width * game.TILESIZE + 8, (game.TILESIZE / 2 + game.TILESIZE * row) + game.topMargin, `${type}Robot0`).setScale(8).setGravityY(-1500).setSize(4, 8).setOffset(2, 0);
        robot.type = type;
        robot.health = health;
        robot.speed = speed;
        robot.dead = false;
        robot.fireDamage = false;
      },
      callbackScope: this,
      repeat: -1
    });
  }
  update() {
    // Set position of mouse
    game.cursor.x = this.input.mousePointer.x;
    game.cursor.y = this.input.mousePointer.y;

    // Updating groups
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
          case "dodger":
            robot.anims.play("dodgerRobotWalk", true);
            break;
        }
        if (robot.fireDamage) {
          if (robot.type === "speed" || robot.type === "dodger") {
            robot.fireHat.x = robot.x + 8;
            robot.fireHat.y = robot.y;
          } else if (robot.type === "cannon") {
            robot.fireHat.x = robot.x + 8;
            robot.fireHat.y = robot.y - 8;
          } else {
            robot.fireHat.x = robot.x + 8;
            robot.fireHat.y = robot.y - 16;
          }
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
      frog.actionTimer--;
      if (frog.actionTimer <= 0) {
        frog.actionTimer = frog.actionTimerMax;
        let robotOnRow = false;
        game.robots.getChildren().forEach(robot => {
          if (robot.y === frog.y) {
            robotOnRow = true;
          }
        });
        switch (frog.type) {
          case "basic":
            if (robotOnRow) {
              playSound(game, "basicFrogJump");
              frog.anims.play("jump", true);
              setTimeout(function() {
                frog.x += game.tiles.getChildren()[0].width * 8;
              }, 50);
            }
            break;
          case "cannon":
            if (robotOnRow) {
              frog.anims.play("shootCannonball", true);
              setTimeout(function() {
                let projectile = game.projectiles.create(frog.x, frog.y, "cannonProjectile").setScale(8).setGravityY(-1500).setVelocityX(300);
                projectile.type = "cannon";
              }, 200);
            }
            break;
          case "launcher":
            playSound(game, "launcherFrogShoot");
            let numOfSprite = frog.launchNum;
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
            if (robotOnRow) {
              playSound(game, "waterFrogShoot");
              frog.anims.play("shootWater", true);
              setTimeout(function() {
                let projectile = game.projectiles.create(frog.x + 58, frog.y + 48, "water").setScale(8).setGravityY(-1500).setVelocityX(300).setSize(1, 1).setOffset(0, 0);
                projectile.type = "water";
              }, 100);
            }
            break;
          case "fire":
            let projectile1 = game.projectiles.create(frog.x + 8, frog.y, "fireball0").setScale(8).setGravityY(-1500).setVelocityY(300).setSize(5, 8).setOffset(0, 0);
            let projectile2 = game.projectiles.create(frog.x + 8, frog.y, "fireball0").setScale(8).setGravityY(-1500).setVelocityY(-300).setSize(5, 8).setOffset(0, 0);
            projectile1.type = "fireball";
            projectile2.type = "fireball";
            projectile1.angle = 90;
            projectile2.angle = 270;
            break;
        }
      }
      if (frog.type === "fire") {
        frog.anims.play("fireFrog", true);
      }
      if (frog.x > game.width * game.TILESIZE || frog.y < 0) {
        frog.destroy();
      }
      if (frog.touchedBird) {
        frog.y -= 8;
      }
      if (frog.commanded) {
        if (frog.actionTimerMax === 200) {
          if (frog.type === "launcher") {
            if (frog.launchNum < 6) {
              frog.launchNum += 1;
            }
          } else {
            frog.actionTimerMax /= 2;
          }
        }
      }
      if (frog.type === "commander") {
        game.frogs.getChildren().forEach(frog2 => {
          if (frog2.type !== "commander" && frog2.x <= frog.x + 64 && frog2.x >= frog.x - 64 && frog2.y <= frog.y + 64 && frog2.y >= frog.y - 64) {
            frog2.commanded = true;
          }
        });
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
      if (projectile.type === "fireball") {
        projectile.anims.play("fireball", true);
      }
      if (projectile.x > game.width * game.TILESIZE || projectile.x < 0) {
        projectile.destroy();
      }
    });
  }
}
