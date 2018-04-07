
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'john', password: 'abc'},
        {id: 2, username: 'mary', password: 'cde'},
        {id: 3, username: 'phill', password: '123'}
      ]);
    });
};
