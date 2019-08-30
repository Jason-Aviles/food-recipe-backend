
const db = require('../database/dbConfig')


module.exports ={
  add,findBy
}


async function findBy(filter) {
  return await db('users').where(filter);
}



async function add(item) {
  return await db("users")
    .insert(item)
    .then(ids => ({ id: ids[0] }));
}