import fns from './fns'

const dom = {
  get (el) {
    let $el = el.length ? el : [el]

    fns.each(dom, (fn, key) => {
      $el[key] = function () {
        let args = [].slice.call(arguments, 0)
        let returnVal

        args.unshift(el)

        fns.each($el, (el) => {
          returnVal = fn.apply(el, args)

          if (returnVal !== undefined) {
            return false
          }
        }, false)

        return returnVal !== undefined ? returnVal : $el
      }
    })

    return $el
  },

  on (el, type, fn, useCapture) {
    if (el.addEventListener) {
      el.addEventListener(type, fn, !!useCapture)
    } else if (el.attachEvent) {
      el.attachEvent(type, fn)
    }
  },

  off (el, type, fn) {
    if (el.removeEventListener) {
      el.removeEventListener(type, fn)
    } else if (el.detachEvent) {
      el.detachEvent(type, fn)
    }
  },

  once (el, type, fn, useCapture) {
    dom.on(el, type, onceFn, useCapture)

    function onceFn () {
      fn.apply(el, arguments)
      dom.off(el, type, onceFn)
    }
  },

  delegate (el, type, selector, fn, useCapture) {
    dom.on(el, type, delegateFn, useCapture)

    function delegateFn (evt) {
      var cur = evt.target

      if (!cur.nodeType) {
        return
      }

      while (cur !== this) {
        if (cur.nodeType === 1 && cur.disabled !== true) {
          let els = this.querySelectorAll(selector)

          for (let i = 0, n = els.length; i < n; i++) {
            if (els[i] === cur) {
              fn.call(els[i], evt)
              return
            }
          }
        }

        cur = cur.parentNode || this
      }
    }
  },

  transform (el, transform) {
    let elStyle = el.style

    elStyle.webkitTransform =
      elStyle.MsTransform =
      elStyle.msTransform =
      elStyle.MozTransform =
      elStyle.OTransform =
      elStyle.transform = transform
  },

  transition (el, duration) {
    if (typeof duration !== 'string') {
      duration = duration + 'ms'
    }

    let elStyle = el.style

    elStyle.webkitTransitionDuration =
      elStyle.MsTransitionDuration =
      elStyle.msTransitionDuration =
      elStyle.MozTransitionDuration =
      elStyle.OTransitionDuration =
      elStyle.transitionDuration = duration
  },

  transitionEnd (el, callback) {
    var events = ['webkitTransitionEnd', 'transitionend',
      'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd']

    fns.each(events, (name) => {
      dom.on(el, name, fireCallBack)
    })

    function fireCallBack (evt) {
      if (evt.target !== this) {
        return
      }

      callback.call(this, evt)

      fns.each(events, (name) => {
        dom.off(el, name, fireCallBack)
      })
    }
  },

  offset (el) {
    let rect = el.getBoundingClientRect()

    if (rect.width || rect.height) {
      let docElem = el.ownerDocument.documentElement

      return {
        top: rect.top + window.pageYOffset - docElem.clientTop,
        left: rect.left + window.pageXOffset - docElem.clientLeft
      }
    }

    return rect
  },

  isInViewport (el, threshold) {
    let rect = el.getBoundingClientRect()

    let winHeight = window.innerHeight || document.documentElement.clientHeight
    let winWidth = window.innerWidth || document.documentElement.clientWidth

    let isTopOfScreen = rect.bottom < -threshold
    let isRightOfScreen = rect.left > winWidth + threshold
    let isBottomOfScreen = rect.top > winHeight + threshold
    let isLeftOfScreen = rect.right < -threshold

    return !isTopOfScreen && !isRightOfScreen && !isBottomOfScreen && !isLeftOfScreen
  }
}

export default dom
