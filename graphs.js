
module.exports = 
class Graphs {
	this.type = ""
	constructor( DOMLocation ) {
		this.DOMLocation = DOMLocation;
	}

	addSlicer( CL_SLICER ) {
		this.slicerCollection.push(CL_SLICER)
		//TODO: bind and listen to slicer changes
	}

	setTitle( title ) {
		this.title = title;
	}

	setWidth( width ) {
		this.width = width;
	}

	setHeight( height ) {
		this.height = height;
	}

	setLengendPosition( position ) {
		this.position = position;
	}

	setOption( option ) {
		this.option = option;
	}

	render() {
		//TODO: This graph draws here
	}

}
