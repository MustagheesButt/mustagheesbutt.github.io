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
			drawChart();
		});
		
		/* ADD PORTFOLIO ITEMS - VIA portfolio.json */
		var dataArr = $.getJSON("portfolio.json")
		.done(function (dataArr) {
			console.log("Portfolio data loaded successfully.");
			
			var dev = $("#portfolio main .development");
			var des = $("#portfolio main .design");
			dataArr.forEach(function (element, index, array) {
				if (element.category == "dev") {
					dev.append("<div class='item'><div onclick='' class='item-thumb' style='background-image: url(" + element.thumbnail + 
					"); '><div class='details'><div>SEE DETAILS</div></div></div><h3><span class='title'>" + element.title + 
					"</span><a href=' " + element.link + " '><span class='fa fa-link'></span></a></h3></div>");
				} else if (element.category == "des") {
					des.append("<div class='item'><div onclick='' class='item-thumb' style='background-image: url(" + element.thumbnail + 
					"); '><div class='details'><div>SEE DETAILS</div></div></div><h3><span class='title'>" + element.title + 
					"</span><a href=' " + element.link + " '><span class='fa fa-link'></span></a></h3></div>");
				}
			});
			
			/* PORTFOLIO DETAILS HANDLER */
			$("div.details").on("click", function () {
				// search for element in dataArr with same title
				var currEle = $(this).parent().parent().children("h3").children(".title").html();
				var ele;
				for (var i = 0; i < dataArr.length; i++) {
					if (dataArr[i].title == currEle) {
						ele = dataArr[i];
						break;
					}
				}
				
				$(".details-box img").attr("src", ele.thumbnail);
				$(".details-box .details-box-title span").html(ele.title);
				$(".details-box .details-box-type span").html(ele.type);
				$(".details-box .details-box-description").html(ele.description);
				$(".details-box").addClass("active");
			});
			$(".details-box .close").on("click", function () {
				$(".details-box").removeClass("active");
			});
		})
		.fail(function () {
			console.log("Portfolio data failed to load.");
			$("#portfolio main .development, #portfolio main .design").append("<div>Something went wrong. Portfolio items could not be loaded!</div>");
		});
		
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
	
	/**
	 ** PRICING - PAGE
	 **/
	
	if (window.location.toString().indexOf("pricing/pricing.html") != -1) {
		// Slider
		var slideControls = $("section.marketing div.slide-controls span"),
			   slides = $("section.marketing .slide"),
			   scaleDown = 0.85,
			   animSpeed = 0.75;
		
		TweenMax.to("section.marketing .slide:not(.active)", 0, {display: "none", left: 1500, scale: scaleDown});

		slideControls.click(function () {
			slideControls.removeClass("active");
			$(this).addClass("active");
			
			nthSlide = slideControls.index( $(this) );
			// animate the current active slide to go out
			TweenMax.to("section.marketing .slide.active", animSpeed, {scale: scaleDown});
			TweenMax.to("section.marketing .slide.active", animSpeed, {display: "none", left: 1500, delay: animSpeed});
			
			slides.removeClass("active");
			$(slides[nthSlide]).addClass("active");
			// animate current slide to come in
			TweenMax.to("section.marketing .slide.active", animSpeed, {display: "block", left: 0});
			TweenMax.to("section.marketing .slide.active", animSpeed, {scale: 1, delay: animSpeed});
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