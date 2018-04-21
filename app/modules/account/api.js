import { database } from "../../config/firebase";

//Create relation friend in realtime database
export function createFriend(user, friend, callback) {
  database.ref('friends').child(friend.id).child(user.id).update({ ...user })
      .then(() => callback(true, null, null))
      .catch((error) => callback(false, null, {message: error}));
}

//Get allUser object from the realtime database
export function getAllUser(callback) {

  database.ref('users').once('value')
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

//update Attente in realtime database
export function confirmFriend(user, friend, callback) {
  database.ref('friends').child(user.id).child(friend.id).update({ attente: 0 })
      .then(() => callback(true, null, null))
      .catch((error) => callback(false, null, {message: error}));

  database.ref('friends').child(friend.id).child(user.id).update({ ...user })
}

//update user color in realtime database
export function updateColor(id, color, callback) {
  database.ref('users').child(id).update({ color: color })
      .then(() => callback(true, null, null))
      .catch((error) => callback(false, null, {message: error}));
}