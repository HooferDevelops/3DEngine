// TODO: setup editor
/*

    NOTES:
    - VR Preview 
        https://discourse.threejs.org/t/webxr-mirror-screen-onto-canvas/31937/3
    
    - Hardware Acceleration Detection
        https://gist.github.com/cvan/042b2448fcecefafbb6a91469484cdf8
        OFF
            - 'Google Inc. (Google)'
            - ANGLE (Google, Vulkan 1.2.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)
        ON
            - 'Google Inc. (NVIDIA)'
            - ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER Direct3D11 vs_5_0 ps_5_0, D3D11)

    - Image Compression
        https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh
        Prompt compression for larger images, and allow user to choose compression level.
    
    - Sandboxing Client Code
        https://blog.risingstack.com/writing-a-javascript-framework-sandboxed-code-evaluation/
        
        let x = new Function("sandbox", "with (sandbox) { return console }")

        let proxy = new Proxy(x, {has, get})
        let res = x(proxy)

        function has(t,k){
            console.warn(1, k)
            return true
        }

        function get(t,k){
            console.warn(2, k)
            if (k === Symbol.unscopables) return undefined

            return t[k]
        }
*/

import {WebGLRenderer} from 'three'

class Editor {
    constructor() {
        this.render = new WebGLRenderer({
            antialias: true,
            alpha: true
        })

        document.body.appendChild(this.render.domElement);

        this.updateRenderSize()
    }

    init() {
        this.initEditor()
        this.initEditorEvents()
    }

    initEditor() {
        
    }

    updateRenderSize() {
        this.render.setSize(window.innerWidth, window.innerHeight)
    }

    initEditorEvents() {
        window.addEventListener('resize', () => {
            this.updateRenderSize()
        })
    }
}

export {
    Editor
}