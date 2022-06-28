import SlimeState from "./SlimeState.js";

export default class SlimeGrow extends SlimeState
{
    onEnter()
    {
        this.mergeAble = false;
    }

    update(deltaT)
    {
        super.update(deltaT);
        //grow the slime.
    }
}

