const redis = require('redis');
const config = require('../config');

const client = redis.createClient({
  // host: config.cacheService.dbHost,
  // port: config.cacheService.dbPort,
  // password: config.cacheService.dbPass
  url: `redis://${config.cacheServices.user}:${config.cacheServices.password}@${config.cacheServices.host}:${config.cacheServices.port}`
});

(async () => {
  await client.connect();
  console.log('Conectado a REDIS');
})();


async function list(table) {
  const value = await client.get(table);
  return JSON.parse(value);
}

async function get(table, id) {
  const value = await client.get(`${table}_${id}`);
  return JSON.parse(value);
}

async function upsert(table, data) {
  let key = table;
  if (data && data.id) {
    key += '_' + data.id;
  }
  await client.set(key, JSON.stringify(data));
  return true;
}

module.exports = {
  list,
  get,
  upsert
}