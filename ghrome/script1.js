// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import {assert} from "./assert.js";
import {PromiseResolver} from "./promise_resolver.js";
let uidCounter = 1;
function createUid() {
    return uidCounter++
}
const chromeSendResolverMap = {};
export function webUIResponse(id, isSuccess, response) {
    const resolver = chromeSendResolverMap[id];
    assert(resolver);
    delete chromeSendResolverMap[id];
    if (isSuccess) {
        resolver.resolve(response)
    } else {
        resolver.reject(response)
    }
}
export function sendWithPromise(methodName, ...args) {
    const promiseResolver = new PromiseResolver;
    const id = methodName + "_" + createUid();
    chromeSendResolverMap[id] = promiseResolver;
    chrome.send(methodName, [id].concat(args));
    return promiseResolver.promise
}
const webUiListenerMap = {};
export function webUIListenerCallback(event, ...args) {
    const eventListenersMap = webUiListenerMap[event];
    if (!eventListenersMap) {
        return
    }
    for (const listenerId in eventListenersMap) {
        eventListenersMap[listenerId].apply(null, args)
    }
}
export function addWebUiListener(eventName, callback) {
    webUiListenerMap[eventName] = webUiListenerMap[eventName] || {};
    const uid = createUid();
    webUiListenerMap[eventName][uid] = callback;
    return {
        eventName: eventName,
        uid: uid
    }
}
export function removeWebUiListener(listener) {
    const listenerExists = webUiListenerMap[listener.eventName] && webUiListenerMap[listener.eventName][listener.uid];
    if (listenerExists) {
        const map = webUiListenerMap[listener.eventName];
        delete map[listener.uid];
        return true
    }
    return false
}
assert(!window.cr);
Object.assign(window, {
    cr: {
        webUIResponse: webUIResponse,
        webUIListenerCallback: webUIListenerCallback
    }
});
