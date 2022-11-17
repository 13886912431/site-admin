import { getStorage, setStorage, removeStorage } from './storage'

const TOKEN_KEY = 'authorization';

export function getToken() {
    return getStorage(TOKEN_KEY, '', false);
}

export function setToken(value) {
    return setStorage(TOKEN_KEY, value, false);
}

export function removeToken() {
    return removeStorage(TOKEN_KEY);
}
