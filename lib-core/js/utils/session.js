function set(key, data) {
  let json;

  try {
    json = JSON.stringify(data);
  } catch (ex) {
    json = '';
  }

  return sessionStorage.setItem(key, json);
}

function get(key) {
  let data;

  try {
    data = JSON.parse(sessionStorage.getItem(key));
  } catch (ex) {
    data = null;
  }

  return data;
}

function remove(key) {
  return sessionStorage.removeItem(key);
}

function clear() {
  return sessionStorage.clear();
}

export default {
  set,
  get,
  remove,
  clear,
};
