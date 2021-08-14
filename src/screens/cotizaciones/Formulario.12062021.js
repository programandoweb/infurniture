import React,{useState,useEffect} from 'react';
import Input from '../../screens/inputs';
import Select from '../../screens/select';
import Autocomplete from '../../screens/autocomplete';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import { faPlus,faTrash,faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comentarios from '../../app/comentarios';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

let token = false


const unidad_medida=[
                      { value:"cms2",
                        label:"Centímetros cuadrados"
                      },
                      { value:"unidad",
                        label:"Unidad"
                      },
                      { value:"mts2",
                        label:"Metros"
                      },
                      { value:"kms2",
                        label:"Kilómetros2"
                      },
                    ]

const Items=(props)=>{
  return  <form onSubmit={props.onSubmit} id="myForm">
            <div className="p-3 border mb-3">
              <div className="row">
                <div className="col">
                  <Input
                      placeholder="Actividad"
                      type="text"
                      name="label"
                      className="form-control"
                      onChange={props.onChange2}
                      required={true}
                  />
                </div>
                <div className="col">
                  <Input
                      placeholder="Descripción"
                      type="text"
                      name="descripcion"
                      className="form-control"
                      onChange={props.onChange2}
                  />
                </div>
                <div className="col">
                  <Select
                      placeholder="Unidad de medida"
                      selectDefault="Unidad de medida"
                      name="unidad_medida"
                      data={props.unidades_medida}
                      className="form-control"
                      onChange={props.onChange2}
                      required={true}
                  />
                </div>
                <div className="col">
                  <Input
                      placeholder="Cantidad"
                      type="number"
                      name="cantidad"
                      step="any"
                      className="form-control"
                      onChange={props.onChange2}
                      required={true}
                  />
                </div>
                <div className="col">
                  <Input
                      placeholder="Vr Unitario"
                      type="number"
                      name="precio_unitario"
                      className="form-control"
                      step="any"
                      onChange={props.onChange2}
                      required={true}
                  />
                </div>
                {props.estatus===undefined || props.estatus!=="Order de servicio"?<div className="col-1">
                  <button className="btn btn-primary" type="submit">
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>:false}
              </div>
            </div>
          </form>
}

const App=(props)=>{
  const context         =   React.useContext(StateContext);
  const modulo          =   Functions.segments_modulos(queryStringParams.app);
  const [inputs, setInputs] = useState({});
  const [inputs2, setInputs2] = useState({});
  const [data, setData] = useState({});
  const [funcionarios, setFuncionarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [cotizacion_items, setCotizacion_items] = useState([]);
  const [total, setTotal] = useState(0);
  const [administracion, setAdministracion] = useState(0);
  const [imprevistos, setImprevistos] = useState(0);
  const [utilidad, setUtilidad] = useState(0);
  const [iva, setIva] = useState(0);
  const [unidades_medida, setUnidades_medida] = useState([]);

  const onChange3=(name,value)=>{
    let inputs_          =   {...inputs};
        inputs_[name]    =   value
        setInputs(inputs_)
  }

  const onChange2=(e)=>{
    let inputs_                 =   {...inputs2};
        inputs_[e.target.name]  =   e.target.value
        setInputs2(inputs_)
  }

  const onChange=(e)=>{
    let inputs_                 =   {...inputs};
        inputs_[e.target.name]  =   e.target.value
        setInputs(inputs_)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let dataR                =   {...inputs}
        dataR.user           =   context.Store.get("user").token
        dataR.app            =   JSON.stringify(modulo)
        dataR.token          =   (!token)?props.data.token:token
    Functions.PostAsync("Cotizaciones","set",dataR,context,{name:"callbackSubmit",funct:callbackSubmit})
  }

  const callbackSubmit=(dataR)=>{
    props.data.token   =  dataR.response.token
    getInit()
  }

  useEffect(() => {
    token=false
    getInit()
  },[])

  useEffect(() => {
    let total_ =  0
    cotizacion_items.map((row,key)=>{
      return total_ += parseFloat(row.cantidad) * parseFloat(row.precio_unitario)
    })
    setTotal(total_)

    if (data.administracion!==undefined) {
      setAdministracion(parseFloat(data.administracion) * parseFloat(total_) /100)
    }

    if (data.imprevistos!==undefined) {
      setImprevistos(parseFloat(data.imprevistos) * parseFloat(total_) /100)
    }

    if (data.utilidad!==undefined) {
      setUtilidad(parseFloat(data.utilidad) * parseFloat(total_) /100)
    }

    if (data.iva!==undefined) {
      let iva__     =   (parseFloat(data.utilidad) * parseFloat(total_) /100) * parseFloat(data.iva) / 100;
      setIva(iva__)
    }

  },[cotizacion_items])

  const getInit=()=>{
    let data        =   {}
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
        data.token  =   props.data.token
    Functions.PostAsync("Cotizaciones","get",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{

    if (data.response.cotizacion) {
      token = data.response.cotizacion.token
      setInputs(data.response.cotizacion)
      setUnidades_medida(data.response.unidades_medida)
      let data__          = {...props.data}
          data__.nombres    = data.response.cliente.nombres
          data__.apellidos  = data.response.cliente.apellidos
      props.setOpenCliente(data__)
    }

    setData(data.response.cotizacion)
    setFuncionarios(data.response.funcionarios)
    setClientes(data.response.clientes)
    setCotizacion_items(data.response.cotizacion_items)


  }

  const onSubmit2=(e)=>{
    e.preventDefault()
    document.getElementById("myForm").reset();

    let dataR                =   {...inputs2}
        dataR.user           =   context.Store.get("user").token
        dataR.app            =   JSON.stringify(modulo)
        dataR.token          =   token
    Functions.PostAsync("Cotizaciones","setItems",dataR,context,{name:"callbackSubmitItems",funct:callbackSubmitItems})

  }

  const callbackSubmitItems=(data)=>{
    setCotizacion_items(data.response.items)
    //getInit()
  }

  const deleteItem=(tokens)=>{
    let dataR                =   {...inputs2}
        dataR.user           =   context.Store.get("user").token
        dataR.app            =   JSON.stringify(modulo)
        dataR.token          =   tokens
    Functions.PostAsync("Cotizaciones","deleteItem",dataR,context,{name:"callbackDeleteItems",funct:callbackDeleteItems})
  }

  const callbackDeleteItems=(dataR)=>{
    setCotizacion_items(dataR.response.items)
  }

  const hasDecimal=(num)=> {
	   return !!(num % 1);
  }

  const calculadora=(e,funcion)=>{

    let dataR                 =   {}
        dataR.user            =   context.Store.get("user").token
        dataR.app             =   JSON.stringify(modulo)
        dataR.token           =   props.data.token
        dataR[e.target.name]  =   e.target.value
    Functions.PostAsync("Cotizaciones","changeData",dataR,context,{name:"callbackCalculadora",funct:callbackCalculadora})

    let totalizar   =   parseFloat(e.target.value) * parseFloat(total) /100;
    funcion(totalizar)
    if (e.target.name==='utilidad') {
      let iva__     =   totalizar * 19 / 100;
      setIva(iva__)
    }
  }

  const callbackCalculadora=(data)=>{
    setInputs(data.response.cotizacion)
    setData(data.response.cotizacion)
  }

  const onChangeStatus=()=>{
    if (  administracion>0 &&
          imprevistos>0 &&
          utilidad>0 &&
          iva>0) {
      let dataR                =   {}
          dataR.user           =   context.Store.get("user").token
          dataR.app            =   JSON.stringify(modulo)
          dataR.token          =   props.data.token
      Functions.PostAsync("Cotizaciones","changeStatus",dataR,context,{name:"callbackChangeStatus",funct:callbackChangeStatus})
    }else {
      return false
    }
  }

  const callbackChangeStatus=(data)=>{
    getInit()
  }

  return  <div className="col">
            <div className="card">
              <div className="card-body">
                <form onSubmit={onSubmit} >
                  {data.estatus!==undefined && data.estatus==="borrador"?<div className="row mb-3">
                    <div className="col">
                      <div onClick={onChangeStatus} className={  administracion>0 &&
                                        imprevistos>0 &&
                                        utilidad>0 &&
                                        iva>0?"btn btn-primary":"btn btn-primary disabled"} onClick={onChangeStatus}>
                        Generar Cotización
                      </div>
                    </div>
                  </div>:<>
                    {data.estatus!==undefined && data.estatus==="Cotización"?<>
                      <div className="row mb-3">
                                <div className="col">
                                  <div onClick={onChangeStatus} className="btn btn-primary mr-2" onClick={onChangeStatus}>
                                    Generar Orden de compra
                                  </div>
                                  <div className="btn btn-warning"><b>Consecutivo {data.consecutivo}</b></div>
                                </div>
                                <div className="col text-right">
                                  <a target="_blank" href={context.Config.ConfigApirest+"PDF/cotizacion?id="+data.token} className="btn btn-primary">
                                    <FontAwesomeIcon icon={faFilePdf}/>
                                  </a>
                                </div>
                              </div>
                      </>:<div className="row"> <div className="col-2">
                                                  <div className={data.consecutivo!==undefined?"btn btn-dark":"d-none"}>
                                                    <b>Cotización {data.consecutivo}</b>
                                                  </div>
                                                </div>
                                                <div className="col">
                                                  <div className={data.consecutivo_orden_servicio!==undefined?"btn btn-warning":"d-none"}>
                                                    <b>{data.estatus} {data.consecutivo_orden_servicio!==undefined?<>{data.consecutivo_orden_servicio}</>:false}</b>
                                                  </div>
                                                </div>
                                                <div className="col text-right">
                                                  <a target="_blank" href={context.Config.ConfigApirest+"PDF/cotizacion?id="+data.token} className="btn btn-primary">
                                                    <FontAwesomeIcon icon={faFilePdf}/>
                                                  </a>
                                                </div>
                          </div>
                      }
                  </>
                  }

                  <div className="row">
                    {data.token===undefined?<>
                      <div className="col-12 mb-2">
                        <Autocomplete data={clientes}
                                      onChange={onChange3}
                                      title="Seleccione el cliente"
                                      defaultValue={data.cliente_id}
                                      name="cliente"/>
                      </div>
                    </>:false}
                    <div className="col mb-2">
                      <Input
                          defaultValue={data.label}
                          title="Título"
                          placeholder="Título"
                          type="text"
                          name="label"
                          className="form-control"
                          onChange={onChange}
                          required={true}
                          disabled={data.estatus!==undefined?true:''}
                      />
                    </div>
                    <div className="col-12 col-sm-3 mb-2">
                      <Input
                          defaultValue={data.fecha}
                          title="Fecha de cotización"
                          placeholder="Fecha de cotización"
                          type="date"
                          name="fecha"
                          className="form-control"
                          onChange={onChange}
                          disabled={data.estatus!==undefined?true:''}
                      />
                    </div>
                    <div className="col-12 col-sm-3 mb-2">
                      <Input
                          defaultValue={data.fecha_hasta}
                          title="Valida hasta"
                          placeholder="Valida hasta"
                          type="date"
                          name="fecha_hasta"
                          className="form-control"
                          onChange={onChange}
                          required={true}
                          disabled={data.estatus!==undefined && data.estatus==="Order de servicio"?true:''}
                      />
                    </div>
                  </div>
                  {data.estatus===undefined?<div className="row mb-3">
                    <div className="col">
                      <button className="btn btn-primary" type="submit">
                        Grabar
                      </button>
                    </div>
                  </div>:false}
                </form>
                {token && data.estatus!==undefined && data.estatus!=="Order de servicio"?<>
                  <Items unidades_medida={unidades_medida} estatus={data.estatus} onChange2={onChange2} onSubmit={onSubmit2}/>
                </>:false}
                {cotizacion_items.length>0?<>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col" className="text-center">Actividad</th>
                        <th scope="col" className="text-center">Descripción</th>
                        <th scope="col" className="text-center">Unidad</th>
                        <th scope="col" className="text-right">Cantidad</th>
                        <th scope="col" className="text-right">Vr. Unitario</th>
                        <th scope="col" className="text-right">Vr. Total</th>
                        <th width="50"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cotizacion_items.map((row,key)=>{
                        return  <tr key={key}>
                                  <td style={{verticalAlign: "middle"}}>{row.label}</td>
                                  <td style={{verticalAlign: "middle"}} className="text-justify">{row.descripcion}</td>
                                  <td style={{verticalAlign: "middle"}} className="text-center">{row.unidad_medida}</td>
                                  <td style={{verticalAlign: "middle"}} className="text-right">{Functions.format(parseFloat(row.cantidad))}</td>
                                  <td style={{verticalAlign: "middle"}} className="text-right">{Functions.format(parseFloat(row.precio_unitario))}</td>
                                  <td style={{verticalAlign: "middle"}} className="text-right">{Functions.format(parseFloat(row.cantidad)*parseFloat(row.precio_unitario))}</td>
                                  <td style={{verticalAlign: "middle"}}>
                                    {
                                      data.estatus===undefined || data.estatus!=="Order de servicio"?<>
                                        <FontAwesomeIcon onClick={()=>deleteItem(row.token)} className="cursor-pointer" icon={faTrash} />
                                      </>:false
                                    }
                                  </td>
                                </tr>
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3"></td>
                        <td colSpan="2" className="text-left bg-dark text-white">
                            <b>Subtotal</b>
                        </td>
                        <td className="text-right bg-dark text-white"><b>{Functions.format(total)}</b></td>
                        <td className="text-center bg-dark text-white"></td>
                      </tr>
                      <tr>
                        <td colSpan="3"></td>
                        <td className="text-left">
                            <b>Administración</b>
                        </td>
                        <td className="text-right">
                          <div className="row position-relative">
                            <div className="col-5">
                            </div>
                            <input
                                defaultValue={(data.administracion!=='0.00'?parseFloat(data.administracion):"")}
                                maxlength="3"
                                placeholder="0"
                                type="number"
                                name="administracion"
                                step="any"
                                className="form-control col-6 text-center"
                                onChange={(e)=>{calculadora(e,setAdministracion)}}
                                required={true}
                                disabled={data.estatus!==undefined && data.estatus==="Order de servicio"?true:''}
                            />
                            <div className="mask">%</div>
                          </div>
                        </td>
                        <td className="text-right bg-dark text-white"><b>{Functions.format(administracion)}</b></td>
                        <td className="text-center bg-dark text-white"></td>
                      </tr>
                      <tr>
                        <td colSpan="3"></td>
                        <td className="text-left">
                            <b>Imprevistos</b>
                        </td>
                        <td className="text-right">
                          <div className="row position-relative">
                            <div className="col-5">
                            </div>
                            <input
                                defaultValue={(data.imprevistos!=='0.00'?parseFloat(data.imprevistos):"")}
                                maxlength="3"
                                placeholder="0"
                                type="number"
                                name="imprevistos"
                                step="any"
                                className="form-control col-6 text-center"
                                onChange={(e)=>{calculadora(e,setImprevistos)}}
                                required={true}
                                disabled={data.estatus!==undefined && data.estatus==="Order de servicio"?true:''}
                            />
                            <div className="mask">%</div>
                          </div>
                        </td>
                        <td className="text-right bg-dark text-white"><b>{Functions.format(imprevistos)}</b></td>
                        <td className="text-center bg-dark text-white"></td>
                      </tr>
                      <tr>
                        <td colSpan="3"></td>
                        <td className="text-left">
                            <b>Utilidad</b>
                        </td>
                        <td className="text-right">
                          <div className="row position-relative">
                            <div className="col-5">
                            </div>
                            <input
                                defaultValue={(data.utilidad!=='0.00'?parseFloat(data.utilidad):"")}
                                maxlength="3"
                                placeholder="0"
                                type="number"
                                step="any"
                                name="utilidad"
                                className="form-control col-6 text-center"
                                onChange={(e)=>{calculadora(e,setUtilidad)}}
                                required={true}
                                disabled={data.estatus!==undefined && data.estatus==="Order de servicio"?true:''}
                            />
                            <div className="mask">%</div>
                          </div>
                        </td>
                        <td className="text-right bg-dark text-white"><b>{Functions.format(utilidad)}</b></td>
                        <td className="text-center bg-dark text-white"></td>
                      </tr>
                      <tr>
                        <td colSpan="3"></td>
                        <td className="text-left">
                            <b>IVA</b>
                        </td>
                        <td className="text-right">
                          <div className="row position-relative">
                            <div className="col-5">
                            </div>
                            <input
                                defaultValue={(data.iva!=='0.00'?parseFloat(data.iva):19)}
                                readonly={true}
                                maxlength="3"
                                placeholder="0"
                                type="number"
                                step="any"
                                name="iva"
                                className="form-control col-6 text-center"
                                disabled={data.estatus!==undefined && data.estatus==="borrador"?true:''}
                            />
                            <div className="mask">%</div>
                          </div>
                        </td>
                        <td className="text-right bg-dark text-white"><b>{Functions.format(parseFloat(iva).toFixed(2))}</b></td>
                        <td className="text-center bg-dark text-white"></td>
                      </tr>
                      <tr>
                        <td colSpan="3"></td>
                        <td colSpan="2" className="text-left bg-dark text-white">
                            <b>Total</b>
                        </td>
                        <td className="text-right bg-dark text-white"><b>{Functions.format(parseFloat(administracion+imprevistos+utilidad+iva+total).toFixed(2))}</b></td>
                        <td className="text-center bg-dark text-white"></td>
                      </tr>
                    </tfoot>
                  </table>
                </>:false}
              </div>
            </div>
            {data.token!==undefined?<Comentarios id={"Cot_"+data.token}/>:false}
          </div>
}

export default App
