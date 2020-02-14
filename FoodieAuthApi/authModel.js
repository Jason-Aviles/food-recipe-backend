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
  fulltable,
  findById_fulltable,
  insert_verify,
  find_verify,
  last
};
// function findBydetail_id(id) {
//   return  db("other")
//     .innerJoin("menu_item", "other.menu_id", "menu_item.id")

//     .select(
//       "menu_item.id",
//       "comments",
//       "price",
//       "item_name",
//       "food_rating",
//       "wait_time",
//       "review_id",
//       "date_of_visit",
//       "photo_of_order"
//     )
//     .where("other.menu_id", id);
// }

// function findBydetail() {
//   return  db("other")
//     .innerJoin("menu_item", "other.menu_id", "menu_item.id")
//     .select(
//       "menu_item.id",
//       "comments",
//       "price",
//       "item_name",
//       "food_rating",
//       "wait_time",
//       "date_of_visit",
//       "photo_of_order"
//     );
// }

function findMoreId(id) {
  return db("menu_item_review")
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
//***************************************** */

function insert_verify(user) {
  return db("verification")
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}
function find_verify(id) {
  try {
    return db("verification")
      .where({ id: Number(id) })
      .first();
  } catch (error) {
    console.log(error);
  }
}

//***************************************** */

function find_review() {
  try {
    return db("menu_item_review");
  } catch (error) {
    console.log(error);
  }
}

function findById_review(id) {
  try {
    return db("menu_item_review")
      .where({ id: Number(id) })
      .first();
  } catch (error) {
    console.log(error);
  }
}

function findById_fulltable(id) {
  try {
    return db("fulltable")
      .where({ id: Number(id) })
      .first();
  } catch (error) {
    console.log(rror);
  }
}

function insert_review(user) {
  try {
    return db("menu_item_review")
      .insert(user)
      .then(ids => ({ id: ids[0] }));
  } catch (error) {
    console.log(error);
  }
}

function update_review(id, user) {
  try {
    return db("menu_item_review")
      .where("id", Number(id))
      .update(user);
  } catch (error) {
    console.log(error);
  }
}

function remove_review(id) {
  try {
    return db("menu_item_review")
      .where("id", Number(id))
      .del();
  } catch (error) {
    console.log(error);
  }
}

//menu item

function find_menu() {
  try {
    return db("menu_item");
  } catch (error) {
    console.log(error);
  }
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

function fulltable(user) {
  return db("fulltable")
    .insert(user)
    .then(id => ({ id: id[0] }))
    .catch(err => console.log(err));
}

function update_menu(id, user) {
  return db("menu_item")
    .where("id", Number(id))
    .update(user);
}

function remove_menu(id) {
  try {
    db("menu_item")
      .where("id", Number(id))
      .del();
  } catch (error) {
    console.log(error);
  }
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

function findBydetail() {
  return db("fulltable")
    .innerJoin("menu_item", "fulltable.menu_id", "menu_item.user_id")
    .select("*");
}

function findBydetail_id(id) {
  return db("fulltable")
    .innerJoin("menu_item", "fulltable.menu_id", "menu_item.user_id")
    .join("other", "fulltable.other_id", "other.user_id")
    .join("menu_item_review", "fulltable.review_id", "menu_item_review.user_id")
    .first()
    .select(
      "menu_item.id as id",
      "price",
      "food_rating",
      "comments",
      "item_name",
      "restaurant_name",
      "photo_of_order",
      "food_rating"
    )
    .where("menu_item.id", id);
}

function getAllEntries(id) {
  const entries = db("entries")
    .join("children", "entries.children_id", "children.id")
    .join("foods", "entries.food_id", "foods.id")
    .select("*")
    .where("children.id", id);
  return entries;
}

function last(id,other) {

  return db("other")
  
  .join('users','other.user_id' ,'users.id ')
  .leftJoin('menu_item','menu_item.user_id' ,'users.id ')

  
    .where("other.user_id" ,id).andWhere("other.id",other).andWhere("menu_item.user_id",id)
}
