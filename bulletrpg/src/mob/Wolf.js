import Mob from "./Mob.js";
import WolfController from "../AI/EnemyAI/WolfAI/WolfController.js";

export default class Wolf extends Mob
{
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        super.mobConfig({
            defaultHealth: 1500,
            damage: 250,
            defaultSpeed: 75,
            coinValue: 10
        })
        this.ai = new WolfController(this, {
            Player: scene.Player,
            animations: "",
        });
        this.body.setSize(100, 50);
        this.cd = 4000;
        this.time = scene.time;
    }

    update(deltaT)
    {
        this.cd -= deltaT
        if ((this.cd - deltaT) <= 0) {
            if (this.ai.getState().getStateName() == "follow") {
                this.ai.changeState("lunge")
            }
            this.cd = 4000;
        }
    }
}