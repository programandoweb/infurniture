import React,{useState,useEffect} from 'react';
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import StateContext from '../../helpers/ContextState'
import Editor from '../../screens/editor'


const TMPMensaje=(props)=>{
  return  <div className="card mt-2">
            <div className="card-body position-relative">
              <div className="position-absolute position-right">
                <FontAwesomeIcon className="cursor-pointer" onClick={()=>{props.setTab(false); props.setOpen(false)}} icon={faWindowClose}/>
              </div>
              <form onSubmit={(e)=>props.onSubmit(e,"mensaje")}>
                <div className="row">
                  <div className="col-12 mb-3">
                    <textarea required={true} accion="Envío de mensaje directo" className="form-control height-auto no-scroll" name="descripcion" onChange={props.onChange} placeholder="Ingrese su mensaje...">
                    </textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">Enviar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
}

const TMPNota=(props)=>{
  return  <div className="card mt-2">
            <div className="card-body position-relative">
              <div className="position-absolute position-right">
                <FontAwesomeIcon className="cursor-pointer" onClick={()=>{props.setTab(false); props.setOpen(false)}} icon={faWindowClose}/>
              </div>
              <form onSubmit={(e)=>props.onSubmit(e,"nota")}>
                <div className="col-12 mb-3">
                  <textarea accion="Nota colocada" required={true} className="form-control height-auto no-scroll" name="descripcion" onChange={props.onChange} placeholder="Ingrese su nota...">
                  </textarea>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">Enviar</button>
                </div>
              </form>
            </div>
          </div>
}

const TMPEvento=(props)=>{

  return  <div className="card mt-2">
            <div className="card-body position-relative">
              <div className="position-absolute position-right">
                <FontAwesomeIcon className="cursor-pointer" onClick={()=>{props.setTab(false); props.setOpen(false)}} icon={faWindowClose}/>
              </div>
              <form onSubmit={(e)=>props.onSubmit(e,"evento")} className="row pt-5">
                <div className="col-12 col-sm-4 mb-3">
                  <input type="text" name="label" className="form-control" onChange={props.onChange} placeholder="Título del evento"/>
                </div>
                <div className="col-12 col-sm-4 mb-3">
                  <select className="form-control" name="ma_tipo_actividad_id" onChange={props.onChange} required={true}>
                    <option value="">Seleccione</option>
                    {
                      props.tipo_actividad!==undefined?<>
                        {props.tipo_actividad.map((row,key)=>{
                          return <option value={row.ma_tipo_actividad_id} key={key}>{row.label}</option>
                        })}
                      </>:<></>
                    }
                  </select>
                </div>
                <div className="col-12 col-sm-4 mb-3">
                  <input type="date" name="fecha_vencimiento" className="form-control" onChange={props.onChange}/>
                </div>
                <div className="col-12 mb-3">
                  <Editor name="label" onChange={props.onChange}/>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">Enviar</button>
                </div>
              </form>
            </div>
          </div>
}

const App=(props)=>{

  const context = React.useContext(StateContext);
  const modulo  = props.modulo;

  const [open, setOpen] =   useState(false);
  const [tab, setTab]   =   useState(false);
  const [inputs, setInputs]   =   useState({});
  const [tipo_actividad, setTipo_actividad]   =   useState({});


  const onClick=(tmp,item)=>{
    setTab(item)
    setOpen(tmp)
  }

  const onSubmit=(e,type)=>{
    e.preventDefault()
    let metodo  = type==="evento"?"SetEvento":"SetMensaje"
    let data              =   inputs
        data.user         =   context.Store.get("user").token
        data.cliente_id   =   props.cliente.token
        data.app          =   JSON.stringify(modulo)
    Functions.PostAsync("Mensajes",metodo,data,context,{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{
    setTab(false);
    setOpen(false);
    props.setReloadComunicacion(true)
  }

  const onChange=(e)=>{
    let input_                =   inputs
        if (e.target.name!==undefined) {
          input_[e.target.name] =   e.target.value
        }else {
          input_.descripcion    =   e.target.value
        }
        if(e.target.style!==undefined){
          Functions.resizeTextBox(e)
          input_.accion         =   e.target.getAttribute("accion")
        }
    setInputs(input_)
  }

  function getInit(){
    let data        =   {}
        data.token  =   Store.get("user").token
        data.tabla  =   "ma_tipo_actividad"
        Functions.PostAsync("Maestros","tablas_maestras",data,context,{name:"callbackInit",funct:callbackInit})
  }

  function callbackInit(data){
    setTipo_actividad(data.response.data)
  }

  useEffect(()=>{
    getInit()
  },[])


  return  <>
            {props.privilegios.send_messages_client?<div className="container mt-3">
              <div className="row text-center pgrw-text-primary">
                <div onClick={()=>onClick(<TMPMensaje onSubmit={onSubmit} onChange={onChange} setTab={setTab} setOpen={setOpen}/>,1)} className={"col-12 col-sm-2 cursor-pointer"} id="pgrw-mensaje">
                  <span className={tab===1?"bg-pgrw-bg-primary p-2":""}>
                    Enviar Mensaje
                  </span>
                </div>
                <div onClick={()=>onClick(<TMPNota onSubmit={onSubmit} onChange={onChange} setTab={setTab} setOpen={setOpen}/>  ,2)} className="col-12 col-sm-2 cursor-pointer" id="pgrw-nota">
                  <span className={tab===2?"bg-pgrw-bg-primary p-2":""}>
                    Colocar una nota
                  </span>
                </div>
                <div onClick={()=>onClick(<TMPEvento tipo_actividad={tipo_actividad} onChange={onChange} onSubmit={onSubmit} setTab={setTab} setOpen={setOpen}/>,3)} className="col-12 col-sm-2 cursor-pointer" id="pgrw-evento">
                  <span className={tab===3?"bg-pgrw-bg-primary p-2":""}>
                    Planificar un evento
                  </span>
                </div>
                <div className="col-12 col-sm text-right">

                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  {open}
                </div>
              </div>
            </div>:<></>}
          </>

}

export default App
