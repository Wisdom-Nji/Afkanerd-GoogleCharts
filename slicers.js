
'use strict';

class Slicers extends Event {
	constructor( LabelDOMElement ) {
		super('onchange');
		this.LabelDOMElement = LabelDOMElement;
		this.DOMElement = document.getElementById( LabelDOMElement );

		this.DOMElement.onchange = ()=>{
			console.log("=> setting slicer value: ", this.DOMElement.value );
			let valueChangeEvent = new CustomEvent("value_changed", { detail: this.DOMElement.value });
			this.DOMElement.dispatchEvent( valueChangeEvent );
		}
	}
	
	set setData( sampleData ) { //This is data to populate the slicer with
		let v_data = []
		let data = (()=> {
			let v_data = [];
			for( let i in sampleData ) {
				v_data.push( sampleData[i][this.independentVariable] );
			}
			return v_data;
		})()

		var i = 0;
		let optgroup = document.createElement("optgroup");
		optgroup.label = 'sample label' //TODO:

		for(;i<data.length;i++) {
			let option = new Option(data[i], i );
			optgroup.appendChild(option);
		}
		this.DOMElement.appendChild( optgroup );
	}

	set setIndependentVariable( independentVariable ) {
		this.independentVariable = independentVariable;
	}

	// addData( data ) - this is useful for adding data without iterating through all the data points //TODO:
}
