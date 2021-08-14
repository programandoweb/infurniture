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
            <div className="col">
              <div>
                <b>{props.title} {limiteCaracteres?" | Límite óptimo ("+limite+")":false}</b>
              </div>
              <div>
                <textarea
                      defaultValue={props.defaultValue}
                      name={props.name!==undefined?props.name:""}
                      className={props.className!==undefined?props.className:""}
                      onChange={onChange}
                      placeholder={props.title} />
              </div>
            </div>
          </div>
}

export default App
