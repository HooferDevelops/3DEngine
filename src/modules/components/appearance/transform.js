import {Component, Parameter} from "../component"
import {Vector3} from "../../data/vector3"

class Transform extends Component {
    constructor() {
        super()
        
        this.name = "Transform"
        this.description = "Used for position, rotation, and scale within the scene."

        this.addParameter(
            new Parameter()
                .setId("position")
                .setName("Position")
                .setType(Vector3)
                .setDescription("The position of the object in the scene.")
                .setDefaultValue(new Vector3())
                .setValidationFunction((v) => {
                    if (v instanceof Vector3) {
                        return v
                    } else {
                        return new Vector3()
                    }
                })
        )

        this.addParameter(
            new Parameter()
                .setId("rotation")
                .setName("Rotation")
                .setType(Vector3)
                .setDescription("The rotation of the object in the scene.")
                .setDefaultValue(new Vector3())
                .setValidationFunction((v) => {
                    if (v instanceof Vector3) {
                        return v
                    } else {
                        return new Vector3()
                    }
                })
        )

        this.addParameter(
            new Parameter()
                .setId("scale")
                .setName("Scale")
                .setType(Vector3)
                .setDescription("The scale of the object in the scene.")
                .setDefaultValue(new Vector3(1, 1, 1))
                .setValidationFunction((v) => {
                    if (v instanceof Vector3) {
                        return v
                    } else {
                        return new Vector3(1, 1, 1)
                    }
                }
        ))
    }
}

export {
    Transform
}