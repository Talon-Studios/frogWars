// Frog Wars
let game = {
  width: 17,
  height: 9,
  TILESIZE: 64,
  robot: {
    speed: 0.2
  },
  currencies: {
    flies: 0,
    lilyPads: 0
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
  this.load.image("cannonBall", "assets/cannonBall.png");
}
function create() {
  // Create tiles
  game.tiles = this.physics.add.staticGroup();
  let count = 0;
  for (var x = game.TILESIZE / 2; x < game.width * game.TILESIZE; x += game.TILESIZE) {
    for (var y = game.TILESIZE / 2; y < game.height * game.TILESIZE; y += game.TILESIZE) {
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

  // Create robots
  game.robots = this.physics.add.group();

  // Create group of frogs
  game.frogs = this.physics.add.group();

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
    key: "robotWalk",
    frames: [{
      key: "basicRobot0"
    }, {
      key: "basicRobot1"
    }],
    frameRate: 5,
    repeat: -1
  });

  // All of the interaction
  game.tiles.getChildren().forEach(tile => {
    tile.on("pointerover", () => {
      tile.setTexture(tile.textureKey + "select");
    });
    tile.on("pointerout", () => {
      tile.setTexture(tile.textureKey);
    });
    tile.on("pointerdown", () => {
      if (!tile.frog) {
        let type = "cannon";
        let frog = game.frogs.create(tile.x, tile.y, `${type}Frog0`).setScale(8).setGravityY(-1500).setSize(7, 8).setOffset(0, 0);
        frog.type = type;
        tile.frog = frog;
      }
    });
  });

  // Colliders
  this.physics.add.overlap(game.frogs, game.robots, (frog, robot) => {
    if (frog.type === "basic") {
      frog.destroy();
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
      if (frog.type === "basic") {
        frog.anims.play("jump", true);
        setTimeout(function () {
          frog.x += game.tiles.getChildren()[0].width * 8;
        }, 50);
      }
    });
  }, 1000);
  setInterval(function () {
    row = Math.floor(Math.random() * game.height);
    game.robots.create(game.width * game.TILESIZE, game.TILESIZE / 2 + game.TILESIZE * row, "basicRobot0").setScale(8).setGravityY(-1500).setSize(4, 8).setOffset(2, 0);
  }, Math.random() * (15000 - 500) + 500);
}
function update() {
  game.robots.getChildren().forEach(robot => {
    robot.x -= game.robot.speed;
    robot.anims.play("robotWalk", true);
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
}
