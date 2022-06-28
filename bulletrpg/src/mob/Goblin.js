import Mob from "./Mob.js";
import GoblinController from "../AI/EnemyAI/GoblinAI/GoblinController.js";
// import BossGunController from "../AI/EnemyAI/BossAI/BossGunController.js";

export default class Goblin extends Mob {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        super.mobConfig({
            damage: 200,
            defaultSpeed: 100,
            coinValue: 20,
            defaultHealth: 5000,
        })
        this.setSize(30, 60);
        this.ai = new GoblinController(this, {
            player: scene.player,
            animations: "",
        });
        this.time = scene.time;
    }


    update(deltaT) {
        this.cd -= deltaT
        if (this.getHealth() <= this.getDefaultHealth() * 0.25) {
            if (this.ai.getState().getStateName() == "follow") {
                this.ai.changeState("pushup")
            }
            this.cd = 4000;
        }
    }
}

