import BossController from "./bossController.js";
import HealthBar from "../../../obj/UI/HealthBar.js";

export class Boss extends Phaser.Physics.Arcade.Sprite {
    defaultHealth = 500;
    defaultSpeed = 250;

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        this.scene = scene
        this.mobAlive = true;
        this.player = scene.player;
        //this = scene.physics.add.sprite(x, y, sprite);
        //this.spawnX = x;
        //this.spawnY = y;
        this.healthBar = new HealthBar(scene, 0, 0, this.defaultHealth);
        this.healthBar.follow(this);
        this.health = this.defaultHealth;
        this.damage = 100;

        this.ai = new BossController(this,{
            player: this.player,
            dscene: scene,
        });
        this.scale = Math.random() + 1;
        this.speed = 2.0*this.defaultSpeed / this.scale;
        this.setScale(this.scale);
        this.guardianSkillCD = 5000;
    }

    getMobAlive() {
        return this.mobAlive;
    }
    setMobDead() {
        this.mobAlive = false;
        this.healthBar.visible = false;
        //this.ai.changeState("dead");
    }

    reset() {
        this.mobAlive = true;
        this.visible = true;
        this.active = true;
        this.health = this.defaultHealth;
        this.healthBar.visible = true;
        this.guardianSkillCD = 5000;
        //this.ai.changeState("");
    }

    preUpdate(time, deltaT) {//movement and stuff
        super.preUpdate(time, deltaT);

        this.ai.update(deltaT);

        this.healthBar.currentHealth = this.health;
        this.healthBar.update();
        //console.log("This mob is updating")
        if (this.active) {
            this.guardianSkillCD -= deltaT;
            if(this.guardianSkillCD<=0){
                this.ai.changeState("guardianShot");
                this.guardianSkillCD = 5000;
            }
            if (this.health <= 0) {
                this.setVelocityX(0);
                this.setVelocityY(0);
                //this.setVisible(false)
                //this.destroy()
            }
        }
    }
}
