/*global require, requirejs, console */

require([
    'almond',
    'jqueryloader',
    'underscoreloader',
    'Dispatcher',
    'Debug',
    'foxneod'], function (almond, jquery, underscore, Dispatcher, Debug, foxneod) {
    'use strict';

    //This function is called once the DOM is ready, notice the value for 'domReady!' is the current document.

    var dispatcher = new Dispatcher(),
        debug = new Debug('core');

    (function () {
        if (underscore.isUndefined(window['@@packageName'])) //protects against the file being loaded multiple times
        {
            if (!window.jQuery || !window.$)
            {
                debug.log("jQuery didn't exist, so we're assigning it");
                window.jQuery = jquery;
            }

            window._ = underscore;
            debug.log('jQuery version after noConflict is', jquery().jquery);
            debug.log('Underscore version after noConflict is', underscore.VERSION);

            window['@@packageName'] = window.$f = foxneod;
            foxneod._init();
            dispatcher.dispatch('ready', {}, true);
            debug.log('@@packageName assigned to window.@@packageName and window.$f');
        }
        else
        {
            debug.error('The @@packageName library has already been loaded into the page. Fix this!!!');
        }
    })();
});