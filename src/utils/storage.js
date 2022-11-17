/**
 * @param {*} key 
 * @param {*} defaultValue 默认值
 * @param {*} isJSON 是否是JSON
 * @param {*} isLocal 是否是localStorage
 */
export function getStorage(key, defaultValue = null, isJSON = true, isLocal = true) {
    const value = isLocal ? localStorage.getItem(key) : sessionStorage.getItem(key);
    if (value && isJSON) {
        return JSON.parse(value);
    }
    if (value) {
        return value;
    }
    return defaultValue;
}

/**
 * @param {*} key 
 * @param {*} value 
 * @param {*} isJSON 是否是JSON
 * @param {*} isLocal 是否是localStorage
 */
export function setStorage(key, value, isJSON = true, isLocal = true) {
    const val = isJSON ? JSON.stringify(value) : value;
    return isLocal ? localStorage.setItem(key, val) : sessionStorage.setItem(key, val);
}

/**
 * @param {*} key 
 * @param {*} isLocal 是否是localStorage
 */
export function removeStorage(key, isLocal = true) {
    return isLocal ? localStorage.removeItem(key) : sessionStorage.removeItem(key);
}


/**
 * @param {*} key 
 * @param {*} defaultValue 默认值
 * @param {*} isJSON 是否是JSON
 */
export function getSessionStorage(key, defaultValue = null, isJSON = true,) {
    return getStorage(key, defaultValue, isJSON, false);
}

/**
 * @param {*} key 
 * @param {*} value 
 * @param {*} isJSON 是否是JSON
 */
export function setSessionStorage(key, value, isJSON = true) {
    return setStorage(key, value, isJSON, false);
}

export function removeSessionStorage(key) {
    return removeStorage(key, false);
}