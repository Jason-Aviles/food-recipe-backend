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
  find_verify
};
// async function findBydetail_id(id) {
//   return await db("other")
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

// async function findBydetail() {
//   return await db("other")
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
//***************************************** */

async function insert_verify(user) {
  return await db("verification")
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}
async function find_verify(id) {
  try {
    return db("verification")
      .where({ id: Number(id) })
      .first();
  } catch (error) {
    console.log(error);
  }
}

//***************************************** */

async function find_review() {
  try {
    return db("menu_item_review");
  } catch (error) {
    console.log(error);
  }
}

async function findById_review(id) {
  try {
    return db("menu_item_review")
      .where({ id: Number(id) })
      .first();
  } catch (error) {
    console.log(error);
  }
}

async function findById_fulltable(id) {
  try {
    return db("fulltable")
      .where({ id: Number(id) })
      .first();
  } catch (error) {
    console.log(rror);
  }
}

async function insert_review(user) {
  try {
    return db("menu_item_review")
      .insert(user)
      .then(ids => ({ id: ids[0] }));
  } catch (error) {
    console.log(error);
  }
}

async function update_review(id, user) {
  try {
    return db("menu_item_review")
      .where("id", Number(id))
      .update(user);
  } catch (error) {
    console.log(error);
  }
}

async function remove_review(id) {
  try {
    return db("menu_item_review")
      .where("id", Number(id))
      .del();
  } catch (error) {
    console.log(error);
  }
}

//menu item

async function find_menu() {
  try {
    return db("menu_item");
  } catch (error) {
    console.log(error);
  }
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
  await db("fulltable")
    .insert(user)
    .then(id => ({ id: id[0] }))
    .catch(err => console.log(err));
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

async function findById_other(id) {
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

async function findBydetail() {
  return await db("fulltable")
    .innerJoin("menu_item", "fulltable.menu_id", "menu_item.user_id")
    .select("*");
}

async function findBydetail_id(id) {
  return await db("fulltable")
    .innerJoin("menu_item", "fulltable.menu_id", "menu_item.user_id")
    .join("other", "fulltable.other_id", "other.user_id")
    .join("menu_item_review", "fulltable.review_id", "menu_item_review.user_id")
    .select(
      "menu_item.id",
      "price",
      "food_rating",
      "comments",
      "item_name",
      "restaurant_name",
      "photo_of_order",
      "food_rating"
    )
    .where("fulltable.menu_id", id);
}
