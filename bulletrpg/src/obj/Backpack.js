export class Backpack {
    constructor(scene, texture) {
        this.array = [];
        this.textArray = [];
        this.backpack = scene.add.image(window.innerWidth - 105 - 310, 165, texture).setScrollFactor(0);
        this.backpackContainer = scene.add.container(0, 0, [this.backpack]);
        this.backpackContainer.setScrollFactor(0);
        this.backpackContainer.setDepth(3);
        this.backpackContainer.setVisible(false);
        this.backpackContainer.setInteractive(new Phaser.Geom.Rectangle(window.innerWidth - 105 - 310 - (this.backpack.width / 2), 165 - (this.backpack.height / 2), this.backpack.width, this.backpack.height), Phaser.Geom.Rectangle.Contains);
        this.backpackContainer.setName("backpack container");
        this.backpack.setName("backpack");
        this.createAmountCount(scene);
    }
    createAmountCount(scene) {
        var textX = this.backpack.x - (this.backpack.x/9.5);
        var textY = this.backpack.y - 19;
        for(var i = 0; i < 8; i++) {
            this.backpackContainer.add(
                scene.add.text(textX, textY, '', { font: '12px Courier', fill: '#000000'}).setDepth(4).setScrollFactor(0)
            );
            if((i+1) % 4 === 0) {
                textX = this.backpack.x - (this.backpack.x/9.5);
                textY += 74;
            } else {
                textX += 74;
            }
        }
        this.updateAmountCount(this.array);
    }
    updateAmountCount(backpack) {
        for(var i = 1; i < 9; i++) {
            if(backpack[i-1] != null) {
                // console.log(backpack[i-1].amount);
                this.backpackContainer.list[i].setText(backpack[i-1].amount+"");
            }
        }
    }
    setVisible(state) {
        this.backpackContainer.setVisible(state);
    }
    create(scene) {
        scene.input.setDraggable(this.backpackContainer);
        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.setX(dragX);
            gameObject.setY(dragY);
        });
    }
    addObjectToBackpack(object) {
        this.backpackContainer.add(object.image);
        this.array.push(object);
    }
}