
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

	set setLabel( label ) {
		this.label = label
	}

	render( data ) {
		if(typeof data == "undefined" || data === null) data = this.data;
		let optgroup = document.createElement("optgroup")
		optgroup.label = typeof this.label == "undefined" ? this.independentVariable : this.label

		let option = new Option("-- Select All --", "select_all")
		option.onclick = ((e)=>{
			let data = (()=>{
				let v_data = []
				for(let i in optgroup.childNodes)
					if(optgroup.childNodes[i].tagName == "OPTION") {
						optgroup.childNodes[i].selected = true
						v_data.push(optgroup.childNodes[i].value)
					}

				return v_data
			})()
			// console.log("data", data)
			let valueChangeEvent = new CustomEvent("value_changed", { detail: data })
			this.DOMElement.dispatchEvent( valueChangeEvent );
		})
		optgroup.appendChild(option)
		for(let i = 0;i<data.length;i++) {
			let other_options = new Option(data[i], data[i] );
			optgroup.appendChild(other_options);
		}

		// This should empty the render slicer, but id doesn't
		// console.warn("=> Destorying slicer element");
		
		// This method is quite slow and should have a faster method of chaning the values of the content
		this.DOMElement.innerHTML = "";
		this.DOMElement.appendChild( optgroup );
	}
	
	set setData( data ) { //This is data to populate the slicer with
		let v_data = []
		this.data = (()=> {
			let v_data = [];
			for( let i in data ) {
				if(v_data.findIndex( variables => data[i][this.independentVariable] == variables ) != -1) continue;
				v_data.push( data[i][this.independentVariable] );
			}
			return v_data;
		})()
	}

	setIndependentVariable( independentVariable, unify) {
		this.unify = typeof unify == "undefined" ? false : unify
		this.independentVariable = independentVariable;
	}

	customizeBindData( key, customFunction, data, newKey, typeNewKey ) {
		for(let i in data ) 
			data[i][typeof newKey == "undefined" ? key : newKey] = customFunction( data[i][key] )

		if(typeof newKey != "undefined" && typeof typeNewKey != "undefined")
			this.typeIndependentVariable = typeNewKey

		// this.boundData = data
		return data
	}

	bindData( data ) {
		this.boundData = data;
	}

	// addData( data ) - this is useful for adding data without iterating through all the data points //TODO:

	customizeSetBindData( key, customFunction, data, newKey, typeNewKey ) {
		let u_data = new Set()
		for(let i in data ) {
			data[i][typeof newKey == "undefined" ? key : newKey] = customFunction( data[i][key] )
			u_data.add( data[i][this.independentVariable] )
		}

		if(typeof newKey != "undefined" && typeof typeNewKey != "undefined")
			this.typeIndependentVariable = typeNewKey

		this.data = Array.from( u_data )
		this.boundData = data
	}


	getData( independentVariable, values, slicers ) {
		// console.log("Filtering for " + independentVariable + " with: ", values)
		// console.log("boun_data", slicers.boundData)
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

	listenToSlicer( slicer, customFunction ) {
		slicer.DOMElement.addEventListener('value_changed', async (args)=>{
			let data = await this.getData(slicer.independentVariable, args.detail, slicer );
			console.log("=> Slicing data:", data);

			if( typeof customFunctions != "undefined" ) {
				data = this.customizeBindData(customFunction.key, customFunction.func, data, customFunction.new_key, customFunction.new_key_type)
			}

			//this.reset();
			this.render( data );
		});
	}
}
