
const db = require('../database/dbConfig')


module.exports ={
  add,findBy
}


function findBy(filter) {
  return db('users').where(filter);
}



function add(item) {
  return db("users")
    .insert(item)
    .then(ids => ({ id: ids[0] }));
}