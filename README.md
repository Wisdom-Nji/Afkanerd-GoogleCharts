# Afkanerd-GoogleCharts
Afkanerd's reimplementation of Google Graphs

###### Thoughts about the framework
- slicers are dynamically available from data entered\
`slicer = new slicers( DOM.element )`\
`slicer.setData = [array]`\
`slicer.render( object, string )`\
`slicer.setIndependentVariable( string )`\
`slicer.bindData( object )`\
`slicer.getData( object )`\
`slicer.listenToSlicer( Object Slicer )`

- graphs\
`graph = new graph( DOM.element, columns, googleCharts )`\
`graph.addSlicer( cl_slicers ) // cl_% = class`\
`graph.setTitle(string)`\
`graph.setWidth( int )`\
`graph.setData( array )`\
`graph.setType( string )`\
`graph.setHeight( int )`\
`graph.setLabel( string )`\
`graph.setLengendPosition( "left"|"right"|"top"|"buttom" )`\
`graph.setOption( object )`\
`graph.getData( object )`\
`graph.render( [array] )`
