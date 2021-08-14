import React,{useState,useEffect} from 'react';
import Functions from '../../../helpers/Functions';

const App=(props)=>{
  const [open, setOpen]     =   useState(false);
  const [inputs, setInputs] =   useState({});

  const onSubmit=(e)=>{
    e.preventDefault()
    let data              =   inputs
        data.user         =   props.context.Store.get("user").token
        data.op_maquetacion_item_token  =   props.data.token
        data.app          =   JSON.stringify(props.modulo)
        Functions.PostAsync("Websites","setElementsCssStyle",data,props.context,{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{
    props.context.setModalShow({
      show:false,
      message:"",
    })
    props.getInit()
  }

  const onChange=(e)=>{
    let inputs_ =   inputs;
        inputs_[e.target.name]=e.target.value
        setInputs(inputs_)
  }

  return    <form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-12 mb-3">
                  <textarea name="style" className="form-control" onChange={onChange} placeholder="nombres de las clases">{props.data.style}</textarea>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary btn-block" type="submit" >Guardar</button>
                </div>
              </div>
            </form>
}


export default App
