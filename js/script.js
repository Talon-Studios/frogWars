// Frog Wars
let game = {};
function preload() {
  this.load.image("tile0", "assets/tile0.png");
  this.load.image("tile1", "assets/tile1.png");
  this.load.image("tile0select", "assets/tile0select.png");
  this.load.image("tile1select", "assets/tile1select.png");
}
function create() {
  // Create tiles
  game.tiles = this.physics.add.staticGroup();
  let count = 0;
  for (var x = 64 / 2; x < 5 * 64; x += 64) {
    for (var y = 64 / 2; y < 5 * 64; y += 64) {
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

  // All of the interaction
  game.tiles.getChildren().forEach(sprite => {
    sprite.on("pointerover", () => {
      sprite.setTexture(sprite.textureKey + "select");
    });
    sprite.on("pointerout", () => {
      sprite.setTexture(sprite.textureKey);
    });
    sprite.on("pointerdown", () => {
      console.log(sprite.x, sprite.y);
    });
  });
}
function update() {

}
