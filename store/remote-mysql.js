const remote = require('./remote');
const config = require('../config');

module.exports = new remote(config.mysqlServices.host, config.mysqlServices.port);