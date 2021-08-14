import React,{useState,useEffect} from 'react';
import Functions from '../../../helpers/Functions';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=(props)=>{
  const context             =   props.context;
  const modulo              =   Functions.segments_modulos(queryStringParams.app);
  const [open, setOpen]     =   useState(false);
  const [data, setData]     =   useState([]);
  const [inputs, setInputs] =   useState({});

  const getInit=()=>{
    let data        =   {}
        data.user         =   context.Store.get("user").token
        data.app          =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","getNoticiasByGroup",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setData(data.response.data);
  }

  useEffect(() => {
    getInit()
    let inputs_ = {...props.data}
        setInputs(inputs_)
  },[])

  const onSubmit=(e)=>{
    e.preventDefault()
    let data              =   inputs
        data.user         =   context.Store.get("user").token
        data.token        =   props.id
        data.maquetacion_token  = (props.data!==undefined)?props.data.token:""
        data.orden        =   props.orden
        data.type         =   "noticias"
        data.tabla        =   "op_noticias"
        data.key          =   "grupo"
        data.app          =   JSON.stringify(modulo)
        Functions.PostAsync("Websites","setElements",data,context,{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{
    context.setModalShow({
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

  return    <>{data.length>0?<form onSubmit={onSubmit}>
              <div className="row">
                <div className="col">
                  <select name="key_id" className="form-control" onChange={onChange} defaultValue={(props.data!==undefined)?props.data.key_id:""}>
                    <option value="">Seleccione</option>
                    {data.map((row,key)=>{
                      return <option key={key} value={row.grupo_id}>{row.grupo}</option>
                    })}
                  </select>
                </div>
                <div className="col">
                  <button className="btn btn-primary btn-block" type="submit" >Agregar</button>
                </div>
              </div>
            </form>:false}</>
}


export default App
