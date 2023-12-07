const mysql = require('mysql2');

const config = require('../config');

const dbConfig = {
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

function handleConnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error('[db error]', err);
      setTimeout(handleConnect, 2000);
    } else {
      console.log('DB Connected');
    }

    connection.on('error', error => {
      console.error('[db error]', error);
      if (error.code === 'PROTOCOL_CONNECTION_LOST') {
        handleConnect();
      } else {
        throw error;
      }
    })
  })
}

handleConnect();

// get users

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);

      resolve(data);
    });
  })
};

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
      if (err) return reject(err);

      resolve(data);
    });
  })
};

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);

      resolve(result);
    })
  })
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
      if (err) return reject(err);

      resolve(result);
    })
  })
}

function upsert(table, data) {
  if (data && data.id) {
    return update(table, data);
  } else {
    return insert(table, data);
  }
}

function query(table, query, join) {
  let joinQuery = '';
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, result) => {
      if (err) return reject(err);

      resolve(result[0] || null);
    })
  })
}

module.exports = {
  list,
  get,
  upsert,
  query,
}