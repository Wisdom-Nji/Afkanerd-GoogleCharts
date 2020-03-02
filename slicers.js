
class Slicers {
	// slicer = new slicers( DOM.element )
	constructor( DOMElement ) {
		this.DOMElement = DOMElement;
	}
	
	set setData( data ) { //Should be an array
		this.data = data;
	}

	set setType( type ) {
		this.type = type;
	}

	addListeningEvents( eventHandler ) {}

	addEmittingEvents( eventHandler ) {}

	render() {}
}
