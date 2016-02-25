const fns = {
  each (obj, fn, stopVal) {
    let itemVal

    if (obj.length) {
      let i = 0
      let n = obj.length

      while (i < n) {
        itemVal = fn.call(null, obj[i], i)

        if (stopVal !== undefined && itemVal === stopVal) {
          break
        }

        i++
      }
    } else if (obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          itemVal = fn.call(null, obj[key], key)

          if (stopVal !== undefined && itemVal === stopVal) {
            break
          }
        }
      }
    }
  },

  asap: (function (global) {
    if (global.process) {
      return (fn) => global.process.nextTick(fn)
    } else if (global.setImmediate) {
      return (fn) => global.setImmediate(fn)
    } else if (global.postMessage) {
      var callbacks = []
      var name = 'asap-message'

      global.addEventListener('message', (evt) => {
        if (evt.source === global && evt.data === name) {
          evt.stopPropagation()

          if (callbacks.length > 0) {
            callbacks.shift()()
          }
        }
      }, true)

      return (fn) => {
        callbacks.push(fn)
        global.postMessage(name, '*')
      }
    } else if (global.requestAnimationFrame) {
      return (fn, isWithDom) => {
        if (isWithDom) {
          global.requestAnimationFrame(fn)
        } else {
          global.setTimeout(fn, 0)
        }
      }
    } else {
      return (fn) => global.setTimeout(fn, 0)
    }
  })(typeof self === 'undefined' ? typeof global === 'undefined' ? this : global : self)
}

export default fns
