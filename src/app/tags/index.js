import React,{useEffect,useState} from 'react';
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import Modal from '../../screens/modalTAGS';
import Maestro from '../../screens/tableRegistroCronograma';
import StateContext from '../../helpers/ContextState';
import { faFile,faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App=(props)=>{
  const context = React.useContext(StateContext);
  const [data, setData] = useState([]);
  const [show, setShow] = useState({open:false,id:0,label:"",title:"Gestinar Maestro",row:{}});

  useEffect(() => {
    getInit()
  },[]);

  function getInit(){
    let data        = {tabla:"op_tags"}
        data.token  = Store.get("user").token
    Functions.PostAsync("Maestros","tablas_maestras",data,context,{name:"callbackInit",funct:callbackInit})
  }

  function callbackInit(data){
    setData(data.response.data)
  }


  function resetCronometro(id){
    let data        = {tabla:"op_tags"}
        data.token  = Store.get("user").token
        data.id     = id
    Functions.PostAsync("Tags","resetCronometro",data,context,{name:"callbackResetCronometro",funct:callbackResetCronometro})
  }

  function callbackResetCronometro(){
    getInit()
  }

  return  <div className="container mb-3">
            <Modal show={show} setShow={setShow} {...props} getInit={getInit} />
            <div className="row ">
              <div className="col mb-3">
                <div className="card">
                  <div className="card-header bg-success text-white">
                    <div className="row">
                      <div className="col-12 col-sm-6">Listado de tags</div>
                      <div className="col-12 col-sm-6">
                        <div className="text-right cursor-pointer" onClick={()=>setShow({open:true,id:0,label:"",title:"Agregar Tag",row:[]})}>Agregar</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="min-height-2000">
                      <div className="table-responsive">
                        <table className="table">
                          <thead className="thead-gray">
                            <tr>
                              <th scope="col">Nombre <br/>Lugar / Tipo de partido / Rival / Fecha</th>
                              <th scope="col" width="100" className="text-center">Acción</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((row,k)=>{
                              return <tr key={k}>
                                      <td>
                                        <a href={context.Config.ConfigAppUrl+"tags/tag/open?id="+row.token}>
                                          {row.label}
                                          <br/>
                                          {row.lugar}
                                          <br/>
                                          {row.tipo_de_partido}
                                          <br/>
                                          {row.rival}
                                          <br/>
                                          {row.fecha}
                                        </a>
                                      </td>
                                      <td className="cursor-pointer text-center">
                                        <div className={parseInt(Store.get("user").usuario_id)===parseInt(row.usuario_inicia_sistema) || row.usuario_inicia_sistema==="0"?"":"d-none"}>
                                          <div className={row.hora_inicio!=="00:00:00" &&row.hora_final==="00:00:00"?"":"d-none"} onClick={()=>{resetCronometro(row.token)}}>
                                            <FontAwesomeIcon icon={faClock}/>
                                          </div>
                                          <a href={context.Config.ConfigAppUrl+"tags/tag/open?id="+row.token}>
                                            <FontAwesomeIcon icon={faFile}/>
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                            })}
                            {data.length===0?<tr>
                                    <td colSpan="6" className="text-center">
                                      Sin datos a mostrar
                                    </td>
                                  </tr>:<></>}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App;
