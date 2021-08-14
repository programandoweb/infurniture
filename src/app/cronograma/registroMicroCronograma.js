import React,{useEffect,useState} from 'react';
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import StateContext from '../../helpers/ContextState';
import MacroCronogramaCalendario from '../../screens/modalMacroCronogramaCalendario';
import MacroCronograma from '../../screens/modalMacroCronograma';
import MicroCalendarioItems from '../../screens/tableMicroCalendarioItems';
// import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=(props)=>{
  const context = React.useContext(StateContext);
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState({
                                      director_tecnico:[],
                                      arbritos:[],
                                      entrenador_id:[],
                                      preparador_arqueros:[],
                                      kinesiologo:[],
                                      ma_fases:[],
                                      ma_componentes_cargas:[],
                                      data:{},
                                    });
  const [data2, setData2] = useState({});
  const [macrocalendario, setMacroCalendario] = useState([]);
  const [show, setShow] = useState({open:false,id:0,label:"",title:"Gestinar Maestro",row:{}});
  const [show2, setShow2] = useState({open:false,id:0,label:"",title:"Gestinar Maestro",row:{}});
  const [fases, setFases] = useState(false);


  function onChange(e){
    let input                 = inputs
        input[e.target.name]  = e.target.value
        setInputs(input)

    // let data_                 = data
    //     console.log(data_);

        if ((input.ma_componentes_cargas_id!==undefined &&
                          input.ma_componentes_cargas_id!=="") &&
                          (input.director_tecnico_id!==undefined &&
                          input.director_tecnico_id!=="") &&
                          (input.arbrito_id!==undefined &&
                          input.arbrito_id!=="")&&
                          (input.preparador_arquero_id!==undefined &&
                          input.preparador_arquero_id!=="")&&
                          (input.kinesiologo_id!==undefined &&
                          input.kinesiologo_id!=="")) {
          setFases(true)
        }else {
          setFases(false)
        }
  }

  useEffect(() => {
    getInit()
  },[]);

  function getInit(){
    let data              =   {tabla:props.tabla}
        data.token        =   Store.get("user").token
        data.op_macrocalendario_estructura_calendario_id    =   queryStringParams.id
        data.op_macrocalendario_estructura_id               =   queryStringParams.id2
        data.op_macrocalendario_id                          =   queryStringParams.id3
    Functions.PostAsync("Cronograma","GetItemsMicroCronograma",data,context,{name:"callbackInit",funct:callbackInit})
    setData2(data)
  }

  function callbackInit(data){
    //return  console.log(data.response);
    if (data.response.data===null) {
      data.response.data={}
    }
    console.log(data.response.data);
    setData(data.response)
    if ((data.response.data.ma_componentes_cargas_id!==undefined &&
                      data.response.data.ma_componentes_cargas_id!=="") &&
                      (data.response.data.director_tecnico_id!==undefined &&
                      data.response.data.director_tecnico_id!=="") &&
                      (data.response.data.arbrito_id!==undefined &&
                      data.response.data.arbrito_id!=="")&&
                      (data.response.data.entrenador_id!==undefined &&
                      data.response.data.entrenador_id!=="")&&
                      (data.response.data.preparador_arquero_id!==undefined &&
                      data.response.data.preparador_arquero_id!=="")&&
                      (data.response.data.kinesiologo_id!==undefined &&
                      data.response.data.kinesiologo_id!=="")) {
      setInputs(data.response.data)                  
      setFases(true)
    }else {
      setFases(false)
    }
  }

  return  <div className="container mt-3">
            <div className="row">
              <div className={props.className?props.className:"col-12 mb-3"}>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col">
                        Gestión de Formato Microciclo (FM2)
                      </div>
                      {queryStringParams.id!==undefined?<a className="col-3 cursor-pointer text-right" href={context.Config.ConfigApirest+"Cronograma/Exportar?m=exportar_microcalendario&id="+queryStringParams.id}>
                        Exportar Excel
                      </a>:<></>}
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 col-sm-2 mb-2">
                        <select name="ma_componentes_cargas_id" value={(data.data!==undefined && data.data!==null)?data.data.ma_componentes_cargas_id:''}  className="form-control" onChange={onChange} required>
                          <option value="">Componente de carga</option>
                          {
                            data.ma_componentes_cargas.map((row,key)=>{
                              return <option key={key} value={row.ma_componentes_cargas_id}>{row.label}</option>
                            })
                          }
                        </select>
                      </div>
                      <div className="col-12 col-sm-2 mb-2">
                        <select name="director_tecnico_id" value={(data.data!==undefined && data.data!==null)?data.data.director_tecnico_id:''}  className="form-control" onChange={onChange} required>
                          <option value="">Director Técnico</option>
                          {
                            data.director_tecnico.map((row,key)=>{
                              return <option key={key} value={row.usuario_id}>{row.nombres} {row.apellidos}</option>
                            })
                          }
                        </select>
                      </div>
                      <div className="col-12 col-sm-2 mb-2">
                        <select name="entrenador_id" value={(data.data!==undefined && data.data!==null)?data.data.entrenador_id:''}   className="form-control" onChange={onChange} required>
                          <option value="">Entrenador</option>
                          {
                            data.entrenador_id.map((row,key)=>{
                              return <option key={key} value={row.usuario_id}>{row.nombres} {row.apellidos}</option>
                            })
                          }
                        </select>
                      </div>
                      <div className="col-12 col-sm-2 mb-2">
                        <select name="arbrito_id" value={(data.data!==undefined && data.data!==null)?data.data.arbrito_id:''}   className="form-control" onChange={onChange} required>
                          <option value="">Analista de rendimiento</option>
                          {
                            data.arbritos.map((row,key)=>{
                              return <option key={key} value={row.usuario_id}>{row.nombres} {row.apellidos}</option>
                            })
                          }
                        </select>
                      </div>
                      <div className="col-12 col-sm-2 mb-2">
                        <select name="preparador_arquero_id" value={(data.data!==undefined && data.data!==null)?data.data.preparador_arquero_id:''}   className="form-control" onChange={onChange} required>
                          <option value="">Preparador Arquero</option>
                          {
                            data.preparador_arqueros.map((row,key)=>{
                              return <option key={key} value={row.usuario_id}>{row.nombres} {row.apellidos}</option>
                            })
                          }
                        </select>
                      </div>
                      <div className="col-12 col-sm-2 mb-2">
                        <select name="kinesiologo_id" value={(data.data!==undefined && data.data!==null)?data.data.kinesiologo_id:''}  className="form-control" onChange={onChange} required>
                          <option value="">Kinesiólogo</option>
                          {
                            data.kinesiologo.map((row,key)=>{
                              return <option key={key} value={row.usuario_id}>{row.nombres} {row.apellidos}</option>
                            })
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            {fases?<div className="row mt-5">
                    <div className="col">
                      {data.ma_fases.map((row,key)=>{
                        return <MicroCalendarioItems
                                  inputs={inputs}
                                  data={data}
                                  data2={data2}
                                  title={row.label}
                                  ma_fases_id={row.ma_fases_id}
                                  director_tecnico_id={data.data.director_tecnico_id}
                                  arbrito_id={data.data.arbrito_id}
                                  preparador_arquero_id={data.data.preparador_arquero_id}
                                  kinesiologo_id={data.data.kinesiologo_id}
                                  id={queryStringParams.id}/>
                      })}
                    </div>
                  </div>:<></>}
          </div>
}
export default App;
