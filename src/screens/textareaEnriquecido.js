import { useState,useEffect } from 'react'
import { HtmlEditor, Toolbar, Editor } from '@aeaton/react-prosemirror'
import { plugins, schema, toolbar } from '@aeaton/react-prosemirror-config-default'


const initialValue = '<p></p>'


const App=(props)=>{
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    props.onChange(value,props.name)
  },[value])

  return (
    <div className="border p-2 mb-3">
      <HtmlEditor
        schema={schema}
        plugins={plugins}
        value={props.defaultValue===undefined?initialValue:props.defaultValue}
        handleChange={setValue}
        debounce={250}
      >
        <Toolbar toolbar={toolbar} />
        <Editor autoFocus />
      </HtmlEditor>
    </div>
  )
}

export default App
