const db = require("../database/dbConfig");

module.exports = {
  find_review,
  findById_review,
  insert_review,
  update_review,
  remove_review,
  findall,
  findById_menu,
  find_menu,
  insert_menu,
  remove_menu,
  update_menu,
  findById_other,
  find_other,
  insert_other,
  remove_other,
  update_other
};

function findall(id) {
  return db.raw(
    `select  users.id,  restaurant_name, restaurant_type,item_name,food_rating

     from menu_item_review
     
     join users on menu_item_review.user_id = users.id 
     join menu_item on menu_item_review.user_id = menu_item.id 
      where menu_item_review.user_id = ?`,
    id
  );
}

function find_review() {
  return db("menu_item_review");
}

function findById_review(id) {
  return db("menu_item_review")
    .where({ id: Number(id) })
    .first();
}

function insert_review(user) {
  return db("menu_item_review")
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

function update_review(id, user) {
  return db("menu_item_review")
    .where("id", Number(id))
    .update(user);
}

function remove_review(id) {
  return db("menu_item_review")
    .where("id", Number(id))
    .del();
}

//menu item

function find_menu() {
  return db("menu_item");
}

function findById_menu(id) {
  return db("menu_item")
    .where({ id: Number(id) })
    .first();
}

function insert_menu(user) {
  return db("menu_item")
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

function update_menu(id, user) {
  return db("menu_item")
    .where("id", Number(id))
    .update(user);
}

function remove_menu(id) {
  return db("menu_item")
    .where("id", Number(id))
    .del();
}

//other

function find_other() {
  return db("other");
}

function findById_other(id) {
  return db("other")
    .where({ id: Number(id) })
    .first();
}

function insert_other(user) {
  return db("other")
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

function update_other(id, user) {
  return db("other")
    .where("id", Number(id))
    .update(user);
}

function remove_other(id) {
  return db("other")
    .where("id", Number(id))
    .del();
}
