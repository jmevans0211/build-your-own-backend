# Country Happiness

<table>
  <tr>
    <th></th>
  </tr>
  <tr>
    <td></td>
  </tr>
</table>

This is an API to get the countries and their happiness ranking.

https://country-happiness-score.herokuapp.com/

***

## Endpoints

i. GET all continents

ii. GET all countries

iii. GET a single continent

iv. GET a single country

v. POST a new continent

vi. POST a new country

vii. DELETE and existing country

### GET all continents

This endpoint will get all continent info.

`'/api/v1/continents'`

### Response

<table>
  <tr>
    <th>Status</th>
    <th>Response</th>
  </tr>
  <tr>
    <td>200</td>
    <td>returns all continents</td>
  </tr>
</table>

### Response Parameters

<table style="width:100%">
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>integer</td>
    <td>unique id for each individual continent</td>
  </tr>
  <tr>
    <td>continent</td>
    <td>string</td>
    <td>continent name</td>
  </tr>
    <tr>
    <td>land_area</td>
    <td>integer</td>
    <td>the land area of continent in miles squared </td>
  </tr>
</table>

<details>
  <summary>Example Response</summary>

```javascript
[
    {
        "id": 79,
        "continent": "Asia",
        "land_area": 16921556,
        "created_at": "2019-11-21T18:31:13.233Z",
        "updated_at": "2019-11-21T18:31:13.233Z"
    },
    {
        "id": 80,
        "continent": "Africa",
        "land_area": 11728037,
        "created_at": "2019-11-21T18:31:13.240Z",
        "updated_at": "2019-11-21T18:31:13.240Z"
    },
    {
        "id": 81,
        "continent": "North America",
        "land_area": 9458315,
        "created_at": "2019-11-21T18:31:13.239Z",
        "updated_at": "2019-11-21T18:31:13.239Z"
    },
    {
        "id": 82,
        "continent": "South America",
        "land_area": 6889679,
        "created_at": "2019-11-21T18:31:13.240Z",
        "updated_at": "2019-11-21T18:31:13.240Z"
    },
    {
        "id": 83,
        "continent": "Europe",
        "land_area": 3943281,
        "created_at": "2019-11-21T18:31:13.242Z",
        "updated_at": "2019-11-21T18:31:13.242Z"
    },
    {
        "id": 84,
        "continent": "Australia",
        "land_area": 3478238,
        "created_at": "2019-11-21T18:31:13.244Z",
        "updated_at": "2019-11-21T18:31:13.244Z"
    },
    {
        "id": 85,
        "continent": "Antarctica",
        "land_area": 76567654,
        "created_at": "2019-11-23T20:37:22.952Z",
        "updated_at": "2019-11-23T20:37:22.952Z"
    }
]
```
</details>


### GET all countries

### GET a single continent

This endpoint will get a single continent.

`'/api/v1/continents/:id'`

#### Query Parameters
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>integer</td>
    <td>unique id</td>
  </tr>
</table>

#### Response
<table>
  <tr>
    <th>Status</th>
    <th>Response</th>
  </tr>
  <tr>
    <td>200</td>
    <td>404</td>
  </tr>
    <tr>
    <td>returns that single continent</td>
    <td>returns "Could not find country with an id of [id]"</td>
  </tr>
</table>

#### Response Parameters

<table style="width:100%">
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>integer</td>
    <td>unique id for each individual continent</td>
  </tr>
  <tr>
    <td>continent</td>
    <td>string</td>
    <td>continent name</td>
  </tr>
    <tr>
    <td>land_area</td>
    <td>integer</td>
    <td>the land area of continent in miles squared </td>
  </tr>
</table>

<details>
  <summary>Example Response</summary>
  
  ```javascript
      {
        "id": 82,
        "continent": "South America",
        "land_area": 6889679,
        "created_at": "2019-11-21T18:31:13.240Z",
        "updated_at": "2019-11-21T18:31:13.240Z"
    }
  ```
</details
  


### GET a single country

### POST a new continent

### POST a new country

### DELETE an existing country
