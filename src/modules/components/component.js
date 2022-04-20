class Parameter {
    constructor() {
        this.id = "no_id";
        this.name = id
        this.type = Number
        this.description = "No description provided"
        this.defaultValue = 0
        this.validationFunction = ((v) => v)
        this._value = this.validationFunction(this.defaultValue)
    }

    get value() {
        this._value = this.validationFunction(this.defaultValue)
        return this._value
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

    setValue(value) {
        this._value = this.validationFunction(value)
        return this
    }

    setValidationFunction(validationFunction) {
        this.validationFunction = validationFunction
        return this
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

        this.componentDependencies = []
        this.isRemoveable = true
    }

    get name() {
        return this.displayInformation?.name || "None"
    }

    set name(value) {
        this.displayInformation.name = value
    }

    get description() {
        return this.displayInformation?.description || "No description provided"
    }

    set description(value) {
        this.displayInformation.description = value
    }
    
    addParameter(parameter) {
        this.displayInformation.parameters.push(parameter)
        return this
    }

    getParameterByID(parameterID) {
        return this.displayInformation?.parameters?.find(parameter => parameter.id == parameterID)
    }
}

export {
    Parameter,
    Component
}