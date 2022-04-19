import {Component, Parameter} from "../component"

class Transform extends Component {
    constructor() {
        super()
        this.displayInformation = {
            name: "Component", // Display name for the component
            description: "Base class for all components.", // Shown when hovering over the component name
            parameters: [
                new Parameter()
                    .setId("testParam")
                    .setName("Test Parameter")
                    .setType(String)
                    .setDescription("A test parameter for default components.")
                    .setDefaultValue("Component")
                    .setValidationFunction((value) => {
                        value += value.length == 0 ? "!" : ""
                        return value
                    })
            ]
        }
    }
}

export {
    Transform
}