import { Consumable, Gun } from "../obj/Item.js";
export class ShopItemInteract {
    constructor(item, scene, x, y) {
        this.panel = scene.add.image(x, y, "BuyButton").setOrigin(0);
        this.setConfig(scene);
        this.events(scene, item);
    }
    setConfig(scene) {
        this.panel.setX(this.panel.x - this.panel.width/2);
        this.panel.setY(this.panel.y - this.panel.height/2);
        this.panel.setVisible(false);
        this.panel.setInteractive();
        this.panel.setScrollFactor(0);
        scene.events.on("render", () => {
            scene.Hub.shop.shopContainer.add(this.panel);
        });        
    }
    events(scene, item) {
        this.panel.on("pointerup", () => {
            var trip = true;
            var backpackObj = scene.Hub.backpack;
            var backpack = scene.Hub.backpack.array;
            var backpackContainer = scene.Hub.backpack.backpackContainer;
            var itemsFromJson = scene.cache.json.get("ItemProperty");
            var items = itemsFromJson.object;
            var backpackItemLocation = backpackContainer.list.length - 8;
            var itemX = backpackContainer.list[0].x - 111;
            var itemY = backpackContainer.list[0].y - 36;
            for(var i = 0; i < backpack.length; i++) {
                if(backpack[i] === item && backpack[i].amount < backpack[i].maxStack) {
                    backpack[i].amount++;
                    trip = false;
                    backpackObj.updateAmountCount(backpack);
                }
            }
            if(backpack[backpack.length - 1] !== item && trip && backpackItemLocation < 9){
                if(backpackItemLocation > 4) {
                    itemY += 74;
                    backpackItemLocation -= 4;
                    itemX += (backpackItemLocation*74) - 74;
                } else {
                    itemX += (backpackItemLocation*74) - 74;
                }
                for(var i = 0; i < items.length; i++){
                    if(item.id === items[i].id) {
                        if(item.type === "consumable") {
                            var newItem = new Consumable(scene, items[i], itemX, itemY, BackpackItemInteract);
                            backpackContainer.add(newItem.image);
                        } else if(item.type === "gun") {
                            var newItem = new Gun(scene, items[i], itemX, itemY, BackpackItemInteract);
                            backpackContainer.add(newItem.image);
                        }
                    }
                }
                backpack.push(item);
                backpackObj.updateAmountCount(backpack);
            }
        });
    }
}
export class BackpackItemInteract {
    constructor(item, scene, x, y) {
        this.panel = scene.add.image(x, y, "BuyButton").setOrigin(0);
        this.setConfig(scene);
    }
    setConfig(scene) {
        this.panel.setVisible(false);
        this.panel.setScrollFactor(0);
        this.panel.setDepth(0);
    }
}