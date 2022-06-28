import { Player } from "../obj/Player.js";

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
        //console.log(info.PlayerID);
        if(!(info.PlayerID in this.dict)){
            this.dict[info.PlayerID] = this.scene.createNewPlayer();
        }
        let Player = this.dict[info.PlayerID];
        Player.body.velocity.x = info.velocityX;
        Player.body.velocity.y = info.velocityY;
        Player.x = info.x;
        Player.y = info.y;
        if(info.shoot)
            Player.shoot()
    }
}   
