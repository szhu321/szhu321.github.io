import StateMachine from "../../StateMachine/StateMachine.js";
import SlimeFollow from "./SlimeFollow.js";
import SlimeGrow from "./SlimeGrow.js";
import SlimeIdle from "./SlimeIdle.js";
import SlimeMerge from "./SlimeMerge.js";
import SlimeRoam from "./SlimeRoam.js";

export default class SlimeController extends StateMachine
{
    create(sprite, data)
    {
        this.sprite = sprite;
        this.slimes = data.slimes?data.slimes:null;
        this.Player = data.Player?data.Player:null;
        this.sprite.superSlime = false;

        this.addState(new SlimeFollow("slimeFollow", this, sprite));
        this.addState(new SlimeIdle("slimeIdle", this, sprite));
        this.addState(new SlimeMerge("slimeMerge", this, sprite));
        this.addState(new SlimeGrow("slimeGrow", this, sprite));
        this.addState(new SlimeRoam("slimeRoam", this, sprite));

        this.changeState("slimeIdle");
    }

    reset()
    {
        this.changeState("slimeIdle");
        if(this.sprite)
            this.sprite.superSlime = false;
    }
}

