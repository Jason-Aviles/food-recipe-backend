
const db = require('../database/dbConfig')


module.exports ={
  add,findBy
}


 function findBy(filter) {
 return db('user').where(filter);
}


 function add(item) {
  return  db("user")
    .insert(item)
    .then(ids => ({ id: ids[0] }));
}