
class Graphs {

	constructor( DOMLocation, google ) {
		console.log(google)
		this.DOMLocation = DOMLocation;
		this.type = ""
		this.option = {}
		google.charts.load(this.__VERSION_NAME__, {packages: this.__GRAPH_PACKAGES__});

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

	setData( data ) {
		this.graphData.addRows( data );
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
		google.charts.setOnLoadCallback(()=>{
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
		});
	}

}
