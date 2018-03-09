


// Coordinates for center of roadtrip map
var mapCenter = [22.125686, -33.826789];
var mapZoom = 6;
var mapFocusZoom = 8;


// Coordinates for roadtrip start and end.
// Separated from other markers so that they have a different appearance
var startEnd = {
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "Cape Town",
        "id": "cape-town"
      },
      "geometry": {
        "coordinates": [
          18.423968,
          -33.925079
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Port Elizabeth",
        "id": "port-elizabeth"
      },
      "geometry": {
        "coordinates": [
          25.520924,
          -33.714450
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
        "title": "Winelands",
        "id": "winelands",
        "num": 1
      },
      "geometry": {
        "coordinates": [
          19.759058,
          -33.421854
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Mossel Bay",
        "id": "mossel-bay",
        "num": 2
      },
      "geometry": {
        "coordinates": [
          22.083164,
          -34.174318
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Wilderness",
        "id": "wilderness",
        "num": 3
      },
      "geometry": {
        "coordinates": [
          22.551418,
          -34.003350
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Plettenberg Safari",
        "id": "plettenberg-safari",
        "num": 4
      },
      "geometry": {
        "coordinates": [
          23.351693,
          -33.945536
        ],
        "type": "Point"
      },
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Nature's Valley",
        "id": "natures-valley",
        "num": 5
      },
      "geometry": {
        "coordinates": [
          23.645550,
          -33.967519
        ],
        "type": "Point"
      },
    }
  ],
  "type": "FeatureCollection"
};