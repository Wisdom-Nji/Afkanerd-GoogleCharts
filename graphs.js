
module.exports = 
class Graphs {
	this.type = ""
	this.option = {}
	this.__VERSION_NAME__ = 'current'
	this.__GRAPH_PACKAGES__ = ['corechart']

	constructor( DOMLocation ) {
		google.charts.load(__VERSION_NAME__, {packages: __GRAPH_PACKAGES__});
		google.charts.setOnLoadCallback(countryStats);
		this.DOMLocation = DOMLocation;

		//Wrapping every data for the graphs in graphData
		//DataTable = 2D table = (rows and columns)
		this.graphData = new google.visualization.DataTable()
	}

	addColumn( type, value ) {
		this.graphData.addColumn( type, value)
	}

	addSlicer( CL_SLICER ) {
		this.slicerCollection.push(CL_SLICER)
		//TODO: bind and listen to slicer changes
	}

	setTitle( title ) {
		this.title = title;
	}

	setWidth( width ) {
		this.option.width = width;
	}

	setHeight( height ) {
		this.option.height = height;
	}

	setLengendPosition( position ) {
		this.legend = position;
	}

	setOption( option ) {
		this.option = option;
	}

	render() {
		//TODO: This graph draws here
		let webpageChartLocation = document.getElementById( this.DOMLocation )
		let chart = "";
		switch( this.type ) {
			case "bar":
				chart = new google.visualization.BarChart(webpageChartLocation)	
				//Options can be NULL when passed
				chart.draw(this.graphData, this.options);
			break;

			case "pie":
				chart = new google.visualization.PieChart(webpageChartLocation)	
				//Options can be NULL when passed
				chart.draw(this.graphData, this.options);
			break;
		}
	}

}
