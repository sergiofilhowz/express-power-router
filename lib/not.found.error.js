'use strict';

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
class NotFoundError extends Error {
    constructor(message, code, data) {
        super(message);
        this.code = code || 400;
        this.data = data || {};
        this.name = 'NotFoundError';
    }
}

module.exports = NotFoundError;