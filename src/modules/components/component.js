class Parameter {
    constructor() {
        this.id = "no_id";
        this.name = id
        this.type = Number
        this.description = "No description provided"
        this.defaultValue = 0
        this.validationFunction = ((v) => v)
    }

    setId(id) {
        this.id = id
        return this
    }

    setName(name) {
        this.name = name
        return this
    }

    setType(type) {
        this.type = type
        return this
    }

    setDescription(description) {
        this.description = description
        return this
    }

    setDefaultValue(defaultValue) {
        this.defaultValue = defaultValue
        return this
    }

    setValidationFunction(validationFunction) {
        this.validationFunction = validationFunction
        return this
    }

    get value() {
        return this.validationFunction(this.defaultValue)
    }
}

class Component {
    constructor() {
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

    getDisplayInformation() {
        return this.displayInformation
    }

    getName() {
        return this.displayInformation?.name || "None"
    }

    getParameterByID(parameterID) {
        return this.displayInformation?.parameters?.find(parameter => parameter.id == parameterID)
    }
}

export {
    Parameter,
    Component
}