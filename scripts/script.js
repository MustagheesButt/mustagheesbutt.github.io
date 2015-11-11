$(document).ready(function () {
	
	// Inertial scrolling
	$('a[href^="#"]').on('click', function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing');
	});
	
	// insert &#215 in .block-false
	$(".block-false").html("&#215;");
	// insert &#10003 in .block-true
	$(".block-true").html("&#10003;");
	
	(function($) {
    
     var allPanels = $('main > div > main').hide();
     
     $('main > div > h1').click(function() {
		 
		 if ( !$(this).parent().hasClass("active") ) {
			$("main > div").removeClass("active");
			
			$(this).parent().addClass("active");
			allPanels.slideUp(); 
		 }
		 
		 $(this).parent().children("main").slideDown();
		 return false;
     });

    }) (jQuery);
	
	/*  VIEW CONTROLLER - CONTROLES TOGGLING BETWEEN Table View & Graph View */
	$(".view span:first-child").click(function () {
		$(".view-table").css("display", "block");
		$(".view-graph").css("display", "none");
		
		$(this).addClass("active");
		$(".view span:last-child").removeClass("active");
	});
	$(".view span:last-child").click(function () {
		$(".view-graph").css("display", "block");
		$(".view-table").css("display", "none");
		
		$(this).addClass("active");
		$(".view span:first-child").removeClass("active");
	});
	
	/* ADD PORTFOLIO ITEMS - VIA portfolio.json */
	var dataArr = $.getJSON("portfolio.json")
	.done(function (dataArr) {
		console.log("Portfolio data loaded successfully.");
		
		var dev = $("#portfolio main .development");
		var des = $("#portfolio main .design");
		dataArr.forEach(function (element, index, array) {
			if (element.category == "dev") {
				dev.append("<div class='item'><img class='item-thumb' src=' " + element.thumbnail + 
				" ' /><h3>" + element.title + 
				"</h3><h5>Type: " + element.type + 
				"</h5><p>" + element.description + "</p></div>");
			} else if (element.category == "des") {
				des.append("<div class='item'><img class='item-thumb' src=' " + element.thumbnail + 
				" ' /><h3>" + element.title + 
				"</h3><h5>Type: " + element.type +
				"</h5><p>" + element.description + "</p></div>");
			}
		});
	})
	.fail(function () {
		console.log("Portfolio data failed to load.");
	});
	
}); 