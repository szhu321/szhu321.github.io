function loadPage()
{
    resetLinkGroupData(LINK_GROUP_NAMES.MAIN);
    
    let pieChartConfig = {
        chart_data: getChartWithName(CHART_NAMES.PIE).linkGroups[0].data,
        attribute_type: document.querySelector("#dropdown1").value
    }
    setPieChartSettings(pieChartConfig);
    showPieChart();

    let scatterPlotConfig = {
        chart_data: getChartWithName(CHART_NAMES.SCATTER).linkGroups[0].data,
        x_attribute: document.querySelector("#dropdown2").value,
        y_attribute: document.querySelector("#dropdown3").value,
        x_axis_title: document.querySelector("#dropdown2").value,
        y_axis_title: document.querySelector("#dropdown3").value
    }
    setScatterPlotSettings(scatterPlotConfig);
    showScatterPlot();



    showParallelCoordinates();

    let barChartConfig = {
        chart_data: getChartWithName(CHART_NAMES.BAR).linkGroups[0].data,
        attribute_type: document.querySelector("#dropdown4").value,
        title: document.querySelector("#dropdown4").value
    }
    setBarChartSettings(barChartConfig);
    showBarChart();

    
}



let d3DropDown1 = d3.select("#dropdown1");
let dropDownItems = [
    ATTR_NAMES.MANUFACTURER
]
//let promtText = ATTR_NAMES.MANUFACTURER;
//fill in the drop down with the correct options.
d3DropDown1
  .selectAll() //makes d3 recognize the dropDown as the parent.
  .data(dropDownItems)
  .enter().append("option") //when enter is called the data is added to empty placeholder objects.
  .text(function(d, i) {
    //if(i === 0)
      //return promtText; //since we dont use graphics card name we can use the first slot as a prompt.
    return d;
  })
  .attr("value", function(d, i) {
    //if(i === 0)
      //return promtText;
    return d;
  });

d3DropDown1.on("change", function(e) {
    loadPage();
});


let d3DropDown2 = d3.select("#dropdown2");
let dropDownItems2 = [
    ATTR_NAMES.GPU_CLOCK,
    ATTR_NAMES.PRICE,
    ATTR_NAMES.MEMORY_CLOCK,
    ATTR_NAMES.G3DMARK,
    ATTR_NAMES.TDP,
    ATTR_NAMES.RELEASE_YEAR,
    ATTR_NAMES.MEMORY_SIZE,
    ATTR_NAMES.MEMORY_TYPE
]
//let promtText = ATTR_NAMES.MANUFACTURER;
//fill in the drop down with the correct options.
d3DropDown2
  .selectAll() //makes d3 recognize the dropDown as the parent.
  .data(dropDownItems2)
  .enter().append("option") //when enter is called the data is added to empty placeholder objects.
  .text(function(d, i) {
    //if(i === 0)
      //return promtText; //since we dont use graphics card name we can use the first slot as a prompt.
    return d;
  })
  .attr("value", function(d, i) {
    //if(i === 0)
      //return promtText;
    return d;
  });

d3DropDown2.on("change", function(e) {
    loadPage();
});



let d3DropDown3 = d3.select("#dropdown3");
let dropDownItems3 = [
  ATTR_NAMES.GPU_CLOCK,
  ATTR_NAMES.PRICE,
  ATTR_NAMES.MEMORY_CLOCK,
  ATTR_NAMES.G3DMARK,
  ATTR_NAMES.TDP,
  ATTR_NAMES.RELEASE_YEAR,
  ATTR_NAMES.MEMORY_SIZE,
  ATTR_NAMES.MEMORY_TYPE
]
//let promtText = ATTR_NAMES.MANUFACTURER;
//fill in the drop down with the correct options.
d3DropDown3
  .selectAll() //makes d3 recognize the dropDown as the parent.
  .data(dropDownItems3)
  .enter().append("option") //when enter is called the data is added to empty placeholder objects.
  .text(function(d, i) {
    //if(i === 0)
      //return promtText; //since we dont use graphics card name we can use the first slot as a prompt.
    return d;
  })
  .attr("value", function(d, i) {
    //if(i === 0)
      //return promtText;
    return d;
  });

d3DropDown3.on("change", function(e) {
    loadPage();
});



let d3DropDown4 = d3.select("#dropdown4");
let dropDownItems4 = [
    ATTR_NAMES.RELEASE_YEAR,
    ATTR_NAMES.MEMORY_SIZE,
    ATTR_NAMES.MEMORY_TYPE,
    ATTR_NAMES.MEMORY_BUS_WIDTH,
]
//let promtText = ATTR_NAMES.MANUFACTURER;
//fill in the drop down with the correct options.
d3DropDown4
  .selectAll() //makes d3 recognize the dropDown as the parent.
  .data(dropDownItems4)
  .enter().append("option") //when enter is called the data is added to empty placeholder objects.
  .text(function(d, i) {
    //if(i === 0)
      //return promtText; //since we dont use graphics card name we can use the first slot as a prompt.
    return d;
  })
  .attr("value", function(d, i) {
    //if(i === 0)
      //return promtText;
    return d;
  });

d3DropDown4.on("change", function(e) {
    loadPage();
});



loadPage();

let resetBtn = document.querySelector("#reset");
resetBtn.onclick = loadPage;