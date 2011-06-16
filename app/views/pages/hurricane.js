$.subscribe("/update/hur_content", function( json, hur_map_div ) {

    var center = create_latlng();
    var hur_map = spawn_map(hur_map_div, center, 2);

    $.map(json, function( hurricane ) {
	var path = $.map(hurricane.path, function( ll ) {
	    var lls = ll.split(",");
	    return new google.maps.LatLng(lls[0],lls[1]);
	});

	new google.maps.Polyline({
	    strokeColor: '#00ff00',
	    strokeOpacity: 1.0,
	    strokeWeight: 3,
	    map: hur_map,
	    path: path
	});
    });
});
