import React,{useState,useEffect} from 'react';
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StateContext from '../helpers/ContextState';
import Estrellas from "./estrellas";
import Functions from '../helpers/Functions';
import Store from '../helpers/Store';


const App=(props)=>{
  const context               =   React.useContext(StateContext);
  const [inputs, setInputs]   =   useState({token:false});
  const modulo                =   Functions.segments_modulos(props.app)

  const onSubmit=(e)=>{
    e.preventDefault()
    let data              =   inputs
        data.categoria_token    =   props.row.token;
        data.user         =   Store.get("user").token
        data.app          =   JSON.stringify(modulo)
        Functions.PostAsync(modulo[2],"Set"+modulo[2],data,context,{name:"callbackSubmit",funct:callbackSubmit})
  }

  const callbackSubmit=(data)=>{
    if (data.response.error===false) {
      props.setOpen(false)
      props.getInit()
    }
  }

  const onChange=(e)=>{
    let new_input=inputs
        new_input[e.target.name] = e.target.value;
        setInputs(new_input)
  }

  const openTheDors=(bool)=>{
    props.setOpen(props.row.token)
  }

  useEffect(() => {
    setInputs(props.openData)
  },[props.openData])

  return  <form onSubmit={onSubmit}>
            <div className="title">
              <div className="row">
                <div className="col-10">
                  {props.row.label}
                </div>
                {
                  props.privilegios===true || props.privilegios.add_client?<>
                    <div className="col-2 border-right cursor-pointer font-size-12 pt-1" onClick={()=>openTheDors(true)}>
                      <FontAwesomeIcon icon={faPlusCircle}/>
                    </div>
                  </>:<></>
                }
              </div>
            </div>
            {
              props.open===props.row.token?<div className="card formulario-cliente">
                    <div className="card-content">
                      <div className="card-body">
                        <div className="mb-1">
                          <input  defaultValue={props.openData.nombres}
                                  required={true}
                                  type="text"
                                  name="nombres"
                                  onChange={onChange}
                                  className="form-control"
                                  placeholder="Nombre del contacto..."/>
                        </div>
                        <div className="mb-1">
                          <input  defaultValue={props.openData.oportunidad}
                                  required={true}
                                  type="text"
                                  name="oportunidad"
                                  onChange={onChange}
                                  className="form-control"
                                  placeholder="Oportunidad Ej: Precios de productos"/>
                        </div>
                        <div className="mb-1">
                          <input  defaultValue={props.openData.telefono}
                                  required={true}
                                  type="text"
                                  name="telefono"
                                  onChange={onChange}
                                  className="form-control"
                                  placeholder="Teléfono de contacto..."/>
                        </div>
                        <div className="mb-1">
                          <input  defaultValue={props.openData.email}
                                  required={true}
                                  type="text"
                                  name="email"
                                  onChange={onChange}
                                  className="form-control"
                                  placeholder="Email..."/>
                        </div>
                        <div className="mb-1">
                          <input  defaultValue={props.openData.ingreso_estimado}
                                  type="text"
                                  name="ingreso_estimado"
                                  onChange={onChange}
                                  className="form-control"
                                  placeholder="Ingreso estimado..."/>
                        </div>
                        <div className="mb-3">
                          <div className="row ">
                            <div className="col-6 text-right">
                              <div className="subtitle pt-1">Calificación</div>
                            </div>
                            <div className="col text-center">
                              <Estrellas name="calificacion" inputs={inputs} setInputs={setInputs}/>
                            </div>
                          </div>
                        </div>
                        <div className="mb-1">
                          <div className="row">
                            <div className="col-6">
                              <button className="btn btn-primary">
                                {inputs.token?"EDITAR":"AÑADIR"}
                              </button>
                            </div>
                            <div className="col-6">
                              <div className="btn btn-link text-dark" onClick={()=>props.setOpen(false)}>DESCARTAR</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>:<></>
            }

          </form>
}

export default App
