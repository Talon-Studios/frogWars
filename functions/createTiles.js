// Frog Wars
/*^*^*^*^*^*^*^*
createTiles.js
Create the game tiles.
*^*^*^*^*^*^*^*/

export function createTiles(game) {
  let tileCount = 0;
  for (var x = game.TILESIZE / 2; x < game.WIDTH * game.TILESIZE; x += game.TILESIZE) {
    for (var y = (game.TILESIZE / 2) + game.TOPMARGIN; y < (game.HEIGHT * game.TILESIZE) + game.TOPMARGIN; y += game.TILESIZE) {
      if (tileCount % 2 == 0) {
        let tile = game.tiles.create(x, y, "tile0");
        tile.setScale(8);
        tile.setInteractive();
        tile.textureKey = "tile0";
      } else {
        let tile = game.tiles.create(x, y, "tile1");
        tile.setScale(8);
        tile.setInteractive();
        tile.textureKey = "tile1";
      }
      tileCount++;
    }
  }
}
