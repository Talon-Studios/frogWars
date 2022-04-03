// Frog Wars
/*^*^*^*^*^*^*^*
config.js
The configuration for the Phaser 3 framework.
*^*^*^*^*^*^*^*/

import {Start} from "./start.js";
import {Settings, Settings2} from "./settings.js";
import {HerpetologistsHandbook} from "./herpetologistsHandbook.js";
import {Game} from "./script.js";
import {Level_1} from "./levels.js";

export const config = {
  type: Phaser.AUTO,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.RESIZE
  },
  render: {
    pixelArt: true
  },
  backgroundColor: 0x2b2b2b,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 1500
      },
      enableBody: true,
      // debug: true
    }
  },
  scene: [Start, Settings, Settings2, HerpetologistsHandbook, Game, Level_1]
};
const phaserGame = new Phaser.Game(config);
