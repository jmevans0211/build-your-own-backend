// PLEASE NOTE:
  //comments are made AFTER line of code
  //a conscious effort was made to NOT copy and paste commented lines from other endpoints
    //if anything seems inconsistant, please feel free to ask.
    //the decision to not copy and paste similar lines of code was for my own practice and to demonstrate I can explain the process in a variety of ways
  //anything ending with `...` will be followed up on the next commented line starting with `...` 

const express = require('express');
//gets access the express framework
const app = express();
//makes 'app' an express app
const environment = process.env.NODE_ENV || 'development';
//specifies environment that application would be running in
const configuration = require('./knexfile')[environment];
//requiring environment from knexfile, hence the bracket notation specifing `environment` from above
const database = require('knex')(configuration);
//connecting to databse through knex using the enviormnet settings that have been specified above


app.set('port', process.env.PORT || 3000);
//accessing our local port, 3000
app.use(express.json());


app.get('/api/v1/continents', (request, response) => {
  //handling a get request for all of the continents. the callback function is our second argument taking two argumnets of resposne and request
  database('continents').select()
  //accessing the correct database, continents.
    .then((continents) => {
      response.status(200).json(continents)
    })
    //waiting for the continents data and if the get request has been made with success, make the status code 200 and json all continents data
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error, please try again later' });
      //if the request is not successful, respond with the status code will be a 500 internal server error
    });
});

app.get('/api/v1/countries', (request, response) => {
  //handles get request for all countries.
  database('countries').select()
  //accessing the correct database, countries.
    .then((countries) => {
      response.status(200).json(countries)
    })
     //waiting for the countries data and if the get request has been made with success, make the status code 200 and json all countries data
    .catch((error) => {
      response.status(500).json({ error: 'Internal server error, please try again later.' });
      //run the catch when the request has not been successful and respond with an internal server error (status code 500)
    });
});

app.get('/api/v1/continents/:id', (request, response) => {
  //handles get request for a single continent
  database('continents').where('id', request.params.id).select()
  //getting access to the countries data pace and selecting the country with the corresponding id
    .then(continent => {
      //waiting for success
      if (continent.length) {
        //if there is a continent row with the corresponding id...
        response.status(200).json(continent);
        //...respond with a 200 status code and json the continent info
      } else {
        //if there is no continent with that id...
        response.status(404).json({ 
          //... respond with a 404 status code and respond with the following string
          error: `Could not find continent with an id of ${request.params.id}`
        });
      }
    })
    .catch(error => {
      //catching that there was no success
      response.status(500).json({ error });
      //responding with a status code of 500 (internal server errror)
    });
});

app.get('/api/v1/countries/:id', (request, response) => {
  //handles get request for a single country
  database('countries').where('id', request.params.id).select()
  //getting access to the countries database, and then with the where statement, selecting that id corresponding to the id inputted into the url
    .then(country => {
      if (country.length) {
        response.status(200).json(country);
        //if there is a row (with a length, same as, length > 0) of data that corresponds to that id, json that country data as a response
      } else {
        response.status(404).json({ 
          error: `Could not find country with an id of ${request.params.id}`
          //if there is no row with that information, a 404 error will be returned
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error: 'Internal server error. Please try again later.' });
      //a catch if the server is down 
    });
});

app.post('/api/v1/continents', (request, response) => {
  //handles post request to post (add) a new continent
  const continent = request.body;
  //defining continent to be what is passed through in the request.body

  for(let requiredParameter of ['continent', 'land_area']) {
    //establishing that the required parameters are `continent` and `land_area`
    if(!continent[requiredParameter]) {
      //dynamic conditional stating that if there is no required parameter (defined above) to...
      return response.status(422).send({ error: `Expected format: { continent: <String>, land_area: <Integer>}. You're missing a ${requiredParameter} property.`})
      //... respond with a status code of 422 and the string above
    }
  }

  database('continents').insert(continent, 'id')
  //establishing the database we are looking for is the continents database
  // the insert method will insert the continent (taken from the request body as described above) as well as an id
  .then(continent => {
      //in the event that everything is successful and the user put in the correct parameters...
      response.status(201).json({ id: continent[0] })
      //... there will be a response with a 201 status code assigning the id to the 0 index
    })
    .catch(error => {
      response.status(500).json({ error: 'Error adding a continent due to an internal server error. Please try again later.' })
      //if there is a server error there will be a catch and this will be returned to the user
    });
});

app.post('/api/v1/countries', (request, response) => {
  //handles post request for a new country
  const country = request.body;
  //establishing that country will be what is in the request.body input by the user

  for(let requiredParameter of ['country', 'happiness_score']) {
    //definiing that the `requiredParameter` is both `country` and `happiness_score`
    if(!country[requiredParameter]) {
      //if neither of the required parameters are present (as defined in the above comment)...
      return response.status(422).send({ error: `Expected format: { country: <String>, happiness_score: <Integer>}. You're missing a ${requiredParameter} property.`})
      //... return a response with the status code of 422 sending the error of the expected format
    }
  }

  database('countries').insert(country, 'id')
  //establishing the that we are looking to add to the countries database, taking in the country (defined above) and an id
    .then(country => {
      //when the request is successful with appropriate parameters in that request
      response.status(201).json({ id: country[0] })
      //... respond with a 201 status code and return the id
    })
    .catch(error => {
      response.status(500).json({ error: 'Error adding a country due to an internal server error. Please try again later.' })
      //if there is an issue with the server, send a 500 status code along with the above response
    });
});

app.delete('/api/v1/countries/:id', (request, response) => {
  //handles post request for a delete of an existing country
  const { id } = request.params;
  //deconstructing/defining id as it lives in the params of the request object

  database('countries')
  //establishing that this endpoint is using the countries database
    .where({ id: id}).select()
    //looking for and selecting that correct id
    .del()
    //delete the row
    .then(results => {
      // in the event that the request was successful
      if (results === 0) {
        //if there is no row (row === 0)...
        response.status(404).json(`Could not find country with the id of ${id}.`)
        //...respond with a 404 error and the above string
      } else {
        //if there IS a row (!row === 0)...
        response.status(200).json('Country was deleted with success.')
        //... respond with a status code of 200 and the above string
      }
    })
    .catch(error => {
      response.status(500).json({error: 'Internal server error, please try again.'})
      //when the request is not successful the catch is here to respond with a status code of 500 and the above string
    })
});

app.listen(process.env.PORT || 3000, () => {
  //telling the express app to look for the correct port, defaulting to 3000 as in localhost 3000
  console.log(`App is running on ${app.get('port')}`)
  //should show up in the console if running successfully
});
