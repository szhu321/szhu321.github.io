export default class info{
    playerID = -1;
    time;
    velocityX;
    velocityY;
    shoot;
    constructor(time, x, y,velocityX, velocityY, shoot){
        this.time = time;
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.shoot = shoot;
    }
}