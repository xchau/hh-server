exports.up = function(knex) {
  return knex.schema.createTable('colors', (table) => {
    table
      .increments();
    table
      .string('hex')
      .notNullable()
      .defaultTo('#000');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('colors');
};
