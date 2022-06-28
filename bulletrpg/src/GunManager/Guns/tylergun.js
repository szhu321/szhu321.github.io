import Gun from "../GunMachine/Gun.js";

export default class testGun extends Gun{
    constructor(gunName, gunManager, scene){
        super(gunName, gunManager, scene);
        this.setCustom("testGun", "1000", "750", "300", "750", "projectiles");
        // this.#gunName = "Pistol";
        // this.#bulletSpeed = "1000";
        // this.#bulletRange = "1000";
        // this.#bulletDamage = "100";
        // this.#fireRate = "1000";
        // this.#bulletImage = "bullet";
        // this.#coolDown = this.#fireRate;
        //console.log(this.#gunName);
    }
}