$(document).ready(function () {
	
	$("nav").click(function () {
		$("body").animate({scrollTop: "0px"}, 300);
		$("body").toggleClass("menu-open");
	});
}); 