import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import ProyectoTareas from './form_tareas'
import Table from 'react-bootstrap/Table'
import TablePaginador from '../../screens/tablePaginador';
import { faCog,faPlusCircle,faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

let typeElement="proyectos"


const caracteristicas = {
  proyectos:{
    label:"Proyectos",
    value:"proyectos",
    table:"op_proyectos_tareas",
    key_name:"op_proyectos_tareas_id",
    component:ProyectoTareas
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
  const context                     =   React.useContext(StateContext);
  const [open, setOpen]             =   useState(false);
  const [inputs, setInputs]         =   useState({});
  const [data, setData]             =   useState([]);
  const [empleados, setEmpleados]   =   useState([]);
  const [servicios, setServicios]   =   useState([]);
  const [isAdmin, setIsAdmin]       =   useState(false);
  const [tareas, setTareas]         =   useState([]);
  const [tareasAll, setTareasAll]   =   useState([]);
  const [prioridad, setPrioridad]   =   useState([]);
  const [tarea_open, setTarea_open] =   useState(false);

  const modulo  =   Functions.segments_modulos(queryStringParams.app);
  const onChange=(e)=>{
    let inputs_ =   {...inputs};
        inputs_[e.target.name] = e.target.value
        setInputs(inputs_)
  }

  useEffect(() => {
    if (open) {
      setInputs(open)
    }else {
      getInit()
    }
  },[open])

  useEffect(() => {
    if (tarea_open && tarea_open!=='close') {
      setOpen(tarea_open)
      setTarea_open('close')
    }
  },[tarea_open])

  // useEffect(() => {
  //   getInit()
  // },[])

  const getInit=()=>{
    setOpen(false)
    let data        =   {...inputs}
        data.type             =   typeElement
        data.proyecto_token   =   queryStringParams.id
        if (queryStringParams.tareaToken!==undefined) {
          data.tareaToken   =   queryStringParams.tareaToken
        }
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Proyectos","getOpSectionProyectosTareas",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setIsAdmin(data.response.isAdmin)
    setData(data.response.data);
    setEmpleados(data.response.empleados);
    setServicios(data.response.servicios);
    setTareas(data.response.tareas);
    setTareasAll(data.response.setTareasAll);
    setPrioridad(data.response.prioridad)
    if (!tarea_open && tarea_open!=='close') {
      setTarea_open(data.response.tarea_open)
    }
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let data                                    =   inputs
        data.["op_tienda_"+typeElement+"_id"]   =   open["op_tienda_"+typeElement+"_id"]
        data.type   =   typeElement
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Proyectos","setOpSectionProyectosTareas",data,context,{name:"callbackContinue",funct:callbackContinue})
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
                      tareas={tareas}
                      tareasAll={tareasAll}
                      proyecto_token={queryStringParams.id}
                      empleados={empleados}
                      servicios={servicios}
                      prioridad={prioridad}
                      isAdmin={isAdmin}
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
                            <div className="btn btn-primary mr-2" onClick={()=>setOpen(true)}>
                              <FontAwesomeIcon icon={faPlusCircle}/> Agregar
                            </div>
                            <a className="btn btn-danger" href={context.Config.ConfigAppUrl+"apanel/gestion_proyectos?app="+queryStringParams.app} >
                              <FontAwesomeIcon icon={faChevronCircleLeft}/> Volver a proyectos
                            </a>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="bg-white">
                              <TablePaginador setOpen={setOpen}  data={tareas} thead={[
                                                    {
                                                      label:"#",
                                                      value:"#",
                                                    },
                                                    {
                                                      label:"Título",
                                                      value:"label",
                                                    },
                                                    {
                                                      label:"Fecha Solicitud",
                                                      value:"fecha_creacion",
                                                    },
                                                    {
                                                      label:"Fecha inicio",
                                                      value:"fecha_inicio_tarea",
                                                    },
                                                    {
                                                      label:"Fecha entrega",
                                                      value:"fecha_entrega_tarea",
                                                    },
                                                    {
                                                      label:"Dependiente",
                                                      value:"dependiente_string",
                                                    },
                                                    {
                                                      label:"Editar",
                                                      value:"editar",
                                                      dependientes:tareas,
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
