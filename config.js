module.exports = {
  api: {
    port: process.env.API_PORT || 3200,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret'
  }
}