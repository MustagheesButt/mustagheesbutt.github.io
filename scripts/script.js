$(document).ready(function () {
	
	// nav menu controller
	$("nav").click(function () {
		$("body").animate({scrollTop: "0px"}, 300);
		$("body").toggleClass("menu-open");
	});
	
	// nav menu item hover animation
	$("#menu ul li:first-child").mouseover(function () {
		$("#menu").addClass("red");
	});
	$("#menu ul li:first-child").mouseleave(function () {
		$("#menu").removeClass("red");
	});
	$("#menu ul li:last-child").mouseover(function () {
		$("#menu").addClass("green");
	});
	$("#menu ul li:last-child").mouseleave(function () {
		$("#menu").removeClass("green");
	});
}); 