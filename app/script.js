// Frog Wars
/*^*^*^*^*^*^*^*
script.js
The main script for Frog Wars.
*^*^*^*^*^*^*^*/

import {loadingBar} from "../functions/loadingBar.js";
import {playSound} from "../functions/playSound.js";
import {killRobot} from "../functions/robotDie.js";
import {killFrog} from "../functions/frogDie.js";
import {preloadImages, preloadAudio} from "../functions/preload.js";
import {loadSounds} from "../functions/loadSounds.js";
import {fadeIn, fadeOut} from "../functions/fading.js";
import {animation} from "../functions/animation.js";

import {firebaseConfig} from "../firebaseConfig.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import {getFirestore, doc, getDoc} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

// ********** Game Object **********
export let game = {
  WIDTH: 20,
  HEIGHT: 7,
  TILESIZE: 64,
  TOPMARGIN: 167,
  sfx: {},
  musicEnabled: (localStorage.getItem("musicEnabled") !== null) ? JSON.parse(localStorage.getItem("musicEnabled")) : true,
  sfxEnabled: (localStorage.getItem("sfxEnabled") !== null) ? JSON.parse(localStorage.getItem("sfxEnabled")) : true,
  frogsEnabled: (localStorage.getItem("frogs") !== null) ? JSON.parse(localStorage.getItem("frogs")) : false,
  funEnabled: (localStorage.getItem("fun") !== null) ? JSON.parse(localStorage.getItem("fun")) : false,
  ultimateEnabled: (localStorage.getItem("ultimate") !== null) ? JSON.parse(localStorage.getItem("ultimate")) : false,
  currencies: {
    flies: Infinity,
    lilyPads: 0
  },
  currentSelection: "cannon",
  robotSpawnDelay: 500,
  robotSpawnTimer: 0,
  robotSpawnRateMin: 100,
  robotSpawnRateMax: 300
};

// ---------- Initialize Firebase ----------
const firebase = initializeApp(firebaseConfig);
const database = getFirestore(firebase);
(async () => {
  const frogTypesDoc = doc(database, "frog-wars-data", "frog-types", "name", "types");
  const robotTypesDoc = doc(database, "frog-wars-data", "robot-types", "name", "types");
  const projectilesDoc = doc(database, "frog-wars-data", "projectiles", "name", "types");
  const frogTypesSnapshot = await getDoc(frogTypesDoc);
  const robotTypesSnapshot = await getDoc(robotTypesDoc);
  const projectilesSnapshot = await getDoc(projectilesDoc);
  game.frogTypes = frogTypesSnapshot.data();
  game.robotTypes = robotTypesSnapshot.data();
  game.projectileStats = projectilesSnapshot.data();
})();

// ---------- Game Scene ----------
export class Game extends Phaser.Scene {
  constructor(sceneKey) {
    super(sceneKey);
  }
  preload() {
    this.engine = new Engine(this);

    // Load assets
    preloadImages(this);
    preloadAudio(this);

    // Initialize loading bar
    loadingBar(this);
  }
  create() {
    loadSounds(game, this);
    if (game.musicEnabled) game.sfx.music1.play({volume: 0.5});

    // Nothing here...
    if (game.frogsEnabled) new froggies();

    // Create pixel cursor
    this.engine.pixelCursor();

    // Fade into game
    fadeIn(this);

    // Create tiles
    game.tiles = this.physics.add.staticGroup();
    let tileCount = 0;
    for (var x = game.TILESIZE / 2; x < game.WIDTH * game.TILESIZE; x += game.TILESIZE) {
      for (var y = (game.TILESIZE / 2) + game.TOPMARGIN; y < (game.HEIGHT * game.TILESIZE) + game.TOPMARGIN; y += game.TILESIZE) {
        if (tileCount % 2 == 0) {
          let tile = game.tiles.create(x, y, "tile0");
          tile.setScale(8);
          tile.setInteractive();
          tile.textureKey = "tile0";
        } else {
          let tile = game.tiles.create(x, y, "tile1").setScale(8).setInteractive();
          tile.setScale(8);
          tile.setInteractive();
          tile.textureKey = "tile1";
        }
        tileCount++;
      }
    }

    // Create choices to put in game
    game.choices = this.physics.add.staticGroup();
    game.choiceBorders = this.physics.add.staticGroup();
    let frogCount = 0;
    const frogs = ["cannon", "topHat", "basic", "launcher", "toad", "water", "fire", "commander", "bullfrog", "bomber", "boxed", "bird"];
    for (var x = 80; x < frogs.length * (game.TILESIZE + 25); x += game.TILESIZE + 25) {
      let frog = game.frogTypes[frogs[frogCount]];
      let border = game.choiceBorders.create(x, game.TILESIZE, "optionBorder0");
      border.setScale(8);
      border.setInteractive();
      border.clicked = false;
      if (frogs[frogCount] === game.currentSelection) {
        border.clicked = true;
        border.setTexture("optionBorder2");
      }
      let choice = game.choices.create(x, game.TILESIZE, frog.path);
      if (frog.name === "boxed") {
        choice.x += 8;
      }
      choice.setScale(8);
      choice.setInteractive();
      choice.frogType = frog.name;
      choice.border = border;
      border.frogType = choice.frogType;
      frogCount++;
    }

    // Create groups
    game.frogs = this.physics.add.group();
    game.robots = this.physics.add.group();
    game.projectiles = this.physics.add.group();
    game.robotProjectiles = this.physics.add.group();
    game.removalBirds = this.physics.add.group();
    game.flies = this.physics.add.group();
    game.explosions = this.physics.add.group();

    animation(this);

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
            let frog;
            if (game.currentSelection === "bullfrog") {
              playSound(game, "bullfrog");
              frog = game.frogs.create(0, tile.y, "bullfrog");
              frog.setScale(8);
              frog.setGravityY(-1500);
              frog.setSize(7, 8);
              frog.setOffset(0, 0);
              frog.setImmovable();
            } else {
              frog = game.frogs.create(tile.x, tile.y, game.frogTypes[game.currentSelection].path);
            }
            if (game.currentSelection === "boxed") {
              frog.x += 8;
              frog.setTexture("boxedFrog0");
            }
            frog.setScale(8);
            frog.setGravityY(-1500);
            frog.setSize(7, 8);
            frog.setOffset(0, 0);
            frog.setImmovable();
            frog.type = game.currentSelection;
            frog.isDead = false;
            frog.stunned = false;
            frog.stunTimer = 0;
            frog.stunTimerMax = 500;
            frog.health = game.frogTypes[frog.type].health;
            frog.touchedBird = false;
            frog.actionTimer = game.funEnabled ? 10 : 200;
            if (frog.type === "basic") {
              frog.actionTimer = game.fun ? 10 : 100;
            } else if (frog.type === "boxed") {
              frog.actionTimer = 600;
            }
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
            let bird = game.removalBirds.create(0, tile.y - game.TILESIZE + (game.TILESIZE / 8), "bird1").setScale(8).setGravityY(-1500).setVelocityX(500).setSize(3, 8).setOffset(0, 0);
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
      robot.killTimer--;
      if (robot.killTimer <= 0) {
        if (frog.type === "boxed") {
          if (frog.damageable) {
            killFrog(this, game, frog, 0.1);
          }
        } else {
          killFrog(this, game, frog, 0.1);
        }
        robot.killTimer = 100;
      }
      if (frog.type === "basic") {
        frog.destroy();
        killRobot(this, game, robot, 5);
      }
    });
    this.physics.add.overlap(game.frogs, game.robots, (frog, robot) => {
      if (frog.type === "bullfrog") {
        killRobot(this, game, robot, 0.2);
      }
    });
    this.physics.add.overlap(game.projectiles, game.robots, (projectile, robot) => {
      if (projectile.type !== "bomb") {
        projectile.destroy();
        killRobot(this, game, robot, game.projectileStats[projectile.type].damage, () => {
          if (projectile.type === "water" && robot.speed > 0.3) {
            robot.speed -= 0.05;
          } else if (projectile.type === "fireball" && !robot.fireDamage) {
            robot.fireDamage = true;
            robot.fireHat = this.add.image(robot.x, robot.y, "fireHat0").setScale(8);
          }
        });
      }
    });
    this.physics.add.overlap(game.frogs, game.removalBirds, (frog, bird) => {
      if (frog.isDead) {
        bird.setVelocityX(0);
        bird.touchedFrog = true;
        frog.touchedBird = true;
        frog.body.enable = false;
      }
    });
    this.physics.add.overlap(game.robotProjectiles, game.frogs, (projectile, frog) => {
      projectile.destroy();
      if (frog.type === "boxed") {
        if (frog.damageable) {
          killFrog(this, game, frog, game.projectileStats[projectile.type].damage, () => {
            if (projectile.type === "soundWave") {
              frog.stunned = true;
            }
          });
        }
      } else {
        killFrog(this, game, frog, game.projectileStats[projectile.type].damage, () => {
          if (projectile.type === "soundWave") {
            frog.stunned = true;
          }
        });
      }
    });
    this.physics.add.collider(game.explosions, game.robots, (explosion, robot) => {
      killRobot(this, game, robot, 0.1);
    });

    // ---------- Intervals ----------
    // Robot actions
    this.engine.setPhaserInterval(() => {
      game.robots.getChildren().forEach(robot => {
        if (robot.type === "cannon") {
          let projectile = game.robotProjectiles.create(robot.x - 40, robot.y + 20, "cannonProjectile").setScale(8).setGravityY(-1500).setVelocityX(-300);
          projectile.setSize(2, 2);
          projectile.setOffset(6, 2);
          projectile.type = "cannon";
        } else if (robot.type === "missile") {
          let projectile = game.robotProjectiles.create(robot.x - 40, robot.y - 4, "missile").setScale(8).setGravityY(-1500).setVelocityX(-300);
          projectile.setSize(8, 7);
          projectile.setOffset(0, 1);
          projectile.type = "missile";
        } else if (robot.type === "dodger") {
          let randomDir = Math.floor(Math.random() * 2);
          if (randomDir === 0) {
            robot.y -= game.TILESIZE;
            if (robot.y < game.TOPMARGIN) {
              robot.y += game.TILESIZE * 2;
            }
          } else {
            robot.y += game.TILESIZE;
            if (robot.y > (game.HEIGHT * game.TILESIZE) + game.TOPMARGIN) {
              robot.y -= game.TILESIZE * 2;
            }
          }
        } else if (robot.type === "loudspeaker") {
          let projectile = game.robotProjectiles.create(robot.x - 40, robot.y, "soundWave0").setScale(8).setGravityY(-1500).setVelocityX(-100);
          projectile.type = "soundWave";
        }
        if (robot.fireDamage) {
          killRobot(this, game, robot, 0.1);
        }
      });
    }, 1500);

    // Create flies
    this.engine.setPhaserInterval(() => {
      let fly = game.flies.create(Math.random() * this.engine.gameWidth, Math.random() * this.engine.gameHeight, "fly0").setInteractive().setScale(8).setOffset(0, 0).setGravityY(-1500);
      this.tweens.add({
        targets: fly,
        x: this.engine.randomBetween(fly.x - 20, fly.x + 20),
        y: this.engine.randomBetween(fly.y - 20, fly.y + 20),
        ease: "Sinusoidal.easeInOut",
        duration: 800,
        repeat: -1,
        yoyo: true
      });
      this.time.addEvent({
        delay: 90000,
        callback: () => {
          fly.destroy();
        },
        callbackScope: this
      });
      fly.on("pointerover", () => {
        playSound(game, "fly");
        game.currencies.flies++;
        this.tweens.add({
          targets: fly,
          x: this.engine.gameWidth - 50,
          y: 50,
          ease: "Expo.easeOut",
          duration: 1000,
          onRepeat: () => {
            fly.destroy();
          },
          repeat: 1
        });
      });
    }, 10000);
  }
  update() {
    // Set position of pixel cursor
    this.engine.updatePixelCursor();

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
          case "missile":
            robot.anims.play("missileRobotWalk", true);
            break;
          case "loudspeaker":
            robot.anims.play("loudspeakerRobotWalk", true);
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
        if ((frog.x === tile.x || frog.x - 8 === tile.x) && frog.y === tile.y) {
          hasFrog = frog;
        }
      });
      tile.frog = hasFrog;
    });
    game.frogs.getChildren().forEach(frog => {
      frog.actionTimer--;
      if (frog.actionTimer <= 0 && !frog.stunned) {
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
              playSound(game, "cannonFrogShoot");
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
            playSound(game, "fireFrogShoot");
            let projectile1 = game.projectiles.create(frog.x + 8, frog.y, "fireball0").setScale(8).setGravityY(-1500).setVelocityY(300).setSize(5, 8).setOffset(0, 0);
            let projectile2 = game.projectiles.create(frog.x + 8, frog.y, "fireball0").setScale(8).setGravityY(-1500).setVelocityY(-300).setSize(5, 8).setOffset(0, 0);
            projectile1.type = "fireball";
            projectile2.type = "fireball";
            projectile1.angle = 90;
            projectile2.angle = 270;
            break;
          case "bomber":
            let bomb = game.projectiles.create(frog.x, frog.y, "bomb").setScale(8).setVelocityY(-500).setVelocityX(300);
            bomb.type = "bomb";
            bomb.setAngularVelocity(500);
            this.time.addEvent({
              delay: 650,
              callback: () => {
                playSound(game, "bigExplosion");
                let explosion = game.explosions.create(bomb.x, bomb.y, "bigExplosion0");
                explosion.setScale(8);
                explosion.setGravityY(-1500);
                explosion.anims.play("explodeBig", true);
                setTimeout(function() {
                  explosion.destroy();
                }, 400);
                bomb.destroy();
              },
              callbackScope: this,
              repeat: false
            });
            break;
          case "boxed":
            frog.anims.play("boxedFrogComeUp", true);
            frog.damageable = true;
            setTimeout(function() {
              playSound(game, "cannonFrogShoot");
              let projectile = game.projectiles.create(frog.x, frog.y, "cannonProjectile").setScale(8).setGravityY(-1500).setVelocityX(300);
              projectile.type = "cannon";
              frog.anims.play("boxedFrogGoDown", true);
              frog.damageable = false;
            }, 5000);
            break;
        }
      }
      if (frog.type === "fire") {
        frog.anims.play("fireFrog", true);
      }
      if (frog.x > game.WIDTH * game.TILESIZE || frog.y < 0) {
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
      if (frog.type === "bullfrog") {
        frog.x += 10;
      }
      if (frog.stunned) {
        frog.stunTimer++;
        if (frog.stunTimer >= frog.stunTimerMax) {
          frog.stunned = false
        }
      }
    });
    game.removalBirds.getChildren().forEach(bird => {
      if (bird.x > game.WIDTH * game.TILESIZE) {
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
      if (projectile.x > game.WIDTH * game.TILESIZE || projectile.x < 0) {
        projectile.destroy();
      }
    });
    game.robotProjectiles.getChildren().forEach(projectile => {
      if (projectile.type === "soundWave") {
        projectile.anims.play("soundWave", true);
      }
    });
    game.flies.getChildren().forEach(fly => {
      fly.anims.play("flies", true);
    });

    // Update timers
    game.robotSpawnTimer++;
    if (game.robotSpawnTimer >= game.robotSpawnDelay) {
      let row = Math.floor(Math.random() * game.HEIGHT);
      let randomPercentage = this.engine.randomPercentage();
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
      } else if (randomPercentage >= 75 && randomPercentage < 80) {
        type = "speed";
        health = game.robotTypes.speedRobot.health;
        speed = game.robotTypes.speedRobot.speed;
      } else if (randomPercentage >= 80 && randomPercentage < 85) {
        type = "cannon";
        health = game.robotTypes.cannonRobot.health;
        speed = game.robotTypes.cannonRobot.speed;
      } else if (randomPercentage >= 85 && randomPercentage < 90) {
        type = "dodger";
        health = game.robotTypes.dodgerRobot.health;
        speed = game.robotTypes.dodgerRobot.speed;
      } else if (randomPercentage >= 90 && randomPercentage < 95) {
        type = "missile";
        health = game.robotTypes.missileRobot.health;
        speed = game.robotTypes.missileRobot.speed;
      } else if (randomPercentage >= 95 && randomPercentage <= 100) {
        type = "loudspeaker";
        health = game.robotTypes.loudspeakerRobot.health;
        speed = game.robotTypes.loudspeakerRobot.speed;
      }
      let robot = game.robots.create(game.WIDTH * game.TILESIZE + 8, (game.TILESIZE / 2 + game.TILESIZE * row) + game.TOPMARGIN, `${type}Robot0`).setScale(8).setGravityY(-1500).setSize(4, 8).setOffset(2, 0);
      robot.type = type;
      robot.health = health;
      robot.speed = speed;
      robot.dead = false;
      robot.fireDamage = false;
      robot.killTimer = 100;
      game.robotSpawnDelay = !game.funEnabled ? this.engine.randomBetween(game.robotSpawnRateMin, game.robotSpawnRateMax) : 5;
      game.robotSpawnTimer = 0;
    }
  }
}
