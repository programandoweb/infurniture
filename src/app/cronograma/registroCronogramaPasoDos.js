import React,{useEffect,useState} from 'react';
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import StateContext from '../../helpers/ContextState';
import MacroCronogramaCalendario from '../../screens/modalMacroCronogramaCalendario';
import MacroCronograma from '../../screens/modalMacroCronograma';
import MacroCronogramaResumenCalendario from '../../screens/modalMacroCronogramaResumenCalendario';
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=(props)=>{
  const context = React.useContext(StateContext);
  const [data, setData] = useState([]);
  const [macrocalendario, setMacroCalendario] = useState([]);
  const [show, setShow] = useState({open:false,id:0,label:"",title:"Gestinar Maestro",row:{}});
  const [show2, setShow2] = useState({open:false,id:0,label:"",title:"Gestinar Maestro",row:{}});
  const [show3, setShow3] = useState({open:false,id:0,label:"",title:"Gestinar Maestro",row:{}});
  const [estados_macrocalendario, setEstados_macrocalendario] = useState([]);

  useEffect(() => {
    getInit()
  },[]);

  function getInit(){
    let data              =   {tabla:props.tabla}
        data.token        =   Store.get("user").token
        data.cronograma   =   queryStringParams.id
    Functions.PostAsync("Cronograma","GetItemsCronograma",data,context,{name:"callbackInit",funct:callbackInit})
  }

  function callbackInit(data){
    setData(data.response.data)
    setMacroCalendario(data.response.macrocalendario)
    setEstados_macrocalendario(data.response.estados_macrocalendario)
  }

  return  <div className="container">
            <div className={props.className?props.className:"col-12 mb-3"}>
              {show?<MacroCronogramaCalendario id={queryStringParams.id} estados_macrocalendario={estados_macrocalendario} show={show} setShow={setShow} {...props} getInit={getInit} />:<></>}
              {show2?<MacroCronograma show={show2} setShow={setShow2} {...props} getInit={getInit} />:<></>}
              {show3?<MacroCronogramaResumenCalendario show={show3} setShow={setShow3} {...props} getInit={getInit} />:<></>}
              <div className="card">
                <div className={"card-header "+props.classHeader}>
                  <div className="row">
                    <div className="col">
                      {props.title}
                    </div>
                    {queryStringParams.id!==undefined?<div className="col-3 cursor-pointer text-right" onClick={()=>setShow2({open:true,id:queryStringParams.id,label:"",title:"Agregar item a "+macrocalendario.label,row:[]})}>
                      Agregar items
                    </div>:<></>}
                    {queryStringParams.id!==undefined?<a className="col-3 cursor-pointer text-right" href={context.Config.ConfigApirest+"Cronograma/Exportar?m=exportar_macrocalendario&id="+queryStringParams.id}>
                      Exportar Excel
                    </a>:<></>}
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="min-height-2000">
                    <div className="table-responsive">
                      <table className="table">
                        <thead className="thead-gray">
                          <tr>
                            <th scope="col">Selección</th>
                            <th scope="col">Edad</th>
                            <th scope="col">Género</th>
                            <th scope="col">Entrenador</th>
                            <th scope="col">Ciudad</th>
                            <th scope="col" className="text-center">Agendado</th>
                            <th scope="col" width="200" className="text-center">Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((row,k)=>{
                            return <tr key={k}>
                                    <td>
                                      {row.categoria}
                                    </td>
                                    <td>
                                      {row.edad}
                                    </td>
                                    <td>
                                      {row.genero}
                                    </td>
                                    <td>
                                      {row.entrenador_nombres} {row.entrenador_apellidos}
                                    </td>
                                    <td>
                                      {row.ciudad}
                                    </td>
                                    <td className="text-center">
                                      {(row.cantidad_cronograma_items>0)?<div className="btn btn-link p-0 m-0"  onClick={()=>setShow3({open:true,id:row.op_macrocalendario_estructura_id,label:"",title:"Resumen Calendario ",row:[]})}>{row.cantidad_cronograma_items}</div>:row.cantidad_cronograma_items}
                                    </td>
                                    <td className="cursor-pointer text-center">
                                      <div className="btn btn-link p-0 m-0" onClick={()=>setShow({open:true,id:row.op_macrocalendario_id,id2:row.op_macrocalendario_estructura_id,label:"",title:"Agregar item a "+macrocalendario.label,row:[]})}>
                                        <FontAwesomeIcon icon={faCalendarAlt}/>
                                      </div>
                                    </td>
                                  </tr>
                          })}
                          {data.length===0?<tr>
                                  <td colSpan="7" className="text-center">
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
}
export default App;
