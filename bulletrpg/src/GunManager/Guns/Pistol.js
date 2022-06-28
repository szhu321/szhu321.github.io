import Gun from "../GunMachine/Gun.js";

export default class Pistol extends Gun{
    constructor(gunName, gunManager, scene){
        super(gunName, gunManager, scene);
        this.setCustom("Pistol", "500", "250", "100", "300", "projectiles");
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