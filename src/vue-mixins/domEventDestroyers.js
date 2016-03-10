export const domEventDestroyers = {
  created () {
    this._domEventDestroyers = {}
  },

  beforeDestroy () {
    for (let name in this._domEventDestroyers) {
      if (this._domEventDestroyers.hasOwnProperty(name)) {
        this._domEventDestroyers[name]()
        delete this._domEventDestroyers[name]
      }
    }
  },

  methods: {
    addDomEventDestroyer (name, fn) {
      if (typeof name === 'string' && typeof fn === 'function') {
        this._domEventDestroyers[name] = fn
      }
    },

    execDomEventDestroyer (name) {
      if (typeof name === 'string' && this._domEventDestroyers[name]) {
        this._domEventDestroyers[name]()
        delete this._domEventDestroyers[name]
      }
    }
  }
}
