import State from "./State.js";

/**
 * The StateMachine will store all the state of a particular Mob. It will provide 
 * methods to change the state, as well as revert to a previous state. The 
 * creator of this class will need to call update() to update the StateMachine.
 */
export default class StateMachine {
    /**
     * @type {State[]} - stores the states of this stateMachine.
     */
    #states;

    /**
     * @type {State} - stores the current state of this stateMachine.
     */
    #currentState;

    /**
     * @type {State} - stores the previous state of this stateMachine.
     */
    #previousState;

    #created;
    #tempSprite;
    #tempData;

    /**
     * Creates a new StateMachine and initialize the variables for the state machine. 
     * @param {Phaser.GameObjects.Sprite} sprite - the sprite that will have this StateMachine.
     * @param {object} data - some extra data you can pass in for your convinence. This will be passed to the create method.
     */
    constructor(sprite, data) {
        this.#states = [];
        this.#currentState = null;
        this.#previousState = null;
        //this.create(sprite, data);
        this.#created = false;
        this.#tempSprite = sprite;
        this.#tempData = data;
    }


    /**
     * This method will be overridden by child classes. The sprite and data have been passed in for you to use.
     * @param {Phaser.GameObjects.Sprite} sprite - The sprite.
     * @param {object} data - The data.
     */
    create(sprite, data) {/* abstract method */ }

    /**
     * Add a state to the state machine.
     * @param {State} state - The state.
     */
    addState(state) {
        this.#states.push(state);
    }

    /**
     * Clear all the states inside this StateMachine.
     */
    clearStates() {
        while (this.#states.length > 0) {
            this.#states.pop();
        }
    }

    /**
     * Changes the state to the state name provided. You can also put in the string 'previous' to go to the
     * previous state.
     * @param {string} stateName - The state name, or "previous".
     */
    changeState(stateName) {
        let newState = null;
        if (stateName === "previous" && this.#previousState)
            newState = this.#previousState;
        else {
            let matchingStates = this.#states.filter(state => { return state.getStateName() === stateName });
            if (matchingStates.length > 0)
                newState = matchingStates[0];
        }

        if (newState) {
            //calls exit on old state. During first call currentState is null.
            if (this.#currentState)
                this.#currentState.onExit();
            //calls switch states.
            let tempState = this.#currentState;
            this.#currentState = newState;
            this.#previousState = tempState;
            //calls enter on new state.
            this.#currentState.onEnter();
        }
    }
    getState() {
        return this.#currentState;
    }

    /**
     * Updates the StateMachine. This will call update on the current state.
     * @param {number} deltaT - Change in time.
     */
    update(deltaT) {
        if (!this.#created) {
            this.#created = true;
            this.create(this.#tempSprite, this.#tempData);
            this.#tempSprite = undefined;
            this.#tempData = undefined;
        }
        if (this.#currentState)
            this.#currentState.update(deltaT);
    }
}

