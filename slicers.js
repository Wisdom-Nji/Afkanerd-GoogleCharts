
'use strict';

class Slicers extends Event {
	constructor( LabelDOMElement ) {
		super('onchange');
		this.LabelDOMElement = LabelDOMElement;
		this.DOMElement = document.getElementById( LabelDOMElement );
		this.value = {}

		this.onchange_event = document.createEvent('Event');
		this.onchange_event.initEvent('slicer_changed', true, false);
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

	set setDependedVariable( columnValue ) {
		this.dependentVariable = columnValue;
	}

	// addData( data ) - this is useful for adding data without iterating through all the data points //TODO:
}
