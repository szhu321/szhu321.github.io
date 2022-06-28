
export default class FloatText
{
    constructor(scene)
    {
        this.scene = scene;
        this.floatTextPool = scene.physics.add.group({
            classType: FloatTextObj//constructor(scene, x, y, texture)
        });
    }

    showText(x, y, displayText)
    {
        let text = this.floatTextPool.get(x, y);
        text.setX(x);
        text.setY(y);
        text.active = true;
        text.setText(displayText);
        text.setAlpha(1);
        this.scene.tweens.add({
            targets: text,
            repeat: 0,
            duration: 1000,
            y: y - 100,
            ease: "Power1",
            onComplete: (tween, targets) => {
                for(let target of targets)
                {
                    //console.log("RUNSSSS");
                    target.active = false;
                    // target.visible = false;
                }
            }
        });
        this.scene.tweens.add({
            targets: text,
            repeat: 0,
            delay: 500,
            duration: 500,
            alpha: 0,
            ease: "Power1",
        });
        //console.log(this.floatTextPool.getLength());
    }
}

class FloatTextObj extends Phaser.GameObjects.Text
{
    constructor(scene, x, y, text, config)
    {
        super(scene, x, y, text, config);
        this.setColor("#d90718");
        this.setFontStyle("bold");
    }
}




