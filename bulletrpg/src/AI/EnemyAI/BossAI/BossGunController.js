import GunManager from "../../../GunManager/GunMachine/GunManager.js";
import Target from "./Target.js";
import Spray from "./Spray.js";

export default class BossGunController extends GunManager {
    create(scene, data) {
        this.boss = data.boss;
        this.Player = scene.Player;
        this.scene = scene;
    }
    Target() {
        let target = new Target("Target", this, this.scene);
        this.addGun(target);
        this.changeGun("Target");
    }
    Spray() {
        let spray = new Spray("Spray", this, this.scene);
        this.addGun(spray);
        this.changeGun("Spray");
    }
}