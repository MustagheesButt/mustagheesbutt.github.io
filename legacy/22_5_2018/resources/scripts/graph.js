google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawChart);

$(window).on("resize", function (event) {
    drawChart();
});

function drawChart() {
	var dataSkills = google.visualization.arrayToDataTable([
		['Skill', 'Index'],
		['Web Designing', 86], 
		['Web Development / Web Programming', 92],
		['Graphic Designing / Logo Designing', 65],
		['Writing', 90],
		['Programming', 70],
		['Networking', 63],
	]);
	var dataKnows = google.visualization.arrayToDataTable([
		['Knows', 'Index'],
		['PHP', 79], 
		['SQL', 59],
		['HTML 5', 90],
		['CSS 3', 93],
		['JavaScript', 83],
		['C', 73]
	]);
	var dataEnvs = google.visualization.arrayToDataTable([
		['Environment', 'Index'],
		['Adobe Dreamweaver', 78], 
		['SublimeText', 87],
		['Notepad++', 83],
		['Cloud9 (Online IDE)', 80]
	]);
	var dataTools = google.visualization.arrayToDataTable([
		['Tool', 'Index'],
		['Adobe Photoshop', 73], 
		['Adobe Illustrator', 30],
		['Adobe Fireworks', 50],
		['AutoDesk Maya', 40],
		['Git / GitHub / GitLab (Control Version System)', 70 ]
	]);

	var options = {
		width: "100%",
		height: "100%",
		legend: "none",
		colors: ['rgb(179, 6, 82)'],
		vAxis: {minValue: 0}
	};
	
	var charts = document.getElementsByClassName("graph");
	
	var chart1 = new google.visualization.ColumnChart(charts[0]);
	var chart2 = new google.visualization.ColumnChart(charts[1]);
	var chart3 = new google.visualization.ColumnChart(charts[2]);
	var chart4 = new google.visualization.ColumnChart(charts[3]);

	chart1.draw(dataSkills, options);
	chart2.draw(dataKnows, options);
	chart3.draw(dataEnvs, options);
	chart4.draw(dataTools, options);
}
