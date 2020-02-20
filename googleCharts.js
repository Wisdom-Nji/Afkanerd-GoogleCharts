/*
Default structures required
----------------------------
<script src="https://www.gstatic.com/charts/loader.js"></script>
<script>
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  ...
</script>
*/


let __VERSION_NAME__ = 'current'
let __GRAPH_PACKAGES__ = ['corechart']

let callGraphs = function() {}

//With this method all graphs should be called from the callGraphs function
google.charts.load(__VERSION_NAME__, {packages: __GRAPH_PACKAGES__, callback: callGraphs});

//Wrapping every data for the graphs in graphData
//DataTable = 2D table = (rows and columns)
let graphData = google.visualization.DataTable()

//Format for the graphData  = (dataType, value)
graphData.addColumn('string', 'Country')
graphData.addColumn('number', 'Population')


