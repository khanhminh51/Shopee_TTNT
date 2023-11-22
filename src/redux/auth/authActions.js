import * as types from './authTypes';

export function getIDAction(value) {
  return {
    type: types.GETID,
    value,
  };
}

export function loginAction(user, pass) {
  return {
    type: types.LOGIN,
    user,
    pass,
  };
}

export function registerAction(ten, email, user, pass) {
  return {
    type: types.REGISTER,
    ten,
    email,
    user,
    pass,
  };
}

export function detailAction(Id) {
  return {
    type: types.DETAIL,
    Id,
  };
}

export function detailUpdate(id, ten, email, user, pass) {
  return {
    type: types.DETAILUPDATE,
    id,
    ten,
    email,
    user,
    pass,
  };
}

export function adminRemoveAction(id) {
  return {
    type: types.REMOVEUSER,
    id,
  };
}
