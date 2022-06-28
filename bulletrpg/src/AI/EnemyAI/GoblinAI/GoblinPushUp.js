import State from "../../StateMachine/State.js";
import EnemyController from "../EnemyController.js";

export default class GoblinPushUp extends State {
    onEnter() {
        this.regen = 1000;
    }


    onExit() {

    }


    update(deltaT) {
        let player = this.getStateMachine().player;
        let enemy = this.getStateMachine().sprite;
        this.regen -= deltaT
        let velocityX = player.x - enemy.body.x;
        let velocityY = player.y - enemy.body.y;

        let distance = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        velocityX = velocityX / distance * enemy.getSpeed();
        velocityY = velocityY / distance * enemy.getSpeed();
        if (distance < 300) {
            enemy.setVelocityX(-velocityX);
            enemy.setVelocityY(-velocityY);
            if (velocityX > 0) {
                enemy.flipX = true;
                enemy.play("goblin_right", true)
            }
            else {
                enemy.play("goblin_right", true)
            }
        }
        else if (distance >= 300 && this.regen <= 0 && enemy.getHealth() < enemy.getDefaultHealth()) {
            this.regen = 1000
            enemy.setVelocityX(0)
            enemy.setVelocityY(0)
            enemy.setHealth(enemy.getHealth() + enemy.getDefaultHealth() * 0.05);
            enemy.play("goblin_pushup", true)
        }
        else if (enemy.getHealth() >= enemy.getDefaultHealth() / 2) {
            this.getStateMachine().changeState("follow");
        }
    }
}

