import Mob from "./Mob.js";

/**
 * The MobManager stores groups of mobs for reuse.
 */
export default class MobManager
{
    /**
     * @type {Phaser.GameObjects.Group[]}
     */
    #groups;
    #scene;

    /**
     * Creates a new mob manager.
     * @param {Phaser.Scene} scene - The current scene.
     */
    constructor(scene)
    {
        this.#groups = [];
        this.#scene = scene;
    }

    /**
     * Gets the number of mobs that are active.
     * @param {String} groupName - The mob groupName.
     * @returns The number of active mobs in the given mob group. -1 if the groupName is not found.
     */
    getNumAlive(groupName)
    {
        for(let group of this.#groups)
        {
            if(group.name === groupName)
            {
                return group.countActive();
            }
        }
        return -1;
    }

    /**
     * Gets an array of groups for the mobs.
     * @returns mob groups.
     */
    getMobGroups()
    {
        return this.#groups;
    }

    /**
     * Create overlaps between an given gameObject(s) and all the mob groups.
     * Uses the mob as the first collider and other as the second collider.
     * @param {*} other - The other gameObject(s).
     * @param {Function} callback - The callback function.
     */
    addOverlapAll(other, callback)
    {
        for(let group of this.getMobGroups())
            this.#scene.physics.add.overlap(group, other, callback, null, this.#scene); 
    }

    /**
     * Adds a mob group to the mobManager.
     * @param {String} groupName - The name of the group.
     * @param {Function} classType - The class of the Mob.
     */
    addMobGroup(groupName, classType)
    {
        const groupConfig = {
            classType: classType,
            visible: true,
            frameQuantity: 0,
        }
        let group = this.#scene.physics.add.group(groupConfig);
        group.name = groupName;
        this.#groups.push(group);
    }

    /**
     * Spawns a mob based on the given groupName and position. Will use the groupName as the frame key.
     * @param {String} groupName - The groupName of the mob to spawn.
     * @param {Number} x - The x location.
     * @param {Number} y - The y location.
     * @returns {Mob} The created mob.
     */
    spawnMob(groupName, x, y)
    {
        for(let group of this.#groups)
        {
            if(group.name === groupName)
            {
                let mob = group.get(x, y, groupName);
                mob.reset()
                return mob;
            }
        }
    }
}