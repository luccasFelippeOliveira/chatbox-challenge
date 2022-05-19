// The idea here is to create a key-value store.
// Ideally we could use a redis server. I did not use one, as the free plan only allows for a sigle redis db, that is used for Queuing.
const store = new Map();

export const getByKey = (key) => {
    return store.get(key);
};

export const setByKey = (key, value) => {
    return store.set(key, value);
};

export const removeKey = (key) => {
    store.delete(key);
}