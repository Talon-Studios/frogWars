// Frog Wars
/*^*^*^*^*^*^*^*
loadSounds.js
Add all the audio to phaser.
*^*^*^*^*^*^*^*/

export function loadSounds(game, phaser) {
  game.sfx["cannonFrogShoot"] = phaser.sound.add("cannonFrogShoot");
  game.sfx["launcherFrogShoot"] = phaser.sound.add("launcherFrogShoot");
  game.sfx["waterFrogShoot"] = phaser.sound.add("waterFrogShoot");
  game.sfx["fireFrogShoot"] = phaser.sound.add("fireFrogShoot");
  game.sfx["robotDie"] = phaser.sound.add("robotDie");
  game.sfx["robotHit"] = phaser.sound.add("robotHit");
  game.sfx["basicFrogJump"] = phaser.sound.add("basicFrogJump");
  game.sfx["fly"] = phaser.sound.add("fly");
  game.sfx["music1"] = phaser.sound.add("music1-10").setLoop(true);
  game.sfx["bullfrog"] = phaser.sound.add("bullfrog");
  game.sfx["bigExplosion"] = phaser.sound.add("bigExplosion");
}
