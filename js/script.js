function preload() {
  this.load.image("tile0", "assets/tile0.png");
  this.load.image("tile1", "assets/tile1.png");
  this.load.image("tile0select", "assets/tile0select.png");
  this.load.image("tile1select", "assets/tile1select.png");
}
function create() {
  // Create tiles
  let count = 0;
  for (var x = 64 / 2; x < 5 * 64; x += 64) {
    for (var y = 64 / 2; y < 5 * 64; y += 64) {
      if (count % 2 == 0) {
        this.add.image(x, y, "tile0").setScale(8);
      } else {
        this.add.image(x, y, "tile1").setScale(8);
      }
      count++;
    }
  }
}
function update() {

}
