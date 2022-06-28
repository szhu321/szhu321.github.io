import State from "../../StateMachine/State.js";
export default class BossLunge extends State {
    onEnter() {
        this.lungetime = 1500;
        let Player = this.getStateMachine().Player;
        let enemy = this.getStateMachine().sprite;

        let velocityX = Player.x - enemy.body.x;
        let velocityY = Player.y - enemy.body.y;

        let distance = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        velocityX = velocityX / distance * 200;
        velocityY = velocityY / distance * 200;

        enemy.setVelocityX(velocityX);
        enemy.setVelocityY(velocityY);
    }


    onExit() {

    }


    update(deltaT) {
        console.log("lunge")
        this.lungetime -= deltaT
        if (this.lungetime <= 0) {
            this.getStateMachine().changeState("follow")
        }
    }
}