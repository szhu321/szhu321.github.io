let pc_settings = {
    chart_id: CHART_ID.PIE,
    chart_data: [],
    attribute_type: ""
}

function setPieChartSettings(config) {
    let {chart_data, attribute_type} = config;
    if(chart_data !== undefined)
        pc_settings.chart_data = chart_data;
    if(attribute_type !== undefined)
        pc_settings.attribute_type = attribute_type;
}

/**
 * Displays the pie chart with the given data.
 */
 function showPieChart()
 {
     let chartData = pc_settings.chart_data;
     let type = pc_settings.attribute_type;
 
     let data = chartData.map(function(e) {
         return e[type];
     });
 
     let histogram = getHistogram(data);
 
     //Keep the top 5 histogram items and put the reset into other.
     let sortedHistogram = []; //this array will contain arrays that look like: ["Name", value]
     //Clean up data for the pie chart.
 
     //sort the histogram
     sortedHistogram = Object.entries(histogram);
     sortedHistogram.sort(function (a, b) {
         return a[1] - b[1]; //sort the histogram by its value.
     })
 
     //console.log(sortedHistogram);
     //create a new histogram with the top 5 and other.
     histogram = {};
     let count = 0;
     let countDisplayed = 0;
     for (let i = sortedHistogram.length - 1; i >= 0; i--) {
         if (i < sortedHistogram.length - 5) //After the top 5 is obtained the rest is put into other.
         {
             count += sortedHistogram[i][1];
         }
         else {
             histogram[sortedHistogram[i][0]] = sortedHistogram[i][1];
             countDisplayed += sortedHistogram[i][1];
         }
     }
     if (count > 0) {
         histogram["Other"] = count;
     }
 
     let squished = false;
     if ((count) / (count + countDisplayed) > 0.8)
         squished = true;
 
 
     let d3Pie = d3.select(pc_settings.chart_id);
     
     //clear any previous barChart
     d3Pie.selectAll("*")
         .remove();
 
     d3Pie.append("div")
         .attr("class", "title")
         .text("Pie Chart: " + type);
 
     // set the dimensions and margins of the graph
     let width = 350;
     let height = 350;
     let margin = 10;
 
     // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
     let radius = Math.min(width, height) / 2;
 
     // append the svg object 
     let svg = d3Pie
         .append("svg")
         .attr("width", width)
         .attr("height", height)
         .append("g")
         .attr("transform", `translate(${width / 2}, ${height / 2})`);
 
     // set the color scale
     let color = d3.scaleOrdinal()
         .range(d3.schemeSet2);
 
     // Compute the position of each group on the pie:
     let pie = d3.pie()
         .value(function (d) {
             return d[1]
         })
 
     const data_ready = pie(Object.entries(histogram)) //pass in the histogram I created.
     // Now I know that group A goes from 0 degrees to x degrees and so on.
 
 
     // shape helper to build arcs:
     const arcGenerator = d3.arc()
         .innerRadius(0)
         .outerRadius(radius)
 
     // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
     svg
         .selectAll('mySlices')
         .data(data_ready)
         .join('path')
         .attr('d', arcGenerator)
         .attr('fill', function (d) { 
             let c = color(d.data[0]);
             chartData.forEach(function(e) {
                 if(e[type] === d.data[0])
                     e["color"] = c;
             })
             return c;
         })
         .on('click', function(event, data) {
             //console.log(event);
             //console.log(data);
 
             svg.selectAll("path")
                 .attr("fill", function(d){
                     let c = color(d.data[0]);
                     let selected = true;
                     if(d !== data)
                     {
                         c += "02";
                         selected = false;
                     }
                     chartData.forEach(function(e) {
                         //since e can be an integer, convert it to a string.
                         if(e[type] + "" === d.data[0])
                         {
                            e["color"] = c;
                            if(selected === false)
                                e["selected"] = false;
                            else
                                e["selected"] = true;
                         }
                     })


                     showParallelCoordinates();
                     showScatterPlot();
                     showBarChart();
                     return c;
                 })
         })
         .attr("stroke", "black")
         .style("stroke-width", "2px")
         .style("opacity", 0.7)
 
     // Now add the annotation. Use the centroid method to get the best coordinates
     svg
         .selectAll('mySlices')
         .data(data_ready)
         .join('text')
         .text(function (d) { return d.data[0] })
         .attr("transform", function (d, i) {
             return `translate(${arcGenerator.centroid(d).map(function (v) {
                 return squished ? v * (i / 6 + 0.6) : v;
             })})`
         })
         .style("pointer-events", "none")
         .style("text-anchor", "middle")
         .style("font-size", 17)
 }