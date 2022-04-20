/*

    Empty object
    Base class for all objects.
    Used for attaching components to the empty.
    All Empty objects must contain a transform component.

*/

import { Transform } from '../components/appearance/transform';
import { Component } from '../components/component';

class Empty {
    constructor() {
        this.children = []
        this.components = []
        
        let position = new Transform()
        position.isRemoveable = false
        this.addComponent(position)

        this._parent = null
    }

    get parent() {
        return this._parent
    }

    set parent(parent) {
        if (this._parent == parent) {
            return
        }

        if (this._parent) {
            this._parent.removeChild(this)
        }

        if (this._parent) {
            this._parent.addChild(this)
        }
    }
    
    addComponent(component) {
        if (component?.prototype instanceof Component) {
            this.components.push(component)
        }
    }

    removeComponent(component) {
        if (component?.prototype instanceof Component) {
            if (this.components.includes(component)) {
                if (component.isRemoveable) {
                    this.components.splice(this.components.indexOf(component), 1)
                }
            }
        }
    }

    getComponent(name) {
        return this.components.find(component => component.name === name)
    }

    getComponents() {
        return this.components
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

        for (let child in this.children) {
            descendants.push(this.children[child])
            descendants = descendants.concat(this.children[child].getDescendants())
        }

        return descendants
    }

    getTransform() {
        return this.getComponent('transform')
    }
}

export {
    Empty
}