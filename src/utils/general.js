export function isNone(obj) {
    return obj === null || obj === undefined;
}

export function isEmpty(obj) {
    let none = isNone(obj);
    if (none) {
        return none;
    }

    if (typeof obj.size === 'number') {
        return !obj.size;
    }

    let objectType = typeof obj;

    if (objectType === 'object') {
        let size = obj.size;
        if (typeof size === 'number') {
            return !size;
        }
    }

    if (typeof obj.length === 'number' && objectType !== 'function') {
        return !obj.length;
    }

    if (objectType === 'object') {
        let length = obj.length;
        if (typeof length === 'number') {
            return !length;
        }
    }

    return false;
}