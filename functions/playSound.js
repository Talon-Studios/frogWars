// Frog Wars
/*^*^*^*^*^*^*^*
playSound.js
Check if sound is enabled. If so, play the specified sound.
*^*^*^*^*^*^*^*/

export function playSound(game, name) {
  if (game.sfxEnabled) game.sfx[name].play();
}
