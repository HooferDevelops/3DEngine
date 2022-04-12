let Vector3 = await lib.loadScript("/scripts/workspace/vector3")

class Raycast {
    constructor() {
        this.origin = null
        this.direction = null

        this.distance = Infinity
        this.targets = []
    }

    getClosestHit() {
        if (!this.app) {
            throw new Error("Raycast: app is not set")
        }

        let threeRay = new THREE.Raycaster()
        threeRay.set(new THREE.Vector3(this.origin.x, this.origin.y, this.origin.z), new THREE.Vector3(this.direction.x, this.direction.y, this.direction.z))
        let hits = threeRay.intersectObjects(this.app.threeScene.children)
    }

    fromCamera(camera) {
        if (!this.app) {
            throw new Error("Raycast: app is not set")
        }

        let threeRay = new THREE.Raycaster()
        threeRay.setFromCamera(new THREE.Vector2(this.origin.x, this.origin.y), camera.threeCamera)

        let hits = threeRay.intersectObjects(this.app.threeScene.children)
        let results = []

        for (let target of this.targets) {    
            if (target.isRenderable) {
                let obj = target.getRenderable()

                let hit = hits.find((hit) => {
                    return hit.object.uuid === obj.uuid
                })

                if (hit) {
                    results.push({
                        object: target,
                        distance: hit.distance,
                        normal: new Vector3(hit.face.normal.x, hit.face.normal.y, hit.face.normal.z),
                        point: new Vector3(hit.point.x, hit.point.y, hit.point.z)
                    })
                }
            }

            for (let child of target.getDescendants()) {
                if (child.isRenderable) {
                    let obj = child.getRenderable()

                    let hit = hits.find((hit) => {
                        return hit.object.uuid === obj.uuid
                    })

                    if (hit) {
                        results.push({
                            object: child,
                            distance: hit.distance,
                            normal: new Vector3(hit.face.normal.x, hit.face.normal.y, hit.face.normal.z),
                            point: new Vector3(hit.point.x, hit.point.y, hit.point.z)
                        })
                    }
                }
            }
        }

        results.sort((a, b) => {
            return a.distance > b.distance
        })

        return results
    }

    setApp(app) {
        this.app = app
        return this
    }

    setTargets(targets) {
        this.targets = Object.values(targets)
        return this
    }

    setOrigin(origin) {
        this.origin = origin
        return this
    }

    setDirection(direction) {
        this.direction = direction
        return this
    }

    setDistance(distance) {
        this.distance = distance
        return this
    }
}

this.exports = Raycast