class Vector3 {
    constructor(x, y, z) {
        this.x = x ? x : 0
        this.y = y ? y : 0
        this.z = z ? z : 0
    }

    add(vec) {        
        return new Vector3(
            this.x + vec.x,
            this.y + vec.y,
            this.z + vec.z
        )
    }

    subtract(vec) {
        return new Vector3(
            this.x - vec.x,
            this.y - vec.y,
            this.z - vec.z
        )
    }

    multiply(vec) {
        return new Vector3(
            this.x * vec.x,
            this.y * vec.y,
            this.z * vec.z
        )
    }

    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    divide(vec) {
        return new Vector3(
            this.x / vec.x,
            this.y / vec.y,
            this.z / vec.z
        )
    }

    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }

    clamp(min, max) {
        return new Vector3(
            Math.max(min.x, Math.min(max.x, this.x)),
            Math.max(min.y, Math.min(max.y, this.y)),
            Math.max(min.z, Math.min(max.z, this.z))
        )
    }

    projectToCamera(camera) {
        let tempVec = new THREE.Vector3(this.x, this.y, this.z)
        tempVec.unproject(camera.threeCamera)

        return new Vector3(tempVec.x, tempVec.y, tempVec.z)
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    normalize() {
        return this.divideScalar(this.length() || 1);
    }
}

this.exports = Vector3