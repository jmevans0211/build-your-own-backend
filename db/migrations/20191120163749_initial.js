exports.up = knex => {
  return Promise.all([
    knex.schema.createTable('continents', (table) => {
      table.increments('id').primary();
      table.string('continent');
      table.integer('land_area');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('countries', (table) => {
      table.increments('id').primary();
      table.string('country');
      table.integer('happinessScore');
      table.integer('continent_id').unsigned();
      table.foreign('continent_id')
        .references('continents.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = knex => {
  return Promise.all([
    knex.schema.dropTable('countries'),
    knex.schema.dropTable('continents')
  ])
};
