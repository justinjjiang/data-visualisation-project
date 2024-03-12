// ----------------------------------------- Climate Effects -----------------------------------------

const element = document.getElementById("content");
element.scrollLeft = 1000;

const slider = document.getElementById('content');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});



// ----------------------------------------- CSV DATASETS -----------------------------------------

var dataSource_2020 = "datasets/2020.csv";
var co2percap2020 = document.getElementById('co2percap2020');

var world2020 = document.getElementById("world2020");
var world2019 = document.getElementById("world2019");
var world2018 = document.getElementById("world2018");
var world2017 = document.getElementById("world2017");
var world2016 = document.getElementById("world2016");
var world2015 = document.getElementById("world2015");

var data_world2020 = "datasets/2020_data.csv";
var data_world2019 = "datasets/2019_data.csv";
var data_world2018 = "datasets/2018_data.csv";
var data_world2017 = "datasets/2017_data.csv";
var data_world2016 = "datasets/2016_data.csv";
var data_world2015 = "datasets/2015_data.csv";

var twitterPlot = document.getElementById("twitterPlot");
var twitterData = "datasets/twitterdata.csv";

var droughtPlot = document.getElementById("droughtPlot");
var feelings = document.getElementById("feelings");
var statement = document.getElementById("statement");
var droughtConcern = "datasets/droughtConcern.csv";
var feelingsData = "datasets/feelingsData.csv";
var statementData = "datasets/statementData.csv";


function showDiv2020cap() {
    document.getElementById('world2020').style.display = "block";
    document.getElementById('world2019').style.display = "none";
    document.getElementById('world2018').style.display = "none";
    document.getElementById('world2017').style.display = "none";
    document.getElementById('world2016').style.display = "none";
    document.getElementById('world2015').style.display = "none";
}

function showDiv2019cap() {
    document.getElementById('world2020').style.display = "none";
    document.getElementById('world2019').style.display = "block";
    document.getElementById('world2018').style.display = "none";
    document.getElementById('world2017').style.display = "none";
    document.getElementById('world2016').style.display = "none";
    document.getElementById('world2015').style.display = "none";
}

function showDiv2018cap() {
    document.getElementById('world2020').style.display = "none";
    document.getElementById('world2019').style.display = "none";
    document.getElementById('world2018').style.display = "block";
    document.getElementById('world2017').style.display = "none";
    document.getElementById('world2016').style.display = "none";
    document.getElementById('world2015').style.display = "none";
}

function showDiv2017cap() {
    document.getElementById('world2020').style.display = "none";
    document.getElementById('world2019').style.display = "none";
    document.getElementById('world2018').style.display = "none";
    document.getElementById('world2017').style.display = "block";
    document.getElementById('world2016').style.display = "none";
    document.getElementById('world2015').style.display = "none";
}

function showDiv2016cap() {
    document.getElementById('world2020').style.display = "none";
    document.getElementById('world2019').style.display = "none";
    document.getElementById('world2018').style.display = "none";
    document.getElementById('world2017').style.display = "none";
    document.getElementById('world2016').style.display = "block";
    document.getElementById('world2015').style.display = "none";
}

function showDiv2015cap() {
    document.getElementById('world2020').style.display = "none";
    document.getElementById('world2019').style.display = "none";
    document.getElementById('world2018').style.display = "none";
    document.getElementById('world2017').style.display = "none";
    document.getElementById('world2016').style.display = "none";
    document.getElementById('world2015').style.display = "block";
}


function loadData() {
    Plotly.d3.csv(dataSource_2020, function (data) { processData(data) } );
    Plotly.d3.csv(twitterData, function (data) {processData1(data)});
    Plotly.d3.csv(droughtConcern, function (data) {processData2(data)});
    Plotly.d3.csv(feelingsData, function (data) {processData3(data)});
    Plotly.d3.csv(statementData, function (data) {processData4(data)});
};

function processData(allRows) {
    console.log(allRows);
    let x = [], y = [], x1 = [];
    for (let i = 0; i < allRows.length; i++) {
        let row = allRows[i];
        x.push(row['year']);
        y.push(row['co2_per_capita']);
        x1.push(row['co2_per_capita_world']);
    }
    makePlot(x, y, x1);
}

function makePlot(x, y, x1) {
    let data = [
        traces1 = {
                x: x,
                y: y,
                mode: "lines+markers",
                marker: {
                    size: 10
                },
                name: "Australia",
                line: {
                    color: 'rgb(120,36,40)',
                },
            },

        traces2 = {
                x: x,
                y: x1,
                mode: "lines+markers",
                name: "World",
                line: {
                    color: 'rgb(98,175,100)',
                },
                marker: {
                    size: 10
                },
            },
    ];

    
    var layout = {
        height: 500,
        paper_bgcolor: 'rgb(65,65,80)',
        plot_bgcolor: 'rgb(65,65,80)',
        
        title: "Australia vs. the World <br>(Co2 Emissions Per Capita)",
        font: {
          size: 13,
          family: "Arial, bold, sans-serif",
          color: "rgb(255,246,232)",
        },
    
        xaxis: {
          title: "Year",
          color: 'rgb(255,246,232)',
        },
    
        yaxis: {
          title: "Co2 Per Capita Average (tonnes)",
          color: 'rgb(255,246,232)',
        },

        showLegend: true,
    };

    var console = {
        displayModeBar: false,
        responsive: true,
    };

    Plotly.newPlot('co2percap2020', data, layout, console);
};

// loadData();






// ----------------------------------------- WORLD 2020 -----------------------------------------
d3.csv(data_world2020, function(err, rows){
    
    function unpack(rows, key) {
        return rows.map(function(row) {
            return row[key]; });
        }

        var data = [{
            showscale: false,
            type: "choropleth",
            locationmode: "ISO-13",
            locations: unpack(rows, 'iso_code'),
            z: unpack(rows, 'co2_per_capita'),
            text: unpack(rows, 'country'),
            hoverinfo: "z + text",
            hovertemplate: 
                "Country: %{text}<br>" +
                "Co2 Per Capita: %{z} tonnes per person<br><br>" +
                "<extra></extra>"
        }];

        var layout = {
            font: {
                size: 13,
                family: "Arial, bold, sans-serif",
                color: "rgb(255,246,232)",
              },
              
            paper_bgcolor: 'rgb(65,65,80)',
            bgcolor: 'rgb(65,65,80)',
            margin: { r: 0, t: 0, b: 0, l: 0 },
            height: 500,
            width: 450,
            geo:{
              lonaxis: {
                range: [-10]
              },
                bgcolor: 'rgb(65,65,80)',
                showframe: false,
                showland:true,
                landcolor: "white",
                showocean: true,
                oceancolor:"rgb(92,96,130)",
                projection: {
                    type: 'orthographic'
                },
            hoverlabel: {
                bordercolor: 'red',
                bgcolor: 'white'
            },
            showLegend: false,
        },
        
        };

        var console = {
            responsive: true,
            displayModeBar: false,
            scrollZoom: false,
        };
    Plotly.newPlot("world2020", data, layout, console);
});


// ----------------------------------------- WORLD 2019 -----------------------------------------
d3.csv(data_world2019, function(err, rows){
    
    function unpack(rows, key) {
        return rows.map(function(row) {
            return row[key]; });
        }

        var data = [{
            showscale: false,
            type: "choropleth",
            locationmode: "ISO-13",
            locations: unpack(rows, 'iso_code'),
            z: unpack(rows, 'co2_per_capita'),
            text: unpack(rows, 'country'),
            hoverinfo: "z + text",
            hovertemplate: 
                "Country: %{text}<br>" +
                "Co2 Per Capita: %{z} tonnes per person<br><br>" +
                "<extra></extra>"
        }];

        var layout = {
          lataxis: {
            range: [-50, 10]
          },
          lonaxis: {
              range: [100, 165]
          },
            font: {
                size: 13,
                family: "Arial, bold, sans-serif",
                color: "rgb(255,246,232)",
              },
              
            paper_bgcolor: 'rgb(65,65,80)',
            bgcolor: 'rgb(65,65,80)',
            margin: { r: 0, t: 0, b: 0, l: 0 },
            height: 500,
            width: 450,
            geo:{
              lonaxis: {
                range: [60]
              },
                bgcolor: 'rgb(65,65,80)',
                showframe: false,
                showland:true,
                landcolor: "white",
                showocean: true,
                oceancolor:"rgb(92,96,130)",
                projection: {
                    type: 'orthographic'
                },
            hoverlabel: {
                bordercolor: 'red',
                bgcolor: 'white'
            },
            showLegend: false,
        },
        };

        var console = {
            responsive: true,
            displayModeBar: false,
            scrollZoom: false,
        };
    Plotly.newPlot("world2019", data, layout, console);
});


// ----------------------------------------- WORLD 2018 -----------------------------------------
d3.csv(data_world2018, function(err, rows){
    
    function unpack(rows, key) {
        return rows.map(function(row) {
            return row[key]; });
        }

        var data = [{
            showscale: false,
            type: "choropleth",
            locationmode: "ISO-13",
            locations: unpack(rows, 'iso_code'),
            z: unpack(rows, 'co2_per_capita'),
            text: unpack(rows, 'country'),
            hoverinfo: "z + text",
            hovertemplate: 
                "Country: %{text}<br>" +
                "Co2 Per Capita: %{z} tonnes per person<br><br>" +
                "<extra></extra>"
        }];

        var layout = {
            font: {
                size: 13,
                family: "Arial, bold, sans-serif",
                color: "rgb(255,246,232)",
              },
              
            paper_bgcolor: 'rgb(65,65,80)',
            bgcolor: 'rgb(65,65,80)',
            margin: { r: 0, t: 0, b: 0, l: 0 },
            height: 500,
            width: 450,
            geo:{
              lonaxis: {
                range: [100]
              },
                bgcolor: 'rgb(65,65,80)',
                showframe: false,
                showland:true,
                landcolor: "white",
                showocean: true,
                oceancolor:"rgb(92,96,130)",
                projection: {
                    type: 'orthographic'
                },
            hoverlabel: {
                bordercolor: 'red',
                bgcolor: 'white'
            },
            showLegend: false,
        },
        };

        var console = {
            responsive: true,
            displayModeBar: false,
            scrollZoom: false,
        };
    Plotly.newPlot("world2018", data, layout, console);
});


// ----------------------------------------- WORLD 2017 -----------------------------------------
d3.csv(data_world2017, function(err, rows){
    
    function unpack(rows, key) {
        return rows.map(function(row) {
            return row[key]; });
        }

        var data = [{
            showscale: false,
            type: "choropleth",
            locationmode: "ISO-13",
            locations: unpack(rows, 'iso_code'),
            z: unpack(rows, 'co2_per_capita'),
            text: unpack(rows, 'country'),
            hoverinfo: "z + text",
            hovertemplate: 
                "Country: %{text}<br>" +
                "Co2 Per Capita: %{z} tonnes per person<br><br>" +
                "<extra></extra>"
        }];

        var layout = {
            font: {
                size: 13,
                family: "Arial, bold, sans-serif",
                color: "rgb(255,246,232)",
              },
              
            paper_bgcolor: 'rgb(65,65,80)',
            bgcolor: 'rgb(65,65,80)',
            margin: { r: 0, t: 0, b: 0, l: 0 },
            height: 500,
            width: 450,
            geo:{
                bgcolor: 'rgb(65,65,80)',
                showframe: false,
                showland:true,
                landcolor: "white",
                showocean: true,
                oceancolor:"rgb(92,96,130)",
                projection: {
                    type: 'orthographic'
                },
            hoverlabel: {
                bordercolor: 'red',
                bgcolor: 'white'
            },
            showLegend: false,
        },
        };

        var console = {
            responsive: true,
            displayModeBar: false,
            scrollZoom: false,
        };
    Plotly.newPlot("world2017", data, layout, console);
});


// ----------------------------------------- WORLD 2016 -----------------------------------------
d3.csv(data_world2016, function(err, rows){
    
    function unpack(rows, key) {
        return rows.map(function(row) {
            return row[key]; });
        }

        var data = [{
            showscale: false,
            type: "choropleth",
            locationmode: "ISO-13",
            locations: unpack(rows, 'iso_code'),
            z: unpack(rows, 'co2_per_capita'),
            text: unpack(rows, 'country'),
            hoverinfo: "z + text",
            hovertemplate: 
                "Country: %{text}<br>" +
                "Co2 Per Capita: %{z} tonnes per person<br><br>" +
                "<extra></extra>"
        }];

        var layout = {
            font: {
                size: 13,
                family: "Arial, bold, sans-serif",
                color: "rgb(255,246,232)",
              },
              
            paper_bgcolor: 'rgb(65,65,80)',
            bgcolor: 'rgb(65,65,80)',
            margin: { r: 0, t: 0, b: 0, l: 0 },
            height: 500,
            width: 450,
            geo:{
              lonaxis: {
                range: [15]
              },
                bgcolor: 'rgb(65,65,80)',
                showframe: false,
                showland:true,
                landcolor: "white",
                showocean: true,
                oceancolor:"rgb(92,96,130)",
                projection: {
                    type: 'orthographic'
                },
            hoverlabel: {
                bordercolor: 'red',
                bgcolor: 'white'
            },
            showLegend: false,
        },
        };

        var console = {
            responsive: true,
            displayModeBar: false,
            scrollZoom: false,
        };
    Plotly.newPlot("world2016", data, layout, console);
});


// ----------------------------------------- WORLD 2015 -----------------------------------------
d3.csv(data_world2015, function(err, rows){
    
    function unpack(rows, key) {
        return rows.map(function(row) {
            return row[key]; });
        }

        var data = [{
            showscale: false,
            type: "choropleth",
            locationmode: "ISO-13",
            locations: unpack(rows, 'iso_code'),
            z: unpack(rows, 'co2_per_capita'),
            text: unpack(rows, 'country'),
            hoverinfo: "z + text",
            hovertemplate: 
                "Country: %{text}<br>" +
                "Co2 Per Capita: %{z} tonnes per person<br><br>" +
                "<extra></extra>"
        }];

        var layout = {
            font: {
                size: 13,
                family: "Arial, bold, sans-serif",
                color: "rgb(255,246,232)",
              },
              
            paper_bgcolor: 'rgb(65,65,80)',
            bgcolor: 'rgb(65,65,80)',
            margin: { r: 0, t: 0, b: 0, l: 0 },
            height: 500,
            width: 450,
            geo:{
              lonaxis: {
                range: [-5]
              },
                bgcolor: 'rgb(65,65,80)',
                showframe: false,
                showland:true,
                landcolor: "white",
                showocean: true,
                oceancolor:"rgb(92,96,130)",
                projection: {
                    type: 'orthographic'
                },
            hoverlabel: {
                bordercolor: 'red',
                bgcolor: 'white'
            },
            showLegend: false,
        },
        };

        var console = {
            responsive: true,
            displayModeBar: false,
            scrollZoom: false,
        };
    Plotly.newPlot("world2015", data, layout, console);
});


// ----------------------------------------- TWITTER -----------------------------------------  
  function processData1(allRows) {
    console.log(allRows);
    let x = [],
      y = [];

    for (let i = 0; i < allRows.length; i++) {
      let row = allRows[i];
      x.push(row["year"]);
      y.push(row["tweets"]);
    }
    makePlot1(x, y);
  }
  
  
  function makePlot1(x, y) {
    var trace = [
      {
        x: x,
        y: y,
        mode: "line",
        line: {
        //   color: "rgb(200,36,40)",
        color: "LightBlue",
          width: 5,
        },
      },
    ];
  
    var layout = {
    height: 350,
    paper_bgcolor: 'rgb(65,65,80)',
    plot_bgcolor: 'rgb(65,65,80)',
      title: "#ClimateChange Tweets Per Year",
      font: {
        size: 14,
        family: "Arial, sans-serif",
        color: "White",
      },
  
      xaxis: {
        title: "Year",
      },
  
      yaxis: {
        title: "Tweets Per Year",
      },
  
      showLegend: true,
      showframe: true
  
    };

    var console1 = {
        responsive: true,
        displayModeBar: false,
        scrollZoom: false,
    };
  
    Plotly.newPlot("twitterPlot", trace, layout, console1);
  }
  

// ----------------------------------------- DROUGHT -----------------------------------------  
function processData2(allRows) {
    console.log(allRows);
    let x = [],
      y = [];

    for (let i = 0; i < allRows.length; i++) {
      let row = allRows[i];
      x.push(row["year"]);
      y.push(row["flood"]);
    }
    makePlot2(x, y);
  }
  
  
  function makePlot2(x, y) {
    var trace = [
      {
        x: x,
        y: y,
        mode: "line",
        line: {
        //   color: "rgb(200,36,40)",
        color: "LightBlue",
          width: 5,
        },
      },
    ];
  
    var layout = {
    height: 400,
    paper_bgcolor: 'rgb(65,65,80)',
    plot_bgcolor: 'rgb(65,65,80)',
      title: "% of Aussie's concerned with climate change <br>leading to more droughts, floods and bushfires",
      font: {
        size: 14,
        family: "Arial, sans-serif",
        color: "White",
      },
  
      xaxis: {
        title: "Year",
      },
  
      yaxis: {
        title: "Avg % of Concern",
      },
  
      showLegend: true,
      showframe: true
  
    };

    var console = {
        responsive: true,
        displayModeBar: false,
        scrollZoom: false,
    };
  
    Plotly.newPlot("droughtConcern", trace, layout, console);
  }



// ----------------------------------------- Feelings -----------------------------------------  
function processData3(allRows) {
    console.log(allRows);
    let x = [],
      y = [];

    for (let i = 0; i < allRows.length; i++) {
      let row = allRows[i];
      x.push(row["feelings"]);
      y.push(row["avg_feelings"]);
    }
    makePlot3(x, y);
  }
  
  
  function makePlot3(x, y) {
    var data = [{
        values: y,
        labels: x,
        type: 'pie',
        textinfo: "label+percent",
        automargin: true,
        marker: {
          colors: ['rgb(120, 36, 36)', 'rgb(139, 50, 50)', 'rgb(151, 58, 58)', 'rgb(169, 79, 79)', 
          'rgb(186, 90, 90)','rgb(201, 121, 121)','rgb(210, 146, 146)']
          },
      }];
    
    var layout = {
        height: 500,
        width: 500,
    paper_bgcolor: 'rgb(65,65,80)',
    plot_bgcolor: 'rgb(65,65,80)',
      title: "How people are <br>feeling about climate change",
      titlefont: {
        size: 16,
        family: "Arial, sans-serif",
        color: "White",
      },
      font: {
        size: 12,
        family: "Arial, sans-serif",
        color: "White",
      },
      
      showlegend: false   
    };

    var console = {
        responsive: true,
        displayModeBar: false,
        scrollZoom: false,
    };
  
    Plotly.newPlot("feelings", data, layout, console);
  }


// ----------------------------------------- STATEMENT -----------------------------------------  
function processData4(allRows) {
    console.log(allRows);
    let x = [],
      y = [];

    for (let i = 0; i < allRows.length; i++) {
      let row = allRows[i];
      x.push(row["statement"]);
      y.push(row["avg_statement"]);
    }
    makePlot4(x, y);
  }
  
  
  function makePlot4(x, y) {
    var data = [{
        values: y,
        labels: x,
        type: 'pie',
        automargin: true,
        marker: {
            colors: ['rgb(120, 36, 36)', 'rgb(139, 50, 50)', 'rgb(151, 58, 58)', 'rgb(169, 79, 79)', 
            'rgb(186, 90, 90)','rgb(201, 121, 121)','rgb(210, 146, 146)']
          },
      }];
  
    var layout = {
        height: 500,
        width: 500,
    paper_bgcolor: 'rgb(65,65,80)',
    plot_bgcolor: 'rgb(65,65,80)',
      title: "Reason for protesting in <br>the 2019 September climate protests",
      font: {
        size: 11,
        family: "Arial, sans-serif",
        color: "White",
      },
  

    showlegend: false
  
    };

    var console = {
        responsive: true,
        displayModeBar: false,
        scrollZoom: false,
    };
  
    Plotly.newPlot("statement", data, layout, console);
  }








  loadData();
  


