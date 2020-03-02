# Afkanerd-GoogleCharts
Afkanerd's reimplementation of Google Graphs

###### Thoughts about the framework
- slicers are dynamically available from data entered\
`slicer = new slicers( DOM.element )`\
`slicer.setData = [array]`\
`slicer.setType = "multiselect"|"single-select"`\
`slicer.addEventListeners( object )`\
`slicer.addEmittingEvents( object )`\
`slicer.render()`

- graphs\
`graph = new graph( DOM.element, googleCharts )`\
`graph.addSlicer( cl_slicers ) // cl_% = class`\
`graph.addColumn( string, string)`\
`graph.setTitle(string)`\
`graph.setWidth( int )`\
`graph.setData( array )`\
`graph.setType( string )`\
`graph.setHeight( int )`\
`graph.setLengendPosition( "left"|"right"|"top"|"buttom" )`\
`graph.setOption( object )`\
`graph.render( [array] )`
