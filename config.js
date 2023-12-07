module.exports = {
  api: {
    port: process.env.API_PORT || 3200,
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
    port: process.env.MYSQL_SRV_PORT || 3003
  }
}