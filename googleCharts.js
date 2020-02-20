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

google.charts.load(__VERSION_NAME__, {packages: __GRAPH_PACKAGES__});
google.charts.setOnLoadCallback(countryStats_PieChart);
google.charts.setOnLoadCallback(countryStats_BarChart);

function countryStats_PieChart() {
	//Wrapping every data for the graphs in graphData
	//DataTable = 2D table = (rows and columns)
	console.log("=> Populating country stats...")
	var graphData = new google.visualization.DataTable()

	//Format for the graphData  = (dataType, value)
	graphData.addColumn('string', 'Country')
	graphData.addColumn('number', 'Population')

	//Each row is stored as an array in a collection of arrays
	let data = [
		['America' , 1000],
		['Nigeria' , 2000]
	]

	//Values of data should match the 2D nature of the columns
	graphData.addRows(data);

	let options = {
		'title' : "The world's population",
		'width' : 400,
		'height' : 300,
		'legend' : "left"
	}

	let webpageChartLocation = document.getElementById('chart_div')
	let chart = new google.visualization.PieChart(webpageChartLocation)	

	//Should be called whenever chart is updated, but doesn't update in real time (async function), so should wait for event to be fired first
	//Options can be NULL when passed
	chart.draw(graphData, options);
}


function countryStats_BarChart() {
	//Wrapping every data for the graphs in graphData
	//DataTable = 2D table = (rows and columns)
	console.log("=> Populating country stats...")
	var graphData = new google.visualization.DataTable()

	//Format for the graphData  = (dataType, value)
	graphData.addColumn('string', 'Country')
	graphData.addColumn('number', 'Population')

	//Each row is stored as an array in a collection of arrays
	let data = [
		['America' , 1000],
		['Nigeria' , 2000]
	]

	//Values of data should match the 2D nature of the columns
	graphData.addRows(data);

	let options = {
		'title' : "The world's population",
		'width' : 400,
		'height' : 300,
		'legend' : "left"
	}

	let webpageChartLocation = document.getElementById('chart_div')
	let chart = new google.visualization.BarChart(webpageChartLocation)	

	//Should be called whenever chart is updated, but doesn't update in real time (async function), so should wait for event to be fired first
	//Options can be NULL when passed
	chart.draw(graphData, options);
}


