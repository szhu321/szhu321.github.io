import UIArea from "./UIArea.js";

export default class StatusBar extends UIArea {
  constructor(scene) {
    super(scene)
    let statusBarWidth = 300;
    let statusBarHeight = 60;
    this.Player = scene.Player
    this.coins = this.Player.status.coins
    this.setDepth(100);
    this.setScrollFactor(0);
    this.setSize(statusBarWidth, statusBarHeight);


    this.statusBarBox = new Phaser.GameObjects.Rectangle(scene, 0, 0, statusBarWidth, statusBarHeight, 0x3b4bd4, 1);
    this.addUI(this.statusBarBox, 0, 0, UIArea.ANCHOR.TOPLEFT);
    this.text = new Phaser.GameObjects.Text(scene, 0, 0, "Coins: " + this.coins.toString(), { fontFamily: "Arial", fontSize: "24px"});
    this.addUI(this.text, 0.05, 0.5, UIArea.ANCHOR.CENTER);

    this.healthBarWidth = 280;
    this.healthBarHeight = 25;
    this.border = new Phaser.GameObjects.Rectangle(scene, 0, 0, this.healthBarWidth, this.healthBarHeight, 0x000000, 1);
    this.healthBar = new Phaser.GameObjects.Rectangle(scene, 0, 0, this.healthBarWidth, this.healthBarHeight, 0xab310f, 1);
    this.addUI(this.border, 0.03, 0.05, UIArea.ANCHOR.TOPLEFT);
    this.addUI(this.healthBar, 0.03, 0.05, UIArea.ANCHOR.TOPLEFT);
  }

  update() {
    this.coins = this.Player.status.coins
    this.text.setText("Coins: " + this.coins.toString())
    this.healthBar.width = this.healthBarWidth * (this.Player.status.hp / 1000.0);

  }
}
