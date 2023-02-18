export function clone(jsonObject) {
    return JSON.parse(JSON.stringify(jsonObject));
}

export function uuid(v) {
    if (typeof (v) !== 'number') v = 4;
    const { v4: uuidv4 } = require('uuid');
    const { v5: uuidv5 } = require('uuid');
    if (v == 5) return uuidv5();
    else return uuidv4();
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function getRandomRange(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export function getParams(obj) {
    var query = [];
    Object.keys(obj).forEach(function (key) {
        var pair = key + '=' + obj[key]
        query.push(pair);
    });
    return query.join('&');
}

class ObjectStateCacher {

    constructor() {
        this.states = {};
    }

    setState(keyObj, valObj) {
        var key = keyObj.toString();
        if (typeof (keyObj) === 'object')
            key = JSON.stringify(keyObj).toString();
        this.states[key] = valObj;
    }

    getState(keyObj) {
        var key = keyObj.toString();
        if (typeof (keyObj) === 'object')
            key = JSON.stringify(keyObj).toString();
        return this.states[key];
    }
}

export const ObjectStates = new ObjectStateCacher();