exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("menu_item_review").then(function() {
    // Inserts seed entries
    return knex("menu_item_review").insert([
      {
        restaurant_name: "Pizza Hut",
        restaurant_type: "Italian-American cuisine",
        user_id: 1,
        menu_id: 1
      } , {
        restaurant_name: "Burger King",
        restaurant_type: "Fast Food",
        user_id: 2,
        menu_id: 2
      },  {
        restaurant_name: "Mcdonalds",
        restaurant_type: "Fast-Food",
        user_id: 3,
        menu_id: 3
      },  {
        restaurant_name: "olive garden",
        restaurant_type: "Italian cuisine",
        user_id: 4,
        menu_id: 4
      } , {
        restaurant_name: "Chili's Grill & Bar ",
        restaurant_type: "American cuisine",
        user_id: 5,
        menu_id: 5
      },  {
        restaurant_name: " Buffalo Wild Wings",
        restaurant_type: "American cuisine",
        user_id: 6,
        menu_id: 6
      }
    ]);
  });
};
