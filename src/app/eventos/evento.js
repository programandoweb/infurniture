import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';

const App =(props)=>{

  const [data, setData]                 =   useState({});
  const modulo                          =   Functions.segments_modulos(props.app);
  const context                         =   React.useContext(StateContext);

  const getInit=()=>{

    let data              =   {}
        data.user         =   context.Store.get("user").token
        data.app          =   JSON.stringify(modulo)
        data.id           =   Functions.segment()
        data.skip         =   "96933.1"
        Functions.PostAsync("Eventos","get",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setData(data.response.data)
  }


  useEffect(() => {
    getInit()
  },[])

  return  <div className="container text-center">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h1>{data.cliente!==undefined?data.cliente.nombres:''}</h1>
                    <h2>{data.cliente!==undefined?data.cliente.telefono:''}</h2>
                    <h3>{data.label}</h3>
                    <h6>{data.cliente!==undefined?data.cliente.email:''}</h6>
                    <div>Descripción del evento: {data.descripcion}</div>
                    <div>Fecha de vencimiento: <b>{data.fecha_vencimiento}</b></div>
                    <div>Asinado a: <b>{data.asignado!==undefined?data.asignado.nombres:''} {data.asignado!==undefined?data.asignado.apellidos:''}</b></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}

export default App
