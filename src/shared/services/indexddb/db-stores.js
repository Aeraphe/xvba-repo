export const createStorePackages = (db) => {
    const store = db.createObjectStore('packages', { keyPath: "id" });
    store.createIndex('by_id', 'id', { unique: true })
    store.createIndex('by_name', 'name', { unique: true })
    db.createObjectStore('search', { autoIncrement : true });
}
