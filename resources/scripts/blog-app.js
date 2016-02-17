// SETUP MODULES
var blog = angular.module("blog", ["ngRoute"]);

blog.config(function ($routeProvider) {
	$routeProvider
	
	.when("/", {
		templateUrl: "homeTemplate.html",
		controller: ""
	})
	.when("/archives", {
		templateUrl: "archivesTemplate.html",
		controller: "ArchivesController"
	})
	
	.when("/posts/:name", {
		templateUrl: function (postTitle) {
			return "posts/" + postTitle.name;
		},
		controller: "PostController"
	});
});

// SETUP SERVICES
blog.service("articlesService", function ($http, $q) {
	
	var deffered = $q.defer();
	$http.get("../blog/posts.json").then(function (data) {
		deffered.resolve(data);
	}, /* if failed */ function (error) {
		if (error.status == -1) {
			$("main section").html("Something went wrong. Probably JavaScript is disabled, or some CORS issue.")
		}
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
blog.controller("PostController", function ($scope, $route, $routeParams) {
	$("section > div").addClass("post full");
});
blog.controller("ArchivesController", function ($scope, $route, $routeParams) {
	$scope.order = "title";
});