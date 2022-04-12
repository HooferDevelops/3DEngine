let Scene = await lib.loadScript("/scripts/workspace/scene")
let Camera = await lib.loadScript("/scripts/workspace/camera")
let Instance = await lib.loadScript("/scripts/workspace/instance")
let Cube = await lib.loadScript("/scripts/workspace/parts/cube")
let Vector3 = await lib.loadScript("/scripts/workspace/vector3")

class App extends Instance {
    constructor() {
        super()

        this.threeScene = new THREE.Scene()

        // UI Renderer
        this.threeSceneUI = new THREE.Scene()
        this.threeSceneUICamera = new THREE.OrthographicCamera(-window.innerWidth/2, window.innerWidth/2, window.innerHeight/2, -window.innerHeight/2, 0, 30)

        // Main Renderer
        this.threeRenderer = new THREE.WebGLRenderer()
        this.threeRenderer.setSize(window.innerWidth, window.innerHeight)
        this.threeRenderer.autoClear = false;

        // Custom Renderer Listeners for Rendering
        this.listenerTypes["preRender"] = {}
        this.listenerTypes["postRender"] = {}
        
        let scene = new Scene().setName("scene").setParent(this)
        
        scene.addListener("descendantAdded", "renderAddListener", (child) => {
            if (child.isRenderable) {
                let renderable = child.getRenderable()
                if (renderable) {
                    if (Array.isArray(renderable)) {
                        for (let i = 0; i < renderable.length; i++) {
                            this.threeScene.add(renderable[i])
                        }
                    } else {
                        this.threeScene.add(renderable)
                    }
                }
            }
        })

        scene.addListener("descendantRemoved", "renderRemoveListener", (child) => {
            if (child.isRenderable) {
                let renderable = child.getRenderable()
                if (renderable) {
                    if (Array.isArray(renderable)) {
                        for (let i = 0; i < renderable.length; i++) {
                            this.threeScene.remove(renderable[i])
                        }
                    } else {
                        this.threeScene.remove(renderable)
                    }
                }
            }
        })

        this.timeThen = 0
        this.render(0)
    }

    async render(timeNow) {
        timeNow *= 0.001
        let delta = timeNow - this.timeThen
        this.timeThen = timeNow

        for (let listener in this.listenerTypes["preRender"]) {
            this.listenerTypes["preRender"][listener](delta)
        }

        requestAnimationFrame((dt) => this.render(dt))

        let camera = this.findChild("camera", true)

        this.threeRenderer.clear();
        this.threeRenderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

        // Render scene
        if (camera) {
            await this.threeRenderer.render(this.threeScene, camera.threeCamera)
        }

        this.threeRenderer.clearDepth();
        this.threeRenderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

        // Draw UI Components
        await this.threeRenderer.render(this.threeSceneUI, this.threeSceneUICamera)

        for (let listener in this.listenerTypes["postRender"]) {
            this.listenerTypes["postRender"][listener](delta)
        }
    }


}

this.exports = App;