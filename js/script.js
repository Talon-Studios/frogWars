// Frog Wars
let game = {
  width: 10,
  height: 8
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
}
function create() {
  // Create tiles
  game.tiles = this.physics.add.staticGroup();
  let count = 0;
  const TILESIZE = 64;
  for (var x = TILESIZE / 2; x < game.width * TILESIZE; x += TILESIZE) {
    for (var y = TILESIZE / 2; y < game.height * TILESIZE; y += TILESIZE) {
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

  // Create group of frogs
  game.frogs = this.physics.add.staticGroup();

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
    frameRate: 15,
    repeat: 0
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
      game.frogs.create(tile.x, tile.y, "basicFrog0").setScale(8);
    });
  });
  setInterval(function () {
    game.frogs.getChildren().forEach(frog => {
      frog.anims.play("jump", true);
      setTimeout(function () {
        frog.x += game.tiles.getChildren()[0].width * 8;
      }, 50);
    });
  }, 1000);
}
function update() {

}
