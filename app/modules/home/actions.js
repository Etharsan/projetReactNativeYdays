import * as t from './actionTypes';
import * as api from './api';

export function getAllItinerary(uid, successCB, errorCB) {
  api.getAllItinerary(uid, function (success, snapshot, error) {
    if (success) {
      successCB(snapshot);
    }else if (error) errorCB(error)
  });
}

export function getUserById(id, intinerary, successCB, errorCB) {
  api.getUserById(id, intinerary, function (success, snapshot, error) {
    if (success) {
      successCB(snapshot, intinerary);
    }else if (error) errorCB(error)
  });
}