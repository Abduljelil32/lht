(function ($) {
  Drupal.behaviors.faa = {
    map: null,
    markers: [],
    searchUrl: "",
    infoWindow: null,
    results: null,
    resultTemplate: null,
    location: null,
    noResultsTemplate: null,
    errorTemplate: null,
    search: function(location) {
      var geocoder = new google.maps.Geocoder();
	  
      if(location != null && location.trim() != "") {
		  if(isValidUSZip(location))
	  {
		  location = 'zipcode+' + location;
		  //console.log('valid zip');
	  }
	geocoder.geocode({address: location}, function(results, status) {
	  if (status == google.maps.GeocoderStatus.OK) {
	    Drupal.behaviors.faa.location = results[0].geometry.location;
		//console.log(String(results[0].geometry.location));
	  } else {
	    // address not found
	  }
	  Drupal.behaviors.faa.searchLocations();
	});
      } else {
	Drupal.behaviors.faa.searchLocations();
      }
    },
    clearLocations: function () {
      for (var i = 0; i < Drupal.behaviors.faa.markers.length; i++) {
	Drupal.behaviors.faa.markers[i].setMap(null);
      }
      Drupal.behaviors.faa.markers.length = 0;
      Drupal.behaviors.faa.results.empty();
    },
    createMarker: function(obj) {
      var html = "<b>" + obj.full_name + "</b> <br/>" + obj.full_address;
      var marker = new google.maps.Marker({
	map: Drupal.behaviors.faa.map,
	position: new google.maps.LatLng(parseFloat(obj.latitude), parseFloat(obj.longitude))
      });
      marker.setIcon(Drupal.behaviors.faa.pins.inactive);
      google.maps.event.addListener(marker, 'click', function() {
	Drupal.behaviors.faa.setActive(obj.id, true);
      });
      marker.allergistId = obj.id;
      Drupal.behaviors.faa.markers.push(marker);
      Drupal.behaviors.faa.addResult(obj);
      return marker;
    },
    setActive: function(id, fromMarker) {
      $.each(Drupal.behaviors.faa.markers, function(){
	var marker = this;
	if(marker.allergistId == id) {
	  marker.setIcon(Drupal.behaviors.faa.pins.active);
	  marker.setAnimation(google.maps.Animation.BOUNCE);
	  var timeout = setTimeout(function(){
	    marker.setAnimation(null);
	    clearTimeout(timeout);
	  }, 1400);
	} else {
	  marker.setIcon(Drupal.behaviors.faa.pins.inactive);
	  marker.setAnimation(null);
	}
      });
	  
	  if(document.body.className.match('page-locate-an-allergist-profile'))
	  {
		  $('#faa-results .active').removeClass('active');
		  $('#faa-results #result-' + id).addClass('active');
		  if(fromMarker) {
			$('#map-body .row').animate({
			  scrollTop: $("#faa-profile-results .active").position().top
			}, 2000);
		  }
	  }
	  else
	  {
/*			$('#faa-results .active').click(function(e) {  
			var x = $(this).attr('data-pid');
			//alert(x);
			window.open("/locate-an-allergist/profile?id=" + x, "_self");
			});		  */
		  $('#faa-results .active').removeClass('active');
		  $('#faa-results #result-' + id).addClass('active');
		  if(fromMarker) {
		$('#map-body .row').animate({
		  scrollTop: $("#faa-results .active").position().top
		}, 2000);
		  }
	  }
	  
      
    },
    addResult: function(obj) {
      Drupal.behaviors.faa.results.append(Drupal.behaviors.faa.resultTemplate.render(obj, {
	formatNumber: function(val) {
	  try {
	    return Math.round(parseFloat(val) * 10) / 10;
	  } catch(e) {
	    
	  }
	},
	path: function(p) {
	  return Drupal.behaviors.faa.basePath + p;
	},
	encodeURIComponent: function(val) {
	  return val == null ? "" : encodeURIComponent(val.replace("#", "Suite "));
	}
      }));
    },
    setLoading: function(loading) {
      if(loading) {
	$('.busy-overlay').show();
      } else {
	$('.busy-overlay').hide();
      }
    },
    searchLocations: function() {
      Drupal.behaviors.faa.clearLocations();
      var data = {
	search: $('#text-search').val()
      };
	  data.id = Drupal.behaviors.faa.getParameterByName("id");

      if(Drupal.behaviors.faa.location != null) {
	data.long = Drupal.behaviors.faa.location.lng();
	data.lat = Drupal.behaviors.faa.location.lat();
      }
      $('.faa-search-criteria input[type=checkbox]:checked').each(function(){
	data[$(this).attr('name')] = 1;
      });
	data[$("#langselect").val()] = 1;

      Drupal.behaviors.faa.setLoading(true);
      $.ajax(Drupal.behaviors.faa.searchUrl, {data: data})
	.done(function(data){
	  if(data != null) {
	    var bounds = new google.maps.LatLngBounds();
	    var i = 0;
	    $.each(data, function(){
	      this.id = i++;
	      var obj = Drupal.behaviors.faa.createMarker(this);
	      bounds.extend(obj.position);
	    });
	    $('[data-allergistid]').hover(function(){
	      Drupal.behaviors.faa.setActive($(this).data('allergistid'), false);
	    });
	    if(data.length > 0)
	      Drupal.behaviors.faa.map.fitBounds(bounds);
		if(document.body.className.match('page-locate-an-allergist-profile'))
	  {
		  var c = Drupal.behaviors.faa.map.getCenter();
		  var lat = c.lat()+0.006;
		  var lng = c.lng();
		  Drupal.behaviors.faa.map.setCenter(new google.maps.LatLng(lat,lng));
		  Drupal.behaviors.faa.map.setZoom(Drupal.behaviors.faa.map.getZoom()-7);
		  google.maps.event.trigger(Drupal.behaviors.faa.map, "resize");
		  Drupal.behaviors.faa.map.setOptions({scrollwheel: false,navigationControl: false,mapTypeControl: false,scaleControl: false,draggable: false});
	  }
	  	  if(Drupal.behaviors.faa.getParameterByName("b") == "1") {
			var searchtext = Drupal.behaviors.faa.getParameterByName("zip");
			searchtext = searchtext.replace(/ /g, '+');
			document.getElementById("go-back").href = "/locate-an-allergist/results?zip="+searchtext;
		    $('.profile-back-link').show();	
	  }
	  else
	  {
		  $('.profile-back-link').hide();	
	  }
	  } 
	}).always(function() {
	  if(Drupal.behaviors.faa.markers.length == 0) {
	    Drupal.behaviors.faa.results.append(Drupal.behaviors.faa.noResultsTemplate.render());
	  }
	  Drupal.behaviors.faa.setLoading(false);
	}).fail(function() {
	  Drupal.behaviors.faa.results.append(Drupal.behaviors.faa.errorTemplate.render());
	});
    },
    setCurrentLocation: function() {

      if(Drupal.behaviors.faa.cityLocation != null) {
	Drupal.behaviors.faa.location = new google.maps.LatLng(Drupal.behaviors.faa.cityLocation.latitude,Drupal.behaviors.faa.cityLocation.longitude);
	Drupal.behaviors.faa.searchLocations();
      }
	  else if(Drupal.behaviors.faa.getParameterByName("id") != "") {
	$('#faa-id').val(Drupal.behaviors.faa.getParameterByName("id"));
	Drupal.behaviors.faa.search($('#faa-id').val());
      }
      else if(Drupal.behaviors.faa.getParameterByName("zip") != "") {
	$('#faa-address').val(Drupal.behaviors.faa.getParameterByName("zip"));
	Drupal.behaviors.faa.search($('#faa-address').val());
      }
      else if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
	  Drupal.behaviors.faa.location = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	  Drupal.behaviors.faa.searchLocations();
	}, function() {
	  Drupal.behaviors.faa.searchLocations();
	});
      }
      // Browser doesn't support Geolocation
      else {
	Drupal.behaviors.faa.searchLocations();
      }
    },
    getParameterByName: function(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    attach: function (context, settings) {
      var $page = $('body');
      var faa = $page.hasClass('page-faa') || 
	($page.hasClass('node-type-city-page') && !$page.hasClass('page-node-edit'));
      if(!faa)
	return;
	  if($page.hasClass('page-locate-an-allergist-profile'))
	  {
      Drupal.behaviors.faa.searchUrl = settings.basePath + 'data/profile';
	  }
	  else
	  {
      Drupal.behaviors.faa.searchUrl = settings.basePath + 'data/faa';		  
	  }
      Drupal.behaviors.faa.infoWindow = new google.maps.InfoWindow();
	  if($page.hasClass('page-locate-an-allergist-profile'))
	  {
      Drupal.behaviors.faa.results = $('#faa-profile-results', context);
	  }
	  else
	  {
      Drupal.behaviors.faa.results = $('#faa-results', context);		  
	  }
      
      Drupal.behaviors.faa.resultTemplate = $.templates("#resultTemplate");
      Drupal.behaviors.faa.noResultsTemplate = $.templates("#noResultsTemplate");
      Drupal.behaviors.faa.errorTemplate = $.templates("#errorTemplate");
      Drupal.behaviors.faa.pins = {};
      Drupal.behaviors.faa.basePath = settings.basePath + 'sites/all/modules/faa';
      Drupal.behaviors.faa.pins.inactive = Drupal.behaviors.faa.basePath + '/images/pin-inactive.png';
      Drupal.behaviors.faa.pins.active = Drupal.behaviors.faa.basePath + '/images/pin-active.png';
      if(settings.faa != null && settings.faa.location != null) {
	Drupal.behaviors.faa.cityLocation = settings.faa.location;
      }
      var mapOptions = {
	zoom: 4,
	center: new google.maps.LatLng(40, -100),
	mapTypeControl: false
      };
	  if($page.hasClass('page-locate-an-allergist-profile'))
	  {
	  //var mapObject = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	  //mapObject.setZoom(mapObject.getZoom()-1);
	  //Drupal.behaviors.faa.map = mapObject;
      Drupal.behaviors.faa.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	  }
	  else
	  {
      Drupal.behaviors.faa.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	  }
      
      
      
	  if(document.body.className.match('page-locate-an-allergist-profile'))
	  {
	  }
	  else
	  {
	 $('#faa-address', context).change(function(){
	Drupal.behaviors.faa.search($('#faa-address').val());
      });
      $('#faa-search-button', context).click(function(){
	Drupal.behaviors.faa.search($('#faa-address').val());
      });
	  }
	  $('#langselect').on('change', function() {
Drupal.behaviors.faa.searchLocations();
})
    $('.faa-search-criteria input[type=checkbox]').click(function(){
	Drupal.behaviors.faa.searchLocations();
      });
      $('#text-search', context).change(function(){
	Drupal.behaviors.faa.searchLocations();
      });
      $('#map-body').height($(window).height() - $('.navbar').height());
      Drupal.behaviors.faa.setCurrentLocation();
      var loading = true;
      $('.panel-heading.clickable').on("click", function (e) {
	if ($(this).hasClass('panel-collapsed')) {
	  // expand the panel
	  var panel =$(this).parents('.panel').find('.panel-body');
	  if(!loading)
	    panel.slideDown();
	  else
	    panel.show();
	  $(this).removeClass('panel-collapsed');
	  $(this).find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
	}
	else {
	  // collapse the panel
	  var panel = $(this).parents('.panel').find('.panel-body');
	  if(!loading)
	    panel.slideUp();
	  else
	    panel.hide();
	  $(this).addClass('panel-collapsed');
	  $(this).find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
	}
      });
      
      $('#search-expand').trigger('click');
      if($(window).height() <= 979) {
	$('#name-expand').trigger('click');
      }
      loading = false;
      $(".city-modal", context).modal('show');
    }
  };
 
  
})(jQuery);
function isValidUSZip(sZip) {
   return /^\d{5}(-\d{4})?$/.test(sZip);
}
