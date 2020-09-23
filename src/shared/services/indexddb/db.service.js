import { createStorePackages } from "./db-stores";
var db;


const create = async () => {
    const request = indexedDB.open('xvba', 1);
    new Promise(
        (resolve) => {
            request.onupgradeneeded = () => {
                db = request.result;
                createStorePackages(db)
                resolve(db)

            }
        })

}




const open = async () => {
    const request = indexedDB.open('xvba', 1);
    return new Promise(
        (resolve, reject) => {
            request.onsuccess = () => {
                db = request.result;
                resolve(db)
            }
        }
    )




}

const getAll = async (store, db) => {
    let response = [];
    return new Promise(
        (resolve, reject) => {

            let packagesStore = db.transaction(store, 'readonly').objectStore(store)
            packagesStore.openCursor().onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    response.push(cursor.value);
                    cursor.continue();
                }
                else {
                    if (response) {
                        resolve(response);
                    }

                }
            };
        })


}

const update = async (data, store, db) => {

    new Promise(
        (resolve, reject) => {
            let packagesStore = db.transaction(store, 'readwrite').objectStore(store)
            data.forEach(pack => {
                packagesStore.put(pack);
            })

        })

}

function getObjectStore(store_name, mode,) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
}

const clear = async (name, db) => {

    return new Promise(
        (resolve, reject) => {
            var store = getObjectStore(name, 'readwrite');
            var req = store.clear();
            req.onsuccess = function (evt) {
                resolve('clear')
            };
            req.onerror = function (evt) {
                console.error("Delete Object Store:", evt.target.errorCode);

            };
        }
    )

}


export const DBServices = { create, open, update, clear, getAll } 