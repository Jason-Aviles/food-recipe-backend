
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user')
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id:1,username: 'test' ,password:'test'},
      
      ]);
    });
};
