/**
 * @file
 * A JavaScript file for the theme.
 *
 */
(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.acaai = {
    attach: function (context, settings) {
      /* Sidebar scroll */
      $.fn.followTo = function (pos) {
	var $this = this,
	  $window = $(window);

	$window.scroll(function (e) {
	  if ($window.scrollTop() < 520) {
	    $this.css({
	      position: 'absolute',
	      top: 0
	    });
	  } else if ($window.scrollTop() > pos + 500) {
	    $this.css({
	      position: 'absolute',
	      top: pos - 50
	    });
	  } else {
	    $this.css({
	      position: 'fixed',
	      top: 60
	    });
	  }
	});
      };

      var height = 0;
      $('.rounded-container-body', context).each(function(){
	height = Math.max(height, $(this).outerHeight());
      });
      $('.rounded-container-body', context).css('height', height + $('.btn-container', context).outerHeight() + 40);
      /* YAMM */
      $(document).on('click', '.yamm .dropdown-menu', function (e) {
	e.stopPropagation()
      })

      var menu = $('.internal-cta');
      var menuHeight = 0;
      if(menu.length > 0) {
	var origOffsetY = menu.offset().top;
	menuHeight = menu.outerHeight();
	function scroll() {
	  if ($(window).scrollTop() >= origOffsetY) {
	    $('.internal-cta').addClass('sticky');
	    $('.internal-cta').addClass('solid');
	    $('.content').addClass('menu-padding');
	  } else {
	    $('.internal-cta').removeClass('sticky');
	    $('.internal-cta').removeClass('solid');
	    $('.content').removeClass('menu-padding');
	  }
	}

	document.onscroll = scroll;
      }


      $('.sidebars').each(function(){
	$(this).css("width", $(this).width());
	$(".spycontainer").css("width", $(this).width());
      });

      $('.spycontainer').each(function(){
	$('body').scrollspy({target: ".spycontainer"});
      });

      $('a[href*=#]:not([href=#])', context).click(function () {
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
	  var target = $(this.hash);
	  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	  if (target.length) {
	    $('html,body').animate({
	      scrollTop: target.offset().top
	    }, 1000);
	    return false;
	  }
	}
      });

      $(window).load(function(){
	$('.sidebar_content', context).followTo($('#main-body').height() - $('.sidebar_content').height());
      });
      /* Select Dropdown Menu */
      $("select", context).each(function () {
	$(this).wrap('<div class="selectbox"/>');
	$(this).after("<span class='selecttext'></span><span class='select-arrow'></span>");
	var val = $(this).children("option:selected").text();
	$(this).next(".selecttext").text(val);
	$(this).change(function () {
	  var val = $(this).children("option:selected").text();
	  $(this).next(".selecttext").text(val);
	});
	var selectId = $(this).attr('id');
	if (selectId !== undefined) {
	  var linkClass = selectId;
	}
	if (linkClass) {
	  $(this).parent('.selectbox').addClass(linkClass);
	}
      });

      $(window).scroll(function () {
	if ($(window).scrollTop() > 520) {
	  $('#menu-min').show();
	  $('#navbar-min').show();
	} else {
	  $('#menu-min').hide();
	  $('#navbar-min').hide();
	}
      });

      // open the first panel of the accordion
      var h = $(location.hash).closest('.panel').find('.collapse');
      if(h.length > 0) {
        $('.collapse').collapse('hide');
        h.collapse('show');

      } else {

        var panelId = $('a[data-toggle="collapse"]', context).first().data('target');
        if(panelId) {
    	  $(panelId, context).collapse('show');
        }
      }
      var navs = $('.sidebar_content .nav a, .sidebar_content .menu a');
      if(navs.length > 0) {
	var f = $("<form></form>");
	var s = $('<select class="selectbox" name="subnav" onchange="location = this.options[this.selectedIndex].value;"></select>');
	f.append(s);
	$.each(navs, function(){
	  var o = $('<option></option>');
	  o.attr('value', $(this).attr('href'));
	  o.text($(this).text());
	  s.append(o);
	});
	f.append($('<span class="selecttext">' + $(navs[0]).text() + '</span>'));
	f.append($('<span class="select-arrow"></span>'));
	$('#subnav-dropdown').append(f);
      } else {
	$('#subnav-dropdown').hide();
      }
      // OPEN ALL YOUTUBE IN MODAL
      // BOOTSTRAP 3.0 - Open YouTube Video Dynamicaly in Modal Window
      // Modal Window for dynamically opening videos
      $('a[href^="https://www.youtube.com"]', context).on('click', function (e) {
	// Store the query string variables and values
	// Uses "jQuery Query Parser" plugin, to allow for various URL formats (could have extra parameters)
	var queryString = $(this).attr('href').slice($(this).attr('href').indexOf('?') + 1);
	var queryVars = $.parseQuery(queryString);

	// if GET variable "v" exists. This is the Youtube Video ID
	if ('v' in queryVars) {
	  // Prevent opening of external page
	  e.preventDefault();

	  // Calculate default iFrame embed size based on current window size
	  // (these will only be used if data attributes are not specified)
	  if ($(window).height() < $(window).width()) {
	    var vidHeight = $(window).height() * 0.5;
	    var vidWidth = vidHeight * 1.77777;
	  } else {
	    var vidWidth = $(window).width() * 0.8;
	    var vidHeight = vidWidth / 1.77777;
	  }
	  if ($(this).attr('data-width')) {
	    vidWidth = parseInt($(this).attr('data-width'));
	  }
	  if ($(this).attr('data-height')) {
	    vidHeight = parseInt($(this).attr('data-height'));
	  }
	  var iFrameCode = '<iframe width="' + vidWidth + '" height="' + vidHeight + '" scrolling="no" allowtransparency="true" allowfullscreen="true" src="http://www.youtube.com/embed/' + queryVars['v'] + '?rel=0&wmode=transparent&showinfo=0" frameborder="0"></iframe>';

	  // Replace Modal HTML with iFrame Embed
	  $('#mediaModal .modal-body').html(iFrameCode);
	  // Set new width of modal window, based on dynamic video content
	  $('#mediaModal').on('show.bs.modal', function () {
	    // Add video width to left and right padding, to get new width of modal window
	    var modalBody = $(this).find('.modal-body');
	    var modalDialog = $(this).find('.modal-dialog');
	    var newModalWidth = vidWidth + parseInt(modalBody.css("padding-left")) + parseInt(modalBody.css("padding-right"));
	    newModalWidth += parseInt(modalDialog.css("padding-left")) + parseInt(modalDialog.css("padding-right"));
	    newModalWidth += 'px';
	    // Set width of modal (Bootstrap 3.0)
	    $(this).find('.modal-dialog').css('width', newModalWidth);
	  });

	  // Open Modal
	  $('#mediaModal').modal();
	}
	// Clear modal contents on close.
	// There was mention of videos that kept playing in the background.
	$('#mediaModal').on('hidden.bs.modal', function () {
	  $('#mediaModal .modal-body').html('');
	});

      });
    }
  };
  (function ($) {
  Drupal.behaviors.acaai_sticky_footer = {
    attach:function (context) {
 	//Close Sticky Footer
		jQuery(".navbar-fixed-bottom__close-btn").click(function () {
			jQuery(".sticky-footer").hide();
			jQuery("body").removeClass( "sticky-footer-space" );
			$.ajax({
			  url: '/ajax/close_sticky_footer_fn',
			  success: function(data) {
	 		 }
			});
		});
    }
  }
})(jQuery);
  jQuery(document).ready(function(){
		jQuery("#tb-megamenu-column-17 .tb-megamenu-item.level-2").removeClass("dropdown-submenu");

		jQuery(".city-widget-header").click(function () {

            $header = $(this);
            //getting the next element
            $content = $header.next();
            //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
            $content.slideToggle(500, function () {
                //execute this after slideToggle is done
                //change text of header based on visibility of content div
                /*
                 $header.html(function () {
                 //change text based on condition
                 return $content.is(":visible") ? '<h2>Find an Allergist in Your City</h2>' : '<h2>Find an Allergist in Your City</h2>';
                 });
                 */
                if ($content.is(":visible")) {
                    jQuery("#city-widget-btn, #marker").fadeTo(200, 0.0);
                }
                else {
                    jQuery("#city-widget-btn, #marker").fadeTo(200, 1.0);
                }
            });

        });
    });



})(jQuery, Drupal, this, this.document);
