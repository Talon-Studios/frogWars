// Frog Wars
/*^*^*^*^*^*^*^*
robotDie.js
Kill the robot.
*^*^*^*^*^*^*^*/

function killRobot(phaser, game, robot, damage, callback = () => {}) {
  console.log("KILL");
  let lastFrame = robot.texture.key;
  if (!robot.dead) {
    if (robot.type === "basic" || robot.type === "armored") {
      robot.setTexture("hurtRobot");
    } else if (robot.type === "speed") {
      robot.setTexture("hurtSpeedRobot");
    } else if (robot.type === "cannon") {
      robot.setTexture("hurtCannonRobot");
    }
  }
  setTimeout(function() {
    robot.setTexture(lastFrame);
  }, 500);
  if (game.sfxEnabled) game.sfx.robotHit.play();
  robot.health -= damage;
  callback();
  if (robot.health <= 0) {
    robot.body.enable = false;
    if (game.sfxEnabled) game.sfx.robotDie.play();
    robot.dead = true;
    robot.anims.play("explode", true);
    setTimeout(function() {
      robot.destroy();
    }, 300);
  }
}
