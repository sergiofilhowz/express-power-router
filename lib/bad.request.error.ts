import HttpError from './http.error';

/**
 * The BadRequestError object
 */
export default class BadRequestError extends HttpError {
  /**
   * @param {string} message   the message
   * @param {Object} [data]    aditional data to throw
   */
  constructor(message: string, data?: any) {
    super(message, 400, data);
  }
}