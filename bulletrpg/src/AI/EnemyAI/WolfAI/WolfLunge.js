import State from "../../StateMachine/State.js";

export default class WolfLunge extends State {
    onEnter() {
        this.lungetime = 1500;
        let player = this.getStateMachine().player;
        let enemy = this.getStateMachine().sprite;

        let velocityX = player.x - enemy.body.x;
        let velocityY = player.y - enemy.body.y;

        let distance = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        velocityX = velocityX / distance * 200;
        velocityY = velocityY / distance * 200;

        enemy.setVelocityX(velocityX);
        enemy.setVelocityY(velocityY);
    }


    onExit() {

    }


    update(deltaT) {
        this.lungetime -= deltaT
        if (this.lungetime <= 0) {
            this.getStateMachine().changeState("follow")
        }

        let player = this.getStateMachine().player;
        let enemy = this.getStateMachine().sprite;
        if (player.x - enemy.x < 0) {
            enemy.flipX = true;
            enemy.play("wolf_right_lunge", true);
        }
        else if (player.x - enemy.x > 0) {
            enemy.flipX = false;
            enemy.play("wolf_right_lunge", true);
        }
    }
}

