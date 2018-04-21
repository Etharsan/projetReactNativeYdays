/*import Realm from 'realm';

// Define your models and their properties
export const TransportSchema = {
  name: TRANSPORT_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',    // primary key
    ligne: { type: 'string', indexed: true },
    type: { type: 'string', indexed: true },
    arret: { type: 'string', indexed: true },
    direction: { type: 'string', indexed: true },
  }
};

export const TransportListSchema = {
  name: TRANSPORTLIST_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',    // primary key
    name: 'string',
    creationDate: 'date',
    todos: { type: 'list', objectType: TRANSPORT_SCHEMA },
  }
};

const databaseOptions = {
  path: 'travelTranport.realm',
  schema: [TransportListSchema, TransportSchema],
  schemaVersion: 0, //optional
};

//functions for TodoLists
export const insertNewTransportList = newTransportList => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      realm.create(TRANSPORTLIST_SCHEMA, newTransportList);
      resolve(newTransportList);
    });
  }).catch((error) => reject(error));
});

export const updateTransportList = TransportList => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      let updatingTransportList = realm.objectForPrimaryKey(TRANSPORTLIST_SCHEMA, TransportList.id);
      updatingTransportList.name = TransportListt.name;
      resolve();
    });
  }).catch((error) => reject(error));;
});

export const deleteTransportList = TransportListId => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      let deletingTransportList = realm.objectForPrimaryKey(TRANSPORTLIST_SCHEMA, TransportListId);
      realm.delete(deletingTransportList.transports);
      realm.delete(deletingTransportList);
      resolve();
    });
  }).catch((error) => reject(error));;
});

export const deleteAllTransportLists = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      let allTransportLists = realm.objects(TRANSPORTLIST_SCHEMA);
      for (var index in allTransportLists) {
        let eachTransportList = allTransportLists[index]
        realm.delete(eachTransportList.todos);
      }
      realm.delete(allTransportLists);
      resolve();
    });
  }).catch((error) => reject(error));;
});

export const queryAllTransportLists = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let allTransportLists = realm.objects(TRANSPORTLIST_SCHEMA);
    resolve(allTransportLists);
  }).catch((error) => {
    reject(error);
  });
});
export default new Realm(databaseOptions);
*/