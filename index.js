var express = require('express'),
    BadRequestError = require('./lib/bad.request.error'),
    NotFoundError = require('./lib/not.found.error'),
    InterceptorManager = require('./lib/interceptor'),
    Controller = require('./lib/controller');

function ExpressPowerRouter(options) {
    'use strict';
    options = options || {};

    let _Promise = options.Promise || Promise,
        router = express.Router(),
        interceptorManager = new InterceptorManager(_Promise),
        controller = new Controller(options, router, interceptorManager, _Promise);

    router.createInterceptor = function (config) {
        interceptorManager.add(config);
    };

    router.createRouter = function (id) {
        return controller.create(id);
    };

    return router;
}

ExpressPowerRouter.BadRequestError = BadRequestError;
ExpressPowerRouter.NotFoundError = NotFoundError;

module.exports = ExpressPowerRouter;