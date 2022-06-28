import GunManager from "../GunMachine/GunManager.js";
import Pistol from "../Guns/pistol.js";
import Sniper from "../Guns/Sniper.js";
import testGun from "../Guns/tylergun.js";
export default class GunController extends GunManager{
    create(scene, data){
        this.Player = data.Player;
        this.scene = scene;
        //console.log("entering create!!!")
        let pistol = new Pistol("Pistol", this, scene);
        this.addGun(pistol);
        // scene.physics.add.overlap(scene.mobArray, pistol.getBulletArray(), scene.handleBulletMobCollision, null, scene);
        // scene.physics.add.overlap(scene.mobArray1, pistol.getBulletArray(), scene.handleBulletMobCollision, null, scene);
        // scene.physics.add.overlap(scene.mobArray2, pistol.getBulletArray(), scene.handleBulletMobCollision, null, scene);

        let sniper = new Sniper("Sniper", this, scene);
        this.addGun(sniper);
        // scene.physics.add.overlap(scene.mobArray, sniper.getBulletArray(), scene.handleBulletMobCollision, null, scene);
        // scene.physics.add.overlap(scene.mobArray1, sniper.getBulletArray(), scene.handleBulletMobCollision, null, scene);
        // scene.physics.add.overlap(scene.mobArray2, sniper.getBulletArray(), scene.handleBulletMobCollision, null, scene);
        
        let testgun = new testGun("testGun", this, scene);
        this.addGun(testgun);
        

        //scene.physics.add.overlap(scene.mobArray, testgun.getBulletArray(), scene.handleBulletMobCollision, null, scene);
        // scene.physics.add.overlap(scene.mobArray1, testgun.getBulletArray(), scene.handleBulletMobCollision, null, scene);
        // scene.physics.add.overlap(scene.mobArray2, testgun.getBulletArray(), scene.handleBulletMobCollision, null, scene);
        //scene.ultimateMobArray.addPhysicsGunMob(scene, this.getGunDict());
        this.changeGun("testGun");
    }
}