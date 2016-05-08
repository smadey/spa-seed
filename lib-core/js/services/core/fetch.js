import 'whatwg-fetch';
import Promise from 'promise/lib/es6-extensions';

const _self = typeof self !== 'undefined' ? self : this;

_self.Promise = Promise;

export default _self.fetch.bind(_self);

export const Headers = _self.Headers;
export const Request = _self.Request;
export const Response = _self.Response;
