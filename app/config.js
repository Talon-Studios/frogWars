// Frog Wars
/*^*^*^*^*^*^*^*
config.js
The configuration for the Phaser 3 framework.
*^*^*^*^*^*^*^*/

const config = {
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
  scene: [Start, Settings, Game]
};
const phaserGame = new Phaser.Game(config);
