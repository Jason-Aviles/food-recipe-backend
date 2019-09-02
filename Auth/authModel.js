
const db = require('../database/dbConfig')


module.exports ={
  add,findBy
}


async function findBy(filter) {
  return await db('users').where(filter);
}


 function add(item) {
   db("users")
    .insert(item)
    .then(ids => ({ id: ids[0] }));
}