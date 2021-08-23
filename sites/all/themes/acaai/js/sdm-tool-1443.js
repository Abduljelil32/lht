jQuery(function ()
{
	jQuery("#example-vertical").steps({
    	headerTag: "h3",
	    bodyTag: "section",
	    //transitionEffect: "slideLeft",
	    transitionEffect: jQuery.fn.steps.transitionEffect.none,
	    stepsOrientation: "vertical"
	});
	jQuery(".steps").addClass("step1");
	jQuery(".tool_next-step").click(function() {
		jQuery("#example-vertical").steps("next");
	});
	jQuery(".tool_previous-step").click(function() {
		jQuery("#example-vertical").steps("previous");
	});

	jQuery(".alt-next-step-1-2").click(function() {

		//jQuery("#example-vertical").steps("next");
		jQuery("#example-vertical-t-1").html('<span class="number">2.</span> ' + jQuery("#title2-2").text() + ': Ages 6-17 Years');
		jQuery("#example-vertical-t-2").html('<span class="number">3.</span> '+ jQuery("#title3-2").text() + ': Ages 6-17 Years');
		jQuery("#version2-1").hide();
		jQuery("#version2-2").show();
		jQuery("#version3-1").hide();
		jQuery("#version3-2").show();
		jQuery("#version3-1").removeClass("sdm-print-wrapper");
		jQuery("#version3-2").removeClass("sdm-print-wrapper");
		jQuery("#version4-1").hide();
		jQuery("#version4-2").show();
		jQuery(".step_title_2").hide();
		jQuery(".step_title_alt_2").hide();
		jQuery("#version4-1").removeClass("sdm-print-wrapper");
		jQuery("#version4-2").removeClass("sdm-print-wrapper");
		jQuery("#callout-version5-1").hide();
		jQuery("#callout-version5-2").show();
		jQuery(".steps").removeClass("step1").addClass("step2-2");
	});
	jQuery(".alt-next-step-1-1").click(function() {
		//jQuery("#example-vertical").steps("next");
		jQuery("#example-vertical-t-1").html('<span class="number">2.</span> ' + jQuery("#title2-1").text() + ': Infant to Age 5 Years');
		jQuery("#example-vertical-t-2").html('<span class="number">3.</span> '+ jQuery("#title3-1").text() + ': Infant to Age 5 Years');
		jQuery("#version2-2").hide();
		jQuery("#version2-1").show();
		jQuery("#version3-2").hide();
		jQuery("#version3-1").show();
		jQuery("#version3-2").removeClass("sdm-print-wrapper");
		jQuery("#version3-1").removeClass("sdm-print-wrapper");
		jQuery("#version4-2").hide();
		jQuery("#version4-1").show();
		jQuery(".step_title_2").hide();
		jQuery(".step_title_alt_2").hide();
		jQuery("#version4-2").removeClass("sdm-print-wrapper");
		jQuery("#version4-1").removeClass("sdm-print-wrapper");
		jQuery("#callout-version5-2").hide();
		jQuery("#callout-version5-1").show();
		jQuery(".steps").removeClass("step1").addClass("step2-1");
	});
	jQuery(".alt-next-step-5").click(function() {
		jQuery("a#example-vertical-t-2").trigger("click");
		jQuery("#example-vertical-t-1").html('<span class="number">2.</span> ' + jQuery("#title2-1").text()+ ': Infant to Age 5 Years');
		jQuery("#example-vertical-t-2").html('<span class="number">3.</span> '+ jQuery("#title3-1").text()+ ': Infant to Age 5 Years');
		jQuery("#version3-1").hide();
		jQuery("#version3-2").show();
		jQuery("#version3-1").removeClass("sdm-print-wrapper");
		jQuery("#version3-2").removeClass("sdm-print-wrapper");
		jQuery("#version4-1").hide();
		jQuery("#version4-2").show();
		jQuery(".step_title_2").hide();
		jQuery(".step_title_alt_2").hide();
		jQuery("#version4-1").removeClass("sdm-print-wrapper");
		jQuery("#version4-2").removeClass("sdm-print-wrapper");
		jQuery("#callout-version5-1").hide();
		jQuery("#callout-version5-2").show();
		jQuery(window).scrollTop(0);
	});
	jQuery(".alt-next-step-5-v2").click(function() {
		jQuery("a#example-vertical-t-2").trigger("click");
		jQuery("#example-vertical-t-1").html('<span class="number">2.</span> ' + jQuery("#title2-2").text() + ': Ages 6-17 Years');
		jQuery("#example-vertical-t-2").html('<span class="number">3.</span> '+ jQuery("#title3-2").text() + ': Ages 6-17 Years');
		jQuery("#version3-2").hide();
		jQuery("#version3-1").show();
		jQuery("#version3-1").removeClass("sdm-print-wrapper");
		jQuery("#version3-2").removeClass("sdm-print-wrapper");
		jQuery("#version4-2").hide();
		jQuery("#version4-1").show();
		jQuery(".step_title_2").hide();
		jQuery(".step_title_alt_2").hide();
		jQuery("#version4-1").removeClass("sdm-print-wrapper");
		jQuery("#version4-2").removeClass("sdm-print-wrapper");
		jQuery("#callout-version5-2").hide();
		jQuery("#callout-version5-1").show();
		jQuery(window).scrollTop(0);
	});

	jQuery(".form-v1 input[type=radio]").change(function() {
    	jQuery(".form-v1").addClass("form-v1-checked");
		console.log("form 1 checked");
	});
	jQuery(".form-v2 input[type=radio]").change(function() {
    	jQuery(".form-v2").addClass("form-v2-checked");
		console.log("form 2 checked");
	});
	jQuery(".tool_done-button").click(function() {
		console.log("done btn clicked");
		var printHeader = "<div class='sdm-print-header'><img src='/sites/all/themes/acaai/images/logo.png' alt='ACAAI Public Website' class='header__logo-image' height='70' width='300'> <div class='tool_sponsors_right'><p>In partnership with</p><img src='/sites/default/files/allergy-and-asthma-network-logo_0.png' height='65'></div></div>";
		var printFooter = "<div class='tool_sponsors'><div class='tool_sponsors_left'><p>Supported by</p><img src='/sites/default/files/sanofi-genzyme-regeneron-logo_0.png' width='200'></div></div>";

		if(jQuery(".form-v1").hasClass("form-v1-checked")&&jQuery(".form-v2").hasClass("form-v2-checked"))
		{
			jQuery("#version4-1").show();
			jQuery("#version4-2").show();
			jQuery(".step_title_2").show();
			jQuery(".step_title_alt_2").show();
			jQuery("#version4-1").addClass("sdm-print-wrapper");
			jQuery("#version4-2").addClass("sdm-print-wrapper");
			jQuery("#version4-1, #version4-2").printThis({importCSS: true, loadCSS: "/sites/all/themes/acaai/css/print-sdm-tool.css", header: printHeader, footer: printFooter, printContainer: true});
			//jQuery(".form-v1").hide();
			console.log("both checked");
		}
		else
		{
			if(jQuery(".form-v1").hasClass("form-v1-checked"))
			{
				jQuery(".step_title_2").show();
				jQuery("#version4-1").addClass("sdm-print-wrapper");
				jQuery("#version4-1").printThis({importCSS: true, loadCSS: "/sites/all/themes/acaai/css/print-sdm-tool.css", header: printHeader, footer: printFooter, printContainer: true});
				console.log("v1 checked");
			}
			if(jQuery(".form-v2").hasClass("form-v2-checked"))
			{
				jQuery(".step_title_alt_2").show();
				jQuery("#version4-2").addClass("sdm-print-wrapper");

				jQuery("#version4-2").printThis({importCSS: true, loadCSS: "/sites/all/themes/acaai/css/print-sdm-tool.css", header: printHeader, footer: printFooter, printContainer: true});
				console.log("v2 checked");
			}
		}

	});

	jQuery(".print-btn-1").click(function() {
			//jQuery("#version3-1 .ui-accordion-content").show();
			var printHeader = "<div class='sdm-print-header'><img src='/sites/all/themes/acaai/images/logo.png' alt='ACAAI Public Website' class='header__logo-image' height='70' width='300'> <div class='tool_sponsors_right'><p>In partnership with</p><img src='/sites/default/files/allergy-and-asthma-network-logo_0.png' height='65'></div></div>";
		var printFooter = "<div class='tool_sponsors'><div class='tool_sponsors_left'><p>Supported by</p><img src='/sites/default/files/sanofi-genzyme-regeneron-logo_0.png' width='200'></div></div>";
			jQuery("#version3-1").addClass("sdm-print-wrapper");
			jQuery("#version3-1").printThis({importCSS: true, loadCSS: "/sites/all/themes/acaai/css/print-sdm-tool.css", header: printHeader, footer: printFooter, printContainer: true});
			//jQuery("#version3-1 .ui-accordion-content").hide();

			console.log("v3-1");
	});
	jQuery(".print-btn-2").click(function() {
			//jQuery("#version3-2 .ui-accordion-content").show();
			var printHeader = "<div class='sdm-print-header'><img src='/sites/all/themes/acaai/images/logo.png' alt='ACAAI Public Website' class='header__logo-image' height='70' width='300'> <div class='tool_sponsors_right'><p>In partnership with</p><img src='/sites/default/files/allergy-and-asthma-network-logo_0.png' height='65'></div></div>";
		var printFooter = "<div class='tool_sponsors'><div class='tool_sponsors_left'><p>Supported by</p><img src='/sites/default/files/sanofi-genzyme-regeneron-logo_0.png' width='200'></div></div>";
			jQuery("#version3-2").addClass("sdm-print-wrapper");
			jQuery("#version3-2").printThis({importCSS: true, loadCSS: "/sites/all/themes/acaai/css/print-sdm-tool.css", header: printHeader, footer: printFooter, printContainer: true});
			//jQuery("#version3-2 .ui-accordion-content").hide();
			console.log("v3-2");
	});

    jQuery("#accordion").accordion({collapsible:true, header: "h3", heightStyle: "content", autoHeight: false, active: false});
    jQuery("#accordion2").accordion({collapsible:true, header: "h3", heightStyle: "content", autoHeight: false, active: false});
 jQuery(".alt-prev-step-2-1").click(function() {
	 jQuery(".steps").removeClass("step2-1").addClass("step1");
 });
 
 jQuery(".alt-next-step-2-1").click(function() {
	 jQuery(".steps").removeClass("step2-1").addClass("step3-1");
 });
 
 jQuery(".alt-prev-step-2-2").click(function() {
	 jQuery(".steps").removeClass("step2-2").addClass("step1");
 });
 
 jQuery(".alt-next-step-2-2").click(function() {
	 jQuery(".steps").removeClass("step2-2").addClass("step3-2");
 });
 
 jQuery(".alt-prev-step-3-1").click(function() {
	 jQuery(".steps").removeClass("step3-1").addClass("step2-1");
 });
 
 jQuery(".alt-next-step-3-1").click(function() {
	  jQuery(".steps").removeClass("step3-1").addClass("step4-1");
 });
 
  jQuery(".alt-prev-step-3-2").click(function() {
	 jQuery(".steps").removeClass("step3-2").addClass("step2-2");
 });
 
 jQuery(".alt-next-step-3-2").click(function() {
	 jQuery(".steps").removeClass("step3-2").addClass("step4-2");
 });

 
  jQuery(".alt-prev-step-4-1").click(function() {
	  jQuery(".steps").removeClass("step4-1").addClass("step3-1");
 });
 
 jQuery(".alt-next-step-4-1").click(function() {
	 jQuery(".steps").removeClass("step4-1").addClass("step5");
 });

 
  jQuery(".alt-prev-step-4-2").click(function() {
	  jQuery(".steps").removeClass("step4-2").addClass("step3-2");
 });
 
 jQuery(".alt-next-step-4-2").click(function() {
	 jQuery(".steps").removeClass("step4-2").addClass("step5");
 });


});
