
function spawn_map(elmt,center, zoom) {
    var myOptions = {
      zoom: zoom,
	center: center,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    return new google.maps.Map(document.getElementById(elmt),
        myOptions);
}

var flood_map = null;
var torn_map = null;
var epa_map = null;
var hur_map = null;
var nuke_map = null;

function build_content_div(contentp,header,map_id) {
    var content = $("#" + contentp);
    var content_html = content.html();

    var infobox_tmpl = null;
    var spinner_image = '<img alt="Loading" id="img-spinner" src="/images/spinner.gif" />'
    
    if (map_id != undefined) {
	infobox_tmpl =
	'<div class="infobox collapse" id="' + contentp + '">'+ 
	'<div class="header"><div style="float:left"><h2>' + header + '</h2></div><div class="spinner" style="float:right;">' +
	spinner_image +
	'</div></div>' +
	'<div style="width:70%; float: left">' + content_html + '</div>' +
	'<div id="' + map_id + '" style="width:30%; height:200px; float: right"></div>' +
	    '<div style="clear: both"></div>' +  
	'</div>'
    } else {
	infobox_tmpl =
	    '<div class="infobox collapse" id="' + contentp + '">' +
	    '<div class="header"><h2>' + header + '</h2>' +
	    spinner_image +
	    '</div>' +
	    '<div style="width:100%; float: left">' + content_html + '</div>' +
	    '<div style="clear:both"></div>' +
	    '</div>';
    }	

    infobox_tmpl = infobox_tmpl + '<div style="clear:both"></div>';
	
    $.subscribe("/update/" + contentp, function( event ) {
	$("#" + contentp + " .spinner").remove();
	$("#" + contentp).removeClass("collapse");
	$(".main").removeClass("height");
    });

    content.remove();
    $("#infoboxes").append(infobox_tmpl);
}
 
  function initialize(center) {
      flood_map = spawn_map("flood_map",center,10);
      torn_map = spawn_map("torn_map",center,7);
      epa_map = spawn_map("epa_map",center,13);
      hur_map = spawn_map("hur_map",center,2);
      nuke_map = spawn_map("nuke_map",center,7);
  }

  //URL = "http://api.adamhinz.com/"
URL = "http://localhost:4567/"

  $(function() {
/*      var address = $.url().param("address");
      var latlng = null;

      create_content();

      $.ajax({
          url: URL + "geocode",
	  dataType: 'jsonp',
	  data: {
	      address: address
	  },
	  success: function( ll ) {
	      latlng = new google.maps.LatLng(ll.lat, ll.lon);
	      initialize(latlng);	 
	      process();
	  }
      });     
*/

      function process( latlng ) {
	  /*
	  $.ajax({
	      url: "http://localhost:4566/earthquakes/area",
	      dataType: 'jsonp',
	      data: {
		  lat_min: 37.959409,
		  lat_max: 42.195969,
		  lon_min: -81.430664,
		  lon_max: -72.168945
	      },
	      success: function(json) {
		  $.map(json, function( eq_square ) {
		      lat = eq_square.lat;
		      lon = eq_square.lon;

		      var ll1 = new google.maps.LatLng(lat,lon)
		      var ll2 = new google.maps.LatLng(lat + 0.05,lon)
		      var ll3 = new google.maps.LatLng(lat + 0.05,lon + 0.05)
		      var ll4 = new google.maps.LatLng(lat,lon + 0.05)		     

		      var color = "#0000" + (255.0 * eq_square.val / eq_square.max).toString(16)

		      new google.maps.Polygon({
			  paths: [ll1,ll2,ll3,ll4], 
			  strokeColor: color,
			  strokeOpacity: 0.0,
			  strokeWeight: 2,
			  fillColor: color,
			  fillOpacity: 0.2,
			  map: map
		      });

		  });
	      }
	  });
*/
	  function bind_ajax(latlng, event, url) {
	      $.ajax({
		  url: URL + url,
		  dataType: 'jsonp',
		  data: {
		      lat: latlng.lat,
		      lon: latlng.lng
		  },
		  success: function( ajax_content ) {
		      $.publish(event, [ ajax_content ]);
		  }
	      });
	  }

	  bind_ajax(latlng,"/update/hur_content","hurricanes");
	  bind_ajax(latlng,"/update/torn_content","tornados");
	  bind_ajax(latlng,"/update/flood_content","flood");
	  bind_ajax(latlng,"/update/epa_content","epa");
	  bind_ajax(latlng,"/update/nuke_content","hazards");
      }

      latlng = create_latlng();
      process(latlng);
  });
