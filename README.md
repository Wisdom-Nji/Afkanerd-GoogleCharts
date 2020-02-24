# Afkanerd-GoogleCharts
Afkanerd's reimplementation of Google Graphs

###### Thoughts about the framework
- slicers are dynamically available from data entered\
`slicer = new slicers( DOM.element )`\
`slicer.data = [Array]`\
`slicer.type = "multiselect"`\
`slicer.onchange( [anon function] )`\
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
