exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("menu_item").then(function() {
    // Inserts seed entries
    return knex("menu_item").insert([
      {
        item_name: "pizza",

        photo_of_order:
          "https://www.pngfind.com/pngs/m/327-3272002_free-png-pizza-png-png-image-with-transparent.png",
        review_id: 1,
        food_rating: 3.0
      },  {
        item_name: "Whopper",

        photo_of_order:
          "https://www.stickpng.com/assets/images/5882488ae81acb96424ffaaf.png",
        review_id: 2,
        food_rating: 4.0
      },
      {
        item_name: "Big Mac",

        photo_of_order:
          "https://i.redd.it/bydegsnwwhp11.png",
        review_id: 3,
        food_rating: 4.5
      },  {
        item_name: "spaghetti and meatballs",

        photo_of_order:
          "https://www.pastapass.com/images/dish1.png",
        review_id: 4,
        food_rating: 5.0
      }, {
        item_name: "Chicken steak fish and chips",

        photo_of_order:
          "https://www.pngkey.com/png/detail/21-216126_chicken-steak-fish-and-chips.png",
        review_id: 5,
        food_rating: 5.0
      },  {
        item_name: "BBQ hot wings",

        photo_of_order:
          "http://www.pngmart.com/files/8/Grilled-Food-PNG-Clipart-Background.png",
        review_id: 6,
        food_rating: 4.0
      }
    ]);
  });
};
