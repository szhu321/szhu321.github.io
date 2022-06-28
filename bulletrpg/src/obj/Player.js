import { Status } from './Status.js';
import { HitBox } from './HitBox.js';
import GunController from '../GunManager/GunControllers/GunController.js';
export class player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 0, 0, "dude");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.initalize();
        this.self_config(scene);
    }
    initalize() {
        if(this.hitbox != null)
            this.hitbox.sprite.destroy();
        this.status = null;
        this.hitbox = null;
        this.gunController = null;
    }
    self_config(scene) {
        this.setHitBox(scene);
        this.setStatus();
        if(scene.terrain != null)
            this.collidablesTerrain(scene, scene.terrain.getMapColliables());
        else {
            this.collidablesTerrain(scene, [scene.colliables]);
        }
        this.setScale(0.5);
        this.setOrigin(0, 0);
        this.setFrame("dude1.png");
        this.setDepth(1);
        this.setImmovable(true);
        this.setSize(30, 40);
        this.setOffset(10, 60);
    }
    setHitBox(scene) {
        this.hitbox = new HitBox(scene, this);
    }
    setStatus() {
        this.status = new Status();
    }
    collidablesTerrain(scene, collidables) {
        //console.log(collidables);
        for (var i = 0; i < collidables.length; i++) {
            scene.physics.add.collider(this, collidables[i]);
            collidables[i].setCollisionByProperty({ collides: true });
        }
    }
    getMembers() {
        var arrayOfMembers = [];
        for (var key in this) {
            arrayOfMembers.push({ name: key, value: this[key] })
        }
        return arrayOfMembers;
    }
    updateScene(scene) {
        this.gunController = new GunController(scene, { player: this });
        this.switchGunCoolDown = 2000;
    }
    getX() {
        return this.body.x
    }
    getY() {
        return this.body.y
    }
    killplayer() {
        this.visible = false;
        this.setVisible(false);
        this.active = false;
        this.setVelocityX(0);
        this.setVelocityY(0);
        console.log("you have been slain!");
    }
    respawn(x, y) {
        this.setX(x);
        this.setY(y - this.height / 2);
    }
    update(deltaT) {
        if(this.gunController != null) {
            this.gunController.update(deltaT);
            this.switchGunCoolDown -= deltaT;  
        }
        if (this.active) {
            //console.log(this.sprite.body.velocity.x);
            if (this.body.velocity.x > 0) {
                this.play("right", true);
            } else if (this.body.velocity.x < 0) {
                this.play("left", true);
            } else if (this.body.velocity.y < 0) {
                this.play("up", true);
            } else if (this.body.velocity.y > 0) {
                this.play("down", true);
            }
            if(this.hitbox != null)
                this.hitbox.update();
        }
    }
}