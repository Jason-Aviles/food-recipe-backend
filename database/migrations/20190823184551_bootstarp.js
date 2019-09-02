exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl
        .string("username", 140)
        
        .notNullable();
      tbl.string("password", 140).notNullable();
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("menu_item_review", tbl => {
      tbl.increments();
      tbl
        .string("restaurant_name", 140)
        .unique()
        .notNullable();
      tbl.string("restaurant_type", 140).notNullable();
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        // this table must exist already
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("menu_id")
        .unsigned()
        .notNullable()
        .references("id")
        // this table must exist already
        .inTable("menu_item")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("menu_item", tbl => {
      tbl.increments();
      tbl.string("item_name", 140).notNullable();
      tbl.string("photo_of_order", 1000).notNullable();
      tbl.decimal("food_rating").notNullable();
      tbl
        .integer("review_id")
        .unsigned()
        .notNullable()
        .references("id")
        // this table must exist already
        .inTable("menu_item_review")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("other", tbl => {
      tbl.increments();
      tbl.string("comments", 500).notNullable();
      tbl.decimal("price").notNullable();
      tbl.string("wait_time").notNullable();
      tbl.date("date_of_visit").notNullable();
      tbl
        .integer("menu_id")
        .unsigned()
        .notNullable()
        .references("id")
        // this table must exist already
        .inTable("menu_item")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("other")
    .dropTableIfExists("menu_item")
    .dropTableIfExists("menu_item_review")
    .dropTableIfExists("users");
};
