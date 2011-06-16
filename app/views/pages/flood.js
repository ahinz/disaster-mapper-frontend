$.subscribe("/update/flood_content", function( content, map_div ) {
    var center = create_latlng();
    var flood_map = spawn_map(map_div, center, 11);

	var json = content;

	$.map(json.geo, function( polygon ) {
	    var gmap = $.map(polygon, function( ar ) {
		return new google.maps.LatLng(ar[1],ar[0]);
	    });

	    new google.maps.Polygon({
		paths: gmap, 
		strokeColor: "#FF0000",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FF0000",
		fillOpacity: 0.35,
		map: flood_map
	    });
	});

	var jq = $("#flood_content .replace");
	jq.html(jq.html().replace("_zone_", content.attr.FLD_ZONE));
    });



