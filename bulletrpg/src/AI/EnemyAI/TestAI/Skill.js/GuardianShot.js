import State from "../../../StateMachine/State.js";
export default class GuardianShot extends State {
    onEnter() {
        this.returnCD = 400;
        let Player = this.getStateMachine().Player;
        let enemy = this.getStateMachine().sprite;
        enemy.setVelocityX(0);
        enemy.setVelocityY(0);
        this.predictX = Player.body.velocity.x/2 + Player.x;
        this.predictY = Player.body.velocity.y/2 + Player.y;
        this.getStateMachine().scene.add.sprite(this.predictX,this.predictY,"slime").setScale(3);
    }


    onExit() {

    }

    update(deltaT) {
        this.returnCD -= deltaT;
        if(this.returnCD <= 0){
            //console.log("spawn shot")
            this.getStateMachine().scene.add.sprite(this.predictX,this.predictY,"dude").setScale(0.5);
            this.getStateMachine().changeState("idle");
        }
    }
}