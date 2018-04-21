import * as t from './actionTypes';
import * as api from './api';

export function createFriend(user, friend, successCB, errorCB) {
  api.createFriend(user, friend, function (success, data, error) {
    if (success) {
      successCB();
    }else if (error) errorCB(error)
  });
}

export function getAllUser(successCB, errorCB) {
  api.getAllUser(function (success, snapshot, error) {
    if (success) {
      successCB(snapshot);
    }else if (error) errorCB(error)
  });
}

export function getAllFriends(uid, successCB, errorCB) {
  api.getAllFriends(uid, function (success, snapshot, error) {
    if (success) {
      successCB(snapshot);
    }else if (error) errorCB(error)
  });
}

export function confirmFriend(user, friend, successCB, errorCB) {
  api.confirmFriend(user, friend, function (success, data, error) {
    if (success) {
      successCB(friend);
    }else if (error) errorCB(error)
  });
}

export function updateColor(id, color, successCB, errorCB) {
  api.updateColor(id, color, function (success, data, error) {
    if (success) {
      successCB(color);
    }else if (error) errorCB(error)
  });
}
