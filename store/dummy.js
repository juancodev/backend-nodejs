const db = {
  'user': [{
    id: '1',
    name: 'Juan'
  }]
};

async function list(table) {
  return db[table];
}

async function get(table, id) {
  const collection = await list(table);
  return collection.find(item => item.id === id) || null;
}

async function upsert(table, data) {
  return await db[table].push(data);
}

function remove(table, id) {
  return true;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
}