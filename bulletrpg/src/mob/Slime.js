import Mob from "./Mob.js";
import SlimeController from "../AI/EnemyAI/SlimeAI/SlimeController.js";

export default class Slime extends Mob
{
    constructor(scene, x, y, sprite)
    {
        super(scene, x, y, sprite);
        super.mobConfig({
            damage: 100,
            defaultSpeed: 30,
            coinValue: 2,
        })
        this.ai = this.ai = new SlimeController(this, {
            Player: scene.Player,
            animations: "",
            slimes: [],
        });
        //this.body.setOffset(8, 8);
        this.body.setSize(24, 24);
    }

    update(deltaT)
    {

    }
}