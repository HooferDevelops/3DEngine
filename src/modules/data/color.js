class Color {
    constructor() {
        this.r = 0
        this.g = 0
        this.b = 0
        this.a = 1
    }

    set(r, g, b, a) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
        return this
    }

    add(color) {
        this.r += color.r
        this.g += color.g
        this.b += color.b
        this.a += color.a
        return this
    }

    subtract(color) {
        this.r -= color.r
        this.g -= color.g
        this.b -= color.b
        this.a -= color.a
        return this
    }

    multiply(color) {
        this.r *= color.r
        this.g *= color.g
        this.b *= color.b
        this.a *= color.a
        return this
    }

    divide(color) {
        this.r /= color.r
        this.g /= color.g
        this.b /= color.b
        this.a /= color.a
        return this
    }

    dot(color) {
        return this.r * color.r + this.g * color.g + this.b * color.b + this.a * color.a
    }

    static lerp(color1, color2, amount) {
        return new Color(
            color1.r + (color2.r - color1.r) * amount,
            color1.g + (color2.g - color1.g) * amount,
            color1.b + (color2.b - color1.b) * amount,
            color1.a + (color2.a - color1.a) * amount
        )
    }

    static fromHex(hex) {
        return new Color(
            parseInt(hex.substr(0, 2), 16) / 255,
            parseInt(hex.substr(2, 2), 16) / 255,
            parseInt(hex.substr(4, 2), 16) / 255,
            parseInt(hex.substr(6, 2), 16) / 255
        )
    }

    static fromHSV(h, s, v) {
        let r, g, b
        let i
        let f, p, q, t

        // Make sure our arguments stay in-range
        h = Math.max(0, Math.min(360, h))
        s = Math.max(0, Math.min(100, s))
        v = Math.max(0, Math.min(100, v))

        // We accept saturation and value arguments from 0 to 100 because that's
        // how Photoshop represents those values. Internally, however, the
        // saturation and value are calculated from a range of 0 to 1. We make
        // That conversion here.
        s /= 100
        v /= 100

        if (s == 0) {
            // Achromatic (grey)
            r = g = b = v
            return new Color(r, g, b)
        }

        h /= 60
        // sector 0 to 5
        i = Math.floor(h)
        // factorial part of h
        f = h - i
        // p = v * (1 - s)
        p = v * (1 - s)
        // q = v * (1 - s * f)
        q = v * (1 - s * f)
        // t = v * (1 - s * (1 - f))
        t = v * (1 - s * (1 - f))

        switch (i) {
            case 0:
                r = v
                g = t
                b = p
                break
            case 1:
                r = q
                g = v
                b = p
                break
            case 2:
                r = p
                g = v
                b = t
                break
            case 3:
                r = p
                g = q
                b = v
                break
            case 4:
                r = t
                g = p
                b = v
                break
            default: // case 5:
                r = v
                g = p
                b = q
                break
        }

        return new Color(r, g, b)
    }
}