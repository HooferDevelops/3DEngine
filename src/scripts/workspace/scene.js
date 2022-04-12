let Instance = await lib.loadScript("/scripts/workspace/instance")

class Scene extends Instance {
    constructor() {
        super()
    }
}

this.exports = Scene;