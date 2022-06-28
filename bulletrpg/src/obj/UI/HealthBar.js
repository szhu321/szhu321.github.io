
export default class HealthBar extends Phaser.GameObjects.Container
{
    maxHealth;
    currentHealth;
    healthBarWidth;
    healthBarHeight;

    constructor(scene, x, y, maxHealth)
    {
        super(scene, x, y);
        scene.add.existing(this);

        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;

        this.healthBarWidth = 50;
        this.healthBarHeight = 5;

        this.healthBar = new Phaser.GameObjects.Rectangle(scene, 0, 0, this.healthBarWidth, this.healthBarHeight, 0xc2c20e, 1);
        this.border = new Phaser.GameObjects.Rectangle(scene, 0, 0, this.healthBarWidth, this.healthBarHeight, 0x000000, 1);
        this.add(this.border);
        this.add(this.healthBar);

        
    }

    /**
     * Pass in a game object for this health bar to follow.
     * @param {Phaser.GameObjects.GameObject} gameObject - the game object.
     */
    follow(gameObject)
    {
        this.gameObject = gameObject;       
    }

    update()
    {
        if(this.gameObject)
        {
            this.x = this.gameObject.x;
            this.y = this.gameObject.y - this.gameObject.height / 2;
        }

        if(this.currentHealth > this.maxHealth)
            this.maxHealth = this.currentHealth;

        //change the size of the health bar.
        this.healthBar.width = this.healthBarWidth * (this.currentHealth/this.maxHealth);
    }
}

