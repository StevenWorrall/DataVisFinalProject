var svgs = [];

for(var i = 0; i < 4; i++){
	var start = "#albumCol";
	var end = i.toString();
	// var end = end.concat("\"");
	var divPath = start.concat(end);
	console.log(divPath);
	var svg = d3.select(divPath)
		.append("svg")
		.attr("width", 1000)
		.attr("height", 200);

	var data = [{x1: 100, x2: 300, y1: 0, y2: 200},
	{x1: 303, x2: 503, y1: 0, y2: 200},
	{x1: 506, x2: 706, y1: 0, y2: 200},
	{x1: 709, x2: 909, y1: 0, y2: 200}];


	var rects = svg.selectAll("foo")
		.data(data)
		.enter()
		.append("rect")
		.attr("x", d=> d.x1)
		.attr("y", d=> d.y1)
		.attr("width", d=> d.x2 - d.x1)
		.attr("height", d=> d.y2 - d.y1)
		.attr("fill", "teal");
	
	svgs.push(rects);
}

svgs.forEach(function(rects,i){

	rects.text("dick");
	

});
