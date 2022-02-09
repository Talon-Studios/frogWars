// Frog Wars
let game = {
  width: 17,
  height: 7,
  TILESIZE: 64,
  topMargin: 167,
  robot: {
    speed: 0.6,
    health: 5
  },
  armoredRobot: {
    speed: 0.6,
    health: 10
  },
  speedRobot: {
    speed: 1.2,
    health: 3
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
    }
  }
};
function preload() {
  this.load.image("tile0", "assets/tile0.png");
  this.load.image("tile1", "assets/tile1.png");
  this.load.image("tile0select", "assets/tile0select.png");
  this.load.image("tile1select", "assets/tile1select.png");
  this.load.image("basicFrog0", "assets/basicFrog0.png");
  this.load.image("basicFrog1", "assets/basicFrog1.png");
  this.load.image("basicFrog2", "assets/basicFrog2.png");
  this.load.image("basicFrog3", "assets/basicFrog3.png");
  this.load.image("basicRobot0", "assets/basicRobot0.png");
  this.load.image("basicRobot1", "assets/basicRobot1.png");
  this.load.image("cannonFrog0", "assets/cannonFrog0.png");
  this.load.image("cannonFrog1", "assets/cannonFrog1.png");
  this.load.image("cannonProjectile", "assets/cannonProjectile.png");
  this.load.image("hurtRobot", "assets/hurtRobot.png");
  this.load.image("armoredRobot0", "assets/armoredRobot0.png");
  this.load.image("armoredRobot1", "assets/armoredRobot1.png");
  this.load.image("speedRobot0", "assets/speedRobot0.png");
  this.load.image("speedRobot1", "assets/speedRobot1.png");
  this.load.image("hurtSpeedRobot", "assets/speedRobot2.png");
  this.load.image("launcherFrog0", "assets/launcherFrog.png");
  this.load.image("launcherProjectile", "assets/launcherProjectile.png");
}
function create() {
  // Create tiles
  game.tiles = this.physics.add.staticGroup();
  let count = 0;
  for (var x = game.TILESIZE / 2; x < game.width * game.TILESIZE; x += game.TILESIZE) {
    for (var y = (game.TILESIZE / 2) + game.topMargin; y < (game.height * game.TILESIZE) + game.topMargin; y += game.TILESIZE) {
      if (count % 2 == 0) {
        let tile = game.tiles.create(x, y, "tile0").setScale(8).setInteractive();
        tile.textureKey = "tile0";
      } else {
        let tile = game.tiles.create(x, y, "tile1").setScale(8).setInteractive();
        tile.textureKey = "tile1";
      }
      count++;
    }
  }

  // Create choices to put in game
  game.choices = this.physics.add.staticGroup();
  let frogCount = 0;
  const frogs = ["basic", "cannon", "launcher"];
  for (var x = (game.TILESIZE / 2) + 50; x < (game.TILESIZE * 3) + 50; x += game.TILESIZE + 10) {
    let choice = game.choices.create(x, game.TILESIZE, `${frogs[frogCount]}Frog0`).setScale(8).setInteractive();
    choice.frogType = frogs[frogCount];
    frogCount++;
  }

  // Create groups
  game.frogs = this.physics.add.group();
  game.robots = this.physics.add.group();
  game.projectiles = this.physics.add.group();

  // Animation
  this.anims.create({
    key: "jump",
    frames: [{
      key: "basicFrog0"
    }, {
      key: "basicFrog1"
    }, {
      key: "basicFrog2"
    }, {
      key: "basicFrog0"
    }],
    frameRate: 10,
    repeat: 0
  });
  this.anims.create({
    key: "basicRobotWalk",
    frames: [{
      key: "basicRobot0"
    }, {
      key: "basicRobot1"
    }],
    frameRate: 5,
    repeat: -1
  });
  this.anims.create({
    key: "armoredRobotWalk",
    frames: [{
      key: "armoredRobot0"
    }, {
      key: "armoredRobot1"
    }],
    frameRate: 5,
    repeat: -1
  });
  this.anims.create({
    key: "speedRobotWalk",
    frames: [{
      key: "speedRobot0"
    }, {
      key: "speedRobot1"
    }],
    frameRate: 5,
    repeat: -1
  });
  this.anims.create({
    key: "shootCannonball",
    frames: [{
      key: "cannonFrog0"
    }, {
      key: "cannonFrog1"
    }],
    frameRate: 5,
    repeat: 0,
    yoyo: true
  });

  // All of the interaction
  game.tiles.getChildren().forEach(tile => {
    tile.on("pointerover", () => {
      tile.setTexture(tile.textureKey + "select");
    });
    tile.on("pointerout", () => {
      tile.setTexture(tile.textureKey);
    });
    tile.on("pointerdown", (pointer) => {
      if (!tile.frog) {
        let frog = game.frogs.create(tile.x, tile.y, `${game.currentSelection}Frog0`).setScale(8).setGravityY(-1500).setSize(7, 8).setOffset(0, 0);
        frog.type = game.currentSelection;
        tile.frog = frog;
      }
    });
  });
  game.choices.getChildren().forEach(choice => {
    choice.on("pointerdown", () => {
      game.currentSelection = choice.frogType;
    });
  });

  // Colliders
  this.physics.add.overlap(game.frogs, game.robots, (frog, robot) => {
    if (frog.type === "basic") {
      frog.destroy();
      let lastFrame = robot.texture.key;
      if (robot.type === "basic" || robot.type === "armored") {
        robot.setTexture("hurtRobot");
      } else if (robot.type === "speed") {
        robot.setTexture("hurtSpeedRobot");
      }
      setTimeout(function () {
        robot.setTexture(lastFrame);
      }, 500);
      robot.health -= 5;
      if (robot.health <= 0) {
        robot.destroy();
      }
    }
  });
  this.physics.add.collider(game.projectiles, game.robots, (projectile, robot) => {
    projectile.destroy();
    let lastFrame = robot.texture.key;
    if (robot.type === "basic" || robot.type === "armored") {
      robot.setTexture("hurtRobot");
    } else if (robot.type === "speed") {
      robot.setTexture("hurtSpeedRobot");
    }
    setTimeout(function () {
      robot.setTexture(lastFrame);
    }, 500);
    robot.health -= game.projectileStats[projectile.type].damage;
    if (robot.health <= 0) {
      robot.destroy();
    }
  });
  setInterval(function () {
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
          frog.anims.play("jump", true);
          setTimeout(function () {
            frog.x += game.tiles.getChildren()[0].width * 8;
          }, 50);
          break;
        case "cannon":
          frog.anims.play("shootCannonball", true);
          setTimeout(function () {
            let projectile = game.projectiles.create(frog.x, frog.y, "cannonProjectile").setScale(8).setGravityY(-1500).setVelocityX(300);
            projectile.type = "cannon";
          }, 200);
          break;
        case "launcher":
          let numOfSprite = 3;
          for (var i = 0; i < numOfSprite; i++) {
            let projectile = game.projectiles.create(frog.x, frog.y, "launcherProjectile").setScale(8).setGravityY(-1500);
            projectile.type = "launcher";
            projectile.angle = i * 360 / numOfSprite;
            projectile.setVelocityX(300 * Math.cos(projectile.rotation - 67.5));
            projectile.setVelocityY(300 * Math.sin(projectile.rotation - 67.5));
            projectile.setSize(2, 2);
            projectile.setOffset(0, 0);
          }
      }
    });
  }, 1500);
  setInterval(function () {
    let row = Math.floor(Math.random() * game.height);
    let type = "";
    let health;
    let randomPercentage = Math.floor(Math.random() * 100);
    if (randomPercentage < 50) {
      type = "basic";
      health = game.robot.health;
      speed = game.robot.speed;
    } else if (randomPercentage >= 50 && randomPercentage > 75) {
      type = "armored";
      health = game.armoredRobot.health;
      speed = game.armoredRobot.speed;
    } else if (randomPercentage >= 50 && randomPercentage <= 75) {
      type = "speed";
      health = game.speedRobot.health;
      speed = game.speedRobot.speed;
    }
    let robot = game.robots.create(game.width * game.TILESIZE, (game.TILESIZE / 2 + game.TILESIZE * row) + game.topMargin, `${type}Robot0`).setScale(8).setGravityY(-1500).setSize(4, 8).setOffset(2, 0).setImmovable();
    robot.type = type;
    robot.health = health;
    robot.speed = speed;
  }, Math.random() * (3000 - 1000) + 1000);
}
function update() {
  game.robots.getChildren().forEach(robot => {
    robot.x -= robot.speed;
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
  });
  game.projectiles.getChildren().forEach(projectile => {
    if (projectile.x > game.width * game.TILESIZE || projectile.y > (game.height * game.TILESIZE) + game.topMargin || projectile.y < 0) {
      projectile.destroy();
    }
  });
}
