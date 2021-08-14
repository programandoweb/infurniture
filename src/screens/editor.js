import React from 'react';
import {  BtnBold,
          BtnItalic,
          Editor,
          Toolbar } from 'react-simple-wysiwyg';


function App(props) {
  const [html, setHtml] = React.useState('');

  function onChange(e) {
    setHtml(e.target.value);
    //e.target.name=props.name
    props.onChange(e)
  }

  return (
    <>
      <Editor value={html} onChange={onChange} name={props.name}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
       </Toolbar>
      </Editor>
    </>
  );
}

export default App
