import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Proyecto from './form_proyecto'
import Table from 'react-bootstrap/Table'
import TablePaginador from '../../screens/tablePaginador';
import { faCog,faComment,faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

let typeElement="proyectos"


const caracteristicas = {
  proyectos:{
    label:"Proyectos",
    value:"proyectos",
    table:"op_proyectos",
    key_name:"op_proyectos_id",
    component:Proyecto
  },
  // carousel:{
  //   label:"Carousel",
  //   value:"carousel",
  //   table:"op_carousel",
  //   key_name:"op_carousel_id",
  //   component:Sliders,
  // },
}

const App=(props)=>{
  const context                         =   React.useContext(StateContext);
  const [open, setOpen]                 =   useState(false);
  const [titular, setTitular]           =   useState(false);
  const [inputs, setInputs]             =   useState({});
  const [data, setData]                 =   useState([]);
  const [clientes, setClientes]         =   useState([]);
  const [servicios, setServicios]       =   useState([]);
  const [prioridad, setPrioridad]       =   useState([]);
  const [tecnologias, setTecnologias]   =   useState([]);


  const modulo  =   Functions.segments_modulos(queryStringParams.app);
  const onChange=(e)=>{
    let inputs_ =   {...inputs};
        inputs_[e.target.name] = e.target.value
        setInputs(inputs_)
  }

  useEffect(() => {
    if (open) {
      setInputs(open)
    }
  },[open])

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    setOpen(false)
    let data        =   {...inputs}
        data.type   =   typeElement
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Proyectos","getOpSectionProyectos",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setData(data.response.data);
    setClientes(data.response.clientes);
    setServicios(data.response.servicios);
    setPrioridad(data.response.prioridad)
    setTecnologias(data.response.tecnologias)
    setTitular(data.response.titular)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let data                                    =   inputs
        data.["op_tienda_"+typeElement+"_id"]   =   open["op_tienda_"+typeElement+"_id"]
        data.type   =   typeElement
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Proyectos","setOpSectionProyectos",data,context,{name:"callbackContinue",funct:callbackContinue})
  }
  const callbackContinue=(data)=>{
    setInputs({})
    setOpen(false)
    getInit()
  }

  const SetOpCaracteristicas=()=>{
    return <div></div>
  }

  const setOpenSection=(categoria)=>{
    typeElement=categoria
    getInit()
  }

  const render_=  (Component)  =>{
    return <Component getInit={getInit}
                      caracteristicas={caracteristicas}
                      typeElement={typeElement}
                      modulo={modulo}
                      open={open}
                      tecnologias={tecnologias}
                      clientes={clientes}
                      prioridad={prioridad}
                      servicios={servicios}
                      setOpen={setOpen}/>
  }

  return  <div className="container ">
            <div className="row">

              <div className="col-12 col-sm-12 d-block d-md-none">
                <select className="form-control" defaultValue={typeElement}>
                  <option value="productos">Seleccione el módulo</option>
                  {Object.entries(caracteristicas).map((row,key)=>{
                    let caracteristica=row[1]
                    return  <option key={key} onClick={()=>setOpenSection(caracteristica.value)}>
                              {caracteristica.label}
                            </option>

                  })}
                </select>
              </div>
              {open?<div className="col-12 col-sm">
                        <div className="card">
                          <div className="card-body">
                            {caracteristicas[typeElement]!==undefined && caracteristicas[typeElement].component===undefined?<><form onSubmit={onSubmit}>
                                <div className="row mb-2">
                                  <div className="col">
                                    Título
                                  </div>
                                  <div className="col">
                                    <input defaultValue={open.label} required={true} type="text" name="label" className="form-control" onChange={onChange} placeholder="Título" />
                                  </div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col ">
                                    <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                      <button type="submit" className="btn btn-primary">Guardar</button>
                                      <div className="btn btn-danger" onClick={()=>setOpen(false)}>Cancelar</div>
                                    </div>
                                  </div>
                                </div>
                                </form>
                              </>:render_(caracteristicas[typeElement].component)
                            }
                          </div>
                        </div>

                    </div>:<></>
              }
              {
                !open?<div className="col-12 col-sm">
                        <div className="row mb-2">
                          <div className="col text-right">
                            {
                              titular===context.Store.get("user").usuario_id?<>
                                <a className="btn btn-primary mr-2" href={context.Config.ConfigAppUrl+"apanel/gestion_proyectos/comments?app="+queryStringParams.app}>
                                  <FontAwesomeIcon icon={faComment}/> Ver comentarios
                                </a>
                              </>:false
                            }
                            <div className="btn btn-primary" onClick={()=>setOpen(true)}>
                              <FontAwesomeIcon icon={faPlusCircle}/> Agregar
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="bg-white">
                              <TablePaginador setOpen={setOpen}  data={data} thead={[
                                                    {
                                                      label:"#",
                                                      value:"#",
                                                    },
                                                    {
                                                      label:"Título",
                                                      value:"label",
                                                    },
                                                    {
                                                      label:"Editar",
                                                      value:"editar",
                                                      extra:{
                                                              label:<FontAwesomeIcon icon={faCog}/>,
                                                              url:context.Config.ConfigAppUrl+"apanel/gestion_proyectos/chores?app="+queryStringParams.app+"&id=",
                                                            }
                                                    },
                                                  ]}
                              />
                            </div>
                          </div>
                        </div>
                      </div>:<></>
              }
            </div>
          </div>
}
export default App
