import { final } from "../final.js";
export class controls extends Phaser.Scene {
    constructor() {
        super({
            key: final.SCENES.CONTROLS
        })
    }
    preload() {

    }
    create() {
        let height = this.cameras.main.height;
        let width = this.cameras.main.width;

        let textConfig = {
            fontFamily: "'Squada One', cursive",
            fontSize: "64px",
            align: "center",
            fixedWidth: width / 2,
        }

        this.add.text(width * 0.25, 120, "Press WASD to move", textConfig);
        this.add.text(width * 0.25, 240, "Left click to fire", textConfig);
        this.add.text(width * 0.25, 360, "E to interact", textConfig);

        let backBtn = this.add.text(width * 0.25, 620, "BACK", textConfig);
        backBtn.setInteractive();
        backBtn.on("pointerup", () => {
            this.scene.start(final.SCENES.MENU);
        })
    }
}