import State from "../../../StateMachine/State.js";
export default class GuardianShot extends State {
    onEnter() {
        this.returnCD = 400;
        let player = this.getStateMachine().player;
        let enemy = this.getStateMachine().sprite;
        enemy.setVelocityX(0);
        enemy.setVelocityY(0);
        this.predictX = player.body.velocity.x/2 + player.x;
        this.predictY = player.body.velocity.y/2 + player.y;
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