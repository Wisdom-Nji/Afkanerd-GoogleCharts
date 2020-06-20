'use strict';


class Graphs {
	dataKeys = []
	dateAt = []
	labels = false

	constructor( DOMLocation, columns, google ) {
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
		this.columns = columns;
		this.graphData = this.google.visualization;
	}

	set setColumns( columnDetails ) {
		this.columnDetails = columnDetails
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

	set setType( type ) {
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

	set setLabel( label ) {
		this.label = label;
	}

	set setUnifiedColumn( un_column ) {
		this.unifiedColumn = un_column
	}

	render( data ) {
		var chart;

		// This works for only 2D data
		// Dynamic enough to change Dimensions would be intended target
		let preparedData = (()=>{
			// let v_data = typeof this.label != "undefined" ? [[this.columns[0][1], this.columns[1][1], { role: 'annotation' }] ] : [ [this.columns[0][1], this.columns[1][1]] ]

			let v_data = [[]]
			// Columns number determines the number Dimensions = this.columns
			for(let i in this.columns) {
				v_data[0].push( this.columns[i][1] )
				if( this.label == true && i > 0)
					v_data[0].push( { role: 'annotation' } )
			}

			for(let i in data ) {
				/*(
				// this.columns[0][1]
				// this.columns[x][y] [x,y0,y1,y2,y3]
				let oneD_axis = this.columns[0].findIndex(variable => 'date' == variable ) == -1 ? data[i][this.columns[0][1]] : new Date(data[i][this.columns[0][1]])
				let twoD_axis = this.columns[1].findIndex(variable => 'date' == variable ) == -1 ? data[i][this.columns[1][1]] : new Date(data[i][this.columns[1][1]])

				if( typeof this.label != "undefined" ) 
					v_data.push([oneD_axis, twoD_axis, data[i][this.label]] );
				else
					v_data.push([oneD_axis, twoD_axis]);
				//console.log("=>x_axis:",oneD_axis)
				//console.log("=>y_axis:",twoD_axis)
				*/

				let dataRow = []
				for(let j in this.columns ) {
					let axis = this.columns[j].findIndex(variable => 'date' == variable ) == -1 ? data[i][this.columns[j][1]] : new Date( data[i][this.columns[j][1]] )
					dataRow.push( axis )

					if( this.label == true && j > 0) {
						dataRow.push( String(data[i][this.columns[j][1]]) )
					}
				}
				
				/*
				if( typeof this.label != "undefined" ) 
					dataRow.push( data[i][this.label] )
				*/

				v_data.push( dataRow )
			}

			// console.log(v_data);
			return v_data;
		})();

		this.graphData = new this.google.visualization.arrayToDataTable( preparedData );
		// console.log("Graph Data: ", this.graphData )
		let view = new this.google.visualization.DataView( this.graphData )
		view.setColumns(this.columnDetails);

		switch( this.type ) {
			case "column":
			//chart = new this.google.visualization.BarChart( this.DOMElement )	
			//chart = new this.google.charts.Bar( this.DOMElement );
			chart = new this.google.visualization.ColumnChart( this.DOMElement )	
			//Options can be NULL when passed
			break;

			case "pie":
			chart = new this.google.visualization.PieChart( this.DOMElement )	
			//Options can be NULL when passed
			break;
		}
		// chart.draw(this.graphData, this.option);
		chart.draw(view, this.options);
	}

	unify( data ) {
		// get data of same category
		let category = new Set()
		for( let i in data )
			category.add( data[i][this.columns[0][1]] )

		let structure = []
		category = Array.from( category )

		for( let i in category ) {
			let computedData = {}
			computedData[this.columns[0][1]] = category[i]
			for( let k in data ) {
				let data_unique_value = data[k][this.columns[0][1]]
				// console.log("unique_data_value: " + data_unique_value)
				// console.log("unique_category  : " + category[i])
				if( data_unique_value == category[i] ) {
					for( let j = 1; j< this.columns.length; ++j ) {
						computedData[this.columns[j][1]] = 
						Object.keys(computedData).indexOf(this.columns[j][1]) < 0 ?
						Number(data[k][this.columns[j][1]]):
						Number(computedData[this.columns[j][1]]) + Number(data[k][this.columns[j][1]])
					}
				}
				structure.push(computedData)
			}				
		}
		return structure
	}

	addSlicer( slicer ) {
		slicer.DOMElement.addEventListener('value_changed', async ( args )=>{
			let data = await this.getData(slicer.independentVariable, args.detail );
			data = this.unify(data)
			console.log("=> Graphing data:", data);

			//this.reset();
			this.render( data );
		});
	}

}
