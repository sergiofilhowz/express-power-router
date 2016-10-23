var _ = require('lodash');

/**
 * This service handles interceptors, to configure and to use inside {@link Controller}
 *
 * @param {Promise} Promise
 * @typedef {Object} interceptorManager
 */
module.exports = function interceptorManager(Promise) {
    'use strict';

    var self = this;

    this.add = add;
    this.intercept = intercept;

    /**
     * Configured interceptors
     * @type {Array}
     */
    this.interceptors = [];

    /**
     * @callback interceptorCheck
     * @param {Object} parameters       The parameters configured on {@link Controller}
     * @param {ExpressRequest} req      The express request object
     * @param {ExpressResponse} res     The express response object
     * @returns {boolean} must return true or false indicating this interceptor must be executed
     */

    /**
     * @callback interceptorExecution
     * @param {Object} parameters       The parameters configured on {@link Controller}
     * @param {ExpressRequest} req      The express request object
     * @param {ExpressResponse} res     The express response object
     * @param {Object} stack            The stack object
     * @param {Function} stack.next     Use to invoke the next stacked callback, returning a {@link Promise}
     * @returns {Promise}                Must return a {@link Promise}
     */

    /**
     * @callback interceptorCallback
     * @param {ExpressRequest} req      The express request object
     * @param {ExpressResponse} res     The express response object
     */

    /**
     * @param options {Object}
     * @param options.execute {interceptorExecution} Callback to execute the interceptor
     * @param options.intercepts {interceptorCheck}  Callback to check whether the interceptor must execute
     */
    function add(options) {
        self.interceptors.push(options);
    }

    /**
     * Will check the configured interceptors if they will execute and then stack
     * these interceptors to invoke them on a queue
     *
     * @param {Object} parameters             the parameters configured on {@link Controller}
     * @param {ExpressRequest} req            the express request object
     * @param {ExpressResponse} res           the express response object
     * @param {interceptorCallback} callback  the callback to be called after all interceptors
     * @returns {Promise}
     */
    function intercept(parameters, req, res, callback) {
        var stack = {
            next : function () {
                return Promise.resolve()
                    .then(() => callback(req, res));
            }
        };

        _.forEachRight(self.interceptors, function (interceptor) {
            if (interceptor.intercepts(parameters, req)) {
                var oldStack = stack;
                stack = {
                    next : function () {
                        return Promise.resolve().then(() => {
                            var result = interceptor.execute(parameters, req, res, oldStack);
                            return result || oldStack.next();
                        });
                    }
                };
            }
        });

        return stack.next();
    }

    return this;
};