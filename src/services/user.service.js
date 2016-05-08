import User from './models/user';

import {
  redirectToLoginPage,
  getJSON,
  post,
} from './base.service';

import { getUser, setUser } from '../stores/user.store';

export function getUserById(id, token) {
  return getJSON(`/ajax/user/${id}?token=${token}`)
    .then(result => new User(result));
}

export function login(mobile, code) {
  const params = {
    code,
    mobile,
  };

  return post('/ajax/login', params)
    .then(result => {
      setUser(result);

      return getUser();
    });
}

export function logout() {
  setUser(null);
  redirectToLoginPage();
}
