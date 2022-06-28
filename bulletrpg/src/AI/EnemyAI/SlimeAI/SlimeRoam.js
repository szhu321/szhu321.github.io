import SlimeState from "./SlimeState.js";

export default class SlimeRoam extends SlimeState
{
    onEnter()
    {
        this.defaultRoamTime = 3000;
        this.mergeAble = true;
        this.timer = 0;
        this.walkDir = this.getNewDirection();
        this.aggroDistance = 380;
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

    update(deltaT)
    {
        super.update(deltaT);
        this.timer -= deltaT;
        if(this.timer <= 0)
        {
            this.timer = this.defaultRoamTime;
            this.walkDir = this.getNewDirection();
        }

        let player = this.getStateMachine().player;
        let enemy = this.getSprite();
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

        let distance = Math.pow(enemy.x - player.x, 2) + Math.pow(enemy.y - player.y, 2);
        //console.log(`slime is idle. Distance: ${distance}`);
        if(distance < Math.pow(this.aggroDistance, 2))
        {
            this.getStateMachine().changeState("slimeFollow");
        }
    }
}


