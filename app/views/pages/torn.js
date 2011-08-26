function decode_loss(loss) {
    if (loss < 1) {
	return "<$50";
    } else {
	return ">$50";
    }
}

$.subscribe("/update/torn_content", function( content, map_div ) {

    var center = create_latlng();
    var torn_map = spawn_map(map_div, center, 7);

    var json = content;
    var jq = $("#torn_content .replace");
    jq.html(jq.html().replace("_num_", content.length).replace("_radius_","50 miles"));
    
    var tbl = $("#torn_content table");
    $.map(content, function( torn  ) {
	tbl.append("<tr><td>" + torn.date + "</td>" +
		   "<td>" + torn.f + "</td>" + 
		       "<td>" + decode_loss(torn.loss) + "</td>" +
		   "<td>" + torn.lat + "</td>" +
		   "<td>" + torn.lon + "</td></tr>");
    });
    	
    $.map(json, function( ll ) {
	var myLatLng = new google.maps.LatLng(ll.lat,ll.lon);
	var marker = new google.maps.Marker({
	    position: myLatLng, 
	    map: torn_map, 
	    icon: "http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png",
		title: ll.date
	});  
    });
});
