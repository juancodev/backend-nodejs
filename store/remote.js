const axios = require('axios');

function createRemoteDB(host, port) {

  const remoteDataBaseCall = axios.create({
    baseURL: `http://${host}:${port}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  function list(table) {
    return req({
      method: 'GET',
      url: `/${table}`
    });
  }

  // function get(table, id)

  // function upsert(table, data)

  // function query(table, query, join)

  async function req({
    method,
    url,
    data
  }) {

    const response = await remoteDataBaseCall({
      method,
      url,
      data
    });
    return response.data.body;
  }

  return {
    list
  }
}

module.exports = createRemoteDB;