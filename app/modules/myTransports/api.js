import { database, provider } from "../../config/firebase";

//Get tranport object from the realtime database
export function getTransport(callback) {

  database.ref('transport').once('value')
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