//This file provides the functionality to get the parsed data.

let data_rows = csv.split("\n");
let data_cols = {}
let data_properties = data_rows[0].split(",");
let unlabeledData = [];
//let chosenAttributeIdx = [2,3,4,6,7,8,9,10];
let chosenAttributeIdx = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for(let i = 0; i < data_properties.length; i++)
{
    //initialize some empty arrays.
    unlabeledData[i] = [];
}

//starting at the second row add the data into each unlabeledData index.
for(let i = 1; i < data_rows.length; i++)
{
    let currentRow = data_rows[i].split(",");
    for(let j = 0; j < currentRow.length; j++)
    {
        if(Number.isFinite(Number.parseFloat(currentRow[j])))
            unlabeledData[j].push(Number.parseFloat(currentRow[j]));
        else
            unlabeledData[j].push(currentRow[j]);
    }
}

for(let i = 0; i < data_properties.length; i++)
{
    //initializing the data object properties/attributes
    data_cols[data_properties[i]] = unlabeledData[i];
}



function getNumberOfDataPoints()
{
    return data_rows.length - 1;
}

let storedDataV1 = getMyDataV1();
//returns an array of object that has the following properties,
// name: String
// data: Array of data
function getMyDataV1()
{
    let dataList = [];
    for(let i = 0; i < chosenAttributeIdx.length; i++)
    {
        let mydataObj = {};
        mydataObj["name"] = data_properties[chosenAttributeIdx[i]];
        mydataObj["data"] = unlabeledData[chosenAttributeIdx[i]];

        dataList.push(mydataObj);
    }
    return dataList;
}

//returns an array of objects where each object represent a row of data.
//The properties in the obj are the attributes and the values are the value of the attribute.
function getMyDataV2()
{
    let dataList = [];
    let dataV1 = getMyDataV1();

    for(let i = 0; i < getNumberOfDataPoints(); i++)
    {
        let dataPointObj = {};
        for(let j = 0; j < chosenAttributeIdx.length; j++)
        {
            let dataObj = dataV1.filter(function(d){ return d.name === data_properties[chosenAttributeIdx[j]]})
            if(Number.isFinite(Number.parseFloat(dataObj[0].data[i])))
                dataPointObj[data_properties[chosenAttributeIdx[j]]] = Number.parseFloat(dataObj[0].data[i]);
            else
                dataPointObj[data_properties[chosenAttributeIdx[j]]] = dataObj[0].data[i];
        }
        dataList.push(dataPointObj);
    }
    return dataList;
}

function getDataForAttribute(attrName)
{
    for(let i = 0; i < storedDataV1.length; i++)
    {
        if(storedDataV1[i].name === attrName)
            return storedDataV1[i].data;
    }
    return null;
}

function getAttributeNames()
{
    let names = [];
    for(let i = 0; i < chosenAttributeIdx.length; i++)
    {
        names.push(data_properties[chosenAttributeIdx[i]]);
    }
    return names;
}


//COORELATION CALCULATION

function getMean(dataList)
{
    let sum = 0.0;
    for(let i = 0; i < dataList.length; i++)
    {
        sum += dataList[i];
    }
    return sum / dataList.length;
}

function calculateCorrelation(dataListX, dataListY)
{
    let yMean = getMean(dataListY);
    let xMean = getMean(dataListX);
    //calculateTop Sigma((xi - xMean)(yi - yMean));
    //calculateBottom Sigma((xi - xMean)^2) * Sigma((yi - yMean)^2)

    let sumXYMean = 0.0;
    let sumXSquared = 0.0;
    let sumYSquared = 0.0;
    for(let i = 0; i < dataListX.length; i++)
    {
        sumXYMean += (dataListX[i] - xMean)*(dataListY[i] - yMean);
        sumXSquared += (dataListX[i] - xMean)*(dataListX[i] - xMean);
        sumYSquared += (dataListY[i] - yMean)*(dataListY[i] - yMean);
    }

    return sumXYMean / (Math.sqrt(sumXSquared * sumYSquared));
}


function getCorrelationMatrix()
{
    let data = getMyDataV1();
    let names = getAttributeNames();

    let coorGrid = [];

    for(let row = 0; row < names.length; row++)
    {
        for(let col = 0; col < names.length; col++)
        {
            let gridItem = {};
            gridItem.column = col + 1;
            gridItem.row = row + 1;
            gridItem.column_x = names[row];
            gridItem.column_y = names[col];

            gridItem.correlation = calculateCorrelation(data[row].data, data[col].data);
            coorGrid.push(gridItem);
        }
    }
    return coorGrid;
}


//SCATTERPLOT_MATRIX_CALCULATIONS

function getFiveHighestAttributes()
{
    let coorMatrix = getCorrelationMatrix();
    let attrNames = getAttributeNames();

    let sumCoor = [];

    for(let row = 0; row < attrNames.length; row++)
    {
        let sumCoorItem = {};
        sumCoorItem.sum = 0;
        sumCoorItem.name = attrNames[row];
        for(let col = 0; col < attrNames.length; col++)
        {
            // row * attrNames.length + col;
            sumCoorItem.sum += Math.abs(coorMatrix[row * attrNames.length + col].correlation);

        }
        sumCoor.push(sumCoorItem);
    }

    //sort in decending order.
    sumCoor = sumCoor.sort(function(a, b) {
        return b.sum - a.sum;
    })

    //remove the last three items.
    sumCoor.pop();
    sumCoor.pop();
    sumCoor.pop();

    return sumCoor;
}

//PARALLEL COORDINATES

function getMyDataV3()
{
    let dataList = [];
    let dataV1 = getMyDataV1();

    //first order the attributes in the order that we want to display it in the parallel coordinates.
    //The order is calculated manually
    //G3DMark, MemorySize(GB), Price($), TDP(Watt), Memory Bus Width(bits), Release Year, GPU clock(MHz), Memory Clock(MHz)
    let orderedAttributesIdx = [9, 4, 8, 10, 6, 2, 3, 7];

    for(let i = 0; i < getNumberOfDataPoints(); i++)
    {
        let dataPointObj = {};
        for(let j = 0; j < orderedAttributesIdx.length; j++)
        {
            let dataObj = dataV1.filter(function(d){ return d.name === data_properties[orderedAttributesIdx[j]]})
            dataPointObj[data_properties[orderedAttributesIdx[j]]] = Number.parseFloat(dataObj[0].data[i]);
        }
        dataList.push(dataPointObj);
    }
    return dataList;
}


//PCA CHART AND SCREEPLOT

let eigenvaluesArray = [-1.8840945018282018,
    -0.23355077934363697,
    -0.7932426788964657,
    -0.8693126608692302,
    -0.3339202198272842,
    -0.19938861463940938,
    -0.23931995348250815,
    0.21504895336260066]


let eigen1 = [-0.5307589396549195,
    -0.4564984716817854,
    -0.3264367542922603,
    -0.0976408578079133,
    -0.3769098513460457,
    -0.21761073221993246,
    -0.42230854408126073,
    -0.16139835327295338];

let eigen2 = [-0.061020976463658,
    -0.12313866542552251,
    0.33449925760172305,
    -0.8873614665740494,
    0.20278624877614917,
    0.08043711599984642,
    0.004644137101941906,
    -0.18493032060642323];

function getEigenvalues()
{
    return eigenvaluesArray;
}

function getXAxisPCA()
{
    let data = getMyDataV2();

    let xAxis = [];
    for(let i = 0; i < data.length; i++)
    {
        let dataArray = Object.values(data[i]);
        //dataArray = normalize(dataArray);
        xAxis.push(dotProduct(dataArray, eigen1));
    }
    return xAxis;
}

function getYAxisPCA()
{
    let data = getMyDataV2();

    let yAxis = [];
    for(let i = 0; i < data.length; i++)
    {
        let dataArray = Object.values(data[i]);
        //dataArray = normalize(dataArray);
        yAxis.push(dotProduct(dataArray, eigen2));
    }
    return yAxis;
}

function normalize(arr)
{
    let narr = [];
    let sumSquared = 0.0;
    for(let i = 0; i < arr.length; i++)
    {
        sumSquared += arr[i] * arr[i];
    }
    let magnitude = Math.sqrt(sumSquared);

    for(let i = 0; i < arr.length; i++)
    {
        narr.push(arr[i] / magnitude);
    }
    return narr;
}

function dotProduct(arr1, arr2)
{
    let sum = 0.0;
    for(let i = 0; i < arr1.length && i < arr2.length; i++)
    {
        sum += arr1[i] * arr2[i];
    }
    return sum;
}

//BIPLOT
function getPC1()
{
    return eigen1;
}

function getPC2()
{
    return eigen2;
}


function printDataV2Array()
{
    let data = getMyDataV2();
    let dataStr = "[";
    for(let i = 0; i < data.length; i++)
    {
        let interStr = "[";
        Object.values(data[i]).forEach(v => interStr+=`${v}, `)
        interStr = interStr.substr(0, interStr.length - 2);
        interStr += "],";
        dataStr += interStr;
    }

    dataStr += "]";

    console.log(dataStr);

}



//MDS DATA POINTS
let mdsdata = [[ -5563.74969395,   7740.34470948],
       [ -7688.85227495,  10902.02634421],
       [ -6530.24267404,   8666.43274932],
       [ -9337.70547113,  13885.96506335],
       [-11180.27316552,  17652.32369799],
       [ -7797.5052056 ,  11254.5385595 ],
       [ -1986.2774787 ,   2948.3685536 ],
       [ -4221.15160743,   6796.46438978],
       [ -8126.40126038,  12601.463798  ],
       [ -9568.93187274,  14723.93812052],
       [-12101.25964234,  17499.18917971],
       [ -7757.99887137,  11501.21494869],
       [ -9105.1574926 ,  13306.67798713],
       [ -8919.44833095,  16705.12796983],
       [ -9829.99353943,  17799.64240488],
       [ -9439.9255855 ,  15576.37154009],
       [ -5027.45616835,   7967.53446535],
       [  2223.21984973,  -2418.12598437],
       [ -2053.75414309,   2712.29664825],
       [ -5227.12980148,   7264.67671293],
       [ -6089.61447595,   9276.30990041],
       [ -2954.97373912,  11550.90206326],
       [  -613.03604958,   1988.94713316],
       [ -2433.96250288,   3408.54718942],
       [ -3185.13323769,   4928.32619739],
       [ -3792.49221556,   5786.28440944],
       [ -3204.64468567,   5086.14856239],
       [ -4523.34519605,   6723.59718135],
       [ -6317.69324074,   8605.41247449],
       [ -7001.83369908,  10217.36405236],
       [ -7528.69078116,  11517.60459684],
       [ -3296.54578319,   7803.93289111],
       [  1378.51820483,  -3572.57022833],
       [ -1974.86841956,   3353.73287565],
       [ -5844.73579347,   8534.91868471],
       [ -7215.03933716,  10672.63374407],
       [ -9015.84517686,  13130.65670008],
       [  3287.40331555,  11073.32203083],
       [  1413.94414281,  -1619.95167821],
       [ -5327.36012505,   8187.32572168],
       [ -4067.39198999,  14768.19710099],
       [ -5013.62088197,  13443.95344849],
       [ -5289.73881082,  13815.23477792],
       [  2166.82434593,  -2190.29277676],
       [  1667.66724207,  -1484.34996524],
       [ -1595.65923782,   2685.47524041],
       [ -5512.86617256,   5842.45570809],
       [ -6033.8158113 ,   6734.12485647],
       [ -3174.74204685,   7763.36237884],
       [  2181.26914871,  -2385.52319728],
       [ -4858.7545271 ,   7075.9365668 ],
       [ -6923.2926112 ,  10123.42524044],
       [  2489.92200543,  -2486.01659746],
       [  2092.59643841,  -2783.80831008],
       [   666.66854449,  -1131.89107298],
       [   582.21790708,  -1146.05080468],
       [  -567.34075558,   1121.59179939],
       [  2568.6568186 ,  -3312.0508279 ],
       [ -2740.81481864,   5058.80073231],
       [  1534.14951835,  -1909.90285003],
       [ -9316.46016419,   9994.84445143],
       [ -5063.30853693,    976.66971539],
       [  1333.9102831 ,  -1491.43624084],
       [  -297.47236621,   -426.50489727],
       [ -1346.78413665,   1618.17729375],
       [   771.72098101,  -1427.27899994],
       [ -1464.72128832,   2504.56925765],
       [  2841.64590205,  -4355.28902961],
       [   127.8815353 ,   -604.11553565],
       [    95.51029663,    719.14648416],
       [ -4337.41440545,   6285.18351339],
       [ -5319.0029158 ,   7703.07992286],
       [  1315.2468032 ,  -1321.8155846 ],
       [ -3966.83852909,   4784.17197334],
       [ -4271.82607699,  10153.78725435],
       [  1934.78979596,  -2386.40338505],
       [  1784.66579742,  -2088.37201555],
       [   636.17474583,   -856.78537851],
       [   -56.16128436,    468.99372558],
       [  -166.56065594,    256.26413515],
       [   435.45032961,   -175.63369707],
       [ -4632.01117776,   6652.16551727],
       [  1677.09917943,  -2251.54314557],
       [  1311.14053915,  -1793.5654284 ],
       [   126.72655604,   -126.14756238],
       [  -394.35461179,    715.53470211],
       [  -547.80220787,    708.93400516],
       [ -1715.82069722,   3252.52180865],
       [  -625.9354044 ,    878.13097355],
       [  2167.86886936,  -2978.51333542],
       [  2587.50144992,  -4244.15135689],
       [  2204.41781085,  -3676.39406604],
       [  1867.60410239,  -2306.88306975],
       [   626.60242256,   -656.69125649],
       [  -980.60128259,   1090.67264399],
       [   109.79186592,   2493.80990625],
       [ -1487.96595592,   1871.67663666],
       [  1137.6974108 ,     19.1091082 ],
       [  2937.6808796 ,  -4287.18827829],
       [  2973.0894748 ,  -4310.98080228],
       [  2612.59930786,  -4318.30350183],
       [  2528.1387229 ,  -3457.28524104],
       [ -2269.28332769,   3235.59366944],
       [    72.4792603 ,    146.08017835],
       [ -3033.5394601 ,   4555.0124436 ],
       [  -647.3912621 ,   1337.04620844],
       [ -1093.39486794,   3322.23904165],
       [  1341.54930709,  -1825.53985988],
       [  2750.21501991,  -4223.11731629],
       [   922.73672144,  -1170.62521305],
       [  -208.12624048,     31.32301586],
       [   280.18433579,  -3829.44960134],
       [  2759.28725058,  -4125.8063202 ],
       [  2625.70785808,  -4232.14355555],
       [  2533.89070314,  -3866.52399447],
       [  1900.70571405,  -2229.94355375],
       [  1859.22175414,  -1952.3402123 ],
       [   507.03736275,   -735.37080121],
       [  2444.01564891,  -3230.88982106],
       [ -2124.92855347,   2645.643979  ],
       [  2308.65974332,  -4147.55366185],
       [  2120.76692804,  -3934.94191161],
       [  1622.67308115,  -3163.77836224],
       [  1487.5611258 ,  -2906.63478531],
       [   626.73488177,  -2534.80523872],
       [ -1154.51723878,   1972.67801002],
       [  2961.99434082,  -4184.35165778],
       [   926.0166705 ,  -1361.65064864],
       [  1329.59125288,  -2555.85598635],
       [  2093.77700122,  -3485.86187019],
       [   833.57450476,  -1270.25243097],
       [  1222.69335476,  -1959.22731901],
       [  -439.3746317 ,    171.67825336],
       [  2945.62632477,  -4636.43292082],
       [  2782.59785099,  -4338.60272448],
       [  2528.87622028,  -3887.79722494],
       [  3217.71883808,  -4059.35089071],
       [  2444.06675784,  -3230.86329171],
       [  1956.71588476,  -2610.63792753],
       [  1202.01915045,  -1378.84328112],
       [   990.9671778 ,  -1054.4300455 ],
       [   319.32709006,   -335.97678072],
       [  1320.117165  ,  -2474.05984382],
       [   227.57224155,    -54.95342053],
       [  2940.00306866,  -4799.09779962],
       [  2722.42359592,  -4313.4008727 ],
       [  2889.33904996,  -4576.6100485 ],
       [  2771.19679929,  -4240.16079676],
       [  2544.13614055,  -4079.2689725 ],
       [  1907.12424529,  -3748.80703126],
       [  1755.68989837,  -3430.15032092],
       [   998.71575121,  -1589.71319737],
       [  1340.40632449,  -2863.86521964],
       [  2650.0861792 ,  -4055.89353121],
       [  2027.51957572,  -4159.42228391],
       [  1971.55727914,  -2911.05982842],
       [  2945.05317478,  -4833.86665576],
       [  2868.07255141,  -4506.49096146],
       [  2789.28985408,  -4256.88008704],
       [  2251.65565054,  -3574.12638745],
       [  2539.33642275,  -4780.92245592],
       [  3063.19129606,  -4609.39199148],
       [  2610.48156078,  -4427.07568786],
       [  2624.3035093 ,  -4422.39691118],
       [  2581.17578784,  -4455.31596062],
       [  2680.49082644,  -4386.2976794 ],
       [  1963.37754357,  -3177.22330094],
       [  2317.83874167,  -3554.59768008],
       [  1579.39096832,  -2667.32768146],
       [  1571.96404025,  -3113.41958435],
       [   955.59652944,  -2309.64744896],
       [  2859.18398572,  -4957.4077397 ],
       [   954.15160776,  -2614.52954408],
       [  2040.20703443,  -3253.80879234],
       [  1923.43877372,  -3038.02474762],
       [  1749.06811021,  -2589.6528022 ],
       [  1736.97213816,  -2371.37703596],
       [  2391.49708414,  -4958.03876659],
       [  2800.46415464,  -4714.91146912],
       [  2191.04389537,  -3425.19710874],
       [  2739.57862843,  -4499.53545789],
       [  2379.01460889,  -3820.24399636],
       [  1766.71248738,  -3100.02289058],
       [  1778.06240503,  -3094.52575262],
       [  1920.23052346,  -3386.80564295],
       [  1417.38467122,  -2848.22542838],
       [  1107.64926161,  -2415.30150556],
       [   618.29228961,  -1701.00211515],
       [   825.43098584,  -1840.19847391],
       [   805.73051906,  -1066.92486578],
       [  2364.30975038,  -4324.87499192],
       [  1480.32337041,  -4161.2853709 ],
       [  2730.23154062,  -4554.19563748],
       [ -2101.09885105,  -4652.34262832],
       [  2331.25457736,  -3605.17267819],
       [  2612.7759074 ,  -3868.24621207],
       [  2545.03959236,  -3664.73991808],
       [  2027.39883223,  -3279.32429045],
       [  2010.05314137,  -2933.19024227],
       [  1845.80041934,  -3096.22537099],
       [  2714.4229455 ,  -5163.20486346],
       [  3048.30993121,  -4747.08105766],
       [  2684.24714853,  -4576.13994914],
       [  2806.31085687,  -4397.82931358],
       [  2794.9928874 ,  -4406.78667306],
       [  2026.29560664,  -3891.22454676],
       [  2216.89630927,  -4116.77107316],
       [  2753.30412537,  -4705.37145187],
       [  2847.4632256 ,  -4608.95558912],
       [  2829.80191745,  -4948.46286773],
       [  2524.96897861,  -4400.53777441],
       [  2920.40169843,  -4930.06941738],
       [  2949.87587468,  -5000.48941323],
       [  2712.33989631,  -5145.17847788],
       [  2807.16697791,  -4890.97220543],
       [  2850.75218306,  -4873.55338606],
       [  2975.83406342,  -4557.69472502],
       [  2513.14398791,  -4292.10645334],
       [  2415.45199033,  -4223.7580189 ],
       [  2343.61498834,  -3810.82853663],
       [  2837.24156052,  -5064.11589345],
       [  2697.37712914,  -5159.23552314],
       [  3079.6510123 ,  -4807.37548483],
       [  2946.946617  ,  -4895.9572137 ],
       [  2756.10448485,  -4605.90804761],
       [  2756.10443229,  -4605.90807595],
       [  2593.01037872,  -4718.55478203],
       [  2306.14233923,  -4011.11591077],
       [  2756.62521742,  -3702.51140784],
       [  2027.51692416,  -3711.01370804],
       [  2748.76762035,  -4743.57125337],
       [  2092.34468915,  -4924.46268864],
       [  2343.90100884,  -4271.34934423],
       [  2104.47321852,  -4077.94158252],
       [  3166.55258007,  -4713.63279166]]


function getMDSData()
{
    return mdsdata;
}

//MDS 1 - |correlation|
function getCorrelationMatrixArray()
{
    let coorMatrix = getCorrelationMatrix();
    let coorMatrixArray = [];

    for(let i = 0; i < 8; i++)
    {
        let interArray = [];
        coorMatrix.forEach(function(e) {
            if(e.row === i + 1)
            {
                interArray.push(1 - Math.abs(e.correlation));
            }
        })
        coorMatrixArray.push(interArray);
    }

    return coorMatrixArray;
}

function printCorrelationMatrixArray()
{
    let data = getCorrelationMatrixArray();
    let dataStr = "[";
    for(let i = 0; i < data.length; i++)
    {
        let interStr = "[";
        data[i].forEach(v => interStr+=`${v}, `)
        interStr = interStr.substr(0, interStr.length - 2);
        interStr += "],";
        dataStr += interStr;
    }

    dataStr += "]";

    console.log(dataStr);
}

//MDS transformed 1 - |correlation| matrix

let mdsCorrData = [[ 0.24513381, -0.16719386],
[ 0.28695918, -0.01402976],
[-0.10162924, -0.18362775],
[-0.54272658,  0.23629133],
[ 0.44965402, -0.02849861],
[-0.31174469, -0.18578071],
[ 0.08244533,  0.00193737],
[-0.10809182,  0.34090198]];

function getMDSCoorData()
{
    return mdsCorrData;
}