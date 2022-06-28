import Gun from "./Gun.js";
export default class GunManager{
    #currentGun;//holds current gun object
    #currentGunName;//string 
    #gunDict;//dictionary of (key: string, value: gun)

    constructor(scene, data){
        this.#currentGunName = "none";
        this.#currentGun = null;
        this.#gunDict = new Object();
        this.create(scene, data);
    }

    create(data) {/* abstract method */ }

    changeGun(gunName){
        if(this.#currentGunName==gunName){//already on gun
            //console.log("already on this gun");
            return;
        }
        if(gunName in this.#gunDict){//gun exist
            if(this.#currentGun!=null)
                this.#currentGun.onExit();
            this.#currentGun = this.#gunDict[gunName];
            this.#currentGunName = gunName;
            this.#currentGun.onEnter();
        }
        else
            console.log("Can't switch to a gun that does not exist!!!")
    }
    //this nextGun is just for testing since i made a dictionary and switching weapons is better for a queue or something
    //however in the future it wont matter as i think we will use like a minecraft/muck hot bar where you use what 
    //your selected gun/item is in the hotbar.
    //but yea ignore the cheese code for now lol
    nextGun(){
        var check = true;
        for(let k in this.#gunDict){
            if(!check){
                check = true;
                this.changeGun(k);
                break;
            }
            if(this.#currentGunName == k)
                check = false;
        }
        if(!check){//goto first gun in dict if we havent switch gun yet
            for(let k in this.#gunDict){
                this.changeGun(k);
                break;
            }
        }
    }
    clearGunDict(){
        this.#gunDict = new Object();
    }
    addGun(gunObject){
        if(!(gunObject.getGunName() in this.#gunDict)){//if gun is not in dictionary 
            this.#gunDict[gunObject.getGunName()] = gunObject;
        }
    }
    deleteGun(){
        if(gunObject.getGunName() in this.#gunDict){//if gun is in dictionary
            delete this.#gunDict[gunObject.getGunName()];
        }
    }
    getCurrentGun(){
        return this.#currentGun;
    }
    getGunDict(){
        return this.#gunDict;
    }
    update(deltaT){
        if(this.#currentGun!=null)
            this.#currentGun.update(deltaT);
    }
    
}