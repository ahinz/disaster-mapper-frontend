$.subscribe("/update/quake_content", function( content, map_div ) {
    var jq = $("#quake_content");
    $.each( content, function(key, value) {
	jq.html(jq.html().replace("_" + key + "_", parseFloat(value)));
    });
});
