// this is geojson inside of a variable so can call in main script
// this geojson is the position of each hotel in each region

var markers = {
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "Marche",
        "id": "highlight-1"
      },
      "geometry": {
        "coordinates": [
          13.012363,
          43.381079
        ],
        "type": "Point"
      },
      "id": "1"
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Veneto",
        "id": "highlight-2"
      },
      "geometry": {
        "coordinates": [
          11.686055,
          45.551396
        ],
        "type": "Point"
      },
      "id": "2"
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Puglia",
        "id": "highlight-3"
      },
      "geometry": {
        "coordinates": [
          16.463198,
          41.093262
        ],
        "type": "Point"
      },
      "id": "3"
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Sicily",
        "id": "highlight-4"
      },
      "geometry": {
        "coordinates": [
          13.644962,
          37.631542
        ],
        "type": "Point"
      },
      "id": "4"
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Sardinia",
        "id": "highlight-5"
      },
      "geometry": {
        "coordinates": [
          9.081884,
          40.093629
        ],
        "type": "Point"
      },
      "id": "5"
    }
  ],
  "type": "FeatureCollection"
};