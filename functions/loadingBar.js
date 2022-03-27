// Frog Wars
/*^*^*^*^*^*^*^*
loadingBar.js
Code that adds a loading bar before each scene.
*^*^*^*^*^*^*^*/

function loadingBar(phaser) {
  game.progressBar = phaser.add.graphics();
  phaser.load.on("progress", function (value) {
      game.progressBar.clear();
      game.progressBar.fillStyle(0xffffff);
      game.progressBar.fillRect(phaser.engine.gameWidthCenter - 400, phaser.engine.gameHeightCenter, 800 * value, 30);
  });
  phaser.load.on("complete", function() {
    game.progressBar.destroy();
  });
}
