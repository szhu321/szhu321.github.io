import SlimeState from "./SlimeState.js";

export default class SlimeMerge extends SlimeState
{
    onEnter()
    {
        this.mergeAble = false;
        this.mergeRange = 50;
        this.mergeTime = 5000;
    }

    update(deltaT)
    {
        super.update(deltaT);
        this.mergeTime -= deltaT;
        if(this.mergeTime < 0)
        {
            this.getStateMachine().changeState("slimeRoam");
        }

        let otherSlime = this.getStateMachine().otherSlime;
        if(!otherSlime)
        {
            this.getStateMachine().changeState("slimeRoam");
        }
        let enemy = this.getStateMachine().sprite;

        let velocityX = otherSlime.x - enemy.body.x;
        let velocityY = otherSlime.y - enemy.body.y;

        let distance = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

        if(distance < 20)
        {
            this.getStateMachine().changeState("slimeRoam");
        }

        velocityX = velocityX / distance * enemy.getSpeed() * 2;
        velocityY = velocityY / distance * enemy.getSpeed() * 2;

        enemy.setVelocityX(velocityX);
        enemy.setVelocityY(velocityY);
        

        let distance2 = Math.pow(enemy.x - otherSlime.x, 2) + Math.pow(enemy.y - otherSlime.y, 2);
        //console.log(`slime is idle. Distance: ${distance}`);
        if (distance2 < this.mergeRange * this.mergeRange) {
            //kill the other slime.
            enemy.setScale(enemy.scale * 2);
            enemy.setHealth(5000);
            enemy.setSpeed(enemy.getSpeed() * 1.5);
            otherSlime.setHealth(0);
            enemy.superSlime = true; //the slime is now a superSlime.
            this.getStateMachine().changeState("slimeRoam");
        }

        // If the other slime is not active/isDead go back to roaming.
        if(!otherSlime.active)
        {
            this.getStateMachine().changeState("slimeRoam");
        }
    }
}
