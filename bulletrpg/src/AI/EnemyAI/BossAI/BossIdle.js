import StateMachine from "../../StateMachine/StateMachine.js";
import State from "../../StateMachine/State.js";

export default class BossIdle extends State {
    onEnter() {
    }


    onExit() {
    }


    update(deltaT) {
        let enemy = this.getSprite();
        enemy.setVelocityX(0);
        enemy.setVelocityY(0);
    }
}

