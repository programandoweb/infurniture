import React,{useEffect,useState} from 'react';
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import Cronometro from "../../screens/cronometro";
import StateContext from '../../helpers/ContextState';
import Grama from '../../assets/images/design/grama.jpg';
import Modal from '../../screens/modalResumen';
import Modal2 from '../../screens/modalResumenEstadistico';
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

let medidas     = []
const positions = [ "base",
                    "Zona 1 izquierda",
                    "Zona 1 centro",
                    "Zona 1 derecha",
                    "Zona 2 izquierda",
                    "Zona 2 centro",
                    "Zona 2 derecha",
                    "Zona 3 izquierda",
                    "Zona 3 centro",
                    "Zona 3 derecha",
                  ]

const Categorias    =   (props)=>{
  return  <>
            <div className="card-header" onClick={()=>{props.setScreen1(false); props.setScreen2(false)}}>
              <div className="row">
                <div className="col-1">
                  <FontAwesomeIcon icon={faArrowCircleLeft}/>
                </div>
                <div className="col">
                  {positions[props.screen1]}
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                {props.data.map((row,key)=>{
                  return  <div className="col-12 col-sm-4 arco arco1 mb-1" key={key}>
                            <div className="p-3 bg-success  text-white" onClick={()=>{props.setInputs(row.items);props.setScreen2(row)}}>{row.label}</div>
                          </div>
                })}
              </div>
            </div>
          </>
}

const SubCategorias =   (props)=>{
  let items_  = JSON.parse(props.inputs)
  return  <>
            <div className="card-header" onClick={()=>{props.setScreen1(false); props.setScreen2(false)}}>
              <div className="row">
                <div className="col-1">
                  <FontAwesomeIcon icon={faArrowCircleLeft}/>
                </div>
                <div className="col">
                  {props.screen2.label}
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                {items_.map((row,key)=>{
                  let enviar                =   {}
                      enviar.categoria      =   props.screen2.label
                      enviar.subcategoria   =   row
                      enviar.screen         =   props.screen1
                      enviar.screen_string  =   positions[props.screen1]
                  return  <div className="col-6 col-sm-4 mb-1" key={key} onClick={()=>props.sendData(enviar)}>
                            <div className="p-3 bg-success text-white ">{row}</div>
                          </div>
                })}
              </div>
            </div>
          </>
}


const App=(props)=>{
  const context = React.useContext(StateContext);
  const [data, setData] = useState([]);
  const [arco, setArco] = useState(0);
  const [zona, setZona] = useState(0);
  const [tablero, setTablero] = useState(0);
  const [boolCronometro, setBoolCronometro] = useState(false);
  const [cronometro, setCronometro] = useState(false);
  const [screen1, setScreen1] = useState(false);
  const [screen2, setScreen2] = useState(false);
  const [inputs, setInputs] = useState({});
  const [inputs2, setInputs2] = useState({});
  const [show, setShow] = useState({open:false,id:0,label:"",title:"Resumen de tiempos",row:{}});
  const [show2, setShow2] = useState({open:false,id:0,label:"",title:"Resumen de tiempos",row:{}});

  useEffect(() => {
    reportWindowSize()
    getInit()
  },[]);

  function getInit(){
    let data        = {tabla:"ma_tags_items"}
        data.token  = Store.get("user").token
         data.id    = queryStringParams.id
    Functions.PostAsync("Maestros","tablas_maestras",data,context,{name:"callbackInit",funct:callbackInit})
    Functions.PostAsync("Tags","getCronometro",data,context,{name:"callbackCronometro",funct:callbackCronometro})
  }

  function callbackInit(data){
    setData(data.response.data)
  }

  function callbackCronometro(data){
    if (data.response.cronometro.hora_inicio!=='00:00:00' && data.response.cronometro.hora_final==='00:00:00') {
      setBoolCronometro(true)
    }
    setCronometro(data.response.cronometro)
  }

  function tamVentana() {
    var tam = [0, 0];
    if (typeof window.innerWidth != 'undefined'){
      tam = [ window.innerWidth,window.innerHeight];
    }else if (typeof document.documentElement != 'undefined' &&
              typeof document.documentElement.clientWidth !='undefined' &&
              document.documentElement.clientWidth != 0){
      tam = [
              document.documentElement.clientWidth,
              document.documentElement.clientHeight
            ];
    }else{
      tam = [
              document.getElementsByTagName('body')[0].clientWidth,
              document.getElementsByTagName('body')[0].clientHeight
            ];
    }
    return tam;
  }

  function reportWindowSize(){
    medidas     =   tamVentana()
        setTablero(medidas[1])
    let arcos_h =   12.5 * medidas[1] / 100;
    let zonas_h =   25 * medidas[1] / 100;
        setArco(arcos_h)
        setZona(zonas_h)
  }

  function openPosition(position){
    if (boolCronometro) {
      setScreen1(position)
    }
  }

  window.addEventListener('resize', reportWindowSize);

  function sendData(row){
    setScreen1(false);
    setScreen2(false);
    let  data         =   row
         data.token   =   Store.get("user").token
         data.id      =   queryStringParams.id
    Functions.PostAsync("Tags","setPartidoItems",data,context,{name:"callbackSendData",funct:callbackSendData})
  }

  function callbackSendData(data){
    setBoolCronometro(true)
  }

  function sendCronometro(accion,tiempo_acumulado){
    let  data         =   {}
         data.token   =   Store.get("user").token
         data.id      =   queryStringParams.id
         data.accion  =   accion
         if (tiempo_acumulado!==undefined) {
           data.cronometro  =   tiempo_acumulado
         }
         if (tiempo_acumulado!=="00:00:00") {
           setBoolCronometro(false)
         }else {
           setBoolCronometro(true)
         }
    Functions.PostAsync("Tags","setCronometro",data,context,{name:"callbackSendCronometro",funct:callbackSendCronometro})
  }

  function callbackSendCronometro(data){
    //setBoolCronometro(false)
    //console.log(data);
  }

  function resumen(){
    setShow({open:true,id:queryStringParams.id,label:"",title:"Resumen de tiempos",row:[]})
  }

  function resumen2(){
    setShow2({open:true,id:queryStringParams.id,label:"",title:"Resumen estadístico",row:[]})
  }


  return  <>
            <Modal id={queryStringParams.id} show={show} setShow={setShow} />
            <Modal2 id={queryStringParams.id} show={show2} setShow={setShow2} />
            <div className={screen1?"container-fluid tablero":"d-none"} style={{height:tablero+"px"}}>
              <div className="row">
                <div className="col" style={{height:tablero+"px"}}>
                  <div className="card mt-1">
                    {!screen2?<Categorias
                                      data={data}
                                      setInputs={setInputs}
                                      setScreen1={setScreen1}
                                      setScreen2={setScreen2}
                                      screen1={screen1}
                                      screen2={screen2}
                                      />:<SubCategorias
                                      inputs={inputs}
                                        setInputs={setInputs2}
                                        setScreen1={setScreen1}
                                        setScreen2={setScreen2}
                                        screen1={screen1}
                                        screen2={screen2}
                                        sendData={sendData}
                                      />}
                  </div>
                </div>
              </div>
            </div>
            <div className={!screen1?"container-fluid text-center h-100 tablero":"d-none"} style={{height:tablero+"px",background:"url("+Grama+") no-repeat center center fixed"}}>
              <div className="row align-items-start">
                <div className="col-4">
                  {window.history.length>2?<div className="btn btn-block btn-secondary mt-2" onClick={()=>{ window.history.back();}}>
                                              <FontAwesomeIcon icon={faArrowCircleLeft}/>
                                            </div>:<></>}

                </div>
                <div className="col-4 arco arco1 bg-warning cursor-pointer" style={{height:arco+"px"}} onClick={resumen}>
                  <div className="h5 pt-4 ">
                    Ver resumen
                  </div>
                </div>
                <div className="col-4">

                    <Cronometro cronometro={cronometro}
                                setCronometro={setCronometro}
                                sendCronometro={sendCronometro}
                                boolCronometro={boolCronometro}
                                setBoolCronometro={setBoolCronometro}
                                getInit={getInit}
                                id={queryStringParams.id}/>

                </div>
              </div>
              <div className="row align-items-start">
                <div className="col-4 zona bg-success border-right pt-5  text-white" onClick={()=>openPosition(1)} style={{height:zona+"px"}}>
                  IZQUIERDA
                </div>
                <div className="col-4 zona bg-success border-right pt-5  text-white" onClick={()=>openPosition(2)} style={{height:zona+"px"}}>
                  CENTRO
                </div>
                <div className="col-4 zona bg-success border-right pt-5  text-white" onClick={()=>openPosition(3)} style={{height:zona+"px"}}>
                  DERECHA
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-4 zona bg-white  border-right pt-5  text-success" onClick={()=>openPosition(4)} style={{height:zona+"px"}}>
                  IZQUIERDA
                </div>
                <div className="col-4 zona bg-white  border-right pt-5 text-success" onClick={()=>openPosition(5)} style={{height:zona+"px"}}>
                  CENTRO
                </div>
                <div className="col-4 zona bg-white border-right pt-5 text-success" onClick={()=>openPosition(6)} style={{height:zona+"px"}}>
                  DERECHA
                </div>
              </div>
              <div className="row align-items-end">
                <div className="col-4 zona bg-success border-right pt-5  text-white" onClick={()=>openPosition(7)} style={{height:zona+"px"}}>
                  IZQUIERDA
                </div>
                <div className="col-4 zona bg-success border-right pt-5  text-white"  onClick={()=>openPosition(8)} style={{height:zona+"px"}}>
                  CENTRO
                </div>
                <div className="col-4 zona bg-success border-right pt-5  text-white" onClick={()=>openPosition(9)} style={{height:zona+"px"}}>
                  DERECHA
                </div>
              </div>
              <div className="row align-items-end">
                <div className="col-4">
                </div>
                <div className="col-4 arco arco2 bg-warning cursor-pointer" style={{height:arco+"px"}} onClick={resumen2}>
                  <div className="h5 pt-4">
                    Selección Antioquia estadísticas
                  </div>
                </div>
                <div className="col-4">
                </div>
              </div>
            </div>
          </>
}
export default App;
