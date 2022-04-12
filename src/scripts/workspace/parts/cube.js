let Renderable = await lib.loadScript("/scripts/workspace/renderable")
let Vector3 = await lib.loadScript("/scripts/workspace/vector3")

class Cube extends Renderable {
    constructor() {
        super()

        this.threeGeometry = new THREE.BoxGeometry();
        this.threeMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        this.threeMesh = new THREE.Mesh( this.threeGeometry, this.threeMaterial );
        this.threeMesh.receiveShadow = true;
		this.threeMesh.castShadow = true;

        this.position = new Vector3()
        this.size = new Vector3(1, 1, 1)
    }

    getRenderable() {
        return this.threeMesh
    }

    setSize(size) {
        this.size = size.clamp(new Vector3(0.01, 0.01, 0.01), new Vector3(2048, 2048, 2048))
        this.threeMesh.scale.x = this.size.x
        this.threeMesh.scale.y = this.size.y
        this.threeMesh.scale.z = this.size.z
        
        return this
    }

    getSize() {
        return this.size
    }

    setPosition(vector) {
        this.threeMesh.position.x = vector.x
        this.threeMesh.position.y = vector.y
        this.threeMesh.position.z = vector.z
        this.position = vector
        
        return this
    }

    getPosition() {
        return this.position
    }
}

this.exports = Cube;