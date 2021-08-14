import React,{useEffect,useState} from 'react';
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import StateContext from '../../helpers/ContextState';
import MacroCronograma from '../../screens/modalMacroCronograma';
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from 'query-string';
import ModalAsistencia from '../../screens/modalMicroCalendarioAsistencia';
const queryStringParams = queryString.parse(window.location.search);

let colores=0

const App=(props)=>{
  const context = React.useContext(StateContext);
  const [inputs, setInputs] = useState({fecha:"",fases:{}});
  const [data, setData] = useState({
                                      fechas:[],
                                      data:{},
                                    });
  const [data2, setData2] = useState({data:false,microcalendario_time:{
                                                                        session_inicio:"00:00:00",
                                                                        session_finalizacion:"00:00:00"
                                                                        }
                                                                      });
  const [macrocalendario, setMacroCalendario] = useState([]);
  const [showCheckList, setShowCheckList] = useState({open:false,id:0,label:"",title:"Gestinar Maestro",row:{}});
  const [show, setShow] = useState({open:false,id:0,label:"",title:"Gestinar Maestro",row:{}});

  function onChange(e){
    setData2({data:false})
    let input                 = inputs
        input[e.target.name]  = e.target.value
        setInputs(input)
    if ((input.fecha!==undefined &&
                      input.fecha!=="")) {
      getEntrenamiento()
    }
    else {
      setData2({data:false,microcalendario_time:{
                                                  session_inicio:"00:00:00",
                                                  session_finalizacion:"00:00:00"
                                                }
                })
    }
  }

  useEffect(() => {
    getInit()
  },[]);

  function getEntrenamiento(){
    let data              =   inputs
        data.token        =   Store.get("user").token
        Functions.PostAsync("Cronograma","GetMicroCronogramaEntrenamiento",data,context,{name:"callbackInitEntrenamiento",funct:callbackInitEntrenamiento})
  }

  function callbackInitEntrenamiento(data){
    setData2(data.response)
  }

  function getInit(){
    let data              =   {tabla:props.tabla}
        data.token        =   Store.get("user").token
        Functions.PostAsync("Cronograma","GetMicroCronogramaEntrenador",data,context,{name:"callbackInit",funct:callbackInit})
  }

  function callbackInit(data){
    //return    console.log(data.response);
    if (data.response.data===null) {
      data.response.data={}
    }
    setData(data.response)
  }

  function openCheckList(row){
    setShowCheckList({open:true,id:0,label:"",title:"CheckList del entrenamiento",row:row})
  }

  function handleOpenListaAsistencia(){
    setShow({open:true,id:0,label:"",title:"Lista de asistencia",row:data2})
  }

  function handleInicioSesion(value){
    let data_              =   data2
        data_.token        =   Store.get("user").token
        //return console.log(data_);
        Functions.PostAsync("Cronograma","SetMicroCronogramaEntrenadorSession",data_,context,{name:"callbackSession",funct:callbackSession})
  }

  function callbackSession(data){
    getEntrenamiento()
  }

  return  <div className="container mt-3">
            <ModalAsistencia show={show} setShow={setShow} {...props} getInit={getInit} />
            {showCheckList.open?<ModalCheckList  show={showCheckList} setShow={setShowCheckList} {...props} getInit={getEntrenamiento} />:''}
            <div className="row">
              <div className={props.className?props.className:"col-12 mb-3"}>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col">
                        Registro de Entrenamiento
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-2">
                        <select name="fecha" className="form-control" onChange={onChange} required>
                          <option value="">Fecha del entrenamiento</option>
                          {
                            data.fechas.map((row,key)=>{
                              return <option key={key} value={row.value}>{row.label}</option>
                            })
                          }
                        </select>
                      </div>
                      <div className={data2.data?"col-12 col-sm-3 mb-2 text-right":'d-none'}>
                          <div onClick={()=>handleInicioSesion(1)} className={data2.microcalendario_time!==undefined && (data2.microcalendario_time.sesion_inicio==='00:00:00' && data2.microcalendario_time.sesion_finalizacion==='00:00:00')?"btn btn-secondary btn-block":"d-none"}>
                            Inicio Entrenamiento
                          </div>
                          <div onClick={()=>handleInicioSesion(2)} className={data2.microcalendario_time!==undefined && (data2.microcalendario_time.sesion_inicio!=='00:00:00' && data2.microcalendario_time.sesion_finalizacion==='00:00:00')?"btn btn-danger":"d-none"}>
                            Fin Entrenamiento
                          </div>
                      </div>
                      <div className={data2.data?"col-12 col-sm-3 mb-2 text-right":'d-none'}>
                          <div className="btn btn-primary btn-block" onClick={handleOpenListaAsistencia}>
                            Lista de asistencia
                          </div>
                      </div>
                    </div>
                    {data2.data?<>
                        <div className="row mt-5">
                          <div className="col">
                              {Object.entries(data2.fases).map((row,key)=>{
                                let data_x_fases  = data2.data[row[0]]
                                return  <div key={key} className="card mb-3">
                                          <div className="card-header">
                                            {row[1]}
                                          </div>
                                          <div className="card-body">
                                            {data_x_fases.map((row2,key2)=>{
                                              colores = colores===0?1:0
                                              return  <div key={key2} className={colores===0?"row mb-3 pb-3 border-bottom":"row bg-gray mb-3 pb-3 border-bottom"} >
                                                        <div className="col-12 col-sm-2">
                                                          <b>{row2.componentes_cargas}</b>
                                                        </div>
                                                        <div className="col-12 col-sm-2">
                                                          {row2.checklist && row2.checklist.entrenamiento_realizado!==undefined?row2.checklist.entrenamiento_realizado+" Realizado":''}
                                                        </div>
                                                        <div className="col-12 col-sm-2">
                                                          <div><b>Foto</b></div>
                                                          {row2.checklist && row2.checklist.foto!==undefined?<img src={row2.checklist.foto} alt="" className="img-fluid"/>:'No registra'}
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                          <div><b>Video</b></div>
                                                          {row2.checklist && (row2.checklist.video!==undefined && row2.checklist.video!==null)?<><a className="d-none" href={row2.checklist.video} target="_blank">Ver video</a>
                                                              <video controls className="img-fluid">
                                                                <source src={row2.checklist.video} type="video/mp4"/>
                                                                Tu navegador no implementa el elemento <code>video</code>.
                                                              </video>
                                                            </>:'No registra'}
                                                        </div>
                                                        <div className="col-12 col-sm-2 text-right">
                                                          {!row2.checklist?<FontAwesomeIcon className="cursor-pointer" onClick={()=>openCheckList(row2)} icon={faCalendarCheck}/>:<></>}
                                                        </div>
                                                      </div>
                                            })}
                                          </div>
                                        </div>
                              })}

                            </div>
                          </div></>:<></>}
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App;
