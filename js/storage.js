/*global define */

define([
    'lodash',
    'jquery',
    'utils',
    'Debug',
    'Dispatcher',
    'cookies'
], function (_, jquery, utils, Debug, Dispatcher, cookies) {
    'use strict';

    var debug = new Debug('storage'),
        dispatcher = new Dispatcher('storage'),
        _keyValueStore = {};

    //////////////////////////////////////////////// private methods...
    ////////////////////////////////////////////////



    //////////////////////////////////////////////// public methods...
    var now = function () {
        return {
            get: function (key) {
                if (_.has(_keyValueStore, key))
                {
                    return _keyValueStore[key];
                }

                return undefined;
            },
            set: function (key, value) {
                _keyValueStore[key] = value;
            },
            getAll: function () {
                return _.cloneDeep(_keyValueStore);
            }
        };
    };
    ////////////////////////////////////////////////



    //////////////////////////////////////////////// initialize...
    (function init () {

    })();
    ////////////////////////////////////////////////




    //////////////////////////////////////////////// public api...
    return {
        now: now,

        //event listening
        addEventListener: dispatcher.on,
        on: dispatcher.on,
        getEventListeners: dispatcher.getEventListeners,
        hasEventListener: dispatcher.hasEventListener,
        removeEventListener: dispatcher.removeEventListener
    };
    ////////////////////////////////////////////////
});