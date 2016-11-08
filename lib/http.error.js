'use strict';

/**
 * The HttpError object
 *
 * @param {string} message   the message
 * @param {number} code      the HTTP error code
 * @param {Object} [data]    aditional data to throw
 * @constructor
 *
 * @typedef {Error} HttpError
 */
class HttpError extends Error {
    constructor(message, code, data) {
        super(message);
        this.code = code || 500; // default is internal server error
        this.data = data || {};
    }
}

module.exports = HttpError;