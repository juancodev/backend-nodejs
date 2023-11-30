const nanoid = require('nanoid');
const TABLE = 'user';
const auth = require('../auth'); // search the storage of production

module.exports = (injectedStore) => {
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/dummy');
  }

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id)
  }

  async function following(user) {
    const join = {}
    join[TABLE] = 'user_to'; // {user: 'user_to'}
    const query = {
      user_from: user
    };

    return await store.query(TABLE + '_follow', query, join);
  }

  async function upsert(body) {
    const user = {
      name: body.name,
      username: body.username,
    }

    if (body.id) {
      user.id = body.id
    } else {
      user.id = nanoid();
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password
      })
    }

    return store.upsert(TABLE, user);
  }

  function follow(from, to) {
    return store.upsert(TABLE + '_follow', {
      user_from: from,
      user_to: to
    });
  }

  return {
    list,
    get,
    upsert,
    follow,
    following,
  }
}