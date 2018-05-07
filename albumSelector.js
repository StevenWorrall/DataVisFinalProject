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

	var albumImgs = ["Data/AlbumArtwork/Gucci.png", "Data/AlbumArtwork/Honcho.png", "Data/AlbumArtwork/Humble.png", 
	"Data/AlbumArtwork/LSD.png", "Data/AlbumArtwork/Pablo.png", "Data/AlbumArtwork/Panda.png",
	"Data/AlbumArtwork/RafSimons.png", "Data/AlbumArtwork/Savage.png", "Data/AlbumArtwork/Thrift.png",
	"Data/AlbumArtwork/Uber.png", "Data/AlbumArtwork/Versace.png", "Data/AlbumArtwork/LouisVuitton.png"]

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
			lineGraph(albumImgs[p], p);
		});
	
	svgs.push(rects);
}


// Line Graph stuff


var lineGraph = function(imgID, num){
	var ne = imgID.split("/");
	var ne = ne[2].split(".");
	console.log(ne[0])
	d3.select('#albumData').selectAll("*").remove();
	var width = 1000;
	var height = 300;

	var data1 = [["Song: Gucci Gang", "Artist: Lil Pump","Word: Gucci", "Word Count: 53","Release Date: August 31, 2017"], 
	["Song: Dat Way", "Artist: Rich the kid","Word: Honcho", "Word Count: 6","Release Date: October 12, 2016"],
	["Song: Humble", "Artist: Kendrick Lamar","Word: Humble","Word Count: 21","Release Date: March 30, 2017"], 
	["Song: LSD", "Artist: Asap Rocky","Word: LSD","Word Count: 4","Release Date: May 21, 2015"],
	["Song: Narcos", "Artist: Migos","Word: Pablo","Word Count: 12","Release Date: January 26, 2018"], 
	["Song: Panda", "Artist: Desiigner","Word: Panda","Word Count: 43","Release Date: February 22, 2016"],
	["Song: RAF", "Artist: ASAP MOB","Word: Raf Simons","Word Count: 26","Release Date: July 24, 2017"], 
	["Song: Savage Mode", "Artist: 21 Savage","Word: Savage","Word Count: 76","Release Date: July 15, 2016"],
	["Song: Thrift Shop", "Artist: Macklemore","Word: Thrift","Word Count: 9","Release Date: August 27, 2012"], 
	["Song: Uber Everywhere", "Artist: Travis Scott","Word: Uber","Word Count: 12","Release Date: February 26, 2016"],
	["Song: Versace", "Artist: Migos","Word: Versace","Word Count: 42","Release Date: October 1, 2013"], 
	["Song: Last Call", "Artist: Kanye West","Word: Louis Vuitton","Word Count: 3","Release Date: February 10, 2004"]]


	var dat = ne[0];

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
	    	.text(data1[num][i]);
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

   	var csvtitle2 = "trendScore/" + ne[0] + ".csv";

	d3.csv(csvtitle2, function(d) {
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

