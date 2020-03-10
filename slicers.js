
'use strict';

class Slicers extends Event {
	constructor( LabelDOMElement ) {
		super('onchange');
		this.LabelDOMElement = LabelDOMElement;
		this.DOMElement = document.getElementById( LabelDOMElement );

		this.DOMElement.onchange = ()=>{
			// console.log("=> setting slicer value: ", this.DOMElement.value );
			let data = (()=> {
				let v_data = []
				for(let i in this.DOMElement.options) {
					let option = this.DOMElement.options[i];
					if(option.selected) 
						v_data.push(option.value);
				}
				return v_data;
			})()

			let valueChangeEvent = new CustomEvent("value_changed", { detail: data })
			this.DOMElement.dispatchEvent( valueChangeEvent );
		}
	}

	render( data ) {
		if(typeof data == "undefined" ) data = this.data;
		var i = 0;
		let optgroup = document.createElement("optgroup");
		optgroup.label = 'sample label' //TODO:

		for(;i<data.length;i++) {
			let option = new Option(data[i], data[i] );
			optgroup.appendChild(option);
		}
		this.DOMElement.appendChild( optgroup );
	}
	
	set setData( sampleData ) { //This is data to populate the slicer with
		let v_data = []
		this.data = (()=> {
			let v_data = [];
			for( let i in sampleData ) {
				v_data.push( sampleData[i][this.independentVariable] );
			}
			return v_data;
		})()
	}

	set setIndependentVariable( independentVariable ) {
		this.independentVariable = independentVariable;
	}

	// addData( data ) - this is useful for adding data without iterating through all the data points //TODO:

	getData( independentVariable, values ) {
		return new Promise( (resolve, reject)=> {
			let v_data = []
			for(let i in this.data )
				if(values.findIndex( variables => this.data[i][independentVariable] == variables ) != -1 ) 
					v_data.push( this.data[i] );
			
			resolve(v_data);
		});

	}

	listenToSlicer( slicer ) {
		slicer.DOMElement.addEventListener('value_changed', async (args)=>{
			let data = await this.getData(slicer.independentVariable, args.detail );
			console.log("=> Slicing data:", data);

			//this.reset();
			this.render( data );
		});
	}
}
