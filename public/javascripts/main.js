
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

function bind_ajax(latlng, event, url, div, map) {
    $.ajax({
	url: URL + url,
	dataType: 'jsonp',
	data: {
	    lat: latlng.lat(),
	    lon: latlng.lng()
	},
	success: function( ajax_content ) {
	    $.publish(event, [ ajax_content, map ]);		      
	    div.removeClass("content");
	}
    });
}

function build_content_div(contentp,header,map_id,url) {

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

    var map = spawn_map(map_id,center,10);

    bind_ajax(create_latlng(), "/update/" + contentp, url, content, map);
}
  //URL = "http://api.adamhinz.com/"
  //URL = "http://localhost:4567/"
URL = "http://api.disastermapper.com/"

$(function() {
    center = create_latlng();
    
    create_content();
});
