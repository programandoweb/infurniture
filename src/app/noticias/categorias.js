import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Input from '../../screens/inputs';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const test =   false

const App=(props)=>{
  const context             =   React.useContext(StateContext);
  const modulo              =   Functions.segments_modulos(queryStringParams.app);
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    setInputs(props.open)
  },[props.open])

  const onSubmit=(e)=>{
    e.preventDefault()
    let data                      =   {...inputs}
        delete data.image_parts   //=   JSON.stringify(inputs.image_parts)
        //delete data.image;
        data.user         =  context.Store.get("user").token
        data.typeElement  =  props.typeElement
        data.table      =   props.caracteristicas[props.typeElement].table
        data.key_name   =   props.caracteristicas[props.typeElement].key_name
        data.key_value  =   inputs[data.key_name]
        data.app        =   JSON.stringify(modulo)
        //return console.log(data);
    Functions.PostAsync("Media","set",data,context,{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{
    props.getInit()
    setInputs({})
    props.setOpen(false)
  }

  const onChange=(e)=>{
    let inputs_ =   {...inputs};
      inputs_[e.target.name]=e.target.value
      setInputs(inputs_)
  }

  return <form onSubmit={onSubmit}>
            <div className="row mb-3">
              <div className="col text-right ">
                <button type="submit" className="btn btn-primary mt-2">Guardar</button>
                <div type="buttom" className="btn btn-danger mt-2 ml-1" onClick={()=>props.setOpen(false)}>Cancelar</div>
              </div>
            </div>
            <Input
                defaultValue={test?test:inputs.label}
                autoComplete="off"
                title="Título de la categoría"
                type="text"
                name="label"
                className="form-control"
                onChange={onChange}
            />

          </form>
}

export default App
