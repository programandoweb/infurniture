import React,{useState} from 'react';

const App=(props)=>{

  let limiteCaracteres            =   false

  if (props.limiteCaracteres) {
    limiteCaracteres              =   props.limiteCaracteres
  }

  const [limite, setLimite]       =   useState(props.limiteCaracteres);

  const onChange=(e)=>{
    setLimite(  limiteCaracteres - e.target.value.length)
    props.onChange(e)
  }
  return <div className="row pb-2">
            <div className={props.classNameMain!==undefined?props.classNameMain:"col"}>
              <div className={props.classNameLabel!==undefined?props.classNameLabel:""}>
                <b>{props.title} {limiteCaracteres?" | Límite óptimo ("+limite+")":false}</b>
              </div>
              <div>
                <input
                        id={(props.id!==undefined)?props.id:props.name}
                        autoComplete={props.autocomplete?props.autocomplete:"on"}
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
