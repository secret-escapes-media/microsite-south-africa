// this is geojson inside of a variable so can call in main script
// this geojson is the position of each hotel in each region
var startEnd = {
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "Johannesburg",
        "id": "johannesburg"
      },
      "geometry": {
        "coordinates": [
          28.046636,
          -26.204650
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Durban",
        "id": "durban"
      },
      "geometry": {
        "coordinates": [
          31.015211,
          -29.805921
        ],
        "type": "Point"
      },
    }
  ],
  "type": "FeatureCollection"
};

var markers = {
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "Isandlwana",
        "id": "isandlwana",
        "num": 1
      },
      "geometry": {
        "coordinates": [
          30.651389,
          -28.357968
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Hluhluwe",
        "id": "hluhluwe",
        "num": 2
      },
      "geometry": {
        "coordinates": [
          32.279581,
          -28.026383
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "St Lucia",
        "id": "st-lucia",
        "num": 3
      },
      "geometry": {
        "coordinates": [
          32.414195,
          -28.372755
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Nelson Mandela Capture Site",
        "id": "nelson-mandela",
        "num": 4
      },
      "geometry": {
        "coordinates": [
          30.169597,
          -29.468719
        ],
        "type": "Point"
      },
    }
  ],
  "type": "FeatureCollection"
};