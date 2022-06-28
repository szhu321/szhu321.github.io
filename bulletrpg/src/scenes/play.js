import { final } from "../final.js";
import { Player } from "../obj/Player.js";
import { Hub } from "../obj/Hub.js";
// import { Slime } from "../AI/EnemyAI/SlimeAI/Slime.js";
import DialogBox from "../obj/UI/DialogBox.js";
import FloatText from "../obj/UI/FloatText.js";
import StatusBar from "../obj/UI/StatusBar.js";
import { Camera } from "../obj/Camera.js";
import Boss from "../mob/Boss.js";
// import { Wolf } from "../AI/EnemyAI/WolfAI/Wolf.js";
// import { Goblin } from "../AI/EnemyAI/GoblinAI/Goblin.js";
import Mob from "../mob/Mob.js";
import Slime from "../mob/Slime.js";
import Goblin from "../mob/Goblin.js";
import Wolf from "../mob/Wolf.js";
import { KeyBoard } from "../obj/KeyBoard.js";
import MobManager from "../mob/MobManager.js";
import UIArea from "../obj/UI/UIArea.js";
import SocketController from "../SocketManager/SocketController.js";
import PartileManager from "../particle/ParticleManager.js";
import RectangleParticle from "../particle/RectangleParticle.js";
import BulletSpark from "../particle/BulletSpark.js";
export class play extends Phaser.Scene {
    constructor() {
        super({
            key: final.SCENES.PLAY
        })
    }
    init() {
        this.keyboard = new KeyBoard(this);
        this.totalKillCount = 0;
        this.bossKillCount = 0;
        this.wave = 1;
    }
    preload() {
        this.load.image("Ground", "../assets/tilesets/A2_Ground.png");
        this.load.image("Nature", "../assets/tilesets/C_OutSide_Nature.png");
        this.load.tilemapTiledJSON("lab", "../assets/maps/lab.json");
        this.anims.create({
            key: "right",
            framesRate: 10,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [6, 7, 8, 7]
            })
        })
        this.anims.create({
            key: "left",
            framesRate: 10,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [5, 4, 3, 4]
            })
        })
        this.anims.create({
            key: "up",
            framesRate: 10,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [9, 10, 11, 10]
            })
        })
        this.anims.create({
            key: "down",
            framesRate: 3,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [0, 1, 2, 1]
            })
        })
        this.anims.create({
            key: "slime_up",
            framesRate: 1,
            frames: this.anims.generateFrameNames("slime", {
                prefix: "slime",
                suffix: ".png",
                frames: [10, 11, 12]
            })
        })
        this.anims.create({
            key: "slime_down",
            framesRate: 1,
            frames: this.anims.generateFrameNames("slime", {
                prefix: "slime",
                suffix: ".png",
                frames: [4, 5, 6]
            })
        })
        this.anims.create({
            key: "slime_left",
            framesRate: 1,
            frames: this.anims.generateFrameNames("slime", {
                prefix: "slime",
                suffix: ".png",
                frames: [1, 2, 3]
            })
        })
        this.anims.create({
            key: "slime_right",
            framesRate: 1,
            frames: this.anims.generateFrameNames("slime", {
                prefix: "slime",
                suffix: ".png",
                frames: [7, 8, 9]
            })
        })
        this.anims.create({
            key: "wolf_right",
            framesRate: 1,
            frames: this.anims.generateFrameNames("wolf", {
                prefix: "wolve",
                suffix: ".png",
                frames: [1, 2, 3, 4, 5, 6, 7]
            })
        })
        this.anims.create({
            key: "wolf_right_lunge",
            framesRate: 1,
            frames: this.anims.generateFrameNames("wolf", {
                prefix: "wolve",
                suffix: ".png",
                frames: [8, 9, 10, 11]
            })
        })
        this.anims.create({
            key: "goblin_pushup",
            framesRate: 1,
            frames: this.anims.generateFrameNames("goblin", {
                prefix: "",
                suffix: ".png",
                frames: [44, 45, 46, 47, 48, 47, 46, 45, 44]
            })
        })
        this.anims.create({
            key: "goblin_up",
            framesRate: 1,
            frames: this.anims.generateFrameNames("goblin", {
                prefix: "",
                suffix: ".png",
                frames: [22, 23, 24, 25, 26, 27, 28, 29]
            })
        })
        this.anims.create({
            key: "goblin_down",
            framesRate: 1,
            frames: this.anims.generateFrameNames("goblin", {
                prefix: "0",
                suffix: ".png",
                frames: [0, 1, 2, 3, 4, 5, 6, 7]
            })
        })
        this.anims.create({
            key: "goblin_left",
            framesRate: 1,
            frames: this.anims.generateFrameNames("goblin", {
                prefix: "",
                suffix: ".png",
                frames: [33, 34, 35, 36, 37, 38, 39, 40]
            })
        })
        this.anims.create({
            key: "goblin_right",
            framesRate: 1,
            frames: this.anims.generateFrameNames("goblin", {
                prefix: "",
                suffix: ".png",
                frames: [11, 12, 13, 14, 15, 16, 17, 18]
            })
        })
    }

    create() {
        this.map = this.add.tilemap("lab");
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        var lab = this.map;
        var terrain = lab.addTilesetImage("A2_Ground", "NatureGround");
        var terrainTop = lab.addTilesetImage("C_OutSide_Nature", "Outdoor");
        var terrainTop2 = lab.addTilesetImage("A4_Walls_2", "BuildingWall");
        var terrainPassable = lab.addTilesetImage("C_OutSide_Nature", "Outdoor");
        var bottomLayer = lab.createLayer("Ground", [terrain], 0, 0);
        var passableLayer = lab.createLayer("Ground2", [terrainPassable, terrainTop2], 0, 0);
        var aboveLayer = lab.createLayer("Above", [terrainTop], 0, 0).setDepth(2);
        this.colliables = passableLayer;
        this.Hub = new Hub(this, "Hub", "Backpack", "Shop");
        this.Player = new Player(this);
        this.Player.respawn(50, 100);

        this.Hub.button(this);

        this.textBox = new DialogBox(this, 0, 0);
        this.floatText = new FloatText(this);
        this.userCamera = new Camera();
        this.userCamera.setCamera(this);
        this.userCamera.setFollow(this.Player);
        this.userCamera.setBounds(this.map.widthInPixels, this.map.heightInPixels);

        this.cameras.main.setZoom(1.25); //sets the zoom of the camera.

        this.ScreenUI = new UIArea(this);
        let camera = this.cameras.main;
        this.ScreenUI.setPosition(camera.width / 2, camera.height / 2); //the postion is the center of the screen.
        this.ScreenUI.setSize(camera.displayWidth, camera.displayHeight); //the width and height matches the camera's transformed width and height.

        this.StatusBar = new StatusBar(this);
        this.ScreenUI.addUI(this.StatusBar, 0, 0, UIArea.ANCHOR.TOPLEFT);
        //gun/bullet
        //constructor(bulletSpeed, bulletRange, fireRate, imageName, dude, input, physics, scene)
        // this.pistol = new Gun(100, 3000, 500, 'dude', this.Player, this.input, this.physics, this)
        // this.ak = new Gun(1000, 100000, 200, 'bullet', this.Player, this.input, this.physics, this)
        // let socket = io();
        // socket.on("chat message", function(msg) {
        //         console.log(msg);
        //         socket.emit("chat message", "I received the chat message");
        //     })

        //mob array

        // this.mobGroups = [];
        // const slimeGroupConfig = {
        //     classType: Slime,
        //     key: "slime",
        //     visible: true,
        //     frameQuantity: 0,
        //     createCallback: () => {
        //         console.log("New Slime Added")
        //         //scene.physics.add.overlap(scene.mobArray, gunDict[k].getBulletArray(), scene.handleBulletMobCollision, null, scene);
        //     },
        //     hitAreaCallback: function() {console.log("hit")}
        // }
        // this.mobGroups.push(this.physics.add.group(slimeGroupConfig));
        // this.mobGroups[0].get(500, 500, "slime");
        //this.superMobArry.spawn("slime", x, y);
        this.mobManager = new MobManager(this);
        this.mobManager.addMobGroup("slime", Slime);
        this.mobManager.addMobGroup("wolf", Wolf);
        this.mobManager.addMobGroup("goblin", Goblin);
        this.mobManager.addMobGroup("dude", Boss)
        ////let g = this.mobManager.spawnMob("goblin", 500, 1000);
        // g.mobConfig({
        //     defaultHealth: 10000,
        //     //defaultSpeed: 500,
        // })
        ////this.mobManager.spawnMob("wolf", 1000, 500);
        //Boss Mob
        // this.mobManager.spawnMob("dude", 800, 900);
        // this.mobArray = this.physics.add.group();
        // this.mobArray.add(new Wolf(this, 1000, 500, "wolf"));
        // this.mobArray.add(new Goblin(this, 500, 1000, "goblin"));
        this.particleManager = new PartileManager(this);
        this.particleManager.addParticleGroup("rect", RectangleParticle);
        this.particleManager.addParticleGroup("BulletSpark", BulletSpark);

        this.time.addEvent({
            delay: 300,
            callback: () => {
                if (this.wave === 1) {
                    for (var i=0; i<5; i++) {
                        this.mobManager.spawnMob("slime", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    }
                    this.wave += 1;
                }
                if (this.wave === 2 && this.totalKillCount === 5) {
                    for (var i=0; i<2; i++) {
                        this.mobManager.spawnMob("wolf", Math.random() * 800 + 300, Math.random() * 800 + 300);
                        this.mobManager.spawnMob("slime", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    }
                    this.wave += 1;
                }
                if (this.wave === 3 && this.totalKillCount === 9) {
                    for (var i=0; i<4; i++) {
                        this.mobManager.spawnMob("wolf", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    }
                    this.wave += 1;
                }
                if (this.wave === 4 && this.totalKillCount === 13) {
                    this.mobManager.spawnMob("goblin", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    this.wave += 1;
                }
                if (this.wave === 5 && this.totalKillCount === 14) {
                    this.mobManager.spawnMob("wolf", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    this.mobManager.spawnMob("wolf", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    this.mobManager.spawnMob("goblin", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    this.wave += 1;
                }
                if (this.wave === 6 && this.totalKillCount === 17) {
                    this.mobManager.spawnMob("goblin", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    this.mobManager.spawnMob("goblin", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    for (var i=0; i<9; i++) {
                        this.mobManager.spawnMob("slime", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    }
                    this.wave += 1;
                }
                if (this.wave === 7 && this.totalKillCount === 28) {
                    for (var i=0; i<6; i++) {
                        this.mobManager.spawnMob("wolf", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    }
                    this.mobManager.spawnMob("goblin", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    this.wave += 1;
                }
                if (this.wave === 8 && this.totalKillCount === 35) {
                    for (var i=0; i<4; i++) {
                        this.mobManager.spawnMob("goblin", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    }
                    this.wave += 1;
                }
                if (this.wave === 9 && this.totalKillCount === 39) {
                    for (var i=0; i<10; i++) {
                        this.mobManager.spawnMob("wolf", Math.random() * 800 + 300, Math.random() * 800 + 300);
                    }
                    this.wave += 1;
                }
            },
            loop: true
        });

        //spawn a dude mob
        // this.mobDude = this.mobArray.get(250, 250, 'slime').setScale(.75);
        //this.mobArray.add(new Mob(this, 500, 500, this.Player, 'slime'))
        //this.mobArray.get(500, 500, "slime");

        // this.time.addEvent({
        //     delay: 300,
        //     callback: () => {
        //         // spawn a new apple
        //         if (this.getMobAliveStatus("slime", this.mobArray) < 3) { //if the total number that is active is less than 4.
        //             let mob = this.mobArray.add(new Slime(this, Math.random() * 800 + 300, Math.random() * 800 + 300, "slime"));
        //             //mob.reset();
        //         }
        //     },
        //     loop: true
        // });

        //this.ultimateMobArray.addMobArray(this.mobArray);


        // for(let k in gunDict){
        //     if(scene.mobArray != null) {
        //         scene.physics.add.overlap(scene.mobArray, gunDict[k].getBulletArray(), scene.handleBulletMobCollision, null, scene);
        //     }
        // }

        //add collisions for the mob.

        // for(let group of this.mobManager.getMobGroups())
        //     this.physics.add.overlap(group, this.Player.hitbox.sprite, this.handleDamage, null, this); 

        this.test = this.add.image(300, 300, "BuyButton").setOrigin(0).setDepth(10).setScrollFactor(0).setInteractive();
        this.test.on("pointerup", () => {
            this.scene.start(final.SCENES.TEST);
        });
        this.Player.updateScene(this);
        this.worldHeightInPixels = lab.heightInPixels;
        this.worldWidthInPixels = lab.widthInPixels;

        //add collision handlers for the mobs.
        this.mobManager.addOverlapAll(this.Player.hitbox.sprite, this.handleMobPlayerCollision);
        let gunDict = this.Player.gunController.getGunDict();
        for (let key in gunDict)
            this.mobManager.addOverlapAll(gunDict[key].getBulletArray(), this.handleMobBulletCollision);

        //console.log(this);
        this.socketControl = new SocketController(this);
    }
    // getMobAliveStatus(mob, array) {
    //     var result = 0;
    //     for(var i = 0; i < array.children.size; i++) {
    //         if(mob === array.children.entries[i].texture.key && array.children.entries[i].active)
    //             result++;
    //     }
    //     return result;
    // }
    handleMobPlayerCollision(Player, monster) {
        if (this.Player.alpha == 0.5) return;
        // console.log("hello")
        if (monster.active) {
            this.Player.status.hp = this.Player.status.hp - monster.getDamage();
            // this.sound.play("PlayerTakeDamageSound");
            // console.log(monster)
            // console.log(Player)
            if (this.Player.status.hp <= 0) {
                this.Player.killPlayer();
                this.ak = null
            }
            this.invulnerable()
        }

    }

    invulnerable() {
        this.Player.alpha = 0.5;
        this.time.addEvent({
            delay: 1000,
            callback: () => { this.Player.alpha = 1 },
            callbackScope: this,
            loop: false
        });
    }

    /**
     * 
     * @param {Mob} obj1 - The mob.
     * @param {Player} obj2 - The Player.
     */
    handleMobBulletCollision(obj1, obj2) {//obj1 is the mob obj 2 is the bullets
        //console.log(obj1)
        //console.log(obj2)
        if (obj1.active && obj2.active) {
            obj2.visible = false;
            obj2.active = false;
            obj1.setHealth(obj1.getHealth() - obj2.damage);
            this.floatText.showText(obj1.x - obj1.width / 4, obj1.y - obj1.height / 2, `${obj2.damage}`);
            // this.particleManager.sprayParticle("BulletSpark", obj2.x, obj2.y, Math.log10(obj2.damage), {
            //     x: -obj2.body.velocity.x,
            //     y: -obj2.body.velocity.y,
            // }, 30, 80);
            this.particleManager.sprayParticle("BulletSpark", obj2.x, obj2.y, {
                amount: Math.log10(obj2.damage),
                directionVector: {
                    x: -obj2.body.velocity.x,
                    y: -obj2.body.velocity.y,
                },
                spreadAngle: 30,
                speed: 10 * Math.log2(obj2.damage),
            });
            obj2.destroy();
            if (obj1.getHealth() <= 0 && obj1.getMobAlive()) {

                obj1.body.velocity.x = 0
                obj1.body.velocity.y = 0
                obj1.setMobDead();
                //obj1.setVisible(false);
                obj1.visible = false;
                obj1.active = false;
                this.Player.status.coins += obj1.getCoinValue();
                //play some particles.
                let num = Math.log2(obj1.getDefaultHealth());
                this.particleManager.sprayParticle("rect", obj1.x, obj1.y, {
                    amount: num,
                    speed: 30,
                    directionVector: {
                        x: 0,
                        y: 1,
                    },
                    spreadAngle: 270,
                });
                this.totalKillCount += 1;
                console.log("Killcount is:" + this.totalKillCount);
                console.log(obj1.getCoinValue());
                // if (obj1.getCoinValue === 1000) {
                //     this.bossKillCount += 1;
                //     console.log("Boss Kill Count is:" + this.bossKillCount);
                // }
                //this.textBox.showFor("mob was killed, \n good job!!!!", 1000);
                // obj1.destroy();
            }
        }
    }
    createNewPlayer() {
        return new Player(this);
    }
    update(time, delta) {
        this.keyboard.update();
        this.Player.update(delta);
        this.StatusBar.health = this.Player.status.health
        this.StatusBar.update()
        // if (this.ak != null) {
        //     this.ak.update(time, delta);
        // }
        // this.mobArray.children.iterate(child => {
        //     if(child.active)
        //         child.update();
        // })
    }


}