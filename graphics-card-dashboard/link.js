
//To produce linking implementation two or more charts have to share the same data.
//strategy - create a list of link groups. each link group will have the data associated with it.

/*
linkGroup{
    name: String, //the name of this linkgroup. 
    linkedCharts: Chart[], //list of charts that is associated with this group.
    data: [
        {price: 100, company: "NVIDIA", idx: 0, selected: true, color: "#909090"},
        {price: 200, company: "AMD", idx: 1, selected: true, color: "#535353"}
    ] //list of data points
}
*/

/*
chart{
    name: String, //The name of the chart
    linkGroups: LinkGroup[], //List of linkGroups. Can a chart have multiple linkGroups?
}
*/

CHART_NAMES = {
    SCATTER: "Scatter Plot",
    PIE: "Pie Chart",
    PARALLEL: "Parallel Coordinates",
    BAR: "Bar Chart"
}

LINK_GROUP_NAMES = {
    MAIN: "Main Link Group"
}

CHART_ID = {
    SCATTER: "#scatterplot",
    PIE: "#pie-chart",
    PARALLEL: "#parallel-coordinates-chart",
    BAR: "#bar-chart"
}

ATTR_NAMES = {
    GRAPHICS_CARD_NAME:"Graphics Card Name",
    MANUFACTURER:"Manufacturer",
    RELEASE_YEAR:"Release Year",
    GPU_CLOCK:"GPU clock(MHz)",
    MEMORY_SIZE:"Memory Size(GB)",
    MEMORY_TYPE:"Memory Type",
    MEMORY_BUS_WIDTH:"Memory Bus Width(bits)",
    MEMORY_CLOCK:"Memory Clock(MHz)",
    PRICE:"Price($)",
    G3DMARK:"G3DMark",
    TDP:"TDP(Watt)"
}

charts = [];
linkGroups = [];

//create all four charts.
for(let name in CHART_NAMES)
{
    createNewChart(CHART_NAMES[name]);
}
//create the main link group.

createLinkGroup(LINK_GROUP_NAMES.MAIN);


//add all charts to the main link group.
for(let chart of charts)
{
    connectChartWithLinkGroup(chart.name, LINK_GROUP_NAMES.MAIN);
}


//Creates a new chart and adds it to charts.
function createNewChart(name)
{
    let chart = {};
    chart.name = name;
    chart.linkGroups = [];
    charts.push(chart);
}

//Gets the chart object with the given name.
function getChartWithName(name)
{
    for(let i = 0; i < charts.length; i++)
    {
        if(charts[i].name === name)
            return charts[i];
    }
    return null;
}

//creates a new link group and adds it to the linkGroups list. Returns the id of the created linkGroup.
function createLinkGroup(name)
{
    let linkGroup = {};
    linkGroup.name = name;
    linkGroup.linkedCharts = [];
    let data = getMyDataV2();
    for(let i = 0; i < data.length; i++)
    {
        data[i].idx = i;
        data[i].selected = true;
        data[i].brushed = true;
        data[i].color = "#000000";
    }
    linkGroup.data = data;
    linkGroups.push(linkGroup);
    return linkGroup.id;
}

function resetLinkGroupData(name)
{
    let linkGroup = getLinkGroupWithName(name);
    for(let data of linkGroup.data)
    {
        data.selected = true;
        data.brushed = true;
        data.color = "#000000";
    }
}

//gets the link group with the provided name.
function getLinkGroupWithName(name)
{
    for(let i = 0; i < linkGroups.length; i++)
    {
        if(linkGroups[i].name === name)
            return linkGroups[i];
    }
    return null;
}

//associate a chart with a linkgroup. Now if one chart changes the data, all the other charts with similar 
//link groups will change as well.
function connectChartWithLinkGroup(chartName, linkGroupName)
{
    let chart = getChartWithName(chartName);
    let linkGroup = getLinkGroupWithName(linkGroupName);
    if(chart != null && linkGroup != null)
    {
        //adds the linkGroup's name to the chart's linkGroups if it doesnt exist.
        let exist = false;
        for(let i = 0; i < chart.linkGroups.length; i++)
        {
            if(chart.linkGroups[i] === linkGroup)
                exist = true;
        }
        if(!exist)
        {
            chart.linkGroups.push(linkGroup);
        }
        //adds the chart's name to the linkGroup's linkedCharts array.
        exist = false;
        for(let i = 0; i < linkGroup.linkedCharts.length; i++)
        {
            if(linkGroup.linkedCharts[i] === chart)
                exist = true;
        }
        if(!exist)
        {
            linkGroup.linkedCharts.push(chart);
        }
    }
}

function deselectAllPoints(chartName)
{
    let chart = getChartWithName(chartName);
    if(chart)
    {
        for(let i = 0; i < chart.linkGroups.length; i++)
        {
            let data = chart.linkGroups[i].data;
            for(let j = 0; j < data.length; j++)
            {
                data[j].selected = false;
            }
        }
    }
}

function selectAllPoints(chartName)
{
    let chart = getChartWithName(chartName);
    if(chart)
    {
        for(let i = 0; i < chart.linkGroups.length; i++)
        {
            let data = chart.linkGroups[i].data;
            for(let j = 0; j < data.length; j++)
            {
                data[j].selected = true;
            }
        }
    }
}

//For the given chartName, update all the chart's linkGroup's data.
//PointsIdx contains a list of points that should become selected.
//All other points should be deselected.
function selectPoints(chartName, pointsIdx)
{
    let chart = getChartWithName(chartName);
    if(chart)
    {
        deselectAllPoints(chartName);
        for(let i = 0; i < chart.linkGroups.length; i++)
        {
            let data = chart.linkGroups[i].data;
            for(let j = 0; j < pointsIdx.length; j++)
            {
                data[pointsIdx[j]].selected = true;
            }
        }
    }
}

/**
 * Create a histogram for the given data.
 * @param {Array} data - The data values.
 */
function getHistogram(data) {
    let histogram = {};
    for (let i = 0; i < data.length; i++) {
        if (histogram[data[i]]) {
            histogram[data[i]]++;
        }
        else {
            histogram[data[i]] = 1;
        }
    }
    return histogram;
}