import { final } from "../final.js";
export class credits extends Phaser.Scene {
    constructor() {
        super({
            key: final.SCENES.CREDITS
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

        this.add.text(width * 0.25, 120, "This game is made by:", textConfig);
        this.add.text(width * 0.25, 220, "...", textConfig);
        this.add.text(width * 0.25, 320, "...", textConfig);
        this.add.text(width * 0.25, 420, "...", textConfig);
        this.add.text(width * 0.25, 520, "...", textConfig);

        let backBtn = this.add.text(width * 0.25, 620, "BACK", textConfig);
        backBtn.setInteractive();
        backBtn.on("pointerup", () => {
            this.scene.start(final.SCENES.MENU);
        })
    }
}