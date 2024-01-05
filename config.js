module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.API_PORT || 3200,
  },
  post: {
    port: process.env.POST_PORT || 3004,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'jmontilla123',
    database: process.env.MYSQL_DB || 'backend_node',
  },
  mysqlServices: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3003
  },
  cacheServices: {
    user: process.env.DB_USER || 'default',
    password: process.env.DB_PASSWORD || 'uHg1gpg8x75Kjpz7RCMPM8UoVDfY7gbE',
    host: process.env.CACHE_SRV_HOST || 'redis-12778.c323.us-east-1-2.ec2.cloud.redislabs.com',
    port: process.env.CACHE_SRV_PORT || 12778
  }
}