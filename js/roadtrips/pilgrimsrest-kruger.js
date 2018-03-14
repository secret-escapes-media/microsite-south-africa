


// Coordinates for center of roadtrip map
var mapCenter = [31.332340, -24.721608];
var mapZoom = 8;
var mapFocusZoom = 10;


// Coordinates for roadtrip start and end.
// Separated from other markers so that they have a different appearance
var startEnd = {
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "Pilgrim’s Rest",
        "id": "pilgrims-rest"
      },
      "geometry": {
        "coordinates": [
          30.754438,
          -24.891418
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Hazyview",
        "id": "hazyview"
      },
      "geometry": {
        "coordinates": [
          31.137528,
          -25.052768
        ],
        "type": "Point"
      },
    }
  ],
  "type": "FeatureCollection"
};



// Roadtrip waypoints/markers
var markers = {
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "Graskop",
        "id": "graskop",
        "num": 1
      },
      "geometry": {
        "coordinates": [
          30.844219,
          -24.932776
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "God's Window",
        "id": "gods-window",
        "num": 2
      },
      "geometry": {
        "coordinates": [
          30.888822,
          -24.876565
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Waterfalls",
        "id": "waterfalls",
        "num": 3
      },
      "geometry": {
        "coordinates": [
          30.835790,
          -24.861668
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Bourke’s Luck Potholes",
        "id": "bourkes-luck-potholes",
        "num": 4
      },
      "geometry": {
        "coordinates": [
          30.807375,
          -24.672518
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Three Rondavels",
        "id": "three-rondavels",
        "num": 5
      },
      "geometry": {
        "coordinates": [
          30.798157,
          -24.573672
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Kruger",
        "id": "kruger",
        "num": 6
      },
      "geometry": {
        "coordinates": [
          31.270180,
          -24.553456
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Satara Camp",
        "id": "satara-camp",
        "num": 7
      },
      "geometry": {
        "coordinates": [
          31.787310,
          -24.405935
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Tshokwane",
        "id": "tshokwane",
        "num": 8
      },
      "geometry": {
        "coordinates": [
          31.856933,
          -24.785403
        ],
        "type": "Point"
      },
    }
  ],
  "type": "FeatureCollection"
};