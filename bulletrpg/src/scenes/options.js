import { final } from "../final.js";
export class options extends Phaser.Scene {
    constructor() {
        super({
            key: final.SCENES.OPTIONS
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

        this.add.text(width * 0.25, 120, "There are currently no options.", textConfig);

        let backBtn = this.add.text(width * 0.25, 620, "BACK", textConfig);
        backBtn.setInteractive();
        backBtn.on("pointerup", () => {
            this.scene.start(final.SCENES.MENU);
        })
    }
}