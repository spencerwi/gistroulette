define(['backbone', 'marionette', 'underscore'], 
function(Backbone,   Marionette,   Underscore){

    /** Model **/ 
    var Gist = Backbone.Model.extend({ urlRoot: function() { return "/data/getRandomGist"; } });

    /** View **/
    var GistView = Marionette.ItemView.extend({
        template: _.template('<div></div>'),
        onRender: function() {
            var self = this;
            // timeout is needed because otherwise it misbehaves.
            setTimeout( function() { writeCapture.html('#gistDisplay', '<script src="' + self.model.get("embedFetchURL") + '"></script>') }, 1000);
        }
    });

    var ControlsView = Marionette.ItemView.extend({
        template: _.template('<button class="btn" id="another">Another?</button>'),
        events: {
            'click #another': 'fetchAnother'
        },
        fetchAnother: function() {
            app.vent.trigger("fetchAnother");
        }
    });

    /** App **/
    var app = new Marionette.Application();

    app.addInitializer(function() {
        window.app = app;
        app.addRegions({
            gistDisplay: "#gistDisplay",
            controls: "#controls"
        });
        app.isFetching = false;
        app.controls.show(new ControlsView());
    });

    app.fetchRandomGist = function() {
        if (app.isFetching) { return; }
        app.isFetching = true;
        app.gist = new Gist();
        app.gist.fetch({
            success: function(model, response, options) {
                app.isFetching = false;
                app.gistDisplay.show(new GistView({model: model}));
            },
            error: app.fetchRandomGist
        });
    };

    app.addInitializer(function(){
        this.listenTo(app.vent, "fetchAnother", this.fetchRandomGist);
    });
    app.addInitializer(app.fetchRandomGist);

    return app;
});
