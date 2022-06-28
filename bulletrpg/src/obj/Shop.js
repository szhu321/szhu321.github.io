import { Consumable, Gun } from "./Item.js";
import { ShopItemInteract } from "../scenes/ItemInteract.js";
export class Shop {
    constructor(scene, texture) {
        this.state = {
            clicked: false
        }
        this.shopbag = scene.add.image(window.innerWidth - 105 - 310, 437, texture);
        this.shopContainer = scene.add.container(0, 0, [this.shopbag]);
        this.shopContainerProperty = this.self_defaultShopInventory(scene, this.shopContainer);
        this.self_setStyle();
    }
    self_setStyle() {
        this.shopbag.setName("shop");
        this.shopContainer.setName("shop container");
        this.shopbag.setDepth(3);
        for (var i = 1; i < this.shopContainer.list.length; i++) {
            this.shopContainer.list[i-1].setScrollFactor(0);
            this.shopContainer.list[i].setDepth(4);
        }
        this.shopContainer.setScrollFactor(0);
        this.shopContainer.setDepth(3);
        this.shopContainer.setVisible(false);
        this.shopContainer.setInteractive(
            new Phaser.Geom.Rectangle(
                window.innerWidth - 105 - 310 - (this.shopbag.width / 2), 
                437 - (this.shopbag.height / 2), 
                this.shopbag.width, 
                this.shopbag.height
            ), 
            Phaser.Geom.Rectangle.Contains
        );
    }
    self_defaultShopInventory(scene, shopInventory) {
        var itemsFromJson = scene.cache.json.get("ItemProperty");
        var items = itemsFromJson.object;
        var temp;
        var itemX = this.shopbag.x - 111;
        var itemY = this.shopbag.y - 113;
        var result = [];
        for(var i = 0; i < items.length; i++){
            if(items[i].type === "consumable") {
                temp = new Consumable(scene, items[i], itemX, itemY, ShopItemInteract);
                shopInventory.add(temp.image);
                result.push(temp);
            } else if(items[i].type === "gun") {
                temp = new Gun(scene, items[i], itemX, itemY, ShopItemInteract);  
                shopInventory.add(temp.image);
                result.push(temp);
            }
            if((i+1) % 4 === 0) {
                itemY = itemY + 10 + 64;
                itemX = this.shopbag.x - 111 - 64 - 10;
            }
            itemX = itemX + 10 + 64;
        }
        return result;
    }
    editBackpack(backpack) {
        if(backpack.length === 0) {
            backpack.push()
        }
    }
    setVisible(state) {
        this.shopContainer.setVisible(state);
    }
    create(scene) {
        scene.input.setDraggable(this.shopContainer);
        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.setX(dragX);
            gameObject.setY(dragY);
        });
    }
}