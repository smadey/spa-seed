import { serverUrl } from '../config';

export default function (path) {
  if (typeof path === 'string' && path[0] === '/') {
    return serverUrl + path;
  }

  return path;
}
