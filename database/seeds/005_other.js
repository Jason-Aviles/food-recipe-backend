exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("other").then(function() {
    // Inserts seed entries
    return knex("other").insert([
      {
        comments: "this is a great place to eat",
        price: 7.45,
        wait_time: "30min",
        date_of_visit: "01/30/2019",
        menu_id: 1
      }, {
        comments: "fast fun service",
        price: 8.74,
        wait_time: "10min",
        date_of_visit: "02/05/2019",
        menu_id: 2
      }, {
        comments: "i order with no pickles and received pickles i will not be returning",
        price: 8.00,
        wait_time: "9min",
        date_of_visit: "03/10/2019",
        menu_id: 3
      },  {
        comments: "my favorite go to spot ",
        price: 12.10,
        wait_time: "40min",
        date_of_visit: "05/27/2019",
        menu_id: 4
      }, {
        comments: "the right amount of spice and the right amount of alcohol i <3 this place",
        price: 13.24,
        wait_time: "45min",
        date_of_visit: "04/09/2019",
        menu_id: 5
      }, {
        comments: "mm i had better wings",
        price: 15.00,
        wait_time: "40min",
        date_of_visit: "01/30/2019",
        menu_id: 6
      }
    ]);
  });
};
