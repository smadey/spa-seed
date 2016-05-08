import { isFunction, isObject } from '../../utils/typeof';
import { obj2json } from '../../utils/json';

class Base {
  constructor(arg) {
    if (!isObject(arg)) {
      throw new Error('Constructor first param must be object');
    }

    this._callbacks = null;
  }

  toJSON() {
    return obj2json(this);
  }

  addCallbacks(type, callback) {
    if (typeof type === 'string' && typeof isFunction(callback)) {
      if (!this._callbacks) {
        this._callbacks = {};
      }

      if (!this._callbacks[type]) {
        this._callbacks[type] = [];
      }

      this._callbacks[type].push(callback);
    }
  }

  execCallbacks(type, args) {
    if (typeof type === 'string' && this._callbacks && this._callbacks[type]) {
      const callbacks = this._callbacks[type];

      let i = 0;
      const len = callbacks.length;

      while (i < len) {
        callbacks[i](args);
        i++;
      }
    }
  }

  removeCallbacks(type) {
    if (typeof type === 'string' && this._callbacks && this._callbacks[type]) {
      delete this._callbacks[type];
    }
  }

  static create(data) {
    const Model = this;

    if (data) {
      if (data instanceof Model) {
        return data;
      }
      return new Model(data);
    }

    return null;
  }
}

export default Base;
