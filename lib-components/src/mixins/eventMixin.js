function on(el, name, fn, useCapture) {
  if (el && el.addEventListener) {
    el.addEventListener(name, fn, !!useCapture);
  }
}

function off(el, name, fn, useCapture) {
  if (el && el.removeEventListener) {
    el.removeEventListener(name, fn, !!useCapture);
  }
}

export default {
  created() {
    this.__events = null;
  },

  beforeDestroy() {
    const events = this.__events;

    if (events) {
      let i = events.length;
      let evt;

      while (i--) {
        evt = events[i];
        off(evt[0], evt[1], evt[2]);
      }
    }

    this.__events = null;
  },

  methods: {
    on(el, name, handler, useCapture) { /* eslint no-param-reassign: 0 */
      if (typeof name === 'function') {
        useCapture = handler;
        handler = name;
        name = el;
        el = this.$el;
      }

      if (typeof name === 'string' && typeof handler === 'function') {
        on(el, name, handler, useCapture);
        (this.__events || (this.__events = [])).push([el, name, handler]);
      }
    },

    off(el, name) {
      const events = this.__events;

      if (events) {
        let i = events.length;
        let evt;

        while (i--) {
          evt = events[i];

          if (evt[0] === el && evt[1] === name) {
            off(evt[0], evt[1], evt[2]);
            events.splice(i, 1);
          }
        }
      }
    },

  },

};
