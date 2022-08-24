let sp_settings = {
    chart_id: CHART_ID.SCATTER,
    chart_data: [],
    x_attribute: "",
    y_attribute: "",
    x_axis_title: "",
    y_axis_title: ""
}

function setScatterPlotSettings(config) {
    let {x_attribute, y_attribute, x_axis_title, y_axis_title, chart_data} = config;
    if(x_attribute !== undefined)
        sp_settings.x_attribute = x_attribute;
    if(y_attribute !== undefined)
        sp_settings.y_attribute = y_attribute;
    if(x_axis_title !== undefined)
        sp_settings.x_axis_title = x_axis_title;
    if(y_axis_title !== undefined)
        sp_settings.y_axis_title = y_axis_title;
    if(chart_data !== undefined)
        sp_settings.chart_data = chart_data;
}

/**
 * Displays a scatterPlot with the two attributes.
 */
function showScatterPlot() {
    
    let chartData = sp_settings.chart_data;
    let d3Scatter = d3.select(sp_settings.chart_id);
    let type1 = sp_settings.x_attribute;
    let type2 = sp_settings.y_attribute;
    let xAxisTitle = sp_settings.x_axis_title;
    let yAxisTitle = sp_settings.y_axis_title;
    
    let data1 = chartData.map(function(e) {
        return e[type1];
    })
    let data2 = chartData.map(function(e) {
        return e[type2];
    })

    //clear any previous barChart
    d3Scatter.selectAll("*")
        .remove();

        d3Scatter.append("div")
        .attr("class", "title")
        .text(`Scatter Plot: ${xAxisTitle} vs ${yAxisTitle}`);

        d3Scatter.append("svg")
        .attr("height", 400)
        .attr("width", 550);
    //TODO: finish this part.
    let svg = d3Scatter.select("svg");
    let margin = 120;
    let width = svg.attr("width") - margin;
    let height = svg.attr("height") - margin;



    xScale = d3.scaleLinear().range([0, width]);//.padding(0.4);//scaleBand() is used to construct a band scale. This is useful when our data has discrete bands.
    yScale = d3.scaleLinear().range([height, 0]);//a linear scale for the y-axis since this axis will show our stock prices.


    let g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 20 + ")");

    xScale.domain([d3.min(data1, function (d) { return Number.parseInt(d); }), d3.max(data1, function (d) { return Number.parseInt(d); })]);
    yScale.domain([d3.min(data2, function (d) { return Number.parseInt(d); }), d3.max(data2, function (d) { return Number.parseInt(d); })]);


    g.append("g") //Another group element to have our x-axis grouped under one group element
        .attr("transform", "translate(0," + height + ")") // We then use the transform attribute to shift our x-axis towards the bottom of the SVG.
        .call(d3.axisBottom(xScale).tickFormat(function (d) {
            return d;
        }).ticks(10)) //We then insert x-axis on this group element using .call(d3.axisBottom(x)).
        .append("text")
        .attr("y", 35)
        .attr("x", 350)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text(xAxisTitle);

    g.append("g") //Another group element to have our y-axis grouped under one group element
        .call(d3.axisLeft(yScale).tickFormat(function (d) {
            return d;
        })
            .ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text(yAxisTitle);

    g.selectAll(".circle")
        .data(chartData)
        .enter().append("circle")
        .attr("r", function (d) { return 3; })
        .attr("cx", function (d) { return xScale(Number.parseInt(d[type1])); })
        .attr("cy", function (d) { return yScale(Number.parseInt(d[type2])); })
        .style("fill", function(d) {return d["color"]});

    brush = d3.brush()
    .extent([
        [d3.min(xScale.range()), d3.min(yScale.range())],
        [d3.max(xScale.range()), d3.max(yScale.range())]
    ])
    .on("start brush end", (event) => {
            if (event.selection === null) {
            } else {
            const [[x0, y0], [x1, y1]] = event.selection;

            let allfalse = true;

            chartData.forEach(function(e) {
                if(x0 <= xScale(Number.parseInt(e[type1])) && 
                    x1 >= xScale(Number.parseInt(e[type1])) && 
                    y0 <= yScale(Number.parseInt(e[type2])) && 
                    y1 >= yScale(Number.parseInt(e[type2])))
                    {
                        e.brushed = true;
                        allfalse = false;
                    }
                    else
                    {
                        e.brushed = false;
                    }
            })

            if(allfalse)
            {
                chartData.forEach(function(e) {
                    e.brushed = true;
                });
            }

            showParallelCoordinates();
            showBarChart();
            //console.log(chartData);
        }
    })

    g.selectAll(".brushContainer")
        .data([1])
        .join("g")
        .attr("class", "brushContainer")
        .call(brush);
}