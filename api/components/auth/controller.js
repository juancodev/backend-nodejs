const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLE = 'auth';

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/mysql');
  }

  async function login(username, password) {
    const data = await store.query(TABLE, {
      username: username
    });
    const equals = await bcrypt.compare(password, data.password)
      .then((areEquals) => {
        if (areEquals === true) {
          delete data.password;
          return auth.sign(data);
        } else {
          throw new Error('Invalid credential');
        }
      })
      .catch(error => console.error(error));

    return equals;
  }

  async function upsert(data) {
    const authData = {
      id: data.id,
    }

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLE, authData);
  }

  return {
    upsert,
    login,
  }
};