// Frog Wars
/*^*^*^*^*^*^*^*
playSound.js
Check if sound is enabled. If so, play the specified sound.
*^*^*^*^*^*^*^*/

import {game} from "../app/script.js";

export function playSound(game, name) {
  if (game.sfxEnabled) game.sfx[name].play();
}
