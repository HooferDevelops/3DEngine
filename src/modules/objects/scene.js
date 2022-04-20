class Scene {
    constructor() {
       this.children = []
    }

    addChild(child) {
        if (child?.prototype instanceof Empty) {
            this.children[child.name] = child
            child.parent = this
        }
    }

    removeChild(child) {
        if (child?.prototype instanceof Empty) {
            delete this.children[child.name]
            child.parent = null
        }
    }

    getChild(name) {
        return this.children[name]
    }

    getChildren() {
        return this.children
    }
    
    getDescendants() {
        let descendants = []
        for (let child of this.children) {
            descendants.push(child)
            descendants = descendants.concat(child.getDescendants())
        }
        return descendants
    }
}