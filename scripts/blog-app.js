// SETUP MODULES
var blog = angular.module("blog", [ ]);

// SETUP SERVICES
blog.service("articlesService", function ($http, $q) {
	
	var deffered = $q.defer();
	$http.get("../blog/posts.json").then(function (data) {
		deffered.resolve(data);
	});
	
	this.getArticles = function () {
		return deffered.promise;
	};
	
});

// SETUP CONTROLLERS
blog.controller("BlogController", function ($scope, articlesService) {
	
	var promise = articlesService.getArticles();
	promise.then(function (data) {
		$scope.posts = data.data;
	});
	
});