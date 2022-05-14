// Frog Wars
/*^*^*^*^*^*^*^*
preload.js
Preload the assets.
*^*^*^*^*^*^*^*/

export function preloadImages(phaser) {
  // ---------- Frogs ----------
  phaser.load.image("basicFrog0", "assets/basicFrog0.png");
  phaser.load.image("basicFrog1", "assets/basicFrog1.png");
  phaser.load.image("basicFrog2", "assets/basicFrog2.png");
  phaser.load.image("basicFrog3", "assets/basicFrog3.png");
  phaser.load.image("cannonFrog0", "assets/cannonFrog0.png");
  phaser.load.image("cannonFrog1", "assets/cannonFrog1.png");
  phaser.load.image("hurtCannonFrog", "assets/hurtCannonFrog.png");
  phaser.load.image("cannonProjectile", "assets/cannonProjectile.png");
  phaser.load.image("launcherFrog", "assets/launcherFrog.png");
  phaser.load.image("hurtLauncherFrog", "assets/hurtLauncherFrog.png");
  phaser.load.image("launcherProjectile", "assets/launcherProjectile.png");
  phaser.load.image("toad", "assets/toad.png");
  phaser.load.image("hurtToad", "assets/hurtToad.png");
  phaser.load.image("waterFrog0", "assets/waterFrog0.png");
  phaser.load.image("waterFrog1", "assets/waterFrog1.png");
  phaser.load.image("hurtWaterFrog", "assets/hurtWaterFrog.png");
  phaser.load.image("water", "assets/water.png");
  phaser.load.image("fireFrog0", "assets/fireFrog0.png");
  phaser.load.image("fireFrog1", "assets/fireFrog1.png");
  phaser.load.image("fireFrog2", "assets/fireFrog2.png");
  phaser.load.image("fireball0", "assets/fireball0.png");
  phaser.load.image("fireball1", "assets/fireball1.png");
  phaser.load.image("hurtFireFrog", "assets/hurtFireFrog.png");
  phaser.load.image("commanderFrog", "assets/commanderFrog.png");
  phaser.load.image("topHatFrog", "assets/topHatFrog.png");
  phaser.load.image("hurtTopHatFrog", "assets/hurtTopHatFrog.png");
  phaser.load.image("bullfrog", "assets/bullfrog.png");
  phaser.load.image("bomberFrog", "assets/bomberFrog.png");
  phaser.load.image("bomb", "assets/bomb.png");
  phaser.load.image("boxedFrog0", "assets/boxedFrog0.png");
  phaser.load.image("boxedFrog1", "assets/boxedFrog1.png");
  phaser.load.image("boxedFrog2", "assets/boxedFrog2.png");
  phaser.load.image("boxedFrog3", "assets/boxedFrog3.png");
  phaser.load.image("hurtBoxedFrog", "assets/hurtBoxedFrog.png");

  // ---------- Robots ----------
  phaser.load.image("basicRobot0", "assets/basicRobot0.png");
  phaser.load.image("basicRobot1", "assets/basicRobot1.png");
  phaser.load.image("hurtRobot", "assets/hurtRobot.png");
  phaser.load.image("armoredRobot0", "assets/armoredRobot0.png");
  phaser.load.image("armoredRobot1", "assets/armoredRobot1.png");
  phaser.load.image("speedRobot0", "assets/speedRobot0.png");
  phaser.load.image("speedRobot1", "assets/speedRobot1.png");
  phaser.load.image("hurtSpeedRobot", "assets/speedRobot2.png");
  phaser.load.image("cannonRobot0", "assets/cannonRobot0.png");
  phaser.load.image("cannonRobot1", "assets/cannonRobot1.png");
  phaser.load.image("hurtCannonRobot", "assets/hurtCannonRobot.png");
  phaser.load.image("dodgerRobot0", "assets/dodgerRobot0.png");
  phaser.load.image("dodgerRobot1", "assets/dodgerRobot1.png");
  phaser.load.image("hurtDodgerRobot", "assets/hurtDodgerRobot.png");
  phaser.load.image("missileRobot0", "assets/missileRobot0.png");
  phaser.load.image("missileRobot1", "assets/missileRobot1.png");
  phaser.load.image("hurtMissileRobot", "assets/hurtMissileRobot.png");
  phaser.load.image("missile", "assets/missile.png");
  phaser.load.image("loudspeakerRobot0", "assets/loudspeakerRobot0.png");
  phaser.load.image("loudspeakerRobot1", "assets/loudspeakerRobot1.png");
  phaser.load.image("soundWave0", "assets/soundWave0.png");
  phaser.load.image("soundWave1", "assets/soundWave1.png");
  phaser.load.image("soundWave2", "assets/soundWave2.png");

  // ---------- Other ----------
  phaser.load.image("tile0", "assets/tile0.png");
  phaser.load.image("tile1", "assets/tile1.png");
  phaser.load.image("tile0select", "assets/tile0select.png");
  phaser.load.image("tile1select", "assets/tile1select.png");
  phaser.load.image("explosion0", "assets/explosion0.png");
  phaser.load.image("explosion1", "assets/explosion1.png");
  phaser.load.image("explosion2", "assets/explosion2.png");
  phaser.load.image("explosion3", "assets/explosion3.png");
  phaser.load.image("bigExplosion0", "assets/bigExplosion0.png");
  phaser.load.image("bigExplosion1", "assets/bigExplosion1.png");
  phaser.load.image("bigExplosion2", "assets/bigExplosion2.png");
  phaser.load.image("bigExplosion3", "assets/bigExplosion3.png");
  phaser.load.image("bird0", "assets/bird0.png");
  phaser.load.image("bird1", "assets/bird1.png");
  phaser.load.image("cursor", "assets/cursor.png");
  phaser.load.image("optionBorder0", "assets/optionBorder0.png");
  phaser.load.image("optionBorder1", "assets/optionBorder1.png");
  phaser.load.image("optionBorder2", "assets/optionBorder2.png");
  phaser.load.image("fireHat0", "assets/fireHat0.png");
  phaser.load.image("fireHat1", "assets/fireHat1.png");
  phaser.load.image("fireHat2", "assets/fireHat2.png");
  phaser.load.image("X", "assets/X.png");
  phaser.load.image("fly0", "assets/fly0.png");
  phaser.load.image("fly1", "assets/fly1.png");
}
export function preloadAudio(phaser) {
  // ---------- Music ----------
  phaser.load.audio("music1-10", "assets/music1-10.mp3");

  // ---------- SFX ----------
  phaser.load.audio("cannonFrogShoot", "assets/cannonFrogShoot.mp3");
  phaser.load.audio("launcherFrogShoot", "assets/launcherFrogShoot.mp3");
  phaser.load.audio("waterFrogShoot", "assets/waterFrogShoot.mp3");
  phaser.load.audio("fireFrogShoot", "assets/fireFrogShoot.mp3");
  phaser.load.audio("robotDie", "assets/robotDie.mp3");
  phaser.load.audio("robotHit", "assets/robotHit.mp3");
  phaser.load.audio("basicFrogJump", "assets/basicFrogJump.mp3");
  phaser.load.audio("fly", "assets/fly.mp3");
  phaser.load.audio("bigExplosion", "assets/bigExplosion.wav");
  phaser.load.audio("bullfrog", "assets/bullfrog.wav");
}
