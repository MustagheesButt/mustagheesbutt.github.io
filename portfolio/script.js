var Model = {
	countries: [
		{
			country: 'Pakistan',
			cities: [
			'Peshawer', 'Islamabad',
			'Faislabad', 'Lahore',
			'Quetta', 'Multan',
			'Khairpur', 'Bahawalpur',
			'Karachi', 'Nawabshah',
			'Badin'
			]
		}
	],
	selectedCities: [],
	currentCountry: null,
	
	init: function () {
		this.currentCountry = 0;
	},
	getCurrentCities: function () {
		return this.countries[this.currentCountry].cities;
	},
	updateSelectedCities: function (checkboxValue) {
		var found = this.selectedCities.indexOf(checkboxValue); // -1 if not found, index otherwise
		if (found == -1) {
			this.selectedCities.push(checkboxValue);
		} else {
			this.selectedCities.splice(found, 1);
		}
	}
};

var MainController = {
	state: false, // animation running or not

	init: function () {
		Model.init();
		View.init();

		/* event listeners */
		View.getCitiesCheckboxes().forEach(function (checkbox, index) {
			checkbox.addEventListener('change', function () {
				Model.updateSelectedCities(+checkbox.value);
			});
		});

		var that = this;
		View.beginBtn().addEventListener('click', function () {
			if (that.state) {
				console.log('refreshing (trying to!)...');
				that.state = false;
			} else {
				that.setupSketch();
				that.state = true;
				console.log('starting');
			}
		})
	},
	getCurrentCities: function () {
		return Model.getCurrentCities();
	},
	getSelectedCities: function () {
		return Model.selectedCities;
	},

	setupSketch: function () {
		// update/refresh data
		order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		vertices = [];
		shortestDistance = 0;
		counter = 0;

		// filter
		var lSelectedCities = this.getSelectedCities();

		for (var i = 0, j = 0; i < order.length; i++) {
			if (lSelectedCities.indexOf(order[i]) != -1) {
				vertices[j] = vertices_pakistan[order[i]];
				j++;
			}
		}

		order.splice(lSelectedCities.length);

		shortestDistance = calcDistance(vertices);
		shortestCombo = order.slice(); // slice returns a "shallow" copy

		totalPermutations = factorial(vertices.length);
		View.calculationsToMakeArea().innerHTML = '<h3>' + totalPermutations + ' <small>calculations to make.</small></h3>';
	}
};

var View = {
	sidebarArea: () => document.querySelector('aside'),
	citiesSelecterArea: () => document.querySelector('#cities_selecter'),
	citiesCheckboxes: () => document.querySelectorAll('#cities_selecter > div > input'),
	calculationsToMakeArea: () => document.querySelector('#calculations-to-make'),
	beginBtn: () => document.querySelector('#btn-begin'),
	
	init: function () {
		this.renderCities();
		
	},
	renderCities: function () {
		var that = this;
		MainController.getCurrentCities().forEach(function (city, index) {
			that.citiesSelecterArea().innerHTML += '<div><input type="checkbox" value="" />' + city + '</div>';

			// add value attribute
			var allInputs = that.citiesSelecterArea().querySelectorAll('input');
			allInputs[allInputs.length - 1].value = index;
		});
	},
	getCitiesCheckboxes: function () {
		return this.citiesCheckboxes();
	}
};

window.onload = function () {
	MainController.init();
}