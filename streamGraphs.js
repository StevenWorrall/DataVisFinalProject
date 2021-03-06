//http://blockbuilder.org/ivanempire/b6a1d0d2c5bc40a1e3f85b8980f189ef
//https://bl.ocks.org/mbostock/4060954

// Parse the year variable
var parseYear = d3.timeParse("%Y-%m");
// Format the year variable
var formatYear = d3.timeFormat("%B,%Y");
var keyarray = [];
var data = ["Reset", "Louis Vuitton", "Gucci", "Honcho", "Humble", "LSD", "Pablo", "Panda", "Raf Simons", "Savage", "Thrift", "Uber", "Versace"];

var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

var select = d3.select("#dropdownmenu")
select
.append("select")
.selectAll("option")
	.data(data)
	.enter()
	.append("option")
	.text(function (d) { return d; })

var processed = "LouisVuitton";

select.on("change", function() {
	selectValue = d3.select(this)
	.select('select').property('value');
	processed = selectValue.replace(/ /g, '');
	
	d3.csv('trendScore/'+processed+'.csv', function(err, d){
		if(err) console.log(err);
		//console.log(d)
		var nested_data = d3.nest()
			.key(function(d) { return d.Year; })
			.entries(d);

// 			console.log(nested_data);

		var trddata2 = nested_data.map(function(d){
		var obj = {
		    month: new Date(d.key)
		 }
		d.values.forEach(function(v){
			obj[v.Keyword] = +v.Popularity;

			if(!keyarray.includes(d.Keyword)){
			keyarray.push(d.Keyword);

		      	}
		})
		return obj;
		})
	d3.csv('wordCount/'+processed+'.csv', function(err, d){
		if(err) console.log(err);
		//console.log(d)
		var nested_data = d3.nest()
			.key(function(d) { return d.Year; })
			.entries(d);

// 			console.log(nested_data);

		var trddata3 = nested_data.map(function(d){
		var obj = {
		    month: new Date(d.key)
		 }
		d.values.forEach(function(v){
			obj[v.Keyword] = +v.Popularity;

			if(!keyarray.includes(d.Keyword)){
			keyarray.push(d.Keyword);

		      	}
		})
		return obj;
		})
// 	d3.select("svg").remove();
// 	svg.selectAll("*").remove();
	d3.select("#TrendGraph").remove();
	d3.select("#TrendGraph").remove();
	d3.select("#initial").remove();
	d3.select("#initial").remove();
	if(processed != "Reset"){
	buildStreamGraph2(trddata2);
	buildStreamGraph2(trddata3);
	} else {
	d3.csv('Data/Reset.csv', function(err, d){
	  if(err) console.log(err);

	  //console.log(d)

	  var nested_data = d3.nest()
			.key(function(d) { return d.year; })
			.entries(d);

// 	  console.log(nested_data);

	  var trddata = nested_data.map(function(d){
	    var obj = {
	      month: new Date(d.key)
	    }

	    d.values.forEach(function(v){
	      obj[v.Keyword] = +v.Popularity;

		if(!keyarray.includes(d.Keyword)){
		keyarray.push(d.Keyword);

	      }
	    })
	//     console.log(obj)
	    return obj;
	  })
	//   console.log(trddata)
	  //Trend data
	  buildStreamGraph(trddata);
		//word count data
	})

	d3.csv('wordCount/Reset.csv', function(err, d){
	  if(err) console.log(err);

	  //console.log(d)

	  var nested_data = d3.nest()
			.key(function(d) { return d.year; })
			.entries(d);

// 	  console.log(nested_data);

	  var trddata = nested_data.map(function(d){
	    var obj = {
	      month: new Date(d.key)
	    }

	    d.values.forEach(function(v){
	      obj[v.Keyword] = +v.Popularity;

		if(!keyarray.includes(d.Keyword)){
		keyarray.push(d.Keyword);

	      }
	    })
	//     console.log(obj)
	    return obj;
	  })
	//   console.log(trddata)
	  //Trend data
	  buildStreamGraph(trddata);
		//word count data
	})
	}
	})
	})
})

d3.csv('Data/Reset.csv', function(err, d){
  if(err) console.log(err);
  
  //console.log(d)
  
  var nested_data = d3.nest()
		.key(function(d) { return d.year; })
		.entries(d);
  
  console.log(nested_data);
  
  var trddata = nested_data.map(function(d){
    var obj = {
      month: new Date(d.key)
    }
    
    d.values.forEach(function(v){
      obj[v.Keyword] = +v.Popularity;
      
        if(!keyarray.includes(d.Keyword)){
        keyarray.push(d.Keyword);

      }
    })
//     console.log(obj)
    return obj;
  })
//   console.log(trddata)
  //Trend data
  buildStreamGraph(trddata);
	//word count data
})

d3.csv('wordCount/Reset.csv', function(err, d){
  if(err) console.log(err);
  
  //console.log(d)
  
  var nested_data = d3.nest()
		.key(function(d) { return d.year; })
		.entries(d);
  
  console.log(nested_data);
  
  var trddata = nested_data.map(function(d){
    var obj = {
      month: new Date(d.key)
    }
    
    d.values.forEach(function(v){
      obj[v.Keyword] = +v.Popularity;
      
        if(!keyarray.includes(d.Keyword)){
        keyarray.push(d.Keyword);

      }
    })
//     console.log(obj)
    return obj;
  })
//   console.log(trddata)
  //Trend data
  buildStreamGraph(trddata);
	//word count data
})

function buildStreamGraph(trddata) {
var data = trddata;

var stack = d3.stack()
    .keys(["Louis Vuitton", "Gucci", "Honcho", "Humble", "LSD", "Pablo", "Panda", "Raf Simons", "Savage", "Thrift", "Uber", "Versace"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetWiggle);

var series = stack(data);

var width = 500,
    height = 850;

var x = d3.scaleTime()
    .domain(d3.extent(data, function(d){ return d.month; }))
    .range([25, 825]);
	
var y = d3.scaleLinear()
    .domain([0, d3.max(series, function(layer) { return d3.max(layer, function(d){ return d[0] + d[1]+70;}); })])
    .range([340, -290]);
// 	console.log(d)
  
// setup axis
var xAxis = d3.axisRight(x);

var color = d3.scaleOrdinal(d3["schemePaired"])

var area = d3.area()
    .y(function(d) { return x(d.data.month); })
    .x0(function(d) { return y(d[0]); })
    .x1(function(d) { return y(d[1]); })
    .curve(d3.curveBasis);

var svg = d3.select("#streamGraphs").append("svg")
    .attr("id", "TrendGraph")
    .attr("width", width)
    .attr("height", height);
var keywordtemp; 
svg.selectAll("path")
    .data(series)
    .enter().append("path")
    .attr("d", area)
    .style("fill", function(d,i) { return color(i); })
    .on('mouseover', function(d){      
      d3.select(this).style('fill',d3.rgb( d3.select(this).style("fill") ).brighter());
      d3.select("#major").text(d.key);
      div.transition()	
	.duration(200)
	.style("opacity", .9);
      var array = [];
      array = d.values;
      console.log(d);
      keywordtemp = d.key;
      var xPosition = d3.mouse(this)[0]-25;
      var yPosition = d3.mouse(this)[1]-25;
      yPosition = Math.floor(yPosition/4.65116279);
      console.log(xPosition);
      console.log(yPosition);
      console.log(d[yPosition].data.month);
      console.log(d[yPosition].data);
      var temporary = {};
      temporary = d[yPosition].data;
      console.log(temporary);
      console.log(keywordtemp);
      console.log(temporary[keywordtemp]);
      div.html(d.key + "<br/>" + formatYear(d[yPosition].data.month) + "<br/>"  + temporary[keywordtemp])	
        .style("left", (d3.event.pageX) + "px")	
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on('mouseout', function(d){      
      d3.select(this).style('fill', 
      d3.rgb( d3.select(this).style("fill") ).darker());
      d3.select("#major").text("Mouse over");
      div.transition()	
         .duration(200)
         .style("opacity", 0);
})
    .on('mousemove',function(d){
      var xPosition = d3.mouse(this)[0]-25;
      var yPosition = d3.mouse(this)[1]-25;
      yPosition = Math.floor(yPosition/4.65116279);
//       console.log(xPosition);
      console.log(yPosition);
      console.log(d[yPosition].data.month);
      console.log(d[yPosition].data);
      var temporary = {};
      temporary = d[yPosition].data;
      console.log(temporary);
      console.log(keywordtemp);
      console.log(temporary[keywordtemp]);
      div.html(d.key + "<br/>" + formatYear(d[yPosition].data.month) + "<br/>"  + temporary[keywordtemp])	
        .style("left", (d3.event.pageX) + "px")	
        .style("top", (d3.event.pageY - 28) + "px");
})

svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", 150, 100)
            .call(xAxis);

// svg.append("g")
//             .attr("class", "axis axis--x")
//             .attr("transform", "translate(" + (width) + ")",0)
//             .call(xAxis);  
// svg.append("g")
//             .attr("class", "axis axis--y")
//             .attr("transform", 0, "translate(" + (height) + ")")
//             .call(yAxis);  
}
function buildStreamGraph2(trddata) {
var data = trddata;

var stack = d3.stack()
    .keys([selectValue])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetWiggle);

var series = stack(data);

var width = 500,
    height = 850;

var x = d3.scaleTime()
    .domain(d3.extent(data, function(d){ return d.month; }))
    .range([25, 825]);

// setup axis
var xAxis = d3.axisRight(x);

var y = d3.scaleLinear()
    .domain([0, d3.max(series, function(layer) { return d3.max(layer, function(d){ return d[0] + d[1]+10;}); })])
    .range([320, 220]);
	
var yAxis = d3.axisBottom(y);

var color = d3.scaleOrdinal(d3["schemePaired"])

var area = d3.area()
    .y(function(d) { return x(d.data.month); })
    .x0(function(d) { return y(d[0]); })
    .x1(function(d) { return y(d[1]); })
    .curve(d3.curveBasis);

var svg = d3.select("#streamGraphs").append("svg")
    .attr("id","initial")
    .attr("width", width)
    .attr("height", height);
	

	
svg.selectAll("path")
    .data(series)
    .enter().append("path")
    .attr("d", area)
    .attr("class", "initialGraph")
    .style("fill", function(d,i) { 
	console.log(d.key);
	var colorval;
	{
		if(d.key == "Louis Vuitton")
			colorval = 0;
		if(d.key == "Gucci")
			colorval = 1;
		if(d.key == "Honcho")
			colorval = 2;
		if(d.key == "Humble")
			colorval = 3;
		if(d.key == "LSD")
			colorval = 4;
		if(d.key == "Pablo")
			colorval = 5;
		if(d.key == "Panda")
			colorval = 6;
		if(d.key == "Raf Simons")
			colorval = 7;
		if(d.key == "Savage")
			colorval = 8;
		if(d.key == "Thrift")
			colorval = 9;
		if(d.key == "Uber")
			colorval = 10;
		if(d.key == "Versace")
			colorval = 11;
	} i = colorval;
	console.log(colorval);
	return color(i); })
    .on('mouseover', function(d){      
      d3.select(this).style('fill',d3.rgb( d3.select(this).style("fill") ).brighter());
      d3.select("#major").text(d.key);
      div.transition()	
	.duration(200)
	.style("opacity", .9);
      var array = [];
      array = d.values;
      console.log(d);
      keywordtemp = d.key;
      var xPosition = d3.mouse(this)[0]-25;
      var yPosition = d3.mouse(this)[1]-25;
      yPosition = Math.floor(yPosition/4.65116279);
      console.log(xPosition);
      console.log(yPosition);
      console.log(d[yPosition].data.month);
      console.log(d[yPosition].data);
      var temporary = {};
      temporary = d[yPosition].data;
      console.log(temporary);
      console.log(keywordtemp);
      console.log(temporary[keywordtemp]);
      div.html(d.key + "<br/>" + formatYear(d[yPosition].data.month) + "<br/>"  + temporary[keywordtemp])	
        .style("left", (d3.event.pageX) + "px")	
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on('mouseout', function(d){      
      d3.select(this).style('fill', 
      d3.rgb( d3.select(this).style("fill") ).darker());
      d3.select("#major").text("Mouse over");
      div.transition()	
         .duration(200)
         .style("opacity", 0);
})
    .on('mousemove',function(d){
      var xPosition = d3.mouse(this)[0]-25;
      var yPosition = d3.mouse(this)[1]-25;
      yPosition = Math.floor(yPosition/4.65116279);
//       console.log(xPosition);
      console.log(yPosition);
      console.log(d[yPosition].data.month);
      console.log(d[yPosition].data);
      var temporary = {};
      temporary = d[yPosition].data;
      console.log(temporary);
      console.log(keywordtemp);
      console.log(temporary[keywordtemp]);
      div.html(d.key + "<br/>" + formatYear(d[yPosition].data.month) + "<br/>"  + temporary[keywordtemp])	
        .style("left", (d3.event.pageX) + "px")	
        .style("top", (d3.event.pageY - 28) + "px");
})

svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", 150, 100)
            .call(xAxis);  
// svg.append("g")
//             .attr("class", "axis axis--y")
//             .attr("transform", 0, "translate(" + (height) + ")")
//             .call(yAxis);  
}

function updateGraph(trddata) {
var data = trddata;

var stack = d3.stack()
    .keys([selectValue])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetWiggle);

var series = stack(data);

var width = 500,
    height = 850;

var x = d3.scaleTime()
    .domain(d3.extent(data, function(d){ return d.month; }))
    .range([25, 825]);

// setup axis
var xAxis = d3.axisRight(x);

var y = d3.scaleLinear()
    .domain([0, d3.max(series, function(layer) { return d3.max(layer, function(d){ return d[0] + d[1]+10;}); })])
    .range([320, 220]);
	
var yAxis = d3.axisBottom(y);

var color = d3.scaleLinear()
    .range(["#51D0D7", "#31B5BB"]);

var color = d3.interpolateCool;

var area = d3.area()
    .y(function(d) { return x(d.data.month); })
    .x0(function(d) { return y(d[0]); })
    .x1(function(d) { return y(d[1]); })
    .curve(d3.curveBasis);

var svg = d3.select(".initialGraph")

svg.selectAll("path")
    .data(series)
    .enter().append("path")
    .attr("d", area)
    .attr("id", "initialGraph")
    .style("fill", function() { return color(Math.random()); })

	
.on('mouseover', function(d){      
      d3.select(this).style('fill',d3.rgb( d3.select(this).style("fill") ).brighter());
      d3.select("#major").text(d.key);
      div.transition()	
	.duration(200)
	.style("opacity", .9);
      var array = [];
      array = d.values;
      console.log(d);
      keywordtemp = d.key;
      var xPosition = d3.mouse(this)[0]-25;
      var yPosition = d3.mouse(this)[1]-25;
      yPosition = Math.floor(yPosition/4.65116279);
//       console.log(xPosition);
      console.log(yPosition);
      console.log(d[yPosition].data.month);
      console.log(d[yPosition].data);
      var temporary = {};
      temporary = d[yPosition].data;
      console.log(temporary);
      console.log(keywordtemp);
      console.log(temporary[keywordtemp]);
      div.html(d.key + "<br/>" + formatYear(d[yPosition].data.month) + "<br/>"  + temporary[keywordtemp])	
        .style("left", (d3.event.pageX) + "px")	
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on('mouseout', function(d){      
      d3.select(this).style('fill', 
      d3.rgb( d3.select(this).style("fill") ).darker());
      d3.select("#major").text("Mouse over");
      div.transition()	
         .duration(200)
         .style("opacity", 0);
})
    .on('mousemove',function(d){
      var xPosition = d3.mouse(this)[0]-25;
      var yPosition = d3.mouse(this)[1]-25;
      yPosition = Math.floor(yPosition/4.65116279);
//       console.log(xPosition);
      console.log(yPosition);
      console.log(d[yPosition].data.month);
      console.log(d[yPosition].data);
      var temporary = {};
      temporary = d[yPosition].data;
      console.log(temporary);
      console.log(keywordtemp);
      console.log(temporary[keywordtemp]);
      div.html(d.key + "<br/>" + formatYear(d[yPosition].data.month) + "<br/>"  + temporary[keywordtemp])	
        .style("left", (d3.event.pageX) + "px")	
        .style("top", (d3.event.pageY - 28) + "px");
})

svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", 150, 100)
            .call(xAxis);  
// svg.append("g")
//             .attr("class", "axis axis--y")
//             .attr("transform", 0, "translate(" + (height) + ")")
//             .call(yAxis);  
}
// // start on the selection grid
// function gridData(){
// 	var width = 1000;
// 	var height = 500;
// 	var keys = ["Louis Vuitton", "Gucci", "Honcho", "Humble", "LSD", "Pablo", "Panda", "Raf Simons", "Savage", "Thrift", "Uber", "Versace"];
// 	var numberOfTexts = 12; 
// 	var texts = d3.range(numberOfTexts).map(function(d,i){
// 		return { x: width/2, y: y(i+1)}		
// 	});
// 	var svg = d3.select("#streamSelector").append("svg")
// 		.attr("width", width)
// 		.attr("height",height);
// 	var g = svg.selectAll("g")
// 		.data(texts)
// 		.enter().append("g");
// 	g.append("rect");
// 	g.append("text")
// 		.attr("x", function(d) { return d.x; })
// 		.attr("y", function(d) { return d.y; })
// 		.attr("fill", "#FFF")
// 		.attr("text-anchor", "middle");
	
// 	svg.selectAll("text").each(function(d, i) {
//         	keys[i].bb = this.getBBox(); // get bounding box of text field and store it in texts array
//    	});

//     	var paddingLeftRight = 18; // adjust the padding values depending on font and font size
//     	var paddingTopBottom = 5;

//     	svg.selectAll("rect")
// 		.attr("x", function(d) { return d.x - d.bb.width/2 - paddingLeftRight/2; })
// 		.attr("y", function(d) { return d.y - d.bb.height + paddingTopBottom/2;  })
// 		.attr("width", function(d) { return d.bb.width + paddingLeftRight; })
// 		.attr("height", function(d) { return d.bb.height + paddingTopBottom; });
// }

	
// function gridData() {
//   var data = new Array();
//   var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
//   var ypos = 1;
//   var width = 180;
//   var height = 110;
//   var click = 0;
//   var id = 0;
  
//   // iterate for rows 
//   for (var row = 0; row < 3; row++) {
//     data.push( new Array() );
    
//     // iterate for cells/columns inside rows
//     for (var column = 0; column < 4; column++) {
//       data[row].push({
//         x: xpos+200,
//         y: ypos,
//         width: width,
//         height: height,
//         click: click,
// 	id: id
	 
//       })
//       // increment the x position. I.e. move it over by 50 (width variable)
// 	id += 1; 
//       xpos += width;
//     }
//     // reset the x position after a row is complete
//     xpos = 1;
//     // increment the y position for the next row. Move it down 50 (height variable)
//     ypos += height; 
//   }
//   return data;
// }

// var gridData = gridData();  
// // I like to log the data to the console for quick debugging
// console.log(gridData);

// var svg = d3.select("#streamSelector")
//   .append("svg")
//   .attr("width",1000)
//   .attr("height",460);
  
// var g = svg.selectAll("g")
//   .data(texts)
//   .enter().append("g")
//   .attr("class", "row");
  
// var column = row.selectAll(".square")
//   .data(function(d) { return d; })
//   .enter().append("rect")
//   .attr("class","square")
//   .attr("x", function(d) { return d.x; })
//   .attr("y", function(d) { return d.y; })
//   .attr("width", function(d) { return d.width; })
//   .attr("height", function(d) { return d.height; })
//   .style("fill", "#fff")
//   .style("stroke", "#222")
//   .on('click', function(d) {
//        d.click ++;
//        if ((d.click)%4 == 0 ) { d3.select(this).style("fill","#fff"); }
//      if ((d.click)%4 == 1 ) { d3.select(this).style("fill","#2C93E8"); }
//      if ((d.click)%4 == 2 ) { d3.select(this).style("fill","#F56C4E"); }
//      if ((d.click)%4 == 3 ) { d3.select(this).style("fill","#838690"); }
//     });
// column.append("text")
// 	.attr("x", function(d){return d.x;})
// 	.attr("y", function(d){return d.y;})
//       .style("fill", "black")
//       .text(function(d) {
//         if(d.id == 0){ return "Louis Vuitton"}
//         if(d.id == 1){ return "Gucci"}
//         if(d.id == 2){ return "Honcho"}
//         if(d.id == 3){ return "Humble"}
//         if(d.id == 4){ return "LSD"}
//         if(d.id == 5){ return "Pablo"}
//         if(d.id == 6){ return "Panda"}
//         if(d.id == 7){ return "Raf Simons"}
//         if(d.id == 8){ return "Savage"}
//         if(d.id == 9){ return "Thrift"}
//         if(d.id == 10){ return "Uber"}
//         if(d.id == 11){ return "Versace"}
//       })

