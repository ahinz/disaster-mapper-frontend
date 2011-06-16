$.subscribe("/update/nuke_content", function( content, map_div ) {
    //HACKALERT
    var center = create_latlng();
    var nuke_map = spawn_map(map_div, center, 7);

    $.map(content, function( powerplant ) {
	var myLatLng = new google.maps.LatLng(powerplant.lat,powerplant.lon);
	var marker = new google.maps.Marker({
	    position: myLatLng, 
	    map: nuke_map, 
	    title: "Nuclear Power Plant: " + powerplant.name
	});  
	//
    });		  
    
    
    var jq = $("#nuke_content .replace");
    jq.html(jq.html().replace("_num_", content.length).replace("_radius_","50 miles"));
    
    var tbl = $("#nuke_content table");
    $.map(content, function( nuke ) {
	tbl.append("<tr><td> " + nuke.name + "</td><td>" + nuke.lat + "</td><td> " + nuke.lon + "</td></tr>");
    });
    if (content.length == 0) {
	tbl.append("<tr><td style=\"text-align: center;\" colspan=\"3\">No Nuclear Facilities Found</td></tr>");
    }
    
});