class Euler {
    constructor(x, y, z) {
        this.x = x ? x : 0
        this.y = y ? y : 0
        this.z = z ? z : 0
    }

    fromVector3(vec) {
        this.x = vec.x
        this.y = vec.y
        this.z = vec.z

        return this
    }

    multiply(euler) {
        return new Euler(
            this.x * euler.x,
            this.y * euler.y,
            this.z * euler.z
        )
    }

    add(euler) {
        return new Euler(
            this.x + euler.x,
            this.y + euler.y,
            this.z + euler.z
        )
    }
}

this.exports = Euler