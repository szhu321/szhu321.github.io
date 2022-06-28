import State from "../StateMachine/State.js";

export default class DongRoam extends State
{
    onEnter() {
        this.timer = 0;   
    }

    
    onExit() {
        //stop the current animations.
    }

    
    update(deltaT) {
        //console.log("dongroam")
        let player = this.getStateMachine().player;
        let enemy = this.getSprite();
        this.timer -= deltaT;
        if(this.timer <= 0)
        {
            this.timer = 500;
            var num = Math.random()*360;
            enemy.setVelocityX(enemy.getSpeed()*Math.cos(num));
            enemy.setVelocityY(enemy.getSpeed()*Math.sin(num));
        }

        if (Math.abs(enemy.body.velocity.y) < Math.abs(enemy.body.velocity.x)) {
                if (enemy.body.velocity.x > 0) {
                    enemy.play("slime_right", true);
                    //this.setVelocityX(this.body.velocity.x)
                } else if (enemy.body.velocity.x < 0) {
                    enemy.play("slime_left", true);
                    //this.setVelocityX(this.body.velocity.x)
                }
            }

        else if (Math.abs(enemy.body.velocity.x) <= Math.abs(enemy.body.velocity.y)) {
            // if (Math.abs(velocityX) <= this.speed / 2) {
            if (enemy.body.velocity.y < 0) {
                enemy.play("slime_up", true);
                //this.setVelocityY(this.body.velocity.y)
            } else if (enemy.body.velocity.y > 0) {
                enemy.play("slime_down", true);
                //this.setVelocityY(this.body.velocity.y)
            }
        }

        let distance = Math.sqrt(Math.pow(enemy.x - player.x, 2) + Math.pow(enemy.y - player.y, 2));
        //console.log(`slime is idle. Distance: ${distance}`);
        
        if(distance>600){
            this.getStateMachine().changeState("idle");
        }
        if(distance > 300 )
        {
           this.getStateMachine().changeState("follow");
        }
    }
}