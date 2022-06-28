export default class mobArray{
    #ultimateMobArray
    constructor(){
        this.#ultimateMobArray = [];
    }
    addMobArray(array){
        this.#ultimateMobArray.push(array);
    }
    addPhysicsGunMob(scene, gunDict){
        for(let k in gunDict){//go through every gun
            this.#ultimateMobArray.forEach(element => {//go through every mob array
                scene.physics.add.overlap(element, gunDict[k].getBulletArray(), scene.handleBulletMobCollision, null, scene);
            });
        }
    }
    addPhysicsHitBox(){

    }
    
}