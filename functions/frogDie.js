// Frog Wars
/*^*^*^*^*^*^*^*
frogDie.js
Kill the frog.
*^*^*^*^*^*^*^*/

function killFrog(phaser, game, frog, damage, callback = () => {}) {
  let lastFrame = frog.texture.key;
  if (!frog.dead) {
    if (frog.type === "cannon") {
      frog.setTexture("hurtCannonFrog");
    } else if (frog.type === "launcher") {
      frog.setTexture("hurtLauncherFrog");
    } else if (frog.type === "toad") {
      frog.setTexture("hurtToad");
    } else if (frog.type === "water") {
      frog.setTexture("hurtWaterFrog");
    }
  }
  setTimeout(function() {
    frog.setTexture(lastFrame);
  }, 250);
  playSound(game, "robotHit");
  frog.health -= damage;
  callback();
  if (frog.health <= 0) {
    frog.body.enable = false;
    playSound(game, "robotDie");
    frog.dead = true;
    frog.anims.play("explode", true);
    setTimeout(function() {
      frog.destroy();
    }, 300);
  }
}
