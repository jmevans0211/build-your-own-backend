exports.up = function(knex) {
  return knex.schema.table('countries', (table) => {
    table.renameColumn('happinessScore', 'happiness_score')
  })
};

exports.down = function(knex) {
  return knex.schema.table('countries', (table) => {
    table.dropColumn('happiness_score')
  })
};