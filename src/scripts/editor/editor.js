async function main() {
    let App = await lib.loadScript("/scripts/workspace/app")
    let Camera = await lib.loadScript("/scripts/workspace/camera")
    let EditorCamera = await lib.loadScript("/scripts/editor/editorcamera")
    let Cube = await lib.loadScript("/scripts/workspace/parts/cube")
    let Vector3 = await lib.loadScript("/scripts/workspace/vector3")
    let Euler = await lib.loadScript("/scripts/workspace/euler")
    let Input = await lib.loadScript("/scripts/workspace/input/input")
    let Skylight = await lib.loadScript("/scripts/workspace/lighting/skylight")
    let Raycast = await lib.loadScript("/scripts/workspace/raycast")

    let editorApp = new App()
    let inputListener = new Input()

    let camera = new EditorCamera().setName("camera").setParent(editorApp.findChild("scene"))
    let cube = new Cube().setName("coob").setParent(editorApp.findChild("scene")).setPosition(new Vector3(1,0,-5)).setSize(new Vector3(5, 1, 5))
    let cube1 = new Cube().setName("coo1b").setParent(editorApp.findChild("scene")).setPosition(new Vector3(1,15/2 + .5,-5)).setSize(new Vector3(1,15,1))
    let light = new Skylight().setName("sky").setParent(editorApp.findChild("scene"))


    inputListener.addListener("mouseMove", "raycastTest", (e) => {
        let pointToVector = new Vector3((e.x / window.innerWidth) * 2 - 1, - (e.y / window.innerHeight) * 2 + 1, 0.01)//.projectToCamera(camera)
        let ray = new Raycast().setApp(editorApp).setOrigin(pointToVector).setDistance(100).setTargets(editorApp.findChild("scene").children)
        let hit = ray.fromCamera(camera)

        console.log(hit)
        
    })

    editorApp.addListener("preRender", "updateCheck", (delta) => {
        camera.update(delta)

    })

    document.body.appendChild(editorApp.threeRenderer.domElement)
}

// Loader for main, have to wait for lib to load

let loader = setInterval(() => {
    if (typeof lib !== "undefined") {
        clearInterval(loader)
        main()
    }
}, 10)