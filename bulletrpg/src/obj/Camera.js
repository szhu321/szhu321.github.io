export class Camera {
    #userCamera
    constructor() {
        this.initalize();
    }
    initalize() {
        this.#userCamera = null;
    }
    setCamera(scene) {
        this.#userCamera = scene.cameras.main;
    }
    setFollow(sprite) {
        this.#userCamera.startFollow(sprite);
    }
    setBounds(width, height) {
        this.#userCamera.setBounds(0, 0, width, height);
    }
}