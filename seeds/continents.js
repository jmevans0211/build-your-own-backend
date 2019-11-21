const continentsData = require('../continentsData')
const countriesData = require('../countriesData');

const createContinent = (knex, continent) => {
  return knex('continents').insert({
    continent: continent.continent,
    land_area: continent.landArea
  }, 'id')
  .then(continentId => {
    let countryPromises = [];

    countriesData.forEach(country => {
      if(country.continent === continent.continent) {
        countryPromises.push(
          createCountry(knex, {
            country: country.country,
            happinessScore: country.happinessScore,
            continent_id: continentId[0]
          })
        )
      }
    });

    return Promise.all(countryPromises);
  })
};

const createCountry = (knex, country) => {
  return knex('countries').insert(country);
};

exports.seed = knex => {
  return knex('countries').del()
    .then(() => knex('continents').del())
    .then(() => {
      let continentPromises = [];

      continentsData.forEach(continent => {
        continentPromises.push(createContinent(knex, continent));
      });

      return Promise.all(continentPromises)
    })
    .catch(error => console.log( `Error seeding data: ${error}`))
}
