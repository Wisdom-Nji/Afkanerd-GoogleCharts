
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

			// slicers have customized data at this point, 
			// that data has to be passed to the graph to use for filtering
			let valueChangeEvent = new CustomEvent("value_changed", { detail: data })
			this.DOMElement.dispatchEvent( valueChangeEvent );
		}

	}

	render( data, label ) {
		if(typeof data == "undefined" || data === null) data = this.data;
		var i = 0;
		let optgroup = document.createElement("optgroup");
		optgroup.label = typeof label == "undefined" ? "sample label" : label //TODO:

		for(;i<data.length;i++) {
			let option = new Option(data[i], data[i] );
			optgroup.appendChild(option);
		}

		// This should empty the render slicer, but id doesn't
		// console.warn("=> Destorying slicer element");
		
		// This method is quite slow and should have a faster method of chaning the values of the content
		this.DOMElement.innerHTML = "";
		this.DOMElement.appendChild( optgroup );
	}
	
	set setData( sampleData ) { //This is data to populate the slicer with
		let v_data = []
		this.data = (()=> {
			let v_data = [];
			for( let i in sampleData ) {
				if(v_data.findIndex( variables => sampleData[i][this.independentVariable] == variables ) != -1) continue;
				v_data.push( sampleData[i][this.independentVariable] );
			}
			return v_data;
		})()
	}

	set setIndependentVariable( independentVariable ) {
		this.independentVariable = independentVariable;
	}


	// addData( data ) - this is useful for adding data without iterating through all the data points //TODO:

	bindData( data ) {
		this.boundData = data;
	}

	getData( independentVariable, values, slicers ) {
		console.log("Filtering for " + independentVariable + " with: ", values)
		console.log("boun_data", slicers.boundData)
		return new Promise( (resolve, reject)=> {
			let u_data = new Set()
			let new_boundData = new Set()
			for(let i in slicers.boundData ) {
				if((values.findIndex( value => slicers.boundData[i][independentVariable] == value ) != -1)) {
					new_boundData.add( slicers.boundData[i] )
					u_data.add( slicers.boundData[i][this.independentVariable] )
					// v_data.push( this.boundData[i][this.independentVariable] )
				}
			}
			
			this.boundData = Array.from(new_boundData )
			resolve(Array.from(u_data));
		});

	}

	listenToSlicer( slicer ) {
		slicer.DOMElement.addEventListener('value_changed', async (args)=>{
			let data = await this.getData(slicer.independentVariable, args.detail, slicer );
			console.log("=> Slicing data:", data);

			//this.reset();
			this.render( data, args.details );
		});
	}
}
