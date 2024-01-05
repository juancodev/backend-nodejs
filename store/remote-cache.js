const remote = require('./remote');
const config = require('../config');

module.exports = new remote(config.cacheServices.host, config.cacheServices.port);