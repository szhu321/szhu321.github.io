export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.spawnX = x;
        this.spawnY = y;
        this.damage = 100;
    }
    setVelocity(startX, startY, targetX, targetY, camera, bulletSpeed) {
        let camOffsetX = camera.midPoint.x - camera.displayWidth / 2;
        let camOffsetY = camera.midPoint.y - camera.displayHeight / 2;
        let dx = targetX + camOffsetX - startX;
        let dy = targetY + camOffsetY - startY;
        //console.log(camera);
        //console.log(`startX: ${startX}, startY: ${startY}, targetX: ${targetX}, targetY: ${targetY}, camOffsetX: ${camOffsetX}, camOffsetY: ${camOffsetY}`);
        let hyp = Math.sqrt(dx * dx + dy * dy);
        this.body.setVelocityX(dx / hyp * bulletSpeed);//unit vector's x times some speed
        this.body.setVelocityY(dy / hyp * bulletSpeed);//unit vector's y times some speed
    }
    setBossVelocity(startX, startY, targetX, targetY, bulletSpeed) {
        let dx = targetX - startX;
        let dy = targetY - startY;
        //console.log(camera);
        //console.log(`startX: ${startX}, startY: ${startY}, targetX: ${targetX}, targetY: ${targetY}, camOffsetX: ${camOffsetX}, camOffsetY: ${camOffsetY}`);
        let hyp = Math.sqrt(dx * dx + dy * dy);
        this.body.setVelocityX(dx / hyp * bulletSpeed);//unit vector's x times some speed
        this.body.setVelocityY(dy / hyp * bulletSpeed);//unit vector's y times some speed
    }
    Random360Spray(startX, startY, bulletSpeed) {
        let dx = (Math.random() * 1600) - startX;
        let dy = (Math.random() * 1800) - startY;
        let hyp = Math.sqrt(dx * dx + dy * dy);
        this.body.setVelocityX(dx / hyp * bulletSpeed);//unit vector's x times some speed
        this.body.setVelocityY(dy / hyp * bulletSpeed);//unit vector's y times some speed
    }
}