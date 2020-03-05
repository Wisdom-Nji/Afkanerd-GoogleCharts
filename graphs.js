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
		let dataKeys = []
		for(let i in this.columnCollection)  {
			dataKeys.push(this.columnCollection[i][1] );
			this.graphData.addColumn( this.columnCollection[i][0], this.columnCollection[i][1] );
		}

		this.graphData.addRows( (()=>{
			let v_data = []
			for(let i in data ) {
				let date_loc = (()=>{
					for(let j in this.columnCollection) {
						if(this.columnCollection[j][0] == "date") return j;
					}
				})();
				console.log("=>date_loc:", typeof date_loc);
				let oneD_axis = data[i][dataKeys[0]];
				let twoD_axis = data[i][dataKeys[1]];
				switch(date_loc) {
					case "1":
					console.log("CASE 1");
					twoD_axis = data[i][dataKeys[date_loc]].split('-');
					v_data.push([oneD_axis, new Date(twoD_axis[0], twoD_axis[1], twoD_axis[2])] );
					break;

					case "0":
					x_axis = data[i][dataKeys[date_loc]].split('-');
					v_data.push([new Date(oneD_axis[0], oneD_axis[1], oneD_axis[2]), twoD_axis] );
					break;
				}
				console.log("=>x_axis:",oneD_axis)
				console.log("=>y_axis:",twoD_axis)

			}
			console.log(v_data);
			return v_data;
		})() );
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

			this.render( data );
		});
	}

}
