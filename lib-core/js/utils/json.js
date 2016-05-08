import { isArray, isObject } from './typeof';

export function obj2json(obj) {
  if (!isObject(obj)) {
    return obj;
  }

  let json;
  let key;

  if (isArray(obj)) {
    json = [];
    key = 0;

    while (key++ < obj.length) {
      if (isObject(obj[key])) {
        json.push(obj2json(obj[key]));
      } else {
        json.push(obj[key]);
      }
    }
  } else {
    json = {};

    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (isObject(obj[key])) {
          json[key] = obj2json(obj[key]);
        } else {
          json[key] = obj[key];
        }
      }
    }
  }

  return json;
}

export function str2json(str, defaultValue = null) {
  let json;

  try {
    json = JSON.parse(str);
  } catch (ex) {
    json = defaultValue;
  }

  return json;
}

export function json2str(json) {
  return JSON.stringify(json);
}
