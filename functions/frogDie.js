// Frog Wars
/*^*^*^*^*^*^*^*
frogDie.js
Kill the frog.
*^*^*^*^*^*^*^*/

function killFrog(phaser, game, frog, damage, callback = () => {}) {
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
