import { load } from "./scenes/load.js";
import { menu } from "./scenes/menu.js";
import { play } from "./scenes/play.js";
import { controls } from "./scenes/controls.js"
import { credits } from "./scenes/credits.js"
import { SceneHolder } from "./scenes/map.js";
import { options } from "./scenes/options.js";
var shengConfig = {
    scene: [load, menu, play, SceneHolder, controls, credits, options],
    width: 1600,
    height: 900,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        }
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
};
var config = {
    scene: [load, menu, play, SceneHolder, controls, credits, options],
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
        }
    },
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: '100%',
        height: '100%',
    }
};
var game = new Phaser.Game(config);
window.addEventListener('resize', function (event) {
    // game.width = window.innerWidth;
    // game.height = window.innerHeight; 
}, false);