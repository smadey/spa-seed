import storage from '../../lib-core/utils/storage';

import User from '../services/models/user';

const STORAGE_KEYS = {
  USER: 'USER',
};

let user = User.create(storage.get(STORAGE_KEYS.USER));

export function getUser() {
  return user;
}

export function setUser(value) {
  user = User.create(value);

  if (user) {
    storage.set(STORAGE_KEYS.USER, user.toJSON());
  } else {
    storage.remove(STORAGE_KEYS.USER);
  }
}

export default {
  getUser,
  setUser,
};
