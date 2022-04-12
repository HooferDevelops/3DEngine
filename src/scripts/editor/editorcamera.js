let Camera = await lib.loadScript("/scripts/workspace/camera")
let Vector3 = await lib.loadScript("/scripts/workspace/vector3")
let Euler = await lib.loadScript("/scripts/workspace/euler")
let Input = await lib.loadScript("/scripts/workspace/input/input")

class EditorCamera extends Camera {
    constructor() {
        super()

        this.inputListener = new Input()
        this.cameraSpeed = 1
        this.currentCameraRotation = new Euler(0, 0, 0)
        
        this.init()
    }

    scrollForward(amount, delta) {
        // TODO: deltatime
        this.setPosition(
            this.getPosition().add(
                this.lookVector().multiply(
                    new Vector3(
                        -amount * 0.001 * this.cameraSpeed * delta,
                        -amount * 0.001 * this.cameraSpeed * delta, 
                        -amount * 0.001 * this.cameraSpeed * delta
                    )
                )
            )
        )
    }

    init() {
        let mouseRightDown = false

        this.inputListener.addListener("mouseDown", "mouseDownListener", (mouse) => {
            if (!this.editorApp)
                return

            if (mouse.button == "right") {
                let canvas = this.editorApp.threeRenderer.domElement
                canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
                canvas.requestPointerLock()
                mouseRightDown = true
            }
        })
    
        this.inputListener.addListener("mouseUp", "mouseUpListener", (mouse) => {
            if (!this.editorApp)
                return

            if (mouse.button == "right") {
                document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
                document.exitPointerLock()
                mouseRightDown = false
            }
        })
    
        this.inputListener.addListener("mouseMove", "mouseMoveListener", (mouse) => {
            if (mouseRightDown) {
                this.currentCameraRotation = this.currentCameraRotation.add(
                    new Euler(-mouse.moveY * 0.01, -mouse.moveX * 0.01, 0)
                )
            }
        })
    
        this.inputListener.addListener("mouseWheel", "wheelListener", (mouse) => {
            let self = this
            function interpolate(value, amt, rate) {
                self.scrollForward(value, 1)

                if (rate > 0) {
                    setTimeout(() => {
                        interpolate(value, amt, rate-1)
                    }, amt)
                }
            }

            interpolate(mouse.y, 0.01, 15)
        })
    }

    update(delta) {
        if (!this.editorApp) {
            this.editorApp = this?.parent?.parent
        }

        this.setRotation(
            this.getRotation().add(
                this.currentCameraRotation.multiply(
                    new Euler(delta, delta, delta)
                ).multiply(
                    new Euler(7, 7, 7)
                )
            )
        )

        this.currentCameraRotation = new Euler(0, 0, 0)

        if (this.inputListener.isKeyDown("shift")) {
            this.cameraSpeed = .1
        } else {
            this.cameraSpeed = 1
        }

        if (this.inputListener.isKeyDown("w")) {
            this.setPosition(
                this.getPosition().add(
                    this.lookVector().multiply(
                        new Vector3(delta, delta, delta)
                    ).multiply(
                        new Vector3(3, 3, 3)
                    ).multiply(
                        new Vector3(this.cameraSpeed, this.cameraSpeed, this.cameraSpeed)
                    )
                )
            )
        }
        if (this.inputListener.isKeyDown("s")) {
            this.setPosition(
                this.getPosition().subtract(
                    this.lookVector().multiply(
                        new Vector3(delta, delta, delta)
                    ).multiply(
                        new Vector3(3, 3, 3)
                    ).multiply(
                        new Vector3(this.cameraSpeed, this.cameraSpeed, this.cameraSpeed)
                    )
                )
            )
        }

        if (this.inputListener.isKeyDown("a")) {
            this.setPosition(
                this.getPosition().subtract(
                    this.rightVector().multiply(
                        new Vector3(delta, delta, delta)
                    ).multiply(
                        new Vector3(3, 3, 3)
                    ).multiply(
                        new Vector3(this.cameraSpeed, this.cameraSpeed, this.cameraSpeed)
                    )
                )
            )
        }

        if (this.inputListener.isKeyDown("d")) {
            this.setPosition(
                this.getPosition().add(
                    this.rightVector().multiply(
                        new Vector3(delta, delta, delta)
                    ).multiply(
                        new Vector3(3, 3, 3)
                    ).multiply(
                        new Vector3(this.cameraSpeed, this.cameraSpeed, this.cameraSpeed)
                    )
                )
            )
        }

        if (this.inputListener.isKeyDown("q")) {
            this.setPosition(
                this.getPosition().subtract(
                    this.upVector().multiply(
                        new Vector3(delta, delta, delta)
                    ).multiply(
                        new Vector3(3, 3, 3)
                    ).multiply(
                        new Vector3(this.cameraSpeed, this.cameraSpeed, this.cameraSpeed)
                    )
                )
            )
        }

        if (this.inputListener.isKeyDown("e")) {
            this.setPosition(
                this.getPosition().add(
                    this.upVector().multiply(
                        new Vector3(delta, delta, delta)
                    ).multiply(
                        new Vector3(3, 3, 3)
                    ).multiply(
                        new Vector3(this.cameraSpeed, this.cameraSpeed, this.cameraSpeed)
                    )
                )
            )
        }
    }
}

this.exports = EditorCamera