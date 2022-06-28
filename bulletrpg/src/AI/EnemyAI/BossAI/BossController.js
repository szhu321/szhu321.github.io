import StateMachine from "../../StateMachine/StateMachine.js";
import BossFollow from "../BossAI/BossFollow.js";
import BossIdle from "./BossIdle.js";
import BossLunge from "./BossLunge.js";
import BossRoam from "./BossRoam.js";

export default class BossController extends StateMachine {
    create(sprite, data) {
        this.Player = data.Player;
        this.sprite = sprite;

        let follow = new BossFollow("follow", this, sprite);
        this.addState(follow);
        let idle = new BossIdle("idle", this, sprite);
        this.addState(idle);
        let lunge = new BossLunge("lunge", this, sprite);
        this.addState(lunge);
        let roam = new BossRoam("roam", this, sprite);
        this.addState(roam);

        this.changeState("idle");
    }
}
