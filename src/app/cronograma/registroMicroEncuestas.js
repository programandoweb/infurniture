import React,{useEffect,useState} from 'react';
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import StateContext from '../../helpers/ContextState';
import MacroCronograma from '../../screens/modalMacroCronograma';
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from 'query-string';
import ModalEncuestaAntes from '../../screens/modalEvaluacion';
import ModalEncuestaDespues from '../../screens/modalEvaluacionDespues';
const queryStringParams = queryString.parse(window.location.search);

let colores=0

const App=(props)=>{
  const context = React.useContext(StateContext);
  const [inputs, setInputs] = useState({atletas:[],fecha:"",fases:{}});
  const [data, setData] = useState({
                                      microcalendario:[],
                                      data:{},
                                      atletas:[],
                                    });
  const [data2, setData2] = useState({data:false});
  const [macrocalendario, setMacroCalendario] = useState([]);
  const [showCheckList, setShowCheckList] = useState({open:false,id:0,label:"",title:"Gestinar Maestro",row:{}});
  const [show, setShow] = useState({open:false,id:0,label:"",title:"Gestinar Maestro",row:{}});
  const [show2, setShow2] = useState({open:false,id:0,label:"",title:"Gestinar Maestro",row:{}});

  function onChange(e){
    //console.log(e.target.options[e.target.selectedIndex].innerHTML);
    setData2({data:false})
    let input                 = inputs
        input[e.target.name]  = e.target.value
        input.fecha_id         = e.target.value
        input.fecha_string    = e.target.options[e.target.selectedIndex].innerHTML
        setInputs(input)
    if ((input.fecha!==undefined && input.fecha!=="")) {
      getEntrenamiento()
    }
    else {
      setData2({data:false})
    }
  }

  useEffect(() => {
    getInit()
  },[]);

  function getEntrenamiento(){
    let data              =   inputs
        data.token        =   Store.get("user").token
        data.fecha                  =   inputs.fecha_string
        Functions.PostAsync("Cronograma","GetMicroCronogramaEntrenamiento",data,context,{name:"callbackInitEntrenamiento",funct:callbackInitEntrenamiento})
  }

  function callbackInitEntrenamiento(data){
    setData2(data.response)
  }

  function getInit(){
    let data                        =   {tabla:props.tabla}
        data.token                  =   Store.get("user").token
        data.op_microcalendario_id  =   Store.get("user").token
        data.fecha                  =   inputs.fecha_string
        Functions.PostAsync("Cronograma","GetMicroCronogramaEncuestas",data,context,{name:"callbackInit",funct:callbackInit})
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

  function handleOpenAntes(e,row){
    row.op_macrocalendario_estructura_id=inputs.fecha
    row.antes_despues="Antes"
    row.fecha=inputs.fecha_id
    row.fecha_string=inputs.fecha_string
    row.antes_despues="antes"
    setShow({open:true,id:row,label:"",title:"Encuesta antes del entrenamiento",row:data2})
  }
  function handleOpenDespues(e,row){
    row.op_macrocalendario_estructura_id=inputs.fecha
    row.antes_despues = "Después"
    row.fecha=inputs.fecha_id
    row.fecha_string=inputs.fecha_string
    row.antes_despues="despues"
    setShow2({open:true,id:row,label:"",title:"Encuesta luego del entrenamiento",row:data2})
  }

  return  <div className="container mt-3">
            <ModalEncuestaAntes show={show} setShow={setShow} {...props} getInit={getInit} />
            <ModalEncuestaDespues show={show2} setShow={setShow2} {...props} getInit={getInit} />
            <div className="row">
              <div className={props.className?props.className:"col-12 mb-3"}>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col">
                        Encuestas atletas
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-2">
                        <select name="fecha" className="form-control" onChange={onChange} required>
                          <option value="">Fecha del entrenamiento</option>
                          {
                            data.microcalendario.map((row,key)=>{
                              return <option key={key} value={row.op_macrocalendario_estructura_id}>{row.fecha_desde}</option>
                            })
                          }
                        </select>
                      </div>
                    </div>

                        {data.atletas.map((row,key)=>{
                          return  <div className={inputs.fecha!==''?"row mb-3 border-bottom pb-2":"d-none"} key={key}>
                                    <div className="col">
                                      {row.nombres} {row.apellidos}
                                    </div>
                                    <div className="col">
                                      <div onClick={(e)=>handleOpenAntes(e,row)} className="btn btn-primary btn-block">Antes</div>
                                    </div>
                                    <div className="col">
                                      <div onClick={(e)=>handleOpenDespues(e,row)} className="btn btn-secondary btn-block">Después</div>
                                    </div>
                                  </div>
                        })}

                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App;
