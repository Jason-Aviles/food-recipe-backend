const db = require("../database/dbConfig");

module.exports = {
  add,
  findBy,
  findByusername,
  findByemail,update_password
};

function findBy(filter) {
  return db("users").where(filter).first()
    .then(row => row);;
}

async function findByusername(username) {
  return await db("users")
    .where({ username: username })
    .first()
    .then(row => row);
}

async function findByemail(email) {
  return await db("users")
    .where({ email: email })
    .first()
    .then(row => row);
}

function add(item) {
  return db("users")
    .insert(item)
    .then(ids => ({ id: ids[0] }));
}


async function update_password(email,password) {
  return await db("users")
    .where({email:email})
    .update(password);
}