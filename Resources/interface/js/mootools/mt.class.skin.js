var Skin = new Class({

    Extends: Template,

    // Implement the new Templated class
    Implements: Options,

    // The UI template with attachpoints and attachevents
    options: {},

    // The magical constructor
    initialize: function(options) {
        reX.debug("[Skin]  Initialize");

        // Set the options
        this.setOptions(options);

        // Parse the template
        this.parse();
    }
});