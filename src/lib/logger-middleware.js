'use strict';

const logger = './logger';

module.exports = (request, response, next) => {
  logger.log(logger.INFO, `Processing a ${request.method} on ${request.url}`);
  return next();
};
