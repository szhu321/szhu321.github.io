import { final } from "../final.js";
import { Player } from "../obj/Player.js";
import { Camera } from "../obj/Camera.js";
import { Hub } from "../obj/Hub.js";
import { Terrain } from "../obj/Terrain.js";
import { KeyBoard } from "../obj/KeyBoard.js";
export class SceneHolder extends Phaser.Scene{
    constructor() {
        super({
            key: final.SCENES.TEST
        });
        this.Player = null;
        this.mobArray = null;
        this.camera = null;
        this.userInterface = null;
        this.dialog = null;
        this.spawn = null;
        this.doorEvent = [];
        this.terrain = null;
    }
    init() {
        this.keyboard = new KeyBoard(this);
    }
    create() {
        this.terrain = new Terrain(this); 
        this.Player = new Player(this);
        this.camera = new Camera();
        this.Hub = new Hub(this, "Hub", "Backpack", "Shop");

        this.loadWorld("test");

        this.Player.updateScene(this);      
    }
    update(time, delta) {
        this.keyboard.update();
        this.physics.world.setBounds(0, 0, this.terrain.getMapWidth(), this.terrain.getMapHeight());
        if(this.Player != null)
            this.Player.update(delta);
    }
    terrainConfig(mapName) {
        this.terrain.setTerrainMap(mapName);
        this.terrain.setTileSets("TileSetName");
        this.terrain.setLayers();
        this.terrain.setEventLayers();
        //These need to be fixed
        this.spawn = this.terrain.getSpawnInfo();  
        this.doorEvent = this.terrain.getDoorInfo();
    }
    PlayerConfig() {
        if(this.spawn != null) {
            this.Player.respawn(this.spawn[0].x, this.spawn[0].y);  
        }
    }
    cameraConfig() {
        this.camera.setCamera(this);
        this.camera.setFollow(this.Player);
        this.camera.setBounds(this.terrain.getMapWidth(), this.terrain.getMapHeight());
    }
    loadWorld(mapName) {
        this.terrainConfig(mapName);
        this.PlayerConfig();
        this.cameraConfig();
        
        this.collidors();
    }
    destroyWorld() {
        this.terrain.initalize();
        this.camera.initalize();
        this.Player.initalize();
        this.mobArray = null;
        this.spawn = null;
        for(var i = 0; i < this.doorEvent.length; i++)
            this.doorEvent[i].destroy();
        this.doorEvent = [];
        this.physics.world.colliders.destroy();
    }
    collidors() {
        this.Player.collidablesTerrain(this, this.terrain.getMapColliables());
        for(var i = 0; i < this.doorEvent.length; i++)
            this.physics.add.overlap(this.Player, this.doorEvent[i], this.teleport, null, this);
    }
    teleport(Player, door) {
        let tempKeyboard = this.keyboard.getKeyboard();
        let data = {
            "Link": door.data.list.Link,
            "Lock": door.data.list.Lock,
            "Message": door.data.list.Message,
            "OuterDoorId": door.data.list.OuterDoorId
        };
        if (tempKeyboard.E.isDown) {
            if(!data.Lock) {
                for(var i = 0; i < this.doorEvent.length; i++) {
                    if(data.Link === this.doorEvent[i].id)
                        this.Player.respawn(this.doorEvent[i].x - 16, this.doorEvent[i].y - 16);
                    else if(data.Link.length > 1) {
                        this.OuterDoorId = data.OuterDoorId;
                        this.levelData = this.cache.json.get(data.Link);
                        this.destroyWorld();
                        this.loadWorld(this.levelData.mapName);
                    }  
                }
            } else
                console.log(data.Message);
        }
        tempKeyboard.E.isDown = false;
    }
}