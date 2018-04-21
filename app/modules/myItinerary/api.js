import { database, provider } from "../../config/firebase";

//Get allFriends object from the realtime database
export function getAllFriends(uid, callback) {

  database.ref('friends').child(uid).once('value')
      .then(function(snapshot) {

        const exists = (snapshot.val() !== null);

        if (exists) {
          callback(true, snapshot, null);
        } else {
          callback(false, null, "Tu n'as pas d'amis, invite tes amis!");
        }
      })
      .catch(error => callback(false, null, error));
}

//Create itinerary friend in realtime database
export function createItinerary(id, itinerary, callback) {
  database.ref('itineraries').child(id).child(itinerary.id).update({ ...itinerary })
      .then(() => callback(true, null, null))
      .catch((error) => callback(false, null, {message: error}));
}

//Get allItinerary object from the realtime database
export function getAllItinerary(uid, callback) {

  database.ref('itineraries').child(uid).once('value')
      .then(function(snapshot) {

        const exists = (snapshot.val() !== null);

        if (exists) {
          callback(true, snapshot, null);
        } else {
          callback(false, null, "Data is empty");
        }
      })
      .catch(error => callback(false, null, error));
}

//Remove itinerary friend in realtime database
export function removeItinerary(id, itinerary, callback) {
  database.ref('itineraries').child(id).child(itinerary.id).remove()
      .then(() => callback(true, null, null))
      .catch((error) => callback(false, null, {message: error}));
}

//Get userByID object from the realtime database
export function getUserById(id, itinerary, callback) {

  database.ref('users').child(id).once('value')
      .then(function(snapshot) {

        const exists = (snapshot.val() !== null);

        if (exists) {
          callback(true, snapshot, null);
        } else {
          callback(false, null, "Data is empty");
        }
      })
      .catch(error => callback(false, null, error));
}