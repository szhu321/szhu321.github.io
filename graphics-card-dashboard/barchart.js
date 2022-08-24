let bc_settings = {
    chart_id: CHART_ID.BAR,
    chart_data: [],
    attribute_type: "",
    title: ""
}

function setBarChartSettings(config) {
    let {chart_data, attribute_type, title} = config;
    if(chart_data !== undefined)
        bc_settings.chart_data = chart_data;
    if(attribute_type !== undefined)
        bc_settings.attribute_type = attribute_type;
    if(title !== undefined)
        bc_settings.title = title;
}


/**
 * Displays a bar chart with the given data.
 */
 function showBarChart() {

    let chartData = bc_settings.chart_data;
    let type = bc_settings.attribute_type;
    let title = bc_settings.title;

    let data = chartData.map(function(e) {
        return e[type];
    })

    let histogram = getHistogram(data);

    //create a histogram based on color;
    /* format: [{
        attr: "",
        count: 0,
        data: [{}]
    }]*/
    newHistogram = [];
    chartData.forEach(function(e, i) {

        

        let added = false;
        for(let i = 0; i < newHistogram.length; i++)
        {
            if(newHistogram[i].attr_value === e[type])
            {
                newHistogram[i].count++;
                newHistogram[i].data.push(e);
                added = true;
                break;
            }
        }
        if(!added)
        {
            newHistogram.push({
                attr_value: e[type],
                count: 1,
                data: [e]
            });
        }
    })

    newHistogramByColor = [];
    chartData.forEach(function(e, i) {
        //console.log(e["selected"]);
        if(e["selected"] === false || e["brushed"]===false)
            return;
        let added = false;
        for(let i = 0; i < newHistogramByColor.length; i++)
        {
            if(newHistogramByColor[i].attr_value === e[type] && newHistogramByColor[i].color === e["color"])
            {
                newHistogramByColor[i].count++;
                newHistogramByColor[i].data.push(e);
                added = true;
                break;
            }
        }
        if(!added)
        {
            newHistogramByColor.push({
                attr_value: e[type],
                color: e["color"],
                count: 1,
                data: [e]
            });
        }
    })


    //console.log(newHistogram);
    //console.log(newHistogramByColor);

    //color order
    let colorOrder = [];
    newHistogramByColor.forEach(function(e){
        if(colorOrder.indexOf(e["color"]) === -1)
        {  
            colorOrder.push(e["color"]);
        }
    });

    //console.log(colorOrder);

    let d3Bar = d3.select(CHART_ID.BAR);

    //clear any previous barChart
    d3Bar.selectAll("*")
        .remove();

    d3Bar.append("div")
        .attr("class", "title")
        .text("Bar Chart: " + title);

    d3Bar.append("svg")
        .attr("height", 400)
        .attr("width", 500);

    let barChartSvg = d3Bar.select("svg"); //creating a new svg.
    let margin = 70;
    let width = barChartSvg.attr("width") - margin;
    let height = barChartSvg.attr("height") - margin;

    let xDomain = [];
    let yDomain = [];
    for (let key in histogram) {
        xDomain.push(key);
        yDomain.push(histogram[key]);
    }

    //data
    let xScale = d3.scaleBand()
        .domain(xDomain)//pass in all the data as the domain.
        .range([0, width]).padding(0.4);//scaleBand() is used to construct a band scale. This is useful when our data has discrete bands.

    //frequency
    let yScale = d3.scaleLinear()
        .domain([0, Math.max(...yDomain)])

        .range([height, 0]);

    let g = barChartSvg.append("g")
        .attr("transform", "rotate(90)")
        .attr("transform", "translate(" + 60 + "," + 0 + ")");
        

    g.append("g") //Another group element to have our x-axis grouped under one group element
        .attr("transform", "translate(0," + height + ")") // We then use the transform attribute to shift our x-axis towards the bottom of the SVG.
        .call(d3.axisBottom(xScale)) //We then insert x-axis on this group element using .call(d3.axisBottom(x)).
        .append("text")
        .attr("y", height - 300)
        .attr("x", width - 250)
        .attr("font-size", 12)
        .attr("text-anchor", "end")
        .attr("fill", "black")
        .text(title); // add the title of this data.

    g.append("g") //Another group element to have our y-axis grouped under one group element
        .call(d3.axisLeft(yScale).tickFormat(function (d) {
            //console.log(d);
            return d;
        })
            .ticks(20)) //We have also specified the number of ticks we would like our y-axis to have using ticks(10).
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("font-size", 12)
        .attr("y", 30)
        .attr("x", -20)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("fill", "black")
        .text("Frequency");



    //color bar data calculation
    let rectBarData = [];
    let completedAttrValues = [];
    let colorOrderIdx = 0;

    for(let i = 0; i < newHistogramByColor.length; i++)
    {
        let currentAttrValue = newHistogramByColor[i].attr_value;
        if(completedAttrValues.indexOf(currentAttrValue) === -1)
        {
            let compoundedHeight = 0;
            for(let j = 0; j < colorOrder.length; j++)
            {
                //for all the colors create a slice of rectangle.
                let currentColor = colorOrder[j];
                
                for(let k = i; k < newHistogramByColor.length; k++)
                {
                    if(newHistogramByColor[k].attr_value === currentAttrValue &&
                        newHistogramByColor[k].color === currentColor)
                        {
                            let rectData = newHistogramByColor[k];
                            rectData.x = xScale(""+currentAttrValue);
                            rectData.height = height - yScale(rectData.count);
                            rectData.y = yScale(rectData.count) - compoundedHeight;
                            rectBarData.push(rectData);
                            compoundedHeight += rectData.height;
                        }
                }
            }
            completedAttrValues.push(currentAttrValue);
        }
    }
    
    //console.log(rectBarData);



    // g.selectAll(".bar") //created dynamic bars with our data using the SVG rectangle element.
    //     .data(xDomain)
    //     .enter()
    //     .append("rect")
    //     .attr("class", "bar")
    //     .attr("x", function (d) { return xScale(d); })  //x scale created earlier and pass the year value from our data.
    //     .attr("y", function (d) { return yScale(histogram[d]); }) // pass the data value to our y scale and receive the corresponding y value from the y range.
    //     .attr("width", xScale.bandwidth()) //width of our bars would be determined by the scaleBand() function.
    //     .attr("height", function (d) {
    //         return height - yScale(histogram[d]);
    //     }); //height of the bar would be calculated as height - yScale(d.value)
    // //the height of the SVG minus the corresponding y-value of the bar from the y-scale

    g.selectAll(".bar") //created dynamic bars with our data using the SVG rectangle element.
        .data(rectBarData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return d.x; }) 
        .attr("y", function (d) { return d.y; })
        .attr("width", xScale.bandwidth()) 
        .attr("height", function (d) {
            return d.height;
        })
        .attr("fill", function(d){
            return d.color;
        }); 
}


