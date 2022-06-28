import State from "../StateMachine/State.js";

export default class Roam extends State
{
    onEnter() {
        this.timer = 3000;
        this.walkDir = this.getNewDirection();       
    }

    
    onExit() {
        //stop the current animations.
    }

    getNewDirection()
    {
        let num = Math.random();
        if(num < 0.25)
            return "left";
        else if(num < 0.5)
            return "right";
        else if(num < 0.75)
            return "top";
        else
            return "bottom";
    }

    
    update(deltaT) {
        //console.log(this.walkDir);

        this.timer -= deltaT;
        if(this.timer <= 0)
        {
            this.timer = 3000;
            this.walkDir = this.getNewDirection();
        }


        let enemy = this.getSprite();
        if(this.walkDir === "top")
        {
            enemy.setVelocityY(40);
        }

        //check the Player's position
        let Player = this.getStateMachine().Player;
        //if the Player is too close change state.

        let velocityX = 0;
        let velocityY = 0;

        if(this.walkDir == "top")
            velocityY = -30;
        if(this.walkDir == "left")
            velocityX = -30;
        if(this.walkDir == "right")
            velocityX = 30;
        if(this.walkDir == "bottom")
            velocityY = 30;

        enemy.setVelocityX(velocityX);
        enemy.setVelocityY(velocityY);

        if (this.walkDir === "right") {
            enemy.play("slime_right", true);
            //enemy.setVelocityX(enemy.body.velocity.x)
        } else if (this.walkDir === "left") {
            enemy.play("slime_left", true);
            //enemy.setVelocityX(enemy.body.velocity.x)
        } else if (this.walkDir === "top") {
            enemy.play("slime_up", true);
            //enemy.setVelocityY(enemy.body.velocity.y)
        } else if (this.walkDir === "bottom") {
            enemy.play("slime_down", true);
            //enemy.setVelocityY(enemy.body.velocity.y)
        }

        let distance = Math.sqrt(Math.pow(enemy.x - Player.x, 2) + Math.pow(enemy.y - Player.y, 2));
        //console.log(`slime is idle. Distance: ${distance}`);
        if(distance < 300)
        {
            this.getStateMachine().changeState("follow");
        }
    }
}
