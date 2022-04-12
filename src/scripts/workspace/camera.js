let Instance = await lib.loadScript("/scripts/workspace/instance")
let Vector3 = await lib.loadScript("/scripts/workspace/vector3")
let Euler = await lib.loadScript("/scripts/workspace/euler")

class Camera extends Instance {
    constructor() {
        super()

        this.threeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.position = new Vector3()
        this.rotation = new Euler()
    }

    setPosition(vector) {
        this.threeCamera.position.x = vector.x
        this.threeCamera.position.y = vector.y
        this.threeCamera.position.z = vector.z

        this.position = vector
    }

    getPosition() {
        return this.position
    }

    setRotation(euler) {
        this.threeCamera.rotation.set(euler.x, euler.y, euler.z, "ZYX")

        this.rotation = euler
    }

    getRotation() {
        return this.rotation
    }

    lookVector() {
        var vector = new THREE.Vector3(0, 0, -1);
        vector.applyEuler(this.threeCamera.rotation, this.threeCamera.rotation.order);

        return new Vector3(vector.x, vector.y, vector.z);
    }

    rightVector() {
        var vector = new THREE.Vector3(1, 0, 0);
        vector.applyEuler(this.threeCamera.rotation, this.threeCamera.rotation.order);

        return new Vector3(vector.x, vector.y, vector.z);
    }

    upVector() {
        var vector = new THREE.Vector3(0, 1, 0);
        vector.applyEuler(this.threeCamera.rotation, this.threeCamera.rotation.order);

        return new Vector3(vector.x, vector.y, vector.z);
    }
}

this.exports = Camera;