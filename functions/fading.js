// Frog Wars
/*^*^*^*^*^*^*^*
fading.js
Fading effects.
*^*^*^*^*^*^*^*/

export function fadeIn(phaser) {
  phaser.cameras.main.fadeIn(500, 0, 0, 0);
}
export function fadeOut(phaser) {
  phaser.cameras.main.fadeOut(500, 0, 0, 0);
}
