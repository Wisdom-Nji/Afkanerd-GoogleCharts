
'use strict';

class Slicers extends Event {
	// slicer = new slicers( DOM.element )
	constructor( LabelDOMElement ) {
		super('onchange');
		this.LabelDOMElement = LabelDOMElement;
		this.DOMElement = document.getElementById( LabelDOMElement );
		this.value = {}
	}
	
	set setData( data ) { //This is data to populate the slicer with
		var i = 0;
		let optgroup = document.createElement("optgroup");
		optgroup.label = 'sample label'

		for(;i<data.length;i++) {
			let option = new Option(data[i], i );
			optgroup.appendChild(option);
		}
		this.DOMElement.appendChild( optgroup );
	}

	// addData( data ) - this is useful for adding data without iterating through all the data points

	addListeningEvents( eventHandler ) {}

	addEmittingEvents( eventHandler ) {
		switch(eventHandler) {
			case 'onchange':
			this.DOMElement.onchange = ()=> { 
				this.DOMElement.dispatchEvent(new Event('changed', {"composed": true})); 
				console.log("New Event Emitted");
			}
			break;
		}
	}
}
