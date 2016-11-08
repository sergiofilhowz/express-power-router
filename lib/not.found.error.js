'use strict';

var HttpError = require('./http.error');

/**
 * The NotFoundError object
 *
 * @param {string} message   the message
 * @param {number} code      the HTTP error code
 * @param {Object} [data]    aditional data to throw
 * @constructor
 *
 * @typedef {Error} NotFoundError
 */
class NotFoundError extends HttpError {
    constructor(message, data) {
        super(message, 404, data);
    }
}

module.exports = NotFoundError;