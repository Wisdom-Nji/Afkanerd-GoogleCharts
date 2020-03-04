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

	bindData( data ) {
		this.data = data;
	}

	getData( independentVariable, values ) {
		return new Promise( (resolve, reject)=> {
			let v_data = []
			for(let i in this.data )
				if(values.findIndex( variables => this.data[i][independentVariable] == variables ) != -1 ) 
					v_data.push( this.data[i] );
			
			resolve(v_data);
		});

	}

	render( data ) {
		var chart;
		this.graphData.addRows( data );
		for(let i in this.columnCollection)  {
			this.graphData.addColumn( this.columnCollection[i][0], this.columnCollection[i][1] );
		}
		//TODO: if type of data is date, it should be split and turned into date format: new Date(Y, M, D)
		//TODO: Remember to minus -1 from months cus JS dates begin from 0 = January
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

	addSlicer( slicer ) {
		slicer.DOMElement.addEventListener('value_changed', async ( args )=>{
			let data = await this.getData(slicer.independentVariable, args.detail );
			console.log("=> Graphing data:", data);
		});
	}

}
