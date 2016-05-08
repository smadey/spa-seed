export function isArray(arr) {
  return Array.isArray(arr);
}

export function isFunction(obj) {
  return typeof obj === 'function';
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
