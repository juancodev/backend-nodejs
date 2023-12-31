const db = {
  'user': [{
    id: '1',
    name: 'Juan'
  }]
};

async function list(table) {
  return db[table] || [];
}

async function get(table, id) {
  const collection = await list(table);
  return collection.find(item => item.id === id) || null;
}

async function upsert(table, data) {
  if (!db[table]) {
    db[table] = [];
  }
  console.log(db)
  return await db[table].push(data);
}

function remove(table, id) {
  return true;
}

async function query(table, consult) {
  const collection = await list(table);
  let keysObject = Object.keys(consult);
  let key = keysObject[0];
  return collection.find(item => item[key] === consult[key]) || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
}