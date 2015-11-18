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
  { label: 'Adobe Dreamweaver', count: 78 }, 
  { label: 'SublimeText', count: 87 },
  { label: 'Notepad++', count: 83 },
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
// Make height and width of graph responsive
width = (window.innerWidth * 30) / 100; // makes width 30% of innerWidth
height = width;
var radius = Math.min(width, height) / 2;

var color = d3.scale.category10();

var legendRectSize = 18;
var legendSpacing = 4;
if (window.innerWidth < 480) {
	legendRectSize = 9;
	legendSpacing = 5;
} else if (window.innerWidth < 670) {
	legendRectSize = 12;
	legendSpacing = 6;
}

$(document).ready(function () {
	
	divSkills = d3.select(".view-graph section:first-child .graph"),
    divKnows = d3.select(".view-graph section:nth-child(2) .graph"),
	divEnvs = d3.select(".view-graph section:nth-child(3) .graph"),
	divTools = d3.select(".view-graph section:last-child .graph");
	var divs = [divSkills, divKnows, divEnvs, divTools];
	var legends = [".legend-1", ".legend-2", ".legend-3", ".legend-4"]
	
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
			  .data( pie(dataset[i]) )
			  .enter()
			  .append('path')
			  .attr('d', arc)
			  .attr('fill', function(d, i) { 
				return color(d.data.label);
		});
		
		// Domain starts to increase on each iteration, so instead of color.domain() we use pieLabels 
		var pieLabels = dataset[i].map(function (d) {
			  return d.label;
		});
		var legend = svg.selectAll('.legend')
			  .data( pieLabels )
			  .enter()
			  .append('g')
			  .attr('class', legends[i])
			  .attr('transform', function(d, j) {
				var height = legendRectSize + legendSpacing;
				var offset =  height * pieLabels.length / 2;
				var horz = width;
				var vert = j * height - offset;
				return 'translate(' + horz + ',' + vert + ')';
			  });
		legend.append('rect')
			  .attr('width', legendRectSize)
			  .attr('height', legendRectSize)
			  .style('fill', color)
			  .style('stroke', color);
		legend.append('text')
			  .attr('x', legendRectSize + legendSpacing)
			  .attr('y', legendRectSize - legendSpacing/2)
			  .attr('style', function () {
				  var fs = legendRectSize;
				  return "font-size: " + fs + "px";
			  })
			  .text(function(d) { return d; });
	}

});