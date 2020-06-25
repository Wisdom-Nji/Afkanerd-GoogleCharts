
'use strict';

class Slicers extends Event {
	customFunction
	boundData
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
					if(option.selected && option.value == "<select_all>") {
						for(let i=1;i<this.DOMElement.options.length;++i) {
							let option = this.DOMElement.options[i]
							option.selected = true // For UX reasons
							v_data.push(option.value)
						}
						break
					}

					if(option.selected) 
						v_data.push(option.value)
				}
				return v_data;
			})()

			// slicers have customized data at this point, 
			// that data has to be passed to the graph to use for filtering
			if( data.length > 0 ) {
				let valueChangeEvent = new CustomEvent("value_changed", { detail: data })
				this.DOMElement.dispatchEvent( valueChangeEvent );
			}
		}

	}

	set setLabel( label ) {
		this.label = label
	}

	setCustomSortFunction( customSortFunction ) {
		this.customSortFunction = customSortFunction
	}

	render( data ) {
		let selectAll = false
		if(typeof data == "undefined" || data === null) {
			data = this.data;
			selectAll = true
		}
		if(typeof data == "undefined") data = []
		let optgroup = document.createElement("optgroup")
		optgroup.label = typeof this.label == "undefined" ? this.independentVariable : this.label

		/*
		let option = new Option("-- Select All --", "<select_all>")
		optgroup.appendChild(option)
		*/
		if( typeof this.unify != "undefined" && this.unify == true ) {
			let u_data = new Set()
			for( let i in data )
				u_data.add( typeof this.customFunction == "undefined" ? data[i] : this.customFunction.func(data[i]) )
			data = Array.from( u_data )
			
			if(typeof this.customSortFunction != "undefined" ) 
				data = this.customSortFunction( data )
		}
		for(let i = 0;i<data.length;i++) {
			let other_options = new Option(data[i], data[i] );
			optgroup.appendChild(other_options);
			if( selectAll )
				other_options.selected = true
		}

		this.DOMElement.innerHTML = "";
		// console.log( optgroup )
		this.DOMElement.appendChild( optgroup );
		// console.log("appended options", this.DOMElement)

		let valueChangeEvent = new CustomEvent("updated")
		this.DOMElement.dispatchEvent( valueChangeEvent );
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

	customizeBindData( key, customFunction, data ) {
		let u_set = new Set()
		for(let i in data ) 
			u_set.add( customFunction( data[i] ) )
			// data[i] = customFunction( data[i] )
			// data[i][typeof newKey == "undefined" ? key : newKey] = customFunction( data[i][key] )

		return Array.from( u_set )
	}

	bindData( data ) {
		this.boundData = data
		// console.log("Setting bound data to: ", this.boundData)
	}

	// addData( data ) - this is useful for adding data without iterating through all the data points //TODO:

	customizeBindData( key, customFunction, data, newKey, typeNewKey ) {
		let u_data = new Set()
		for(let i in data ) {
			data[i][typeof newKey == "undefined" ? key : newKey] = customFunction( data[i][key] )
			// u_data.add( data[i][this.independentVariable] )
		}

		if(typeof newKey != "undefined" && typeof typeNewKey != "undefined")
			this.typeIndependentVariable = typeNewKey

		// this.data = Array.from( u_data )
		this.boundData = data
	}

	getData( independentVariable, values, slicers ) {
		return new Promise( (resolve, reject)=> {
			let u_data = new Set()
			let new_boundData = new Set()
			// console.log("boundData", slicers.boundData)
			for(let i in slicers.boundData ) {
				let isCustomSlicer = (value) => {
					let custom_data = slicers.boundData[i][independentVariable]
					if(typeof slicers.customFunction != "undefined" )
						custom_data = slicers.customFunction.func( custom_data )
					return custom_data
				}
				if(values.findIndex( value => isCustomSlicer( value ) == value ) != -1) {
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
			console.log("=> About to slicer for: ", args.detail)
			let data = await this.getData(slicer.independentVariable, args.detail, slicer );
			console.log("=> Slicing data:", data);

			this.render( data );
		});

		slicer.DOMElement.addEventListener('updated', async (args)=>{
			// let data = await this.getData(slicer.independentVariable, args.detail, slicer );
			// console.log("=> Slicing data:", data);

			this.render( );
		});
	}
}
