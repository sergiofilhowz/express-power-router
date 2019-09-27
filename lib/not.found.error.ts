import HttpError from './http.error';

/*
 * The NotFoundError object
 */
class NotFoundError extends HttpError {
  /**
   * @param {string} message   the message
   * @param {Object} [data]    aditional data to throw
   */
  constructor(message: string, data?: any) {
    super(message, 404, data);
  }
}

export default NotFoundError;