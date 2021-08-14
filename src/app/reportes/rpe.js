import React,{useEffect,useState} from 'react';
import Store from "../../helpers/Store";
import Config from "../../helpers/Config";
import StateContext from '../../helpers/ContextState';
import Functions from "../../helpers/Functions";

const App=(props)=>{
  const context = React.useContext(StateContext);
  const [data, setData] = useState({
                                      microcalendario:[],
                                      data:{},
                                      atletas:[],
                                    });
  const [data2, setData2]           = useState({data:[],dias_espanol:[]});
  const [inputs, setInputs]         = useState({atletas:[],fecha:"",fases:{}});

  const [html, setHtml]             = useState('')
  //const [data3, setData3]           = useState({});

  function onChange(e){
    setData2({data:[],dias_espanol:[]})
    let input                 = inputs
        input[e.target.name]  = e.target.value
        input.fecha_id          = e.target.value
        input.fecha_string      = e.target.value
        setInputs(input)
    if ((input.fecha!==undefined &&
                      input.fecha!=="")) {
      getEntrenamiento()
    }
    else {
      setData2({data:false,dias_espanol:[],data:[]})
    }
  }

  function getEntrenamiento(){
    let data              =   inputs
        data.token        =   Store.get("user").token
        data.fecha        =   inputs.fecha_string
        Functions.PostAsync("Reportes","GetRPE",data,context,{name:"callbackInitEntrenamiento",funct:callbackInitEntrenamiento})
  }

  function callbackInitEntrenamiento(data){
    setData2(data.response)
  }

  useEffect(() => {
    getInit()
  },[]);

  function getInit(){
    let data                        =   {tabla:props.tabla}
        data.token                  =   Store.get("user").token
        data.op_microcalendario_id  =   Store.get("user").token
        data.fecha                  =   inputs.fecha_string
        Functions.PostAsync("Cronograma","GetMicroCronogramaRangoFechas",data,context,{name:"callbackInit",funct:callbackInit})
  }

  function callbackInit(data){
    if (data.response.data===null) {
      data.response.data={}
    }
    setData(data.response)
  }

  function exportar(){
    let elemento        = document.getElementById("exportar_esto");
    let textarea_html   = document.getElementById("textarea_html");
    let form            = document.getElementById("exportar_form");
    let form_data       = document.getElementById("data");
    let form_data2       = document.getElementById("data2");

        //textarea_html.innerHTML =   elemento.innerHTML
        form_data.value         =   JSON.stringify(data)
        form_data2.value        =   JSON.stringify(data2)
        form.submit()
  }

  return  <div className="container-fluid">
            <div className="row mb-3">
              <div className="col">
                <div className="card">
                  <div className="card-header bg-success text-white">
                    <div className="row">
                      <div className="col">
                        RPE
                      </div>
                      <form method="post" id="exportar_form" action={Config.ConfigApirest+"Exportar/HTML"}>
                        <input id="data" name="data" type="hidden" />
                        <input id="data2" name="data2" type="hidden" />
                        <textarea className="d-none" id="textarea_html" name="html">{html}</textarea>
                      </form>

                    </div>
                  </div>
                  <div className="card-body" >
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-2">
                        <select name="fecha" className="form-control" onChange={onChange} required>
                          <option value="">Fecha del entrenamiento</option>
                          {
                            data.microcalendario.map((row,key)=>{
                              return <option key={key} value={row.fecha_desde}>{row.fecha_rango}</option>
                            })
                          }
                        </select>
                      </div>
                      <div className={data2.data.length>0?"col-12 col-sm-6":"d-none"} >
                        <div className="btn btn-primary btn-block" onClick={exportar}>
                          Exportar
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3 rpe" id="exportar_esto">
                      <div className="col-12 mb-2">
                        <div className="row">
                          <div className={data2.data.length>0?"col h3 mb-3":"d-none"}>
                            <b>Atleta</b>
                          </div>
                          <div className={data2.data.length>0?"col-2":"d-none"}>
                            <div className="bg-primary text-white text-center">
                              RPE
                            </div>
                            <table className="table">
                              <tr>
                                {
                                  data2.dias_espanol.map((row_,key_)=>{
                                    return  <td key={key_} width="20%" className="text-center text-uppercase">
                                              {row_.letra}
                                            </td>
                                  }
                                )}
                              </tr>
                            </table>
                          </div>
                          <div className={data2.data.length>0?"col-2":"d-none"}>
                            <div className="bg-secondary text-white text-center" >
                              Minutos
                            </div>
                            <table className="table">
                              <tr>
                                {
                                  data2.dias_espanol.map((row_,key_)=>{
                                    return  <td key={key_} width="20%" className="text-center text-uppercase">
                                              {row_.letra}
                                            </td>
                                  }
                                )}
                              </tr>
                            </table>
                          </div>
                          <div className={data2.data.length>0?"col-6":"d-none"}>
                            <div className="bg-secondary text-white text-center" >
                              Valores
                            </div>
                            <table className="table">
                              <tr>
                                {
                                  data2.dias_espanol.map((row_,key_)=>{
                                    return  <td key={key_} width="14%" className="text-center text-uppercase">
                                              VT{row_.letra}
                                            </td>
                                  }
                                )}
                                <td className="text-center" width="80">RA</td>
                                <td className="text-center" width="80">RC</td>
                                <td className="text-center" width="80">ACWR</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                        {data2.data.map((row,key)=>{
                          let calcular_campo_valores={}
                          let calcular_campo_ra   =0
                          let constante_rc        = 1410
                          return  <div className={inputs.fecha!==''?"row mb-3 border-bottom pb-2":"d-none"} key={key}>
                                    <div className="col">
                                      {row.nombres} {row.apellidos}
                                    </div>
                                    <div className="col-2">
                                      <table className="table">
                                        <tr>
                                          {
                                            data2.dias_espanol.map((row_,key_)=>{
                                              calcular_campo_valores[row_.date]  = row.entrenamiento_antes[row_.date]!==undefined && row.entrenamiento_antes[row_.date].promedio!==undefined?row.entrenamiento_antes[row_.date].promedio:0
                                              return  <td key={key_} width="20%" className="text-center text-uppercase">
                                                        { row.entrenamiento_antes[row_.date]!==undefined && row.entrenamiento_antes[row_.date].promedio!==undefined?row.entrenamiento_antes[row_.date].promedio:0}
                                                      </td>
                                            }
                                          )}
                                        </tr>
                                      </table>
                                    </div>
                                    <div className="col-2">
                                      <table className="table">
                                        <tr>
                                          {
                                            data2.dias_espanol.map((row_,key_)=>{
                                              calcular_campo_valores[row_.date]  =   row.entrenamiento_antes[row_.date]!==undefined && row.entrenamiento_antes[row_.date].promedio!==undefined? parseFloat(calcular_campo_valores[row_.date]) * data2.fechas_tiempo_sesion[row_.date] :0
                                              calcular_campo_ra += calcular_campo_valores[row_.date]
                                              return  <td key={key_} width="20%" className="text-center text-uppercase">
                                                        {
                                                          data2.fechas_tiempo_sesion[row_.date]!==undefined && (row.entrenamiento_antes[row_.date]!==undefined && row.entrenamiento_antes[row_.date].promedio!==undefined)?data2.fechas_tiempo_sesion[row_.date]:0
                                                        }
                                                      </td>
                                            }
                                          )}
                                        </tr>
                                      </table>
                                    </div>
                                    <div className="col-6">
                                      <table className="table">
                                        <tr>
                                          {
                                            data2.dias_espanol.map((row_,key_)=>{
                                              let num = calcular_campo_valores[row_.date];
                                              let n = num.toFixed(2);
                                              return  <td key={key_} width="14%" className="text-center text-uppercase">
                                                        {n}
                                                      </td>
                                            }
                                          )}
                                          <td className="text-center" width="80">{
                                            calcular_campo_ra.toFixed(2)
                                          }</td>
                                          <td className="text-center" width="80">{constante_rc}</td>
                                          <td className="text-center" width="80">{(calcular_campo_ra / constante_rc).toFixed(2)}</td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}

export default App;
