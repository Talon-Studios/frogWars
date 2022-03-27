// Frog Wars
/*^*^*^*^*^*^*^*
loadingBar.js
Code that adds a loading bar before each scene.
*^*^*^*^*^*^*^*/

function loadingBar(phaser) {
  phaser.load.image("basicFrog0", "assets/basicFrog0.png");
  game.progressBar = phaser.add.graphics();
  game.loadingFrog = phaser.add.image(phaser.engine.gameWidthCenter - 400, phaser.engine.gameHeightCenter - 50, "basicFrog0").setScale(8);
  phaser.load.on("progress", function (value) {
    game.loadingFrog.x = (phaser.engine.gameWidthCenter - 400) + 800 * value;
    game.progressBar.clear();
    game.progressBar.fillStyle(0xffffff);
    game.progressBar.fillRect(phaser.engine.gameWidthCenter - 400, phaser.engine.gameHeightCenter, 800 * value, 30);
  });
  phaser.load.on("complete", () => {
    game.progressBar.destroy();
    game.loadingFrog.destroy();
  });
}
