'use strict';

/**
 * Setting Jade View Engine for Frontend
 */
module.exports.extension = function() {
    var options = twee.getConfig('twee:options:viewEngine');

    if (options.disabled) {
        return;
    }

    var jade = require('jade')
        , path = require('path')
        , extend = require('../../utils/extend');

    function renderTemplate(template, variables, callback) {
        if (variables.error) {
            variables.error.template = template;
        }

        return jade.renderFile(template, extend(options.jade.options, variables), callback, variables.error || {});
    }

    var app = twee.getApplication();
    app.engine(options.jade.engineExtension, renderTemplate);
    app.set('view engine', options.jade.engineExtension);
    app.set('views', [path.join(twee.getBaseDirectory(), 'modules')]);

    // In development environment disable cache
    if (app.get('env') === 'development') {
        app.set('view cache', false);
    }
};
