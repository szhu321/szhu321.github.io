
export default class PartileManager
{
    /**
     * @type {Phaser.GameObjects.Group[]}
     */
    #groups;
    #scene;

    /**
     * Creates a new particle manager.
     * @param {Phaser.Scene} scene - The current scene.
     */
    constructor(scene)
    {
        this.#groups = [];
        this.#scene = scene;
    }
 
    getParticleGroups()
    {
        return this.#groups;
    }

    /**
     * Adds a mob group to the mobManager.
     * @param {String} particleName - The name of the particle.
     * @param {Function} classType - The class of the particle.
     */
    addParticleGroup(particleName, classType)
    {
        const groupConfig = {
            classType: classType,
            visible: true,
            frameQuantity: 0,
        }
        let group = this.#scene.physics.add.group(groupConfig);
        group.name = particleName;
        this.#groups.push(group);
    }

    /**
     * Shoots out particles in random directions staring at the given origin.
     * @param {String} partileName - The name of the particle.
     * @param {*} x - The x origin of spray.
     * @param {*} y - The y origin of spray.
     * @param {Object} particleConfig - Extra configuration for the spray.
     * @param {Number} particleConfig.amount - The amount of particles to spray.
     * @param {Object} particleConfig.directionVector - The direction vector.
     * @param {Number} particleConfig.directionVector.x - The x direction.
     * @param {Number} particleConfig.directionVector.y - The y direction.
     * @param {Number} particleConfig.spreadAngle - The spread angle in degrees.
     * @param {Number} particleConfig.speed - The speed of the particles.
     */
    sprayParticle(partileName, x, y, particleConfig)
    {
        let {directionVector = null, spreadAngle = 360, speed = 20, amount = 5} = particleConfig;
        let particleGroup = null;
        for(let group of this.#groups) //first search for the particle group.
        {
            if(group.name === partileName)
            {
                particleGroup = group;
                break;
            }
        }
        if(particleGroup)
        {
            let Vec = Phaser.Math.Vector2;
            for(let i = 0; i < amount; i++)
            {
                let dir = new Vec(1, 0);
                dir.rotate(Math.random() * 2 * Math.PI);
                if(directionVector)
                {
                    dir.set(directionVector.x, directionVector.y);
                    dir.normalize();
                    let rad = spreadAngle * (Math.PI / 180);
                    dir.rotate((Math.random() * rad * 2) - rad);
                }
                let particle = particleGroup.get(x, y);
                particle.setX(x);
                particle.setY(y);
                particle.active = true;
                particle.visible = true;
                particle.setAlpha(1);
                this.#scene.tweens.add({
                    targets: particle,
                    repeat: 0,
                    duration: 1000,
                    y: y + dir.y * speed,
                    x: x + dir.x * speed,
                    ease: "Power1",
                    onComplete: (tween, targets) => {
                        for(let target of targets)
                        {
                            target.active = false;
                            target.visible = false;
                        }
                    }
                });
                this.#scene.tweens.add({
                    targets: particle,
                    repeat: 0,
                    delay: 500,
                    duration: 500,
                    alpha: 0,
                    ease: "Power1",
                });
                this.#scene.tweens.add({
                    targets: particle,
                    repeat: 0,
                    delay: 100,
                    duration: 800,
                    alpha: 0,
                    y: y + 10,
                    ease: "Power1",
                });
            }
        }
    }
}

