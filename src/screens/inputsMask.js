import React,{useState,useEffect} from 'react';
import CurrencyFormat from 'react-currency-format';
import Functions from '../helpers/Functions';

const App=(props)=>{

  let limiteCaracteres            =   false

  if (props.limiteCaracteres) {
    limiteCaracteres              =   props.limiteCaracteres
  }

  const [limite, setLimite]       =   useState(props.limiteCaracteres);
  const [state, setState]         =   useState(0);

  const onChange=(e)=>{
    setLimite(  limiteCaracteres - e.target.value.length)
    props.onChange(e)
  }

  return <div className="row pb-2">
            <div className={props.classNameMain!==undefined?props.classNameMain:"col"}>
              <div>
              <CurrencyFormat value={state.profit} thousandSeparator={true} onValueChange={(values) => {
                  props.onChangeFormat(values.value,props.name)
                  const {formattedValue, value} = values;
                  setState({profit: formattedValue})
              }}/>
              </div>
            </div>
          </div>
}

export default App
