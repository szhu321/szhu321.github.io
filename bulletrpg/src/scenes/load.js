import { final } from "../final.js";
export class load extends Phaser.Scene {
    constructor() {
        super({
            key: final.SCENES.LOAD
        })
        this.loaded = 0;
    }
    init() {

    }
    preload() {
        this.game.canvas.style = "margin: auto; display: block;";
        this.load.path = "../src/assets/";
        this.load.image("controlmenu", "controlmenu.png");
        this.load.image("backbutton", "back.png");
        this.load.image("okaybutton", "okay.png");
        this.load.atlas(
            "dude",
            "dude.png",
            "dude.json"
        );
        //UI
        this.load.path = "../src/assets/userinterface/";
        this.load.json("UIName", "map_userinterface.json");
        this.load.image("BuyButton", "shopUI_buyButton.png");
        this.load.image("HubIcon", "HubIcon.png");
        this.load.image("Backpack", "Backpack.png");
        this.load.image("BackpackIcon", "BackpackIcon.png");
        this.load.image("ShopIcon", "ShopIcon.png");
        this.load.image("Shop", "Shop.png");
        this.load.image("Hub", "Hub.png");
        //Items
        this.load.path = "../src/assets/items/";
        this.load.json("ItemProperty", "property_items.json");
        this.load.atlas(
            "items",
            "items2.png",
            "map_items.json"
        );
        //Main Menu
        this.load.path = "../src/assets/mainmenu/";
        this.load.json("MainMenuProperty", "property_MainMenuComponent.json");
        this.load.atlas(
            "mainmenu",
            "MainMenuComponents.png",
            "map_MainMenuComponents.json"
        );
        //Map
        this.load.path = "../src/assets/maps/";
        this.load.json("MapName", "AllMapName.json");
        this.load.json("IslandHideOut", "data_IslandHideOut.json");
        this.load.json("HideOut", "data_HideOut.json");
        this.load.tilemapTiledJSON("lab", "lab.json");
        this.load.tilemapTiledJSON("test", "test.json");
        //Monsters
        this.load.path = "../src/assets/monsters/";
        this.load.atlas(
            "slime",
            "slime.png",
            "map_slime.json"
        );
        this.load.atlas(
            "wolf",
            "wolve.png",
            "map_wolve.json"
        );
        this.load.atlas(
            "goblin",
            "goblin.png",
            "goblin.json"
        );
        //Projectiles
        this.load.path = "../src/assets/projectiles/";
        this.load.atlas(
            "projectiles",
            "projectiles.png",
            "map_projectiles.json"
        );
        //Tile Set
        this.load.path = "../src/assets/tilesets/";
        this.load.json("TileSetName", "map_tilesets.json");
        this.load.image("WaterForming", "A1_AnimatedGround.png");
        this.load.image("NatureGround", "A2_Ground.png");
        this.load.image("BuildingWall", "A4_Walls_2.png");
        this.load.image("NatureWall", "A4_Walls.png");
        this.load.image("Floor", "A5_Tiles.png");
        this.load.image("House1", "B_HouseExteriorTiles_1_B.png");
        this.load.image("House2", "B_HouseExteriorTiles_1.png");
        this.load.image("House3", "B_HouseExteriorTiles_2_B.png");
        this.load.image("House4", "B_HouseExteriorTiles_2.png");
        this.load.image("Outdoor", "C_OutSide_Nature.png");
        this.load.image("Indoor", "D_Inside_House.png");
        this.load.image("Random", "D_OutDoor.png");

        this.load.path = "../src/assets/sounds/"
        this.load.audio("playerTakeDamageSound", "playerTakeDamage.mp3");

        var loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })
        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            // console.log(percent);
            this.loaded = percent;
        })
    }
    create() {
        if (this.loaded === 1)
            this.scene.start(final.SCENES.MENU);
    }
}