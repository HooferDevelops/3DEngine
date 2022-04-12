let Instance = await lib.loadScript("/scripts/workspace/instance")

class Renderable extends Instance {
    constructor() {
        super()

        this.isRenderable = true
    }
}

this.exports = Renderable;