import { final } from "../final.js";
export class menu extends Phaser.Scene {
    constructor() {
        super({
            key: final.SCENES.MENU
        })
        this.pictures = [];
        this.members = [];
    }
    init(data) {
        //console.log(data);
        this.pictures = [];
        this.members = [];
    }
    create() {
        let components = this.cache.json.get("MainMenuProperty").component;
        let scenes = [];
        Object.assign(this.pictures, components);
        for(let i = 0; i < components.length; i++) {
            this.members.push(this.add.image(0, 0, "mainmenu", this.pictures[i].picture).setDepth(0));
        }
        for(let i = 1; i < components.length; i++) {
            this.members[i].setX(this.game.renderer.width/2);
            this.members[i].setY(this.members[i-1].y + (this.game.renderer.height/this.members.length));
            this.members[i].setDepth(1);
        }
        this.members[0].setOrigin(0);
        for(let j in final.SCENES) {
            scenes.push(final.SCENES[j]);
        }
        for(let i = 2; i < components.length; i++) {
            this.members[i].setInteractive();
            this.members[i].myId = scenes[i];
            this.members[i].on("pointerup", function () {
                this.scene.scene.start(this.myId);
            }, this.members[i])
        }
    }
    update() {
        this.members[0].setScale(
            this.sys.canvas.width/this.members[0].width,
            this.sys.canvas.height/this.members[0].height
        );
        for(let i = 1; i < this.members.length; i++) {
            this.members[i].setScale(
                (this.sys.canvas.width/this.members[0].width)/2,
                this.sys.canvas.height/this.members[0].height
            );
        }
    }
}