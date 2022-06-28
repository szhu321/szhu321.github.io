import SlimeState from "./SlimeState.js";

export default class SlimeIdle extends SlimeState
{
    

    onEnter() {
        this.mergeAble = false;
        this.aggroDistance = 500;
    }

    onExit() {
        
    }

    update(deltaT) {
        super.update(deltaT);
        let Player = this.getStateMachine().Player;
        let enemy = this.getSprite();
        enemy.setVelocityX(0);
        enemy.setVelocityY(0);
        let distance = Math.pow(enemy.x - Player.x, 2) + Math.pow(enemy.y - Player.y, 2);
        //console.log(`slime is idle. Distance: ${distance}`);
        if(distance < Math.pow(this.aggroDistance, 2))
        {
            this.getStateMachine().changeState("slimeFollow");
        }
    }
}


