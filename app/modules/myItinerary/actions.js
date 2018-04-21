import * as t from './actionTypes';
import * as api from './api';

export function getAllFriends(uid, successCB, errorCB) {
  api.getAllFriends(uid, function (success, snapshot, error) {
    if (success) {
      successCB(snapshot);
    }else if (error) errorCB(error)
  });
}

export function createItinerary(id, itinerary, successCB, errorCB) {
  api.createItinerary(id, itinerary, function (success, data, error) {
    if (success) {
      successCB();
    }else if (error) errorCB(error)
  });
}

export function getAllItinerary(uid, successCB, errorCB) {
  api.getAllItinerary(uid, function (success, snapshot, error) {
    if (success) {
      successCB(snapshot);
    }else if (error) errorCB(error)
  });
}

export function removeItinerary(id, itinerary, successCB, errorCB) {
  api.removeItinerary(id, itinerary, function (success, data, error) {
    if (success) {
      successCB(itinerary);
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