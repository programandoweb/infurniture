import React,{useState} from 'react';
import Functions from '../helpers/Functions';

let autocomplete="On"
let value       = 0;
const App=(props)=>{

  let limiteCaracteres            =   false

  if (props.limiteCaracteres) {
    limiteCaracteres              =   props.limiteCaracteres
  }

  const [limite, setLimite]       =   useState(props.limiteCaracteres);

  const onChange=(e)=>{
    // if (props.mask) {
    //   if (!parseInt(e.target.value) && e.target.value!==',') {
    //     e.target.value=value
    //     e.preventDefault()
    //     return false
    //   }else {
    //     let value_  = e.target.value
    //     value=parseFloat(value_.replace('.', ''))
    //     console.log(value);
    //     console.log(value_.length);
    //   }
    // }
    setLimite(  limiteCaracteres - e.target.value.length)
    props.onChange(e)
  }

  if (props.mask && props.autocomplete===undefined) {
    autocomplete="Off"
  }else if(props.autocomplete) {
    autocomplete=props.autocomplete
  }

  return <div className="row pb-2">
            <div className={props.classNameMain!==undefined?props.classNameMain:"col"}>
              <div className={props.classNameLabel!==undefined?props.classNameLabel:""}>
                <b>{props.title} {limiteCaracteres?" | Límite óptimo ("+limite+")":false}</b>
              </div>
              <div>
                <input
                        id={(props.id!==undefined)?props.id:props.name}
                        autoComplete={autocomplete}
                        type={props.type!==undefined?props.type:"text"}
                        name={props.name!==undefined?props.name:""}
                        className={props.className!==undefined?props.className:""}
                        onChange={onChange}
                        placeholder={(props.placeholder)?props.placeholder:props.title}
                        disabled={props.disabled}
                        readOnly={props.readonly}
                        required={(props.required)?true:""}
                        step={(props.step)?props.step:""}
                        defaultValue={props.defaultValue}/>
              </div>
            </div>
          </div>
}

export default App
