class Input {
    constructor() {
        this.keyDownListener = document.addEventListener("keydown", this.onKeyDown.bind(this));
        this.keyUpListener = document.addEventListener("keyup", this.onKeyUp.bind(this));
        
        this.mouseDownListener = document.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.mouseUpListener = document.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.mouseMoveListener = document.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.mouseWheelListener = document.addEventListener("wheel", this.onMouseWheel.bind(this)); 

        this.touchStartListener = document.addEventListener("touchstart", this.onTouchStart.bind(this));
        this.touchEndListener = document.addEventListener("touchend", this.onTouchEnd.bind(this));
        this.touchMoveListener = document.addEventListener("touchmove", this.onTouchMove.bind(this));
        this.touchCancelListener = document.addEventListener("touchcancel", this.onTouchEnd.bind(this)); 

        this.keyDown = {};
        this.listenerTypes = {
            "keyDown": {},
            "keyUp": {},

            "mouseDown": {},
            "mouseUp": {},
            "mouseMove": {},
            "mouseWheel": {},

            "touchStart": {},
            "touchEnd": {},
            "touchMove": {},
            "touchCancel": {}
        };
    }

    onKeyDown(event) {
        for (let key in this.listenerTypes["keyDown"]) {
            this.listenerTypes["keyDown"][key](event.key.toLowerCase());
        }

        this.keyDown[event.key.toLowerCase()] = true;
    }

    onKeyUp(event) {
        for (let key in this.listenerTypes["keyUp"]) {
            this.listenerTypes["keyUp"][key](event.key.toLowerCase());
        }

        this.keyDown[event.key.toLowerCase()] = false;
    }

    isKeyDown(key) {
        return this.keyDown[key.toLowerCase()]
    }

    onMouseDown(event) {
        for (let key in this.listenerTypes["mouseDown"]) {
            this.listenerTypes["mouseDown"][key]({
                x: event.clientX,
                y: event.clientY,
                button: event.button === 0 ? "left" : event.button === 1 ? "middle" : "right"
            });
        }
    }

    onMouseUp(event) {
        for (let key in this.listenerTypes["mouseUp"]) {
            this.listenerTypes["mouseUp"][key]({
                x: event.clientX,
                y: event.clientY,
                button: event.button === 0 ? "left" : event.button === 1 ? "middle" : "right"
            });
        }
    }

    onMouseMove(event) {
        for (let key in this.listenerTypes["mouseMove"]) {
            this.listenerTypes["mouseMove"][key]({
                x: event.clientX,
                y: event.clientY,
                moveX: event.movementX,
                moveY: event.movementY
            });
        }
    }

    onMouseWheel(event) {
        for (let key in this.listenerTypes["mouseWheel"]) {
            this.listenerTypes["mouseWheel"][key]({
                x: event.deltaX,
                y: event.deltaY
            });
        }
    }

    onTouchStart(event) {
        for (let key in this.listenerTypes["touchStart"]) {
            this.listenerTypes["touchStart"][key]({
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            });
        }
    }

    onTouchEnd(event) {
        for (let key in this.listenerTypes["touchEnd"]) {
            this.listenerTypes["touchEnd"][key]({
                x: event.changedTouches[0].clientX,
                y: event.changedTouches[0].clientY
            });
        }
    }

    onTouchMove(event) {
        for (let key in this.listenerTypes["touchMove"]) {
            this.listenerTypes["touchMove"][key]({
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            });
        }
    }

    onTouchCancel(event) {
        for (let key in this.listenerTypes["touchCancel"]) {
            this.listenerTypes["touchCancel"][key]({
                x: event.changedTouches[0].clientX,
                y: event.changedTouches[0].clientY
            });
        }
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

this.exports = Input