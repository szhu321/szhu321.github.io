
export default class DialogBox extends Phaser.GameObjects.Container
{
    constructor(scene, x, y)
    {
        super(scene, x, y);
        scene.add.existing(this);
        this.setDepth(100);
        let newX = x + 300;
        let newY = y + 200;

        this.text = new Phaser.GameObjects.Text(scene, newX - 500, newY - 55, "Dong is very smart,", {fontFamily: "Arial", fontSize: "50px"});
        this.textBox = new Phaser.GameObjects.Rectangle(scene, newX, newY, 1200, 200, 0xc2c20e, 1);
        this.add(this.textBox);
        this.add(this.text);
        this.setScrollFactor(0);
        this.x = 500;
        this.y = 500;

        this.visible = false;
    }

    setText(newText)
    {
        this.text.setText(newText);
    }

    showFor(text, time)
    {   
        this.setText(text);
        this.visible = true;
        this.scene.time.addEvent({
            delay: time,
            callback: () => {
                //hides the textbox.
                this.visible = false;
            },
            loop: false
        })
    }
}


