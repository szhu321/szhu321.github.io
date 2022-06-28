import { Backpack } from "./Backpack.js";
import { Shop } from "./Shop.js";
export class Hub {
    constructor(scene, hub, hubItemOne, hubItemTwo) {
        this.state = {
            hub: false,
            backpack: false,
            shop: false,
        };
        this.hub = {
            allIcons: [],
            container: null,
            shop: null,
            backpack: null
        };
        //310 x 162
        this.shop = new Shop(scene, hubItemTwo);
        this.backpack = new Backpack(scene, hubItemOne);
        this.hubBox = scene.add.image(0, 155 + 84, hub);
        this.hubBox.setX(window.innerWidth - this.hubBox.width/2 - 10);
        this.allIcons(scene);
        this.hubContainer = scene.add.container(0, 0, [this.hubBox]);
        for(var i = 1; i < this.hub.allIcons.length; i++)
            this.hubContainer.add(this.hub.allIcons[i]);
        this.hubContainer.setScrollFactor(0).setDepth(3).setVisible(false);
        this.button(scene);
    }
    allIcons(scene) {
        var ObjectsFromJson = scene.cache.json.get("UIName").object;
        for(var i = 0; i < ObjectsFromJson.length; i++) {
            this.hub.allIcons.push(scene.add.image(0, 0, ObjectsFromJson[i].Icon));
            this.hub.allIcons[i].setX(window.innerWidth - this.hub.allIcons[i].width/2 - this.hubBox.width + 66 - 74);
            this.hub.allIcons[i].setY(128);
        }
        for(var i = 1; i < this.hub.allIcons.length; i++) {
            this.hub.allIcons[i].x = this.hub.allIcons[i-1].x + 74;
            if(i % 3 === 0) {
                this.hub.allIcons[i].setX(window.innerWidth - this.hub.allIcons[i].width/2 - this.hubBox.width + 66);
                this.hub.allIcons[i].y = this.hub.allIcons[i-1].y + 74;
            }
        }
        this.hub.allIcons[0].setX(window.innerWidth - this.hub.allIcons[0].width/2 - 10);
        this.hub.allIcons[0].setY(this.hub.allIcons[0].height/2 + 10);
        for(var i = 0; i < this.hub.allIcons.length; i++)
            this.hub.allIcons[i].setInteractive().setScrollFactor(0).setDepth(1);
    }
    button(scene) {
        this.hub.allIcons[0].on("pointerup", () => {
            this.state.hub = !this.state.hub;
            this.hubContainer.setVisible(this.state.hub);
        });
        this.hub.allIcons[1].on("pointerup", () => {
            this.state.backpack = !this.state.backpack;
            this.backpack.setVisible(this.state.backpack);
        });
        this.backpack.create(scene);

        this.hub.allIcons[2].on("pointerup", () => {
            this.state.shop = !this.state.shop;
            this.shop.setVisible(this.state.shop);
        })
        this.shop.create(scene);
    }
}