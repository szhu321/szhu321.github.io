import State from "../../StateMachine/State.js";

export default class SlimeState extends State
{
    mergeAble = false;

    onEnter()
    {
    
    }
   
    onExit()
    {
        
    }

    checkMerge()
    {
        // //create a region map, each region will be seperated by 100px of space.
        // let pixelSeperation = 100;
        // let region = {};
        // //calculate the region of the current slime.
        // let mapSizeWidth = this.player.scene.worldWidthInPixels;
        // let mapSizeY = this.player.scene.worldHeightInPixels;

        // let num = this.getSprite().x / pixelSeperation + (this.getSprite().y / pixelSeperation) * (mapSizeWidth / pixelSeperation);
        // region[`${num}`] = true;
        // for(let slime of this.getStateMachine().slimes().getChildren())
        // {
        //     if(slime.active && slime != this.getSprite())
        //     {
        //         num = slime.x / pixelSeperation + (slime.y / pixelSeperation) * (mapSizeWidth / pixelSeperation);
        //         if(region[`${num}`])
        //         {
        //             //merge found/
        //             console.log("A merge candidate has been found, below is this and the other slime.");
        //             console.log(this.getSprite());
        //             console.log(slime);
        //             break;
        //         }
        //         region[`${num}`] = true;
        //     }
        // }


    }
    
    update(deltaT)
    {
        let enemy = this.getSprite();
        //update animations.
        if (Math.abs(enemy.body.velocity.y) < Math.abs(enemy.body.velocity.x)) {
            if (enemy.body.velocity.x > 0) {
                enemy.play("slime_right", true);
                enemy.setVelocityX(enemy.body.velocity.x)
            } else if (enemy.body.velocity.x < 0) {
                enemy.play("slime_left", true);
                enemy.setVelocityX(enemy.body.velocity.x)
            }
        }

        else if (Math.abs(enemy.body.velocity.x) <= Math.abs(enemy.body.velocity.y)) {
            // if (Math.abs(velocityX) <= this.speed / 2) {
            if (enemy.body.velocity.y < 0) {
                enemy.play("slime_up", true);
                enemy.setVelocityY(enemy.body.velocity.y)
            } else if (enemy.body.velocity.y > 0) {
                enemy.play("slime_down", true);
                enemy.setVelocityY(enemy.body.velocity.y)
            }
        }

        // if(this.mergeAble && Math.random() < 0.0005 && !this.getSprite().superSlime) //using math.random to prevent merging constantly.
        // {
        //     //check for merging here.
        //     let thisSlime = this.getSprite();
        //     let otherSlimes = this.getStateMachine().slimes.getChildren().filter((slime) => {
        //         if(thisSlime == slime)
        //             return false;
        //         if(slime.active == false)
        //             return false;
        //         return true;
        //     });
        //     //console.log(otherSlimes);
        //     if(otherSlimes && otherSlimes.length >= 1)
        //     {
        //         let randomSlime = otherSlimes[Math.floor(Math.random() * otherSlimes.length)];
        //         //checks to make sure that the slime chosen is not the current slime and that the chosen slime is not a superSlime.
        //         if(randomSlime != thisSlime && !randomSlime.superSlime)
        //         {
        //             //start merging.
        //             this.getStateMachine().otherSlime = randomSlime;
        //             this.getStateMachine().changeState("slimeMerge");
        //         }
        //     }
        // }
    }
}
