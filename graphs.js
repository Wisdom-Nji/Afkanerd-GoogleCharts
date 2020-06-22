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

	getData( independentVariable, values,slicers ) {
		return new Promise( (resolve, reject)=> {
			let v_data = []
			for(let i in slicers.boundData ){
				let isCustomSlicer = (value) => {
					let custom_data = slicers.boundData[i][independentVariable]
					if(typeof slicers.customFunction != "undefined" )
						custom_data = slicers.customFunction.func( custom_data )
					return custom_data
				}

				if(values.findIndex( variables => isCustomSlicer(variables) == variables ) != -1 ) 
					v_data.push( slicers.boundData[i] );
			}
			
			resolve(v_data);
		});

	}

	set setLabel( label ) {
		this.label = label;
	}

	set setUnifiedColumn( un_column ) {
		this.unifiedColumn = un_column
	}

	render( data, slicer ) {
		var chart;

		data = typeof slicer == "undefined" ? this.unify(data) : this.unify(data, slicer)
		let preparedData = (()=>{
			let v_data = [[]]
			// Columns number determines the number Dimensions = this.columns
			for(let i in this.columns) {
				// console.log("column: " + this.columns[i][0])
				if( this.columns[i][0] == 'style' ) 
					v_data[0].push( {role: 'style'})
				else if( this.columns[i][0] == 'annotation') continue
					//v_data[0].push( { role: 'annotation' } )
				else v_data[0].push( this.columns[i][1] )
			}

			for(let i in data ) {
				let dataRow = []
				for(let j in this.columns ) {
					if( this.columns[j][0] == 'annotation') continue
					if( this.columns[j][0] == 'style') {
						// console.log("Pushing: " + this.columns[j][1])
						dataRow.push( this.columns[j][1] )
						continue
					}
					let axis = this.columns[j].findIndex(variable => 'date' == variable ) == -1 ? data[i][this.columns[j][1]] : new Date( data[i][this.columns[j][1]] )
					// console.log("Pushing: " + axis)
					dataRow.push( axis )

				}
				
				v_data.push( dataRow )
			}

			// console.log(v_data);
			return v_data;
		})();

		this.graphData = new this.google.visualization.arrayToDataTable( preparedData );
		// console.log("Graph Data: ", this.graphData )
		let view = new this.google.visualization.DataView( this.graphData )
		let columnDetails = (()=>{
			let loc = 0
			let v_data = []
			for(let i in this.columns) {
				// if( this.columns[i][0] == 'style' ) continue
				if( this.columns[i][0] == 'annotation' ) {
					v_data.push(this.columns[i][1])
					continue
				}
				v_data.push(loc)
				++loc
			}
			return v_data
		})()
		console.log("columnDetails", columnDetails)
		view.setColumns(columnDetails);

		switch( this.type ) {
			case "bar":
			chart = new this.google.visualization.BarChart( this.DOMElement )	
			// chart = new this.google.charts.Bar( this.DOMElement );
			break;

			case "column":
			// chart = new this.google.visualization.BarChart( this.DOMElement )	
			// chart = new this.google.charts.Bar( this.DOMElement );
			chart = new this.google.visualization.ColumnChart( this.DOMElement )	
			//Options can be NULL when passed
			break;

			case "pie":
			chart = new this.google.visualization.PieChart( this.DOMElement )	
			//Options can be NULL when passed
			break;
		}
		// chart.draw(this.graphData, this.option);
		chart.draw(view, this.option);
		// chart.draw(view, this.google.charts.Bar.convertOptions(this.option))
	}

	unify( data, slicer ) {
		// get data of same category
		let category = new Set()
		let independentVariable
		let typeIndependentVariable
		let unifiedKey = this.columns[0][1]
		if( typeof slicer != "undefined" && slicer.unify == true) {
			independentVariable = slicer.independentVariable
			typeIndependentVariable = slicer.typeIndependentVariable
			unifiedKey = slicer.independentVariable
		}
		let tmpColumns = this.columns
		if( typeof independentVariable != "undefined" ) {
			tmpColumns[0][0] = typeof typeIndependentVariable == "undefined" ? tmpColumns[0][0] : typeIndependentVariable
			tmpColumns[0][1] = unifiedKey
		}
		console.log("tmpColumns", tmpColumns)
		// console.log("unifiedKey: " + unifiedKey )
		for( let i in data )
			category.add( data[i][unifiedKey] )
		console.log("category", category)

		let structure = []
		category = Array.from( category )

		for( let i in category ) {
			let computedData = {}
			computedData[unifiedKey] = category[i]
			for( let k in data ) {
				let data_unique_value = data[k][unifiedKey]
				// console.log("unique_data_value: " + data_unique_value)
				// console.log("unique_category  : " + category[i])
				if( data_unique_value == category[i] ) {
					for( let j = 1; j< tmpColumns.length; ++j ) {
						computedData[tmpColumns[j][1]] = 
						Object.keys(computedData).indexOf(tmpColumns[j][1]) < 0 ?
						Number(data[k][tmpColumns[j][1]]):
						Number(computedData[tmpColumns[j][1]]) + Number(data[k][tmpColumns[j][1]])
					}
				}
			}				
			structure.push(computedData)
		}
		
		console.log("final structure", structure)
		return structure
	}

	addSlicer( slicer ) {
		slicer.DOMElement.addEventListener('value_changed', async ( args )=>{
			let data = await this.getData(slicer.independentVariable, args.detail,slicer );
			console.log("=> Graphing data:", data);

			// this.render( data );
			this.render( data, slicer );
		});
	}

}
