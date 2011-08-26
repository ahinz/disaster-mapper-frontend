
$.subscribe("/update/epa_content", function( content, map_div ) {
    //HACKALERT
    var center = create_latlng();
    var epa_map = spawn_map(map_div, center, 13);


	var json = content;
	$.map(json, function( epa ) {
	    var myLatLng = new google.maps.LatLng(epa.lat,epa.lon);
	    var marker = new google.maps.Marker({
		position: myLatLng, 
		map: epa_map, 
		title: "EPA Site",
		icon: "http://www.google.com/intl/en_us/mapfiles/ms/micons/green-dot.png"
	    });  
	    //
	});



	var jq = $("#epa_content .replace");
	jq.html(jq.html().replace("_num_", content.length).replace("_radius_","3/4 miles"));

	var count = 0;
	var thresh = 5;
	var style = "";

	var tbl = $("#epa_content table");
	$.map(content, function( epa  ) {
	    if (count >= thresh) {
		style = 'class="hideme epa_hidden"'
	    }

	    tbl.append("<tr " + style + "><td><a href=\"" + epa.url + "\">" + epa.name + "</a></td>" +
		       "<td>" + epa.code + "</td>" +
		       "<td>" + epa.lat + "</td>" +
		       "<td>" + epa.lon + "</td></tr>");
	    count = count + 1;
	});

	if (count > thresh) {
	    $("#show_epa").append("Show " + (count - thresh) + " additional facilities");
	} else {
	    $("#show_epa").remove();
	}

	$.subscribe("/show/epa", function() {
	    $(".epa_hidden").each(function() {
		$(this).removeClass("hideme");
	    });
	});

    });
