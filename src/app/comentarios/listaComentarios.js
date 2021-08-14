import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
//import Table from 'react-bootstrap/Table'
import TablePaginador from '../../screens/tablePaginador';
import { faChevronCircleLeft,faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=()=>{
  const context                     =   React.useContext(StateContext);
  const [tareas, setTareas]         =   useState([]);
  const modulo  =   Functions.segments_modulos(queryStringParams.app);

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    let data                  =   {}
        data.user             =   context.Store.get("user").token
        data.app              =   JSON.stringify(modulo)
    Functions.PostAsync("Comentarios","getAll",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setTareas(data.response.data);
  }

  return  <div className="container">
            <div className="col-12 col-sm">
              <div className="row mb-2">
                <div className="col text-right">
                  <a className="btn btn-danger" href={context.Config.ConfigAppUrl+"apanel/gestion_proyectos?app=listar::modulos::GestionProyectos::Gestión de proyectos::gestion_proyectos::1"} >
                    <FontAwesomeIcon icon={faChevronCircleLeft}/> Volver a los proyectos
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="bg-white">
                    <TablePaginador data={tareas} thead={[
                                          {
                                            label:"#",
                                            value:"#",
                                          },
                                          {
                                            label:"Nombres",
                                            value:"nombres",
                                          },
                                          {
                                            label:"Apellidos",
                                            value:"apellidos",
                                          },
                                          {
                                            label:"Mensaje",
                                            value:"mensaje",
                                          },
                                          {
                                            label:"Fecha",
                                            value:"fecha",
                                          },
                                          {
                                            label:"Editar",
                                            value:"editar",
                                            extra:{
                                                    label:<FontAwesomeIcon icon={faProjectDiagram}/>,
                                                    url:context.Config.ConfigAppUrl+"apanel/gestion_proyectos/chores?app="+queryStringParams.app+"&id=tareas&tareaToken=",
                                                  }
                                          },
                                        ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
}

export default App
