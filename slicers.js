
class Slicers {
	// slicer = new slicers( DOM.element )
	constructor( LabelDOMElement ) {
		this.LabelDOMElement = LabelDOMElement;
		this.type = "multiselect";
	}
	
	set setData( data ) { //Should be an array
		this.data = data;
	}

	set setType( type ) {
		this.type = type;
	}

	addListeningEvents( eventHandler ) {}

	addEmittingEvents( eventHandler ) {}

	render() {
		let DOMElement = document.getElementById( this.LabelDOMElement );
		for( let i in this.data ) {
			let option = new Option(this.data[i], i );
			DOMElement.appendChild(option);
		}
	}
}
