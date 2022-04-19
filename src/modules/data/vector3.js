class Vector3 {
    constructor() {
        this.x = 0
        this.y = 0
        this.z = 0
    }

    set(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
        return this
    }

    add(vector) {
        this.x += vector.x
        this.y += vector.y
        this.z += vector.z
        return this
    }

    subtract(vector) {
        this.x -= vector.x
        this.y -= vector.y
        this.z -= vector.z
        return this
    }

    multiply(vector) {
        this.x *= vector.x
        this.y *= vector.y
        this.z *= vector.z
        return this
    }

    divide(vector) {
        this.x /= vector.x
        this.y /= vector.y
        this.z /= vector.z
        return this
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z
    }

    cross(vector) {
        return new Vector3(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x
        )
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }

    normalize() {
        let length = this.length()
        if (length > 0) {
            this.x /= length
            this.y /= length
            this.z /= length
        }
        return this
    }

    clone() {
        return new Vector3(this.x, this.y, this.z)
    }

    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`
    }

    static add(vector1, vector2) {
        return new Vector3(
            vector1.x + vector2.x,
            vector1.y + vector2.y,
            vector1.z + vector2.z
        )
    }

    static subtract(vector1, vector2) {
        return new Vector3(
            vector1.x - vector2.x,
            vector1.y - vector2.y,
            vector1.z - vector2.z
        )
    }

    static multiply(vector1, vector2) {
        return new Vector3(
            vector1.x * vector2.x,
            vector1.y * vector2.y,
            vector1.z * vector2.z
        )
    }

    static divide(vector1, vector2) {
        return new Vector3(
            vector1.x / vector2.x,
            vector1.y / vector2.y,
            vector1.z / vector2.z
        )
    }

    static dot(vector1, vector2) {
        return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z
    }

    static cross(vector1, vector2) {
        return new Vector3(
            vector1.y * vector2.z - vector1.z * vector2.y,
            vector1.z * vector2.x - vector1.x * vector2.z,
            vector1.x * vector2.y - vector1.y * vector2.x
        )
    }

    static length(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z)
    }

    static normalize(vector) {
        let length = Vector3.length(vector)
        if (length > 0) {
            vector.x /= length
            vector.y /= length
            vector.z /= length
        }
        return vector
    }

    static clone(vector) {
        return new Vector3(vector.x, vector.y, vector.z)
    }

    static toString(vector) {
        return `(${vector.x}, ${vector.y}, ${vector.z})`
    }

    static fromArray(array) {
        return new Vector3(array[0], array[1], array[2])
    }

    static toArray(vector) {
        return [vector.x, vector.y, vector.z]
    }

    static equals(vector1, vector2) {
        return vector1.x === vector2.x && vector1.y === vector2.y && vector1.z === vector2.z
    }

    static lerp(vector1, vector2, t) {
        return new Vector3(
            vector1.x + (vector2.x - vector1.x) * t,
            vector1.y + (vector2.y - vector1.y) * t,
            vector1.z + (vector2.z - vector1.z) * t
        )
    }

    static distance(vector1, vector2) {
        return Math.sqrt(
            (vector1.x - vector2.x) * (vector1.x - vector2.x) +
            (vector1.y - vector2.y) * (vector1.y - vector2.y) +
            (vector1.z - vector2.z) * (vector1.z - vector2.z)
        )
    }

    static distanceSq(vector1, vector2) {
        return (vector1.x - vector2.x) * (vector1.x - vector2.x) +
            (vector1.y - vector2.y) * (vector1.y - vector2.y) +
            (vector1.z - vector2.z) * (vector1.z - vector2.z)
    }

    static angle(vector1, vector2) {
        return Math.acos(Vector3.dot(vector1, vector2) / (vector1.length() * vector2.length()))
    }

    static zero() {
        return new Vector3(0, 0, 0)
    }

    static one() {
        return new Vector3(1, 1, 1)
    }

    static up() {
        return new Vector3(0, 1, 0)
    }

    static down() {
        return new Vector3(0, -1, 0)
    }

    static left() {
        return new Vector3(-1, 0, 0)
    }

    static right() {
        return new Vector3(1, 0, 0)
    }

    static forward() {
        return new Vector3(0, 0, 1)
    }

    static back() {
        return new Vector3(0, 0, -1)
    }
}