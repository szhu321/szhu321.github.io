import info from "../SocketManager/info.js";

export class KeyBoard {
    #keyboard
    #scene
    
    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    constructor(scene) {
        this.#scene = scene;
        this.#keyboard = scene.input.keyboard.addKeys("W, A, S, D, Q, E");

        // //debugger
        // this.#scene.input.keyboard.on("keydown-L", () => {
        //     let {debug} = this.#scene.physics.getConfig();
        //     this.#scene.game.config.physics.arcade.debug = !debug;
        //     console.log(this.#scene.physics);
        // })
    }
    getKeyboard() {
        return this.#keyboard;
    }
    doorKey() {

    }
    update() {
        if (this.#scene.player != null && this.#scene.player.active) {
            if (this.#keyboard.D.isDown) {
                //clientContoller.movePlayer("moveright");
                this.#scene.player.setVelocityX(128);
                //this.#scene.socketControl.pass(new info(0, this.#scene.player.x, this.#scene.player.y, this.#scene.player.body.velocity.x, this.#scene.player.body.velocity.y, false));
                //constructor(time, velocityX, velocityY, shoot){
            }
            if (this.#keyboard.A.isDown) {
                this.#scene.player.setVelocityX(-128);
                // this.#scene.socketControl.pass(new info(0, this.#scene.player.x, this.#scene.player.y, this.#scene.player.body.velocity.x, this.#scene.player.body.velocity.y, false));
            }
            if (this.#keyboard.W.isDown) {
                this.#scene.player.setVelocityY(-128);
                // this.#scene.socketControl.pass(new info(0, this.#scene.player.x, this.#scene.player.y, this.#scene.player.body.velocity.x, this.#scene.player.body.velocity.y, false));
            }
            if (this.#keyboard.S.isDown) {
                this.#scene.player.setVelocityY(128);
                // this.#scene.socketControl.pass(new info(0, this.#scene.player.x, this.#scene.player.y, this.#scene.player.body.velocity.x, this.#scene.player.body.velocity.y, false));
            }
            if (this.#keyboard.A.isUp && this.#keyboard.D.isUp) {
                this.#scene.player.setVelocityX(0);
                // this.#scene.socketControl.pass(new info(0, this.#scene.player.x, this.#scene.player.y, this.#scene.player.body.velocity.x, this.#scene.player.body.velocity.y, false));
            }
            if (this.#keyboard.W.isUp && this.#keyboard.S.isUp) {
                this.#scene.player.setVelocityY(0);
                // this.#scene.socketControl.pass(new info(0, this.#scene.player.x, this.#scene.player.y, this.#scene.player.body.velocity.x, this.#scene.player.body.velocity.y, false));
            }
            if (this.#keyboard.A.isDown && this.#keyboard.W.isDown) {
                this.#scene.player.setVelocityY(-90);
                this.#scene.player.setVelocityX(-90);
                // this.#scene.socketControl.pass(new info(0, this.#scene.player.x, this.#scene.player.y, this.#scene.player.body.velocity.x, this.#scene.player.body.velocity.y, false));
            }
            if (this.#keyboard.W.isDown && this.#keyboard.D.isDown) {
                this.#scene.player.setVelocityY(-90);
                this.#scene.player.setVelocityX(90);
                // this.#scene.socketControl.pass(new info(0, this.#scene.player.x, this.#scene.player.y, this.#scene.player.body.velocity.x, this.#scene.player.body.velocity.y, false));
            }
            if (this.#keyboard.D.isDown && this.#keyboard.S.isDown) {
                this.#scene.player.setVelocityY(90);
                this.#scene.player.setVelocityX(90);
                // this.#scene.socketControl.pass(new info(0, this.#scene.player.x, this.#scene.player.y, this.#scene.player.body.velocity.x, this.#scene.player.body.velocity.y, false));
            }
            if (this.#keyboard.A.isDown && this.#keyboard.S.isDown) {
                this.#scene.player.setVelocityY(90);
                this.#scene.player.setVelocityX(-90);
                // this.#scene.socketControl.pass(new info(0, this.#scene.player.x, this.#scene.player.y, this.#scene.player.body.velocity.x, this.#scene.player.body.velocity.y, false));
            }
        }
        if(this.#scene.player != null && this.#scene.player.gunController != null) {
            if (this.#keyboard.Q.isDown) {
                if (this.#scene.player.switchGunCoolDown <= 0) {
                    this.#scene.player.gunController.nextGun();
                    this.#scene.player.switchGunCoolDown = 2000;
                }
                else {
                    console.log(this.#scene.player.switchGunCoolDown + " ms until gun can be swapped");
                }
                this.#keyboard.Q.isDown = false;
            }   
        }
    }
}