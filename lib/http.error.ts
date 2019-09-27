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
export default class HttpError extends Error {
  code:number;
  data:any;

  constructor(message: string, code: number, data: any) {
    super(message);
    this.code = code || 500; // default is internal server error
    this.data = data || {};
  }
}
