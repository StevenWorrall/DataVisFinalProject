//https://bl.ocks.org/mbostock/3883245
//https://bl.ocks.org/cagrimmett/07f8c8daea00946b9e704e3efcbd5739

// To display the rectangles

var svgs = [];
var count = 0;

for(var i = 0; i < 3; i++){
	var start = "#albumCol";
	var end = i.toString();
	var divPath = start.concat(end);
	var svg = d3.select(divPath)
		.append("svg")
		.attr("width", 1000)
		.attr("height", 200);

	var data = [{x1: 100, x2: 300, y1: 0, y2: 200, img: "Data/AlbumArtwork/GucciGang.png"},
	{x1: 303, x2: 503, y1: 0, y2: 200, img: "Data/AlbumArtwork/DatWay.png"},
	{x1: 506, x2: 706, y1: 0, y2: 200, img: "Data/AlbumArtwork/Humble.png"},
	{x1: 709, x2: 909, y1: 0, y2: 200, img: "Data/AlbumArtwork/LastCall.png"}];

	var albumImgs = ["Data/AlbumArtwork/GucciGang.png", "Data/AlbumArtwork/DatWay.png", "Data/AlbumArtwork/Humble.png", 
	"Data/AlbumArtwork/LSD.png", "Data/AlbumArtwork/Narcos.png", "Data/AlbumArtwork/Panda.png",
	"Data/AlbumArtwork/Raf.png", "Data/AlbumArtwork/SavageMode.png", "Data/AlbumArtwork/ThriftShop.png",
	"Data/AlbumArtwork/UberEverywhere.png", "Data/AlbumArtwork/Versace.png", "Data/AlbumArtwork/LastCall.png"]

	var g = count;

	for(var k = g; k < g + 4; k++){
		svg.append("defs")
	    	.append("pattern")
	    	.attr("id", k)
	    	.attr('patternContentUnits', 'objectBoundingBox')
	    	.attr("width", 1)
	    	.attr("height", 1)
	   	 	.append("image")
	   	 	.attr("xlink:href", albumImgs[count])
	  	  	.attr("width", ".1%")
	    	.attr("height", ".5%")
	    	.attr("preserveAspectRatio", "none")
	    	;
	   	count += 1;
	}


	var rects = svg.selectAll("foo")
		.data(data)
		.enter()
		.append("rect")
		.attr("x", d=> d.x1)
		.attr("y", d=> d.y1)
		.attr("width", d=> d.x2 - d.x1)
		.attr("height", d=> d.y2 - d.y1)
		.attr("fill", function(d, j) { var p = (k-4)+j; return "url(#"+p+")"; })
		.on("click", function(d, j){
			var p = (k-4)+j;
			lineGraph(albumImgs[p]);
		});
	
	svgs.push(rects);
}


// Line Graph stuff


var lineGraph = function(imgID){
	var ne = imgID.split("/");
	var ne = ne[2].split(".");
	console.log(ne[0])
	d3.select('#albumData').selectAll("*").remove();
	var width = 1000;
	var height = 300;

	var data1 = ["Song: Gucci Gang", "Artist: Lil Pump","Word Count: 53","Release Date: August 31, 2017","Short description about song."]

	var newsvg = d3.select("#albumData")
		.data(data1)
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	newsvg.append("rect")
		.attr("x", 100)
    	.attr("width", 809)
    	.attr("height", "100%")
    	.attr("fill", "#fcfcfc");

	var count = -40;

	for(var i = 0; i < 6; i++){
		text = newsvg.append('text')
	    	.attr('x', 140)
	    	.attr('y', function(data1) {count += 40; return 70+ count; })
	    	.attr('fill', 'black')
	    	.attr('font-size', '22px')
	    	.text(data1[i]);
	}

	var g = newsvg.append("g").attr("transform", "translate(500,20)");
	var parseTime = d3.timeParse("%M/%Y");

	var x = d3.scaleTime()
    	.rangeRound([0, 375]);

	var y = d3.scaleLinear()
    	.rangeRound([225, 24]);

	var line = d3.line()
    	.x(function(d) { return x(d.date); })
    	.y(function(d) { return y(d.close); });

	d3.csv("trendScore/Gucci.csv", function(d) {
		var spli = d.Year.split("-");
		var dat = spli[1].concat("/"+spli[0]);
	  d.date = parseTime(dat);
	  d.close = +d.Popularity;
	  return d;
	}, function(error, data) {
	  if (error) throw error;
	  console.log(data);

	  x.domain(d3.extent(data, function(d) { return d.date; }));
	  y.domain(d3.extent(data, function(d) { return d.close; }));

	  g.append("g")
	      .attr("transform", "translate(0,225)")
	      .call(d3.axisBottom(x))
	    .select(".domain")
	      .remove();

	  g.append("g")
	      .call(d3.axisLeft(y))
	    .append("text")
	      .attr("fill", "#000")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", "0.71em")
	      .attr("text-anchor", "end")
	      .text("Trend");

	  g.append("path")
	      .datum(data)
	      .attr("fill", "none")
	      .attr("stroke", "blue")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 1.5)
	      .attr("d", line);
	});

}

