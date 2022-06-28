import StateMachine from "../../StateMachine/StateMachine.js";
import WolfFollow from "../WolfAI/WolfFollow.js";
import WolfIdle from "../WolfAI/WolfIdle.js";
import WolfLunge from "../WolfAI/WolfLunge.js"
import WolfRoam from "../WolfAI/WolfRoam.js";
export default class WolfController extends StateMachine {
    create(sprite, data) {
        this.Player = data.Player;
        this.sprite = sprite;
        this.lungeCD = 2000;

        //add the states.
        let idle = new WolfIdle("idle", this, sprite);
        this.addState(idle);
        let follow = new WolfFollow("follow", this, sprite);
        this.addState(follow);
        let roam = new WolfRoam("roam", this, sprite);
        this.addState(roam);
        let lunge = new WolfLunge("lunge", this, sprite)
        this.addState(lunge);
        //set the starting state.
        this.changeState("roam");
    }
}
