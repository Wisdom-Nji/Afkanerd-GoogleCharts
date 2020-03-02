
'use strict';

class Slicers extends Event {
	// slicer = new slicers( DOM.element )
	constructor( LabelDOMElement ) {
		super('onchange');
		this.LabelDOMElement = LabelDOMElement;
		this.DOMElement = document.getElementById( LabelDOMElement );
	}
	
	set setData( data ) { //Should be an array
		for( let i in data ) {
			let option = new Option(data[i], i );
			this.DOMElement.appendChild(option);
		}
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
