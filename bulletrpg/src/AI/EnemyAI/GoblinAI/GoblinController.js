import StateMachine from "../../StateMachine/StateMachine.js";
import GoblinFollow from "../GoblinAI/GoblinFollow.js";
import GoblinPushUp from "../GoblinAI/GoblinPushUp.js";
import GoblinRoam from "../GoblinAI/GoblinRoam.js";
export default class GoblinController extends StateMachine {
    create(sprite, data) {
        this.Player = data.Player;
        this.sprite = sprite;
        this.lungeCD = 2000;

        //add the states.
        let idle = new GoblinPushUp("pushup", this, sprite);
        this.addState(idle);
        let follow = new GoblinFollow("follow", this, sprite);
        this.addState(follow);
        let roam = new GoblinRoam("roam", this, sprite);
        this.addState(roam);
        //set the starting state.
        this.changeState("roam");
    }
}
