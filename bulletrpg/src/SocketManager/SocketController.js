import { player } from "../obj/player.js";

export default class SocketController{
    #socket;
    constructor(scene){
        this.dict = new Object();
        this.scene = scene;
        this.#socket = io();
        this.#socket.on("client", (info) =>{//receive
            this.execute(info);
        });
    }
    pass(info){
        this.#socket.emit("server", info);//send 
    }
    execute(info){
        //execute the server's instructions
        //console.log(info.playerID);
        if(!(info.playerID in this.dict)){
            this.dict[info.playerID] = this.scene.createNewPlayer();
        }
        let player = this.dict[info.playerID];
        player.body.velocity.x = info.velocityX;
        player.body.velocity.y = info.velocityY;
        player.x = info.x;
        player.y = info.y;
        if(info.shoot)
            player.shoot()
    }
}   
