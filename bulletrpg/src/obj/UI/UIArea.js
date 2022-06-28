
export default class UIArea extends Phaser.GameObjects.Container
{
    static ANCHOR = {
        TOPLEFT: "topleft",
        TOPRIGHT: "topright",
        BOTTOMLEFT: "bottomleft",
        BOTTOMRIGHT: "bottomright",
        CENTER: "center",
    } 
    /**
     * Creates a new UIArea that provides useful functions to place gameObjects.
     * @param {Phaser.Scene} scene - The current scene.
     */
    constructor(scene)
    {
        super(scene);
        scene.add.existing(this);
        this.setScrollFactor(0);
        this.setDepth(100);
        //console.log(this);
        //console.log(`x: ${this.x} y: ${this.y}`);
    }

    /**
     * Add the gameObject with some specfied properties.
     * @param {Phaser.GameObjects.GameObject} gameObject - The gameObject UI that would be inserted.
     * @param {Number} xPer - A number from 0 to 1. Positions the gameObject's x a certain percentage of the UIArea. 
     * @param {Number} yPer - A number from 0 to 1. Positions the gameObject's y a certain percentage of the UIArea.
     * @param {String} anchor - Position of the object will be detemined by the anchor position. Default is center.
     */
    addUI(gameObject, xPer, yPer, anchor = UIArea.ANCHOR.CENTER)
    {
        let halfWidth = this.width / 2;
        let halfHeight = this.height / 2;
        let gameObjectHalfWidth = gameObject.width / 2;
        let gameObjectHalfHeight = gameObject.height / 2;
        let anchorOffsetX = 0;
        let anchorOffsetY = 0;
        switch(anchor)
        {
            case UIArea.ANCHOR.CENTER: {
                anchorOffsetX = 0;
                anchorOffsetY = 0;
            } break;
            case UIArea.ANCHOR.TOPLEFT: {
                anchorOffsetX = gameObjectHalfWidth;
                anchorOffsetY = gameObjectHalfHeight;
            } break;
            case UIArea.ANCHOR.TOPRIGHT: {
                anchorOffsetX = -gameObjectHalfWidth;
                anchorOffsetY = gameObjectHalfHeight;
            } break;
            case UIArea.ANCHOR.BOTTOMLEFT: {
                anchorOffsetX = gameObjectHalfWidth;
                anchorOffsetY = -gameObjectHalfHeight;
            } break;
            case UIArea.ANCHOR.BOTTOMRIGHT: {
                anchorOffsetX = -gameObjectHalfWidth;
                anchorOffsetY = -gameObjectHalfHeight;
            }
        }

        let posX = (xPer * this.width) - halfWidth + anchorOffsetX;
        let posY = (yPer * this.height) - halfHeight + anchorOffsetY;
        gameObject.setPosition(posX, posY);
        this.add(gameObject);
    }
}
