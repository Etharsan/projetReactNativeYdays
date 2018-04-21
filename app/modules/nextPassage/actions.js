import * as t from './actionTypes';
import * as api from './api';

export function getTransport(successCB, errorCB) {
    api.getTransport(function (success, snapshot, error) {
      if (success) {
        successCB(snapshot);
      }else if (error) errorCB(error)
    });
}

export function getNextPassage(id, successCB, errorCB) {
  api.getNextPassage(id, function (success, snapshot, error) {
    if (success) {
      successCB(snapshot);
    }else if (error) errorCB(error)
  });
}
