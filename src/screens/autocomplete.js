import React,{useState,useEffect} from 'react';
import Autocomplete from  'react-autocomplete';

const App=(props)=>{
  const [state, setState] = useState({});

  useEffect(() => {
    props.onChange(props.name,state.value)
  },[state])

  const matchCountry=(state, value)=>{
  	// console.log(state);
  	// console.log(value);
    return (
      state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
      state.code.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }



  return  <>
          <div><b>{props.title}</b></div>
          <div className="form-group">
            <Autocomplete
              value={ state.value }
              inputProps={{ id: 'states-autocomplete' }}
              wrapperStyle={{ position: 'relative', display: 'inline-block' }}
              items={ props.data }
              getItemValue={ item => item.name }
              shouldItemRender={ matchCountry }
              onChange={(event, value) => setState({ value }) }
              onSelect={ value => setState({ value }) }
              renderMenu={ children => (
                <div className = "menu">
                  { children }
                </div>
              )}
              renderItem={ (item, isHighlighted) => (
                <div
                  className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                  key={ item.abbr } >
                  { item.name }
                </div>
              )}
            />
        </div></>
}

export default App
