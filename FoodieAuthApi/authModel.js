const db = require("../database/dbConfig");

module.exports = {
  find_review,
  findBydetail,
  findById_review,
  insert_review,
  update_review,
  remove_review,
  findBydetail_id,
  findById_menu,
  find_menu,
  insert_menu,
  remove_menu,
  update_menu,
  findById_other,
  find_other,
  insert_other,
  remove_other,
  update_other,
  fulltable

};

async function findBydetail_id(id) {
  return await db("other")
    .innerJoin("menu_item", "other.menu_id", "menu_item.id")

    .select(
      "menu_item.id",
      "comments",
      "price",
      "item_name",
      "food_rating",
      "wait_time",
      "review_id",
      "date_of_visit",
      "photo_of_order"
    )
    .where("other.menu_id", id);
}

async function findBydetail() {
  return await db("other")
    .innerJoin("menu_item", "other.menu_id", "menu_item.id")
    .select(
      "menu_item.id",
      "comments",
      "price",
      "item_name",
      "food_rating",
      "wait_time",
      "date_of_visit",
      "photo_of_order"
    );
}

async function findMoreId(id) {
  return await db("menu_item_review")
    .innerJoin("menu_item", "menu_item_review.menu_id", "menu_item.id")
    .select(
      "menu_item.id",
      "restaurant_name",
      "restaurant_type",
      "item_name",
      "food_rating",
      "photo_of_order"
    )
    .where("menu_item_review.menu_id", id);
}
async  function find_review() {
  return await db("menu_item_review");
}

async function findById_review(id) {
  return await db("menu_item_review")
    .where({ id: Number(id) })
    .first();
}


async  function insert_review(user) {
  return await db("menu_item_review")
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

async function update_review(id, user) {
  return await db("menu_item_review")
    .where("id", Number(id))
    .update(user);
}

async  function remove_review(id) {
  return await db("menu_item_review")
    .where("id", Number(id))
    .del();
}

//menu item

async function find_menu() {
  return await db("menu_item");
}

async function findById_menu(id) {
  return await db("menu_item")
    .where({ id: Number(id) })
    .first();
}

async function insert_menu(user) {
  return await db("menu_item")
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

async function fulltable(user) {
  return await db("fulltable")
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}


 async function update_menu(id, user) {
  return await db("menu_item")
    .where("id", Number(id))
    .update(user);
}

 async function remove_menu(id) {
  return await db("menu_item")
    .where("id", Number(id))
    .del();
}

//other

 async function find_other() {
  return await db("other");
}

async function   findById_other(id) {
  return await db("other")
    .where({ id: Number(id) })
    .first();
}

async function insert_other(user) {
  return await db("other")
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

async function update_other(id, user) {
  return await db("other")
    .where("id", Number(id))
    .update(user);
}

async function remove_other(id) {
  return await db("other")
    .where("id", Number(id))
    .del();
}
