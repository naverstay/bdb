var all_pins = [],
  map_timer,
  all_tooltips = [],
  mapProp = {
    zoom: 16,
    // disableDefaultUI: true,
    scrollwheel: false,
    // navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    styles: [{"stylers": [{"hue": "#ff1a00"}, {"invert_lightness": true}, {"saturation": -100}, {"lightness": 33}, {"gamma": 0.5}]}, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{"color": "#2D333C"}]
    }]
  },
  gmap,
  center;

function checkMapSize() {
  clearTimeout(map_timer);

  map_timer = setTimeout(function () {
    //var mapW = $('.mapWrapper');

    //mapW.css('width', wnd.width() - mapW.offset().left);

    if (gmap && center) gmap.setCenter(center);
  }, 50);
}

function loadMap() {

  // без таймаута не работает :(

  setTimeout(function () {
    center = new google.maps.LatLng(55.783742, 49.125809);
    gmap = new google.maps.Map(document.getElementById("bdb_map"), mapProp);
    gmap.setCenter(center);

    createPin(gmap, 'BDB', {
      lat: 55.783742,
      lng: 49.125809
    }, 'i/bdb_logo.svg');

  }, 0);
}

function createPin(target_map, name, latlng, icon, icon_hover, magic_top_offset) {
  var img = new Image(), marker;

  if (icon && icon.length) {
    $(img).one('load', function () {
      var image = new google.maps.MarkerImage(
        icon,
        new google.maps.Size(img.width, img.height),
        new google.maps.Point(0, 0),
        new google.maps.Point((img.width / 2).toFixed(), img.height + (magic_top_offset || 0))
      );

      marker = new google.maps.Marker({
        position: latlng,
        map: target_map,
        icon: image,
        title: name
      });

      if (icon_hover && icon_hover.length) {
        google.maps.event.addListener(marker, 'mouseover', function () {
          marker.setIcon(icon_hover);
        });
        google.maps.event.addListener(marker, 'mouseout', function () {
          marker.setIcon(icon);
        });
      }

      return marker;
    });

    img.src = icon;

  } else {
    marker = new google.maps.Marker({
      position: latlng,
      map: target_map,
      title: name
    });

    if (icon_hover && icon_hover.length) {
      google.maps.event.addListener(marker, 'mouseover', function () {
        marker.setIcon(icon_hover);
      });
      google.maps.event.addListener(marker, 'mouseout', function () {
        marker.setIcon(icon);
      });
    }

    return marker;
  }
}

$(window).resize(function () {

  checkMapSize();

});

$(function ($) {
  checkMapSize();
});
