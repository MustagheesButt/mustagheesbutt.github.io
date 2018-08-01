var everythingLoaded = setInterval(function() {
  if (/loaded|complete/.test(document.readyState)) {
    clearInterval(everythingLoaded);
	// this is the function that gets called when everything is loaded
	// Remove preloader once the DOM is ready
	$("#preloader").fadeOut();
  }
}, 10);

$(document).ready(function () {
	
	/**
	 ** HOME PAGE
	 **/
	 if (window.location.toString().indexOf("/index.html")) {
		 // Inertial scrolling
		$('#contact h1, .scroll-down').on('click', function (e) {
			$('html, body').stop().animate({
				'scrollTop': e.target.offsetTop
			}, 900, 'swing');
		});
		
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
		
		/* EMAIL HANDLER - CONTACT FORM */
		var submitBtn = $("button[type='submit']");
		$("#contact form").submit(function (e) {
			e.preventDefault();
			if (submitBtn.html() != "sent") {
				submitBtn.html("Sending...").css({"background-color": "yellow", "color": "black"});
				
				$.ajax({
					url: "//formspree.io/mustaghees99@live.com",
					method: "POST",
					data : {
						Name: $("#contact form input[name='name']").val(),
						Email: $("#contact form input[name='email']").val(),
						Subject: $("#contact form input[name='_subject']").val(),
						_subject: $("#contact form input[name='_subject']").val(),
						Message: $("#contact form textarea").val()
					},
					dataType: "json"
				})
				.done(function ( response ) {
					console.log(response.success);
					submitBtn.html("sent").css({"background-color": "#1BB71B", "color": "#FFFFFF"});
				});
			} else {
				console.log("already sent an email");
			}
		});
		/* CONTACT FORM VALIDATOR */
		$("form input").on("change keyup paste", function () {
			if ( isValid( $(this).attr("type") ) == false ) {
				$(this).addClass("wrong");
			} else {
				$(this).removeClass("wrong");
			}
		});
	 }
	
});

function isValid(type) {
	if (type == "email") {
		var emailSyntax = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var email = document.forms["contact"]["email"].value;
		
		var result = emailSyntax.test(email);
		if ( result == false ) {
			return false;
		} else {
			return true;
		}
	}
}