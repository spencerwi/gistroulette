require.config({
    baseUrl: '/js',
    paths: {
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min',
        marionette: '//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/1.1.0-bundled/backbone.marionette.min'
    },
    shim: {
        underscore : {
            exports : '_'
        },
        backbone : {
            deps : ['underscore'],
            exports : 'Backbone'
        },
        marionette : {
            deps : ['underscore', 'backbone'],
            exports: 'Marionette'
        }
    }
});
require(['app'], function(app) {
    app.start();
});
