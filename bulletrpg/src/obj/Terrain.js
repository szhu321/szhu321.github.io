export class Terrain {
    #map
    #tileset
    #terrainLayer
    #scene
    #spawnObject
    #doorObject
    #spawnSwitch
    /**
     * Creates an empty terrain. A starting point where the methods will build on it.
     * @param {Object} scene - The scene where terrain is created.
     */
    constructor(scene) {
        scene.add.existing(this);
        this.#scene = scene;
        this.initalize();
        this.#spawnSwitch = true;
    }
    initalize() {
        if(this.#map != null)
            this.#map.destroy();
        this.#map = null;
        this.#tileset = [];
        this.#terrainLayer = [];
        this.#spawnObject = null;
        this.#doorObject = null;
    }
    getMapWidth() {
        if(this.#map === null)  
            return 0;
        return this.#map.widthInPixels;
    }
    getMapHeight() {
        if(this.#map === null)  
            return 0;
        return this.#map.heightInPixels;
    }
    getDoorInfo() {
        return this.#doorObject;
    }
    getSpawnInfo() {
        return this.#spawnObject;
    }
    getMapColliables() {
        return this.#terrainLayer;
    }
    getMap() {
        return this.#map;
    }
    setTerrainMap(mapName) {
        let ObjectsFromJson = this.#scene.cache.json.get("MapName").maps;
        //Check if mapName isn't listed
        for(let i = 0; i < ObjectsFromJson.length; i++)
            if(mapName === ObjectsFromJson[i].mapName)
                this.#map = this.#scene.add.tilemap(mapName);
        if(this.#map === null)
            console.log("Map not found!");
    }

    setTileSets(tilesetName) {
        let ObjectsFromJson = this.#scene.cache.json.get(tilesetName).object;
        if(this.#map != null) {
            for(let i = 0; i < ObjectsFromJson.length; i++)
                for(let j = 0; j < this.#map.tilesets.length; j++)
                    if(ObjectsFromJson[i].filename === this.#map.tilesets[j].name)
                        this.#tileset.push(this.#map.addTilesetImage(ObjectsFromJson[i].filename, ObjectsFromJson[i].key));
        }
        else
            console.log("Map not found!");
    }

    setLayers() {
        if(this.#map != null)
            for(let i = 0; i < this.#map.layers.length; i++) {
                this.#terrainLayer.push(this.#map.createLayer(this.#map.layers[i].name, this.#tileset, 0, 0));
                if(this.#terrainLayer[i].layer.name === "Above")
                    this.#terrainLayer[i].setDepth(2);
            }
        else
            console.log("Map not found!");
    }

    setEventLayers() {
        if(this.#map != null) {
            //Set Spawn
            for(let i = 0; i < this.#map.objects[0].objects.length; i++) {
                if(this.#map.objects[0].objects[i].name === "Spawn" && this.#spawnSwitch){
                    this.#spawnObject = this.#map.createFromObjects("Objects", {name: "Spawn"}, '');
                    this.#spawnObject[0].setVisible(false);
                    this.#spawnSwitch = false;
                }
            }
            if(this.#spawnObject === null) {
                for(let i = 0; i < this.#map.objects[0].objects.length; i++) {
                    let x = this.#map.objects[0].objects[i].x;
                    let y = this.#map.objects[0].objects[i].y;
                    if(this.#scene.OuterDoorId == this.#map.objects[0].objects[i].id) { 
                        this.#spawnObject = [{"x": x, "y": y}];
                    }
                }
            }
            //Set Transition
            this.#doorObject = this.#map.createFromObjects("Objects", {name: "Door"}, '');
            for(let i = 0; i < this.#doorObject.length; i++){
                if(this.#map.objects[0].objects[0].name === "Spawn")
                    this.#doorObject[i].id = this.#map.objects[0].objects[i+1].id;
                else
                    this.#doorObject[i].id = this.#map.objects[0].objects[i].id;
            }
            this.#doorObject.map((sprite) => {
                this.#scene.physics.add.existing(sprite);
                sprite.setVisible(false);
            });
        } else
            console.log("Map not found!");
    }
}