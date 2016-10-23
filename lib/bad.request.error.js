'use strict';

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
class BadRequestError extends Error {
    constructor(message, code, data) {
        super(message);
        this.code = code || 400;
        this.data = data || {};
        this.name = 'BadRequestError';
    }
}

module.exports = BadRequestError;