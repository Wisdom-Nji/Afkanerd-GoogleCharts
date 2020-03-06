'use strict';


class Graphs {
	dataKeys = []
	dateAt = []

	constructor( DOMLocation, google ) {
		if( document.getElementById( DOMLocation ) == null ) {
			console.error("=> DOMLocation is not a valid path");
		}

		this.DOMLocation = DOMLocation;
		this.DOMElement = document.getElementById( this.DOMLocation );
		this.option = {}
		this.columnCollection = []
		//Wrapping every data for the graphs in graphData
		//DataTable = 2D table = (rows and columns)
		this.google = google
	}

	addColumn( type, value ) {
		this.dataKeys.push( value );
		this.columnCollection.push([type,value]);
		this.graphData.addColumn( type, value );
		if(type == "date") 
			this.dateAt.push( this.dataKeys.length - 1);
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
		let preparedData = (()=>{
			let v_data = []
			for(let i in data ) {
				let split_date;
				let oneD_axis = data[i][this.dataKeys[0]];
				let twoD_axis = data[i][this.dataKeys[1]];
				// Bad method for checking for dates
				if(this.dateAt.findIndex(variable=> 0 == variable) != -1){
					split_date = data[i][this.dataKeys[0]].split('-');
					oneD_axis = new Date(split_date[0], split_date[1], split_date[2]);
				}
				else if( this.dateAt.findIndex(variable=>1 == variable) != -1) {
					split_date = data[i][this.dataKeys[1]].split('-');
					twoD_axis = new Date(split_date[0], split_date[1], split_date[2]);
				}

				// could have an option to choose the third annotation or not
				v_data.push([oneD_axis, twoD_axis, String(oneD_axis)]);
				//console.log("=>x_axis:",oneD_axis)
				//console.log("=>y_axis:",twoD_axis)

			}
			console.log(v_data);
			return v_data;
		})() );
		this.graphData = new this.google.visualization.arrayToDataTable( preparedData )
		// this.graphData.addRows( [[1000, new Date('2020','01','01')]] )
		//TODO: if type of data is date, it should be split and turned into date format: new Date(Y, M, D)
		//TODO: Remember to minus -1 from months cus JS dates begin from 0 = January
		switch( this.type ) {
			case "bar":
			//chart = new this.google.visualization.BarChart( this.DOMElement )	
			chart = new this.google.charts.Bar( this.DOMElement );
			//Options can be NULL when passed
			break;

			case "pie":
			chart = new this.google.visualization.PieChart( this.DOMElement )	
			//Options can be NULL when passed
			break;
		}
		chart.draw(this.graphData, this.options);
	}

	reset() {
		this.graphData = newDataGraph();
		for(let i in this.columnCollection) {
			// this.addColumn(this.columnCollection[i][0], this.columnCollection[i][1]);
			this.graphData.addColumn( this.columnCollection[i][0], this.columnCollection[i][1]);
		}
	}

	addSlicer( slicer ) {
		slicer.DOMElement.addEventListener('value_changed', async ( args )=>{
			let data = await this.getData(slicer.independentVariable, args.detail );
			console.log("=> Graphing data:", data);

			this.reset();
			this.render( data );
		});
	}

}
