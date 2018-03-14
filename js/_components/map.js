////////////////////////////////////////////////////////////////////////////////
//
//    Mapbox Map
//
////////////////////////////////////////////////////////////////////////////////
if( $('body').hasClass('layout--roadtrip') ){




  var containerElement   = $('.roadtrip'),
      mapElement         = $('.roadtrip__map'),
      startLocation      = startEnd.features[0].geometry.coordinates,
      endLocation        = startEnd.features[1].geometry.coordinates,
      pointHopper        = {};

  // GeoJSON feature collection for the start
  var start = turf.featureCollection([turf.point(startLocation)]);
  // GeoJSON feature collection for the end
  var end = turf.featureCollection([turf.point(endLocation)]);
  // empty feature collection will be used as the data source for the route before users add any new data
  var nothing = turf.featureCollection([]);
  // an empty GeoJSON feature collection for waypoints
  var stopoffs = turf.featureCollection([]);

  // sizes map to full window height
  $(document).ready(function(){
    mapElement.css({"height": $(window).height() });
  });

  // hide all inactive content panes on page load
  $('.roadtrip__section').not('.roadtrip__section--active').hide();






  //////////////////////////////////////////////////////////////////////////////// SETTINGS

  mapboxgl.accessToken = 'pk.eyJ1IjoiaGFtaXNoamdyYXkiLCJhIjoiY2pkbjBmeGN6MDd1YzMzbXI3cWdpNThjayJ9.3YE8T1H2QUyqNIkxdKWxkg';

  // Init map with settings
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hamishjgray/cjdn0g91q24ef2sp9ead7rl4s',
    center: mapCenter,
    logoPosition: 'bottom-right',
    zoom: mapZoom
  });
  map.scrollZoom.disable();
  map.addControl(new mapboxgl.NavigationControl());

  //////////////////////////////////////////////////////////////////////////////// FUNCTIONS

  function newStopoff(marker) {

    // Make a request to the Optimization API
    $.ajax({
      method: 'GET',
      url: assembleQueryURL(),
    }).done(function(data) {
      // Create a GeoJSON feature collection
      var routeGeoJSON = turf.featureCollection([turf.feature(data.trips[0].geometry)]);

      // If there is no route provided, reset
      if (!data.trips[0]) {
        routeGeoJSON = nothing;
      } else {
        map.getSource('route')
          .setData(routeGeoJSON);
      }

    });
  }

  function updateStopoffs(geojson) {
    map.getSource('stopoffs-symbol')
      .setData(geojson);
  }

  function objectToArray(obj) {
    var keys = Object.keys(obj);
    var routeGeoJSON = keys.map(function(key) {
      return obj[key];
    });
    return routeGeoJSON;
  }

  function assembleQueryURL() {
    var coordinates = [];
    var waypoints = objectToArray(pointHopper);

    if (waypoints.length > 0) {
      waypoints.forEach(function(d, i) {
        coordinates.push(d.geometry.coordinates);
      });
    }

    // Set the profile to `driving`
    // Coordinates will include the current location of the end,
    return 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/' + startLocation + ';' + coordinates.join(';')  + ';' + endLocation + '?overview=full&roundtrip=false&steps=true&geometries=geojson&source=first&destination=last&access_token=' + mapboxgl.accessToken;
  }






  //////////////////////////////////////////////////////////////////////////////// ON MAP LOAD RUN FUNCTIONS

  map.on('load', function() {

    map.addSource('route', {
      type: 'geojson',
      data: nothing
    });

    map.addLayer({
      id: 'routeline-active',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': {
          base: 1,
          stops: [[12, 3], [22, 12]]
        }
      }
    });

    map.addLayer({
      id: 'routearrows',
      type: 'symbol',
      source: 'route',
      layout: {
        'symbol-placement': 'line',
        'text-field': '▶',
        'text-size': {
          base: 1,
          stops: [[12, 24], [22, 60]]
        },
        'symbol-spacing': {
          base: 1,
          stops: [[12, 30], [22, 160]]
        },
        'text-keep-upright': false
      },
      paint: {
        'text-color': '#3887be',
        'text-halo-color': 'hsl(55, 11%, 96%)',
        'text-halo-width': 3
      }
    });

    // Start icon
    map.addLayer({
      id: 'start',
      type: 'circle',
      source: {
        data: start,
        type: 'geojson'
      },
      paint: {
        'circle-radius': 10,
        'circle-color': 'white',
        'circle-stroke-color': '#8bbe38',
        'circle-stroke-width': 2
      }
    });

    // End icon
    map.addLayer({
      id: 'end',
      type: 'circle',
      source: {
        data: end,
        type: 'geojson'
      },
      paint: {
        'circle-radius': 10,
        'circle-color': 'white',
        'circle-stroke-color': '#3887be',
        'circle-stroke-width': 2
      }
    });

    // Waypoints icon
    map.addLayer({
      id: 'stopoffs-symbol',
      type: 'symbol',
      source: {
        data: stopoffs,
        type: 'geojson'
      },
      layout: {
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
        'icon-image': 'marker-15',
      }
    });


    // Once page is fully loaded run requests for markers and route
    markers.features.forEach(function(marker) {
      var pt = turf.point(
        marker.geometry.coordinates, {
          title: marker.properties.title,
          id: marker.properties.id,
          key: marker.properties.num
        }
      );
      stopoffs.features.push(pt);
      pointHopper[pt.properties.key] = pt;
    });

    newStopoff();

    map.getSource('stopoffs-symbol').setData(stopoffs);

  });






  //////////////////////////////////////////////////////////////////////////////// CLICK FUNCTIONS

  // function to move map to marker based on given markerID
  function activateMarker(markerId){
    // loop through all markers in geojson
    for (var i = 0; i < markers.features.length; i++) {
      if (markers.features[i].properties.id == markerId) {
        map.flyTo({
          zoom: mapFocusZoom,
          center: markers.features[i].geometry.coordinates
        });
      }
    }
    // loop over start and end points
    for (var i = 0; i < startEnd.features.length; i++) {
      if(startEnd.features[i].properties.id == markerId) {
        map.flyTo({
          zoom: mapFocusZoom,
          center: startEnd.features[i].geometry.coordinates
        });
      }
    }

    // update content panel
    $('.roadtrip__section--active').fadeOut().scrollTop(0).removeClass('roadtrip__section--active');
    $('.roadtrip__section').each(function(){
      if( $(this).data('marker-id') == markerId ){
        $(this).fadeIn().addClass('roadtrip__section--active');
      }
    });

  }

  function mapReset(){
    map.flyTo({
      zoom: mapZoom,
      center: mapCenter
    });

    // update content panel
    $('.roadtrip__section--active').fadeOut().scrollTop(0).removeClass('roadtrip__section--active');
    $('.roadtrip__section.roadtrip__intro').fadeIn().addClass('roadtrip__section--active');
  }


  $(document).scroll(function() {

    var st = $(document).scrollTop();
    var docH = $(document).height();
    var winH = $(window).height();
    var footerH = $('footer').height();

    var pageH = docH - footerH - winH;

    // fixed position map on scroll so it fills window height
    if( ( st>containerElement.offset().top ) && ( st<pageH ) ){
      mapElement.removeClass('js-map-bottom');
      mapElement.addClass('js-map-fixed');
    }else if( ( st>containerElement.offset().top ) && ( st>pageH ) ){
      mapElement.removeClass('js-map-fixed');
      mapElement.addClass('js-map-bottom');
    }else {
      mapElement.removeClass('js-map-fixed');
      mapElement.removeClass('js-map-bottom');
    }

    // $('.js-waypoint').each(function(){
    //   var markerId = $(this).data('marker-id');
    //   var offset = $(this).offset().top;
    //   // if waypoint is scrolled to, move map to related marker
    //   if(st>offset){
    //     activateMarker(markerId);
    //   }
    //
    // });

  });


  // click section in pane to move the map to related marker
  $('.js-waypoint-link').click(function(){
    var markerId = $(this).data('marker-id');
    // flyto marker
    activateMarker(markerId);
  });

  // click link to jump to map pin, doesn't update the pane
  $('.js-map-link').click(function(){
    var markerId = $(this).data('marker-id');

    for (var i = 0; i < markers.features.length; i++) {
      if (markers.features[i].properties.id == markerId) {
        map.flyTo({
          zoom: mapFocusZoom,
          center: markers.features[i].geometry.coordinates
        });
      }
    }
    for (var i = 0; i < startEnd.features.length; i++) {
      if(startEnd.features[i].properties.id == markerId) {
        map.flyTo({
          zoom: mapFocusZoom,
          center: startEnd.features[i].geometry.coordinates
        });
      }
    }

  });

  // reset map to original position and zoom
  $('.js-map-reset').click(function(){
    mapReset();
  });

  // arrow key navigation
  $(document).on('keyup', function(e) {
    if(e.which === 37){
      var prevBtn = $('.roadtrip__section--active .js-waypoint-link--prev');
      var markerId = prevBtn.data('marker-id');
      activateMarker(markerId);
    }else if(e.which === 39) {
      var nextBtn = $('.roadtrip__section--active .js-waypoint-link--next');
      var markerId = nextBtn.data('marker-id');
      activateMarker(markerId);
    }
  });


}