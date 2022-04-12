let Renderable = await lib.loadScript("/scripts/workspace/renderable")

class Skylight extends Renderable {
    constructor() {
        super()

        this.threeLight = new THREE.HemisphereLight(0xffffff, 0x030303, 1)
        this.threeLightHelper = new THREE.HemisphereLightHelper(this.threeLight, 10) // debug
    }

    getRenderable() {
        return this.threeLight
    }
}

this.exports = Skylight;