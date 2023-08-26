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

module.exports = {
  list
}