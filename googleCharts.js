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
google.charts.setOnLoadCallback(countryStats);

var countryStats = ()=> {
	//Wrapping every data for the graphs in graphData
	//DataTable = 2D table = (rows and columns)
	let graphData = google.visualization.DataTable()

	//Format for the graphData  = (dataType, value)
	graphData.addColumn('string', 'Country')
	graphData.addColumn('number', 'Population')

	let data = [
		'America' : 1000,
		'Nigeria' : 2000
	]

	//Values of data should match the 2D nature of the columns
	graph.addRows(data);

	let options = {
		'title' : "The world's population",
		'width' : 400,
		'height' : 300,
		'legend' : left
	}

	
}


