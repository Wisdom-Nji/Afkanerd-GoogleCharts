
class Graphs {

	constructor( DOMLocation, google ) {
		this.DOMLocation = DOMLocation;
		this.type = ""
		this.option = {}
		this.columnCollection = []
		//Wrapping every data for the graphs in graphData
		//DataTable = 2D table = (rows and columns)
		this.google = google
		this.graphData = new this.google.visualization.DataTable()
	}

	addColumn( type, value ) {
		this.columnCollection.push([type, value]);
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

	setType( type ) {
		this.type = type;
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

	render( data ) {
		//TODO: This graph draws here
		for(let i in this.columnCollection) 
			this.graphData.addColumn( this.columnCollection[i][0], this.columnCollection[i][1] );
		this.graphData.addRows( data );
		var webpageChartLocation = document.getElementById( this.DOMLocation )
		var chart;
		switch( this.type ) {
			case "bar":
				chart = new this.google.visualization.BarChart(webpageChartLocation)	
				//Options can be NULL when passed
			break;

			case "pie":
				chart = new this.google.visualization.PieChart(webpageChartLocation)	
				//Options can be NULL when passed
			break;
		}
		chart.draw(this.graphData, this.options);
	}

}
