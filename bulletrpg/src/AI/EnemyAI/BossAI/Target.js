import Gun from "../../../GunManager/GunMachine/Gun.js";

export default class Target extends Gun {
    constructor(gunName, gunManager, scene) {
        super(gunName, gunManager, scene);
        this.setCustom("Target", "500", "250", "100", "300", "projectiles");
        this.coolDown = 100
        // this.#gunName = "Pistol";
        // this.#bulletSpeed = "1000";
        // this.#bulletRange = "1000";
        // this.#bulletDamage = "100";
        // this.#fireRate = "1000";
        // this.#bulletImage = "bullet";
        // this.#coolDown = this.#fireRate;
        //console.log(this.#gunName);
    }

    update(deltaT) {
        this.coolDown = this.coolDown - deltaT;//update fire rate cooldown
        if (this.coolDown <= 0.01) {//if fire rate cool down is finished
            this.shoot();
        }
    }
    shoot() {
        let startX = this.getGunMachine().boss.x + this.getGunMachine().boss.width / 4;
        let startY = this.getGunMachine().boss.y + this.getGunMachine().boss.height / 4;
        let targetX = this.getGunMachine().Player.x
        let targetY = this.getGunMachine().Player.y
        let bullet = this.getBulletArray().get(startX, startY, this.getBulletImage()).setScale(1.5);
        bullet.damage = this.getBulletDamage();
        bullet.visible = true;
        bullet.active = true;
        bullet.setBossVelocity(startX, startY, targetX, targetY, this.getBulletSpeed());
        bullet.spawnX = this.getGunMachine().boss.x;
        bullet.spawnY = this.getGunMachine().boss.y;
        this.coolDown = 100
    }
}