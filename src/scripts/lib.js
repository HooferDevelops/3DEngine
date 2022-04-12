let lib = {}

lib.scriptCache = {}

lib.loadScript = async function (url) {
    if (lib.scriptCache[url]) {
        return lib.scriptCache[url].exports
    }

    let script = await lib.getScript(url)

    let AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
    let func = AsyncFunction(script)

    let global = {
        exports: () => { 
            warn("No exports found")
        }
    }
    
    let result = await func.apply(global)

    lib.scriptCache[url] = global

    return global.exports
}

lib.getScript = async function (dir, callback) {
    return new Promise((resolve, reject) => {
        // check if dir ends with .js
        // if it doesn't, try to add the .js to the end of it
        // if it still doesn't exist, throw an error
        if (!dir.endsWith(".js")) {
            dir += ".js"
        }
        
        // make an XML request to the dir
        let request = new XMLHttpRequest()
        
        request.open("GET", dir)
        request.addEventListener("load", () => {
            if (request.status === 200) {
                resolve(request.responseText)
            } else {
                reject(new Error(request.statusText))
            }
        })

        request.addEventListener("error", () => {
            reject(new Error(request.statusText))
        })
        
        request.send()
    })
}

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
})

window.loadedLib = true