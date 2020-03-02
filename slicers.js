
'use strict';

class Slicers extends Event {
	// slicer = new slicers( DOM.element )
	constructor( LabelDOMElement ) {
		super('onchange');
		this.LabelDOMElement = LabelDOMElement;
		this.DOMElement = document.getElementById( LabelDOMElement );
	}
	
	set setData( data ) { //Should be an array
		var i = 0;
		let optgroup = document.createElement("optgroup");
		optgroup.label = data[i];

		for(let i=1;i<data.length;i++) {
			let option = new Option(data[i], i );
			optgroup.appendChild(option);
		}
		this.DOMElement.appendChild( optgroup );
	}

	set setType( type ) {
		this.type = type;
	}

	addListeningEvents( eventHandler ) {}

	addEmittingEvents( eventHandler ) {
		switch(eventHandler) {
			case 'onchange':
			this.DOMElement.onchange = ()=> { this.DOMElement.dispatchEvent(new Event('changed', {"composed": true})); }
			break;
		}
	}
}
