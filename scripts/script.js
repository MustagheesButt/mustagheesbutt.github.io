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
	
}); 