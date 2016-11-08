'use strict';

var HttpError = require('./http.error');

/**
 * The BadRequestError object
 *
 * @param {string} message   the message
 * @param {number} code      the HTTP error code
 * @param {Object} [data]    aditional data to throw
 * @constructor
 *
 * @typedef {Error} BadRequestError
 */
class BadRequestError extends HttpError {
    constructor(message, data) {
        super(message, 400, data);
    }
}

module.exports = BadRequestError;