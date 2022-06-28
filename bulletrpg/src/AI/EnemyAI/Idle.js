import State from "../StateMachine/State.js";

export default class Idle extends State {
    onEnter() {
        //this.getStateMachine().changeState("Roam");
        //run the idle animation.
        //initialize some variables.
        //this.sprite.play("slime_left", true);

    }


    onExit() {
        //stop the current animations.
    }


    update(deltaT) {
        //check the player's position
        let player = this.getStateMachine().player;
        //if the player is too close change state.
        let enemy = this.getSprite();
        enemy.setVelocityX(0);
        enemy.setVelocityY(0);
        let distance = Math.sqrt(Math.pow(enemy.x - player.x, 2) + Math.pow(enemy.y - player.y, 2));
        //console.log(`slime is idle. Distance: ${distance}`);
        // if(distance <600)
        // {
        //     this.getStateMachine().changeState("follow");
        // }
    }
}

