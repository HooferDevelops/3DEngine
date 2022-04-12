class Instance {
    constructor(){
        this.children = {};
        this.parent = null;
        this.name = Date.now().toString(36) + Math.random().toString(36).substring(2);

        this.listenerTypes = {
            "descendantAdded": {},
            "descendantRemoved": {},
            "childAdded": {},
            "childRemoved": {},
            "parentChanged": {},
            "nameChanged": {}
        }
    }

    getDescendants() {
        // loop through all the children of children
        let descendants = [];

        for (let child in this.children) {
            descendants.push(this.children[child]);
            descendants = descendants.concat(this.children[child].getDescendants());
        }

        return descendants;
    }

    findChild(name, recursive) {
        for (let child in this.children) {
            if (this.children[child].name === name) {
                return this.children[child];
            } else {
                if (recursive) {
                    let result = this.children[child].findChild(name, recursive);
                    if (result) {
                        return result;
                    }
                }
            }
        }

        return null;
    }

    setName(name) {
        let oldName = this.name;
        this.name = name;

        if (this.parent) {
            this.parent.children[name] = this.parent.children[oldName];
            delete this.parent.children[oldName];
        }

        return this;
    }

    addChild(child) {
        if (child.parent) {
            child.parent.removeChild(child);
        }

        child.parent = this;

        this.children[child.name] = child;

        // Check for child added listeners
        if (this.listenerTypes["childAdded"]) {
            for (let listener in this.listenerTypes["childAdded"]) {
                this.listenerTypes["childAdded"][listener](child);
            }
        }
        
        // Check for descendant added listeners
        let parentResult = child;

        while (parentResult.parent) {
            parentResult = parentResult.parent;

            if (parentResult?.listenerTypes["descendantAdded"]) {
                for (let listener in parentResult.listenerTypes["descendantAdded"]) {
                    parentResult.listenerTypes["descendantAdded"][listener](child);
                }
            }
        }

        return this;
    }

    removeChild(child) {
        if (child.parent !== this) {
            return;
        }

        delete this.children[child.name];

        if (this.listenerTypes["childRemoved"]) {
            for (let listener in this.listenerTypes["childRemoved"]) {
                this.listenerTypes["childRemoved"][listener](child);
            }
        }

        // Check for descendant removed listeners
        let parentResult = child;

        while (parentResult.parent) {
            parentResult = parentResult.parent;

            if (parentResult?.listenerTypes["descendantRemoved"]) {
                for (let listener in parentResult.listenerTypes["descendantRemoved"]) {
                    parentResult.listenerTypes["descendantRemoved"][listener](child);
                }
            }
        }

        child.parent = null;

        return this;
    }

    setParent(parent) {
        if (this.parent) {
            this.parent.removeChild(this);
        }

        this.parent = parent;

        if (parent) {
            parent.addChild(this);
        }

        return this;
    }

    addListener(event, listenerName, callback) {
        // check if the event is valid
        if (!this.listenerTypes[event]) {
            throw new Error("Event %s is not a valid listener type for %s.".replace("%s", event).replace("%s", this.name));
        }

        // add the callback to the event
        this.listenerTypes[event][listenerName] = callback;

        return this;
    }
}

this.exports = Instance;