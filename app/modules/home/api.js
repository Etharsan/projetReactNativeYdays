import { database, provider } from "../../config/firebase";

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