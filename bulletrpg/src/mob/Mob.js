import { player } from "../obj/player.js";
import HealthBar from "../obj/UI/HealthBar.js";

/**
 * A generic mob that has some basic properties.
 */
export default class Mob extends Phaser.Physics.Arcade.Sprite {
    #defaultHealth;
    #health;
    #defaultSpeed;
    #speed;
    #coinValue;
    #damage;
    #healthBar;
    #player;
    #mobAlive;

    /**
     * Creates a new mob object with some default values.
     * @param {Phaser.Scene} scene - The current scene.
     * @param {Number} x - The x coord.
     * @param {Number} y - The y coord.
     * @param {Phaser.GameObjects.Sprite} sprite - The sprite.
     */
    constructor(scene, x, y, sprite)
    {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.#defaultHealth = 500;
        this.#health = this.#defaultHealth;
        this.#defaultSpeed = 30;
        this.#speed = this.#defaultSpeed;
        this.#coinValue = 5;
        this.#damage = 100;
        this.#healthBar = new HealthBar(scene, 0, 0, this.#defaultHealth);
        this.#player = scene.player;
        this.#mobAlive = true;
        this.#healthBar.follow(this);
        //this.setBounce(0.5, 0.5);
    }

    /**
     * A all in one setter for the mob. Used to change the properties on the mob.
     * @param {Object} config - The configuation object for the mob.
     * @param {Number} [config.defaultHealth] - The defaultHealth for the mob. This will reset the current health.
     * @param {Number} [config.health] - Sets the current health for the mob.
     * @param {Number} [config.defaultSpeed] - The defaultSpeed for the mob. This will reset the current speed.
     * @param {Number} [config.speed] - Sets the currrent speed for the mob.
     * @param {Number} [config.coinValue] - Sets the coinValue for the mob.
     * @param {Number} [config.damage] - Sets the damage for the mob.
     */
    mobConfig(config)
    {
        const {defaultHealth, health, defaultSpeed, speed, coinValue, damage} = config;
        if(defaultHealth) this.setDefaultHealth(defaultHealth);
        if(defaultSpeed) this.setDefaultSpeed(defaultSpeed);
        if(health) this.setHealth(health);
        if(speed) this.setSpeed(speed);
        if(coinValue) this.#coinValue = coinValue;
        if(damage) this.#damage = damage;
    }

    /**
     * Sets the defaultHealth. This also resets the current health to the new defaultHealth.
     * @param {Number} defaultHealth - The defualtHealth. 
     */
    setDefaultHealth(defaultHealth)
    {
        this.#defaultHealth = defaultHealth;
        this.#health = defaultHealth;
    }

    /**
     * Gets the defaultHealth.
     * @returns {Number} The defaultHealth.
     */
    getDefaultHealth() { return this.#defaultHealth;}
    
    /**
     * Gets the current health of this mob.
     * @returns {Number} The health.
     */
    getHealth() { return this.#health;}

    /**
     * Sets the current health of this mob.
     * @param {Number} health - The health.
     */
    setHealth(health) { this.#health = health;}

    /**
     * Sets the defaultSpeed. This also resets the current speed to the new defaultSpeed.
     * @param {Number} defaultSpeed - The defualtspeed. 
     */
    setDefaultSpeed(defaultSpeed)
    {
        this.#defaultSpeed = defaultSpeed;
        this.#speed = defaultSpeed;
    }

    /**
     * Gets the defaultSpeed.
     * @returns {Number} The defaultSpeed.
     */
    getDefaultSpeed() { return this.#defaultSpeed;}
    
    /**
     * Gets the current speed of this mob.
     * @returns {Number} The speed.
     */
    getSpeed() { return this.#speed;}

    /**
     * Sets the current speed of this mob.
     * @param {Number} speed - The speed.
     */
    setSpeed(speed) { this.#speed = speed;}

    /**
     * Gets the coin value of this mob.
     * @returns {Number} - The coinValue.
     */
    getCoinValue() {return this.#coinValue;}

    /**
     * Sets the coin value for this mob.
     * @param {Number} coinValue - The coinValue.
     */
    setCoinValue(coinValue) {this.#coinValue = coinValue;}

    /**
     * Gets the damage of this mob.
     * @returns {Number} - The damage.
     */
    getDamage() {return this.#damage;}

    /**
     * Sets the damage for this mob.
     * @param {Number} damage - The damage.
     */
    setDamage(damage) {this.#damage = damage;} 

    /**
     * Gets the current player.
     * @returns {player} The player.
     */
    getPlayer() {return this.#player};

    /**
     * Checks if the mob is alive or not.
     * @returns {boolean} - True if alive, false otherwise.
     */
    getMobAlive()
    {
        return this.#mobAlive;
    }

    /**
     * Sets the mob as dead. This will also hide the health bar.
     */
    setMobDead()
    {
        this.#mobAlive = false;
        this.#healthBar.visible = false;
        this.visible = false;
        this.active = false;
    }

    /**
     * Reset the mob properties to when it was alive.
     */
    reset()
    {
        this.#mobAlive = true;
        this.visible = true;
        this.active = true;
        this.#health = this.#defaultHealth;
        this.#speed = this.#defaultSpeed;
        this.#healthBar.visible = true;
        this.setScale(1);
        if(this.ai && this.ai.reset)
            this.ai.reset();
    }

    preUpdate(time, deltaT) 
    {
        super.preUpdate(time, deltaT);
        if(this.ai)
            this.ai.update(deltaT);
        this.#healthBar.currentHealth = this.#health;
        this.#healthBar.update();
        this.update(deltaT);
    }

    update(deltaT) { /*abstract method, to be overridden by the child class.*/}
}
