import SlimeState from "./SlimeState.js";

export default class SlimeFollow extends SlimeState
{
    onEnter()
    {
        this.followOutOfRange = 600;
        this.mergeAble = true;
    }

    update(deltaT)
    {
        super.update(deltaT);
        let Player = this.getStateMachine().Player;
        let enemy = this.getStateMachine().sprite;

        let velocityX = Player.x - enemy.body.x;
        let velocityY = Player.y - enemy.body.y;

        let distance = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        velocityX = velocityX / distance * enemy.getSpeed();
        velocityY = velocityY / distance * enemy.getSpeed();

        enemy.setVelocityX(velocityX);
        enemy.setVelocityY(velocityY);

        let distance2 = Math.pow(enemy.x - Player.x, 2) + Math.pow(enemy.y - Player.y, 2);
        //console.log(`slime is idle. Distance: ${distance}`);
        if (distance2 > this.followOutOfRange * this.followOutOfRange) {
            this.getStateMachine().changeState("slimeRoam");
        }
    }
}
