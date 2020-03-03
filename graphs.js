'use strict';


class Graphs {

	constructor( DOMLocation, google ) {
		if( document.getElementById( DOMLocation ) == null ) {
			console.error("=> DOMLocation is not a valid path");
		}

		this.DOMLocation = DOMLocation;
		this.DOMElement = document.getElementById( this.DOMLocation );
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

	addSlicer( slicer ) {
		slicer.DOMElement.onchange = ()=>{
			console.log("=> Graph should change with slicer");
			if(typeof slicer.columnValue == "undefined") {
				console.error("=> colValue for slicer undefined");
				return;
			}

			console.log("=> Adjusting graph for:", slicer.columnValue );
		}
	}

	render( data ) {
		//TODO: This graph draws here
		for(let i in this.columnCollection) 
			this.graphData.addColumn( this.columnCollection[i][0], this.columnCollection[i][1] );
		this.graphData.addRows( data );
		var chart;
		switch( this.type ) {
			case "bar":
				chart = new this.google.visualization.BarChart( this.DOMElement )	
				//Options can be NULL when passed
			break;

			case "pie":
				chart = new this.google.visualization.PieChart( this.DOMElement )	
				//Options can be NULL when passed
			break;
		}
		chart.draw(this.graphData, this.options);
	}

}
