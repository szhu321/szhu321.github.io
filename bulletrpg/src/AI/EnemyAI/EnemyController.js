import StateMachine from "../StateMachine/StateMachine.js";
import Follow from "./Follow.js";
import Idle from "./Idle.js";
import Lunge from "./Lunge.js";
import Roam from "./Roam.js";
import DongRoam from "./DongRoam.js";

export default class EnemyController extends StateMachine {
        create(sprite, data) {
                this.Player = data.Player;
                this.sprite = sprite;
                this.lungeCD = 2000;

                //add the states.
                let idle = new Idle("idle", this, sprite);
                this.addState(idle);
                let follow = new Follow("follow", this, sprite);
                this.addState(follow);
                let roam = new Roam("roam", this, sprite);
                this.addState(roam);
                let lunge = new Lunge("lunge", this, sprite)
                this.addState(lunge);
                let dRoam = new DongRoam("DongRoam", this, sprite);
                this.addState(dRoam);
                //set the starting state.
                this.changeState("idle");
        }
}
