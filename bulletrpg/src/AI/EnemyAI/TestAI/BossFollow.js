import State from "../../StateMachine/State.js";
export default class BossFollow extends State {
    onEnter() {
        
    }


    onExit() {

    }


    update(deltaT) {
        //when the player gets too far away stop following.
        //when the player gets out of visiion stop following.
        //change to another state. Go back to idle.
        //console.log("following player.");
        let player = this.getStateMachine().player;
        let enemy = this.getStateMachine().sprite;

        let velocityX = player.x - enemy.body.x;
        let velocityY = player.y - enemy.body.y;

        let distance = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        velocityX = velocityX / distance * enemy.speed;
        velocityY = velocityY / distance * enemy.speed;

        enemy.setVelocityX(velocityX);
        enemy.setVelocityY(velocityY);
        if (Math.abs(velocityY) < Math.abs(velocityX)) {
            if (enemy.body.velocity.x > 0) {
                enemy.play("right", true);
                //enemy.setVelocityX(enemy.body.velocity.x)
            } else if (enemy.body.velocity.x < 0) {
                enemy.play("left", true);
                //enemy.setVelocityX(enemy.body.velocity.x)
            }
        }

        else if (Math.abs(velocityX) <= Math.abs(velocityY)) {
            // if (Math.abs(velocityX) <= this.speed / 2) {
            if (enemy.body.velocity.y < 0) {
                enemy.play("up", true);
                //enemy.setVelocityY(enemy.body.velocity.y)
            } else if (enemy.body.velocity.y > 0) {
                enemy.play("down", true);
                //enemy.setVelocityY(enemy.body.velocity.y)
            }
        }

        let distance2 = Math.sqrt(Math.pow(enemy.x - player.x, 2) + Math.pow(enemy.y - player.y, 2));
        //console.log(`slime is idle. Distance: ${distance}`);
        if (distance2 > 600) {
            this.getStateMachine().changeState("idle");
        }
        if (distance2 < 300 ) {
            this.getStateMachine().changeState("DongRoam");
        }
    }
}