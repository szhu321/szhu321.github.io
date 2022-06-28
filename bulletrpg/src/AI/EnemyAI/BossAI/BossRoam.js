import State from "../../StateMachine/State.js";

export default class BossRoam extends State {
    onEnter() {
        this.timer = 0;
        this.lungeCD = 3000;
    }


    onExit() {
    }


    update(deltaT) {
        let player = this.getStateMachine().player;
        let enemy = this.getStateMachine().sprite;
        this.timer -= deltaT;
        if (this.timer <= 0) {
            this.timer = 1000;
            var num = Math.random() * 360;
            enemy.setVelocityX(enemy.speed * Math.cos(num));
            enemy.setVelocityY(enemy.speed * Math.sin(num));
        }

        // if (Math.abs(enemy.body.velocity.y) < Math.abs(enemy.body.velocity.x)) {
        //     if (enemy.body.velocity.x > 0) {
        //         enemy.play("right", true);
        //         //this.setVelocityX(this.body.velocity.x)
        //     } else if (enemy.body.velocity.x < 0) {
        //         enemy.play("left", true);
        //         //this.setVelocityX(this.body.velocity.x)
        //     }
        // }

        // else if (Math.abs(enemy.body.velocity.x) <= Math.abs(enemy.body.velocity.y)) {
        //     // if (Math.abs(velocityX) <= this.speed / 2) {
        //     if (enemy.body.velocity.y < 0) {
        //         enemy.play("up", true);
        //         //this.setVelocityY(this.body.velocity.y)
        //     } else if (enemy.body.velocity.y > 0) {
        //         enemy.play("down", true);
        //         //this.setVelocityY(this.body.velocity.y)
        //     }
        // }

        //lunge
        this.lungeCD -= deltaT;
        if (this.lungeCD <= 0) {
            this.getStateMachine().changeState("lunge");
        }
        let distance = Math.sqrt(Math.pow(enemy.x - player.x, 2) + Math.pow(enemy.y - player.y, 2));
        //console.log(`slime is idle. Distance: ${distance}`);

        if (distance > 400) {
            this.getStateMachine().changeState("follow");
        }
        // console.log("hu")
    }
}
