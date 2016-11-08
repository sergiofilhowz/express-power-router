var HttpError = require('./http.error'),
    express = require('express');

module.exports = function (options, rootRouter, interceptorManager, Promise) {
    'use strict';

    this.create = create;

    function create(id) {
        var controller = new Controller(id);
        if (options.autoInitRoutes !== false) {
            controller.$init();
        }
        return controller;
    }

    function handle(res, err, result) {
        if (err) {
            if (err instanceof HttpError) {
                res.status(err.code).json({
                    message : err.message,
                    data : err.data
                });
            } else {
                console.error(err);
                res.status(500).json({
                    message : 'Internal server error',
                    data : {}
                });
            }
        } else if (!res.ended) {
            res.json(result);
        }
    }

    function Controller(id) {
        this.router = express.Router();
        this.id = id;
        this.map = {
            post : this.router.post.bind(this.router),
            put : this.router.put.bind(this.router),
            get : this.router.get.bind(this.router),
            delete : this.router.delete.bind(this.router)
        };
    }

    Controller.GET = 'get';
    Controller.POST = 'post';
    Controller.PUT = 'put';
    Controller.DELETE = 'delete';

    Controller.prototype.add = function (parameters) {
        parameters = parameters || {};

        var method = parameters.method || Controller.GET,
            path = parameters.path,
            callback = parameters.callback,
            fn = this.map[method],
            promise;

        parameters.method = method;
        parameters.path = this.id + path;
        parameters.path = parameters.path.replace('//', '/');

        fn(path, (req, res) => {
            var end = res.end;
            res.end = function () {
                this.ended = true;
                return end.apply(res, arguments);
            }

            promise = this.defaultAction ? this.defaultAction(req, res) : Promise.resolve();
            promise.then(() => interceptorManager.intercept(parameters, req, res, callback))
                .then(result => handle(res, null, result))
                .catch(err => handle(res, err));
        });
    };

    Controller.prototype.get = function (path, callback, options) {
        return this.internalAdd(Controller.GET, path, callback, options);
    };

    Controller.prototype.post = function (path, callback, options) {
        return this.internalAdd(Controller.POST, path, callback, options);
    };

    Controller.prototype.put = function (path, callback, options) {
        return this.internalAdd(Controller.PUT, path, callback, options);
    };

    Controller.prototype.delete = function (path, callback, options) {
        return this.internalAdd(Controller.DELETE, path, callback, options);
    };

    Controller.prototype.internalAdd = function (method, path, callback, options) {
        options = options || {};
        options.path = path;
        options.callback = callback;
        options.method = method;
        this.add(options);
        return this;
    };

    Controller.prototype.$refresh = function (oldController) {
        oldController.router = this.router;
    };

    Controller.prototype.$init = function () {
        rootRouter.use(this.id, (req, res, next) => this.router(req, res, next));
    };

    return this;
};