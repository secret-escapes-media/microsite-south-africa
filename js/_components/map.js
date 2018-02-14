////////////////////////////////////////////////////////////////////////////////
//
//    Mapbox Map
//
////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////// SETTINGS

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFtaXNoamdyYXkiLCJhIjoiY2pkbjBmeGN6MDd1YzMzbXI3cWdpNThjayJ9.3YE8T1H2QUyqNIkxdKWxkg';

// Init map with settings
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/hamishjgray/cjdn0g91q24ef2sp9ead7rl4s',
  center: [12.471999, 42.074841],
  logoPosition: 'bottom-right',
  zoom: 5.5
});
map.scrollZoom.disable();

// additional map settings
var activeClass        = 'is-active',
    markerClass        = 'marker',
    panelItemClass     = 'place',
    transparent        = 'rgba(0,0,0,0)',
    activeMarkerFill   = 'rgba(143,48,57,.15)',
    activeMarkerStroke = 'rgba(185,27,44,1)' ;



//////////////////////////////////////////////////////////////////////////////// FUNCTIONS

// keeps italy focused in viewport
function centerMap() {
  map.fitBounds(
    [[7.8,35.5], [18.5,47.1]],
    { speed: 3 }
  );
}

// animates focusing on active marker
function flyToMarker(obj) {
  map.flyTo({
    center: obj.geometry.coordinates,
    zoom: 6
  });
}

// highlights activated marker & opens place info in side panel
function activateMarker(markerId) {

  // error message if no marker id
  if (!(markerId)) {
    console.error('please pass a markerId for activeMarker()');
    return false;
  }

  // reset active marker if there is one
  var activeId = $('body').attr('data-active-marker');
  if (activeId) {
    var activeMarker = $('.' + markerClass + '.' + activeClass);
    var activePanel  = $('.' + panelItemClass + '.' + activeClass);

    // remove active marker & panel
    activeMarker.removeClass(activeClass);
    activePanel.removeClass(activeClass);

    // remove global reference
    $('body').attr('data-active-marker', '' );
  }

  // find elements for active marker & place
  var theMarker = $('.' + markerClass + '--' + markerId);
  var thePanel  = $('.' + panelItemClass + '--' + markerId);

  // set global reference
  $('body').attr( "data-active-marker", markerId );

  // add class to marker & panel
  theMarker.addClass(activeClass);
  thePanel.addClass(activeClass);

  // Changes map focus to active marker
  for (var i = 0; i < markers.features.length; i++) {
    // loop through all markers in geojson
    if (markers.features[i].properties.id == markerId) {
      // if id matches, use coordinates to in flyto function
      flyToMarker(markers.features[i]);
    }
  }

}



//////////////////////////////////////////////////////////////////////////////// ON MAP LOAD

// functions for when map has finished loading
map.on('load', function(e) {

  centerMap();

  // Adding markers to the map. Positions in js/makers.js
  map.addLayer({
    id: 'locations',
    type: 'symbol',
    source: {
      type: 'geojson',
      data: markers
    }
  });

  var lineCoordinates = [];

  // START - marker loop
  // adds each marker to the map
  markers.features.forEach(function(marker) {

    // create a DOM element for the marker
    var el                  = document.createElement('div');
        el.className        = 'marker marker--' + marker.properties.id + ' js-marker';
        el.dataset.markerId = marker.properties.id;

    // add listener for each marker
    el.addEventListener('click', function() {
      // get id of the clicked marker
      var chosenId = el.dataset.markerId;
      // highlight this marker
      activateMarker(chosenId);
    });

    lineCoordinates.push(marker.geometry.coordinates);

    // add this marker to map canvas
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);

  }); // END - marker loop

  // add listener for each place on side panel
  $('.' + panelItemClass).on('click',function(e) {
    e.preventDefault();
    // get id of the clicked place
    var chosenId = $(this).data('marker-id');
    // highlight this marker
    activateMarker(chosenId);
  });

  console.log(lineCoordinates);

  map.addLayer({
      "id": "route",
      "type": "line",
      "source": {
          "type": "geojson",
          "data": {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "LineString",
                  "coordinates": lineCoordinates
              }
          }
      },
      "layout": {
          "line-join": "round",
          "line-cap": "round"
      },
      "paint": {
          "line-color": "#888",
          "line-width": 8
      }
  });

});

