//http://blockbuilder.org/ivanempire/b6a1d0d2c5bc40a1e3f85b8980f189ef
//https://bl.ocks.org/mbostock/4060954

// Parse the year variable
var parseYear = d3.timeParse("%Y-%m");
// Format the year variable
var formatYear = d3.timeFormat("%B,%Y");
var keyarray = [];

d3.csv('Data/demo.csv', function(err, d){
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
  buildStreamGraph(trddata);
  
})

d3.csv('trendScore/Gucci.csv', function(err, d){
  if(err) console.log(err);
  
  //console.log(d)
  
  var nested_data = d3.nest()
		.key(function(d) { return d.Year; })
		.entries(d);
  
  console.log(nested_data);
  
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
//     console.log(obj)
    return obj;
  })
//   console.log(trddata)
  buildStreamGraph2(trddata2);
  
})

function buildStreamGraph(trddata) {
var data = trddata;

var stack = d3.stack()
    .keys(["Louis Vuitton", "Gucci", "Honcho", "Humble", "LSD", "Pablo", "Panda", "Raf Simons", "Savage", "Thrift", "Uber", "Versace"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetWiggle);

var series = stack(data);

var width = 400,
    height = 1000;

var x = d3.scaleTime()
    .domain(d3.extent(data, function(d){ return d.month; }))
    .range([50, 800]);

// setup axis
var xAxis = d3.axisBottom(x);

var y = d3.scaleLinear()
    .domain([0, d3.max(series, function(layer) { return d3.max(layer, function(d){ return d[0] + d[1];}); })])
    .range([333, -300]);
  
var color = d3.scaleLinear()
    .range(["#51D0D7", "#31B5BB"]);

var color = d3.interpolateCool;

var area = d3.area()
    .y(function(d) { return x(d.data.month); })
    .x0(function(d) { return y(d[0]); })
    .x1(function(d) { return y(d[1]); })
    .curve(d3.curveBasis);

var svg = d3.select("#streamGraphs").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.selectAll("path")
    .data(series)
    .enter().append("path")
    .attr("d", area)
    .style("fill", function() { return color(Math.random()); })
    .on('mouseover', function(d){      
      d3.select(this).style('fill',d3.rgb( d3.select(this).style("fill") ).brighter());
  		d3.select("#major").text(d.key);
    })
    .on('mouseout', function(d){      
      d3.select(this).style('fill', 
         d3.rgb( d3.select(this).style("fill") ).darker());
         d3.select("#major").text("Mouse over");
})

svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height) + ")")
            .call(xAxis);  
}
function buildStreamGraph2(trddata) {
var data = trddata;

var stack = d3.stack()
    .keys(["Gucci"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetWiggle);

var series = stack(data);

var width = 400,
    height = 1000;

var x = d3.scaleTime()
    .domain(d3.extent(data, function(d){ return d.month; }))
    .range([50, 800]);

// setup axis
var xAxis = d3.axisBottom(x);

var y = d3.scaleLinear()
    .domain([0, d3.max(series, function(layer) { return d3.max(layer, function(d){ return d[0] + d[1];}); })])
    .range([0, -100]);
  
var color = d3.scaleLinear()
    .range(["#51D0D7", "#31B5BB"]);

var color = d3.interpolateCool;

var area = d3.area()
    .y(function(d) { return x(d.data.month); })
    .x0(function(d) { return y(d[0]); })
    .x1(function(d) { return y(d[1]); })
    .curve(d3.curveBasis);

var svg = d3.select("#streamGraphs").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.selectAll("path")
    .data(series)
    .enter().append("path")
    .attr("d", area)
    .style("fill", function() { return color(Math.random()); })
    .on('mouseover', function(d){      
      d3.select(this).style('fill',d3.rgb( d3.select(this).style("fill") ).brighter());
  		d3.select("#major").text(d.key);
    })
    .on('mouseout', function(d){      
      d3.select(this).style('fill', 
         d3.rgb( d3.select(this).style("fill") ).darker());
         d3.select("#major").text("Mouse over");
})

svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height) + ")")
            .call(xAxis);  
}
// start on the selection grid

function gridData() {
  var data = new Array();
  var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
  var ypos = 1;
  var width = 200;
  var height = 60;
  var click = 0;
  
  // iterate for rows 
  for (var row = 0; row < 5; row++) {
    data.push( new Array() );
    
    // iterate for cells/columns inside rows
    for (var column = 0; column < 4; column++) {
      data[row].push({
        x: xpos,
        y: ypos,
        width: width,
        height: height,
        click: click
      })
      // increment the x position. I.e. move it over by 50 (width variable)
      xpos += width;
    }
    // reset the x position after a row is complete
    xpos = 1;
    // increment the y position for the next row. Move it down 50 (height variable)
    ypos += height; 
  }
  return data;
}

var gridData = gridData();  
// I like to log the data to the console for quick debugging
console.log(gridData);

var grid = d3.select("#streamSelector")
  .append("svg")
  .attr("width",1000)
  .attr("height",320);
  
var row = grid.selectAll(".row")
  .data(gridData)
  .enter().append("g")
  .attr("class", "row");
  
var column = row.selectAll(".square")
  .data(function(d) { return d; })
  .enter().append("rect")
  .attr("class","square")
  .attr("x", function(d) { return d.x; })
  .attr("y", function(d) { return d.y; })
  .attr("width", function(d) { return d.width; })
  .attr("height", function(d) { return d.height; })
  .style("fill", "#fff")
  .style("stroke", "#222")
  .on('click', function(d) {
       d.click ++;
       if ((d.click)%4 == 0 ) { d3.select(this).style("fill","#fff"); }
     if ((d.click)%4 == 1 ) { d3.select(this).style("fill","#2C93E8"); }
     if ((d.click)%4 == 2 ) { d3.select(this).style("fill","#F56C4E"); }
     if ((d.click)%4 == 3 ) { d3.select(this).style("fill","#838690"); }
    });
