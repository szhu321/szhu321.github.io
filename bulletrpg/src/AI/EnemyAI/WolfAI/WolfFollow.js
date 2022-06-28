import State from "../../StateMachine/State.js";
import EnemyController from "../EnemyController.js";

export default class WolfFollow extends State {
    onEnter() {

    }


    onExit() {

    }


    update(deltaT) {
        //when the Player gets too far away stop following.
        //when the Player gets out of visiion stop following.
        //change to another state. Go back to idle.
        //console.log("following Player.");
        let Player = this.getStateMachine().Player;
        let enemy = this.getStateMachine().sprite;

        let velocityX = Player.x - enemy.body.x;
        let velocityY = Player.y - enemy.body.y;

        let distance = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        velocityX = velocityX / distance * enemy.getSpeed();
        velocityY = velocityY / distance * enemy.getSpeed();

        enemy.setVelocityX(velocityX);
        enemy.setVelocityY(velocityY);
        if (Math.abs(velocityY) < Math.abs(velocityX)) {
            if (enemy.body.velocity.x > 0) {
                enemy.flipX = false
                enemy.anims.play("wolf_right", true);
                enemy.setVelocityX(enemy.body.velocity.x)
            } else if (enemy.body.velocity.x < 0) {
                enemy.flipX = true
                enemy.play("wolf_right", true);
                enemy.setVelocityX(enemy.body.velocity.x)
            }
        }

        else if (Math.abs(velocityX) <= Math.abs(velocityY)) {
            // if (Math.abs(velocityX) <= this.speed / 2) {
            if (Player.x - enemy.x > 0) {
                enemy.flipX = false
                enemy.play("wolf_right", true);
            } else if (Player.x - enemy.x < 0) {
                enemy.flipX = true
                enemy.play("wolf_right", true);
            }
        }

        let distance2 = Math.sqrt(Math.pow(enemy.x - Player.x, 2) + Math.pow(enemy.y - Player.y, 2));
        //console.log(`slime is idle. Distance: ${distance}`);
        if (distance2 > 600) {
            this.getStateMachine().changeState("roam");
        }
    }
}

