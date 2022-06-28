import { ShopItemInteract } from "../scenes/ItemInteract.js";

export class Item {
    constructor(type, name, id, maxStack, amount, description) {
        this.state = {
            clicked: false
        }
        this.type = type;
        this.name = name;
        this.id = id;
        this.maxStack = maxStack; 
        this.amount = amount;
        this.description = description;
    }
    getMembers() {
        var arrayOfMembers = [];
        for(var key in this) {
            arrayOfMembers.push({name: key, value: this[key]})
        }
        return arrayOfMembers;
    }
    setShopClick(state) {
        this.state.shopClick = state;
    }
}
export class Consumable extends Item{
    constructor(scene, itemProperties, x, y, typeOfAction) {
        super();
        Object.assign(this, itemProperties);
        this.image = scene.add.image(x , y, "items", this.picture);
        this.events(scene, typeOfAction, x, y);
        this.createWindow(scene, typeOfAction, x, y);
    }
    setAmount(amount) {
        this.amount = amount;
    }
    events(scene, typeOfAction, x, y) {
        this.image.setInteractive();
        this.image.on("pointerup", () => {
            this.state.clicked = !this.state.clicked;
            if(this.state.clicked) {
                this.image.alpha = 0.5;
                this.interaction.panel.setVisible(this.state.clicked);
            } else {
                this.image.alpha = 1;
                this.interaction.panel.setVisible(this.state.clicked);
            }
        });
    }
    createWindow(scene, typeOfAction, x, y) {
        this.interaction = new typeOfAction(this, scene, x, y);
    }
}
export class Gun extends Item{
    constructor(scene, itemProperties, x, y, typeOfAction) {
        super();
        Object.assign(this, itemProperties);
        this.image = scene.add.image(x , y, "items", this.picture); 
        this.events(scene, typeOfAction, x, y);
        this.createWindow(scene, typeOfAction, x, y);
    }
    events(scene, typeOfAction, x, y) {
        this.image.setInteractive();
        this.image.on("pointerup", () => {
            this.state.clicked = !this.state.clicked;
            if(this.state.clicked) {
                this.image.alpha = 0.5;
                this.interaction.panel.setVisible(this.state.clicked);
            } else {
                this.image.alpha = 1;
                this.interaction.panel.setVisible(this.state.clicked);
            }
        });
    }
    createWindow(scene, typeOfAction, x, y) {
        this.interaction = new typeOfAction(this, scene, x, y);
    }
}