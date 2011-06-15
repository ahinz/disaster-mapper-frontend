    $.subscribe("/update/flood_content", function( content ) {
	var json = content;
	return;
	$.map(json.geo, function( polygon ) {
	    var gmap = $.map(polygon, function( ar ) {
		var pts = ar.split(" ")
		return new google.maps.LatLng(pts[1],pts[0]);
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



