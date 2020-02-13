const db = require("../database/dbConfig");

module.exports = {
  add,
  findBy,
  findByusername,
  findByemail,update_password
};

function findBy(filter) {
  return db("users").where(filter)
    .then(row => row);;
}
 function findByusername(username) {

 
  return   db("users")
    .where({ username: username }).first().then(row => row);;
   

 
  
  
}


async function findBypassword(password) {
   await db("users")
    .where({ password: password })
    .first()
    .then(row => row);
}

 function findByemail(email) {

    return db("users")
    .where({ email: email })
    
    .then(row => row);
 
 
}

function add(item) {
  return db("users")
    .insert(item)
    .then(ids => ({ id: ids[0] }));
}


 function update_password(email,password) {
  return  db("users")
    .where({email:email})
    .update(password);
}