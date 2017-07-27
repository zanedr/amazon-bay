
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('items', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('description');
      table.string('picture');
      table.integer('price');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('purchasehistory', function(table) {
      table.increments('id').primary();
      table.string('price');

      table.timestamps(true, true);
    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('purchasehistory'),
    knex.schema.dropTable('items')
  ]);
};

