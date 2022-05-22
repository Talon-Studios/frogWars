// Frog Wars
/*^*^*^*^*^*^*^*
animation.js
Animations for script.js.
*^*^*^*^*^*^*^*/

export function animation(phaser) {
  // Walking
  phaser.engine.addAnimation("basicRobotWalk", 5, false, false, "basicRobot0", "basicRobot1");
  phaser.engine.addAnimation("armoredRobotWalk", 5, false, false, "armoredRobot0", "armoredRobot1");
  phaser.engine.addAnimation("speedRobotWalk", 5, false, false, "speedRobot0", "speedRobot1");
  phaser.engine.addAnimation("cannonRobotWalk", 5, false, false, "cannonRobot0", "cannonRobot1");
  phaser.engine.addAnimation("dodgerRobotWalk", 5, false, false, "dodgerRobot0", "dodgerRobot1");
  phaser.engine.addAnimation("missileRobotWalk", 5, false, false, "missileRobot0", "missileRobot1");
  phaser.engine.addAnimation("loudspeakerRobotWalk", 5, false, false, "loudspeakerRobot0", "loudspeakerRobot1");
  phaser.engine.addAnimation("soundWave", 5, false, false, "soundWave0", "soundWave1", "soundWave2");

  // Other
  phaser.engine.addAnimation("jump", 10, false, false, "basicFrog0", "basicFrog1", "basicFrog2", "basicFrog0");
  phaser.engine.addAnimation("shootCannonball", 5, false, true, "cannonFrog0", "cannonFrog1");
  phaser.engine.addAnimation("explode", 10, false, false, "explosion0", "explosion1", "explosion2", "explosion3");
  phaser.engine.addAnimation("explodeBig", 10, false, false, "bigExplosion0", "bigExplosion1", "bigExplosion2", "bigExplosion3");
  phaser.engine.addAnimation("shootCannonball", 5, false, true, "cannonFrog0", "cannonFrog1");
  phaser.engine.addAnimation("fireFrog", 12, true, false, "fireFrog0", "fireFrog1", "fireFrog2");
  phaser.engine.addAnimation("shootWater", 5, false, true, "waterFrog0", "waterFrog1");
  phaser.engine.addAnimation("boxedFrogComeUp", 5, false, false, "boxedFrog0", "boxedFrog1", "boxedFrog2", "boxedFrog3");
  phaser.engine.addAnimation("boxedFrogGoDown", 5, false, false, "boxedFrog3", "boxedFrog2", "boxedFrog1", "boxedFrog0");
  phaser.engine.addAnimation("fireball", 5, true, false, "fireball0", "fireball1");
  phaser.engine.addAnimation("flies", 10, true, false, "fly0", "fly1");
}
