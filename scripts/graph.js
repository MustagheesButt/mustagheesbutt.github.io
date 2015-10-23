var divSkills, divKnows, divEnvs, divTools;

var dataSkills = [
  { label: 'Web Designing', count: 86 }, 
  { label: 'Web Development / Web Programming', count: 90 },
  { label: 'Graphic Designing / Logo Designing', count: 65 },
  { label: 'Programming', count: 73 },
  { label: 'Networking', count: 63 },
  { label: 'Content Writing', count: 56 }
];
var dataKnows = [
  { label: 'PHP', count: 75 }, 
  { label: 'SQL', count: 59 },
  { label: 'HTML 5', count: 90 },
  { label: 'CSS 3', count: 93 },
  { label: 'JavaScript', count: 80 },
  { label: 'C', count: 75 }
];
var dataEnvs = [
  { label: 'Adobe Dreamweaver', count: 75 }, 
  { label: 'SublimeText', count: 80 },
  { label: 'Notepad++', count: 80 },
  { label: 'Cloud9 (Online IDE)', count: 80 }
];
var dataTools = [
  { label: 'Adobe Photoshop', count: 65 }, 
  { label: 'Adobe Illustrator', count: 30 },
  { label: 'Adobe Fireworks', count: 50 },
  { label: 'AutoDesk Maya', count: 40 },
  { label: 'Git / GitHub / GitLab (Control Version System)', count: 70 }
];

var dataset = [dataSkills, dataKnows, dataEnvs, dataTools];

var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2;
var color = d3.scale.category20b();

$(document).ready(function () {
	
	divSkills = d3.select(".view-graph section:first-child .graph"),
    divKnows = d3.select(".view-graph section:nth-child(2) .graph"),
	divEnvs = d3.select(".view-graph section:nth-child(3) .graph"),
	divTools = d3.select(".view-graph section:last-child .graph");
	var divs = [divSkills, divKnows, divEnvs, divTools];
		  
	var arc = d3.svg.arc()
		  .outerRadius(radius);
	var pie = d3.layout.pie()
		  .value(function(d) { return d.count; })
		  .sort(null);
	
	for (var i = 0; i < divs.length; i++) {
		var svg = divs[i]
			  .append('svg')
			  .attr('width', width)
			  .attr('height', height)
			  .append('g')
			  .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');
		var path = svg.selectAll('path')
			  .data(pie( dataset[i]) )
			  .enter()
			  .append('path')
			  .attr('d', arc)
			  .attr('fill', function(d, i) { 
				return color(d.data.label);
		});
	}

});