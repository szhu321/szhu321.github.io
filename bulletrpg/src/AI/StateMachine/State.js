import StateMachine from "./StateMachine.js";

export default class State
{
    #stateName;
    #stateMachine;
    #sprite;

    /**
     * Creates a new state. Some examples states include, idle, walk, aggro, etc.
     * @param {string} stateName - The name of the state.
     * @param {StateMachine} stateMachine - The StateMachine that this state will belong to.
     * @param {Phaser.GameObjects.Sprite} sprite - The sprite.
     */
    constructor(stateName, stateMachine, sprite)
    {
        this.#stateName = stateName;
        this.#stateMachine = stateMachine;
        this.#sprite = sprite;

        // this.#stateMachine.changeState("roam");
    }

    /**
     * Gets the state's name.
     * @returns {string} The state name;
     */
    getStateName()
    {
        return this.#stateName;
    }

    /**
     * Gets the sprite that this state is attatched to.
     * @returns {Phaser.GameObjects.Sprite} The sprite.
     */
    getSprite()
    {
        return this.#sprite;
    }

    /**
     * Gets the StateMachine that this state is attatched to.
     * Can be used to change the state.
     * @returns {StateMachine} The StateMachine.
     */
    getStateMachine()
    {
        return this.#stateMachine;
    }

    /**
     * Called by the StateMachine once when changing to this state.
     */
    onEnter(){/* abstract method */}

    /**
     * Called by the StateMachine once when leaving this state.
     */
    onExit(){/* abstract method */}

    /**
     * Called by the StateMachine every update.
     * @param {number} deltaT - The change in time.
     */
    update(deltaT){/* abstract method */}
    
}
