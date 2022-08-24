

function showParallelCoordinates()
{
    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 10, bottom: 10, left: 0 },
        width = 1000 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    let d3Parallel = d3.select(CHART_ID.PARALLEL);
    d3Parallel.selectAll("*")
        .remove();

    // append the svg object to the body of the page
    const svg = d3Parallel
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            `translate(${margin.left},${margin.top})`);

    // Parse the Data
    // d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv").then( function(data) {

    //let data = getMyDataV3();
    let chartData = getChartWithName(CHART_NAMES.SCATTER).linkGroups[0].data;

    let data = chartData;

    //console.log(data);

    // let test = getCorrelationMatrix();

    // let highestFive = getFiveHighestAttributes();

    // Extract the list of dimensions we want to keep in the plot. Here I keep all except the column called Species
    dimensions = Object.keys(data[0]).filter(function (d) {
        return d != "Memory Bus Width(bits)" && d != "Memory Clock(MHz)" && d != "color"
        && d != "idx" && d != "selected" && d != "brushed";
        //return true;
    })

    //console.log(dimensions);

    // For each dimension, I build a linear scale. I store all in a y object
    const y = {}
    for (i in dimensions) {
        let name = dimensions[i]
        if(Number.isFinite(chartData[0][name]))
            y[name] = d3.scaleLinear()
                .domain(d3.extent(data, function (d) { return +d[name]; }))
                .range([height, 0])
        else
            y[name] = d3.scalePoint()
                .domain(chartData.map(function(e) {return e[name]}))
                .range([height, 0]);
    }

    // Build the X scale -> it find the best position for each Y axis
    x = d3.scalePoint()
        .range([0, width])
        .padding(1)
        .domain(dimensions);

    // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
    function path(d) {
        //console.log(dimensions);
        //console.log(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
        let pointsArray = dimensions.map(function (p) { 
            if(d[ATTR_NAMES.MANUFACTURER] === "ATI" && p === ATTR_NAMES.MANUFACTURER)
            {
                //console.log(`${y[p](d[p])}`);
            }
            
            return [x(p), y[p](d[p])]; 
        });
        if (pointsArray[0][1] === undefined)
            return "";
        return d3.line()(pointsArray);
    }

    data = data.filter(function(e){
        return e.brushed === true;
    })

    // Draw the lines
    svg.selectAll("myPath")
        .data(data)
        .join("path")
        .attr("d", path)
        .style("fill", "none")
        .style("stroke", function(d) {
            return d.color;
        })
        .style("opacity", 0.5)

    // Draw the axis:
    svg.selectAll("myAxis")
        // For each dimension of the dataset I add a 'g' element:
        .data(dimensions).enter()
        .append("g")
        // I translate this element to its right position on the x axis
        .attr("transform", function (d) { return "translate(" + x(d) + ")"; })
        // And I build the axis with the call function
        .each(function (d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
        // Add axis title
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text(function (d) { return d; })
        .style("fill", "black")

}