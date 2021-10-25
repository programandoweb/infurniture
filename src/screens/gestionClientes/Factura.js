import React,{useState,useEffect} from 'react';
import Functions from '../../helpers/Functions';
import Select from '../../screens/select';
import StateContext from '../../helpers/ContextState'
import Config from '../../helpers/Config'
import { faWindowClose,faPlus,faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const iva_monto = 19

const App=(props)=>{

  const modulo                            =   Functions.segments_modulos(queryStringParams.app);
  const context                           =   React.useContext(StateContext);
  const [inputs, setInputs]               =   useState({});
  const [data, setData]                   =   useState([]);
  const [string, setString]               =   useState({});
  const [string2, setString2]             =   useState({});
  const [active, setActive]               =   useState(false);
  const [cantidades, setCantidades]       =   useState({});
  const [formas_pagos, setFormas_pagos]   =   useState([]);
  const [formas_pagos2, setFormas_pagos2] =   useState(false);
  const [max, setMax]                     =   useState(0);
  const [precio, setPrecio]               =   useState(0);
  const [articulos, setArticulos]         =   useState([]);
  const [subtotal, setSubtotal]           =   useState(0);
  const [financiacion, setFinanciacion]   =   useState(false);
  const [inicial, setInicial]             =   useState(0);
  const [cuotas, setCuotas]               =   useState(0);
  const [itemsCuotas, setItemsCuotas]             =   useState([]);
  const [fechasItemsCuotas, setFechasItemsCuotas] =   useState({});
  const [montopagoCuota, setMontopagoCuota] =   useState(0);


  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)

    if (e.target.name==="producto" && e.target.value!=='') {
      let id  = e.target.value
      setMax(parseInt(cantidades[id]))
      setString2(string[id])
      setActive(true)
    }else if (e.target.name==="producto" && e.target.value==='') {
      setActive(false)
    }

    if (e.target.name==="forma_pago" && e.target.value!=='') {
      setFormas_pagos2(e.target.value)
    }else if (e.target.name==="forma_pago" && e.target.value==='') {
      setFormas_pagos2(false)
    }

    if (e.target.name==="financiacion" && e.target.value!=='') {
      let financiacion_ = {...financiacion}
          financiacion_.total=e.target.value
          setFinanciacion(financiacion_)
      //console.log(financiacion);
    }



    // if (e.target.name==="cantidad" && e.target.value!=='' && formas_pagos2) {
    //
    // } else if (e.target.name==="cantidad" && e.target.value!=='' && !formas_pagos2) {
    //   context.setModalShow({  show:true,
    //                           size:"sm",
    //                           message:  <div className="text-center">
    //                                       <div>Para continuar, deber seleccionar una forma de pago</div>
    //                                       <div className="btn btn-primary mt-3" onClick={()=> { context.setModalShow({  show:false,message:"",size:"sm", }); } }>Continuar</div>
    //                                     </div>
    //                         })
    // }

  }

  useEffect(() => {
    if (props.row.op_facturas_id===undefined) {
      getInit()
    }else {
      setFinanciacion(props.row)
    }
  },[])

  function getInit(){
      let data  = {}
          data.app        =   JSON.stringify(modulo)
      Functions.PostAsync("GestionInventario","GetListInventory",data,{},{name:"callbackGetInit",funct:callbackGetInit})
  }

  function callbackGetInit(data){
    if (data.response!==undefined && data.response.data!==undefined) {
      setData(data.response.data);
    }
    if (data.response!==undefined && data.response.cantidades!==undefined) {
      setCantidades(data.response.cantidades);
    }
    if (data.response!==undefined && data.response.string!==undefined) {
      setString(data.response.string);
    }
    if (data.response!==undefined && data.response.formas_pagos!==undefined) {
      setFormas_pagos(data.response.formas_pagos);
    }
  }

  const onClickAdd=()=>{
    let string2_={...string2}
    let inputs_ ={...inputs}
    let item  = {
                    op_inventario_items_id:string2_.op_inventario_items_id,
                    cantidad:inputs_.cantidad,
                    label:string2.label,
                    codigo:string2.codigo,
                    precio_credito:inputs_.precio,
                    precio_decontado:inputs_.precio,
                  }
    let articulos_  = [...articulos]
        articulos_.push(item)
    setArticulos(articulos_)
    setSubtotal((formas_pagos2==='CR')? subtotal+parseFloat(string2_.precio_credito)*parseInt(inputs_.cantidad):subtotal+parseFloat(string2_.precio_decontado)*parseInt(inputs_.cantidad))
    document.getElementById("myForm").reset();
  }


  const handleGenerate=()=>{
    let data            =   {}
        data.app            =   JSON.stringify(modulo)
        data.articulos      =   JSON.stringify(articulos)
        data.subtotal       =   JSON.stringify(subtotal)
        data.iva            =   iva_monto
        data.formas_pagos   =   formas_pagos2
        data.cliente_token  =   props.id
        Functions.PostAsync("GestionInventario","GenerateInvoice",data,{},{name:"callbackHandleGenerate",funct:callbackHandleGenerate})
  }

  const callbackHandleGenerate=(data)=>{
    if (data.response.message!==undefined && data.response.message.label!==undefined) {
      context.setModalShow({  show:true,
                              size:"sm",
                              message:  <div className="text-center">
                                          <div>{data.response.message.label}</div>
                                          <div className="btn btn-primary mt-3" onClick={()=> { context.setModalShow({  show:false,message:"",size:"sm", }); } }>Continuar</div>
                                        </div>
                            })
    }
    if (data.response.id!==undefined && formas_pagos2==='CR') {
      setFinanciacion(data.response.factura)
    }
  }

  useEffect(() => {
    if (cuotas!=='') {
      let total         =   financiacion.total
      let total_x_cuota =   (total-inicial) / cuotas;
      let itemsCuotas_  =   []
      for (var i = 0; i < cuotas; i++) {
        itemsCuotas_.push(total_x_cuota)
      }
      setItemsCuotas(itemsCuotas_)
    }
  },[cuotas])

  const onChangeFechas=(e)=>{
    let fechas_ = {...fechasItemsCuotas}
        fechas_[e.target.name] = e.target.value
        setFechasItemsCuotas(fechas_)
  }

  const generarFinanciamiento=()=>{
    let data            =   {}
        data.app                =   JSON.stringify(modulo)
        data.fechasItemsCuotas  =   JSON.stringify(fechasItemsCuotas)
        data.itemsCuotas        =   JSON.stringify(itemsCuotas)
        data.inicial            =   inicial;
        data.financiacion       =   JSON.stringify(financiacion)
        Functions.PostAsync("GestionInventario","GenerateFinanciacion",data,{},{name:"callbackGenerarFinanciamiento",funct:callbackGenerarFinanciamiento})
  }

  const callbackGenerarFinanciamiento=(data)=>{
    if (data.response.message!==undefined && data.response.message.label!==undefined) {
      context.setModalShow({  show:true,
                              size:"sm",
                              message:  <div className="text-center">
                                          <div>{data.response.message.label}</div>
                                          <div className="btn btn-primary mt-3" onClick={()=> { context.setModalShow({  show:false,message:"",size:"sm", }); props.setOpen(false) } }>Cerrar</div>
                                        </div>
                            })
       setTimeout(function(){ context.setModalShow({  show:false,message:"",size:"sm", }); props.setOpen(false) }, 3000);
    }

  }

  const pagoCuota=(row)=>{
    if (montopagoCuota===0) {
      context.setModalShow({  show:true,
                              size:"sm",
                              message:  <div className="text-center">
                                          <div>No ha definido un monto para agregar</div>
                                          <div className="btn btn-primary mt-3" onClick={()=> { context.setModalShow({  show:false,message:"",size:"sm", }); } }>Reintentar</div>
                                        </div>
                            })
      return false
    }
    let monto_pagos_realizados  = parseFloat(row.monto_pagos_realizados)
    let monto_a_financiar       = parseFloat(row.monto)

    // if (montopagoCuota>monto_a_financiar-monto_pagos_realizados) {
    //   context.setModalShow({  show:true,
    //                           size:"sm",
    //                           message:  <div className="text-center">
    //                                       <div>El abono supera el monto restante de la cuota</div>
    //                                       <div className="btn btn-primary mt-3" onClick={()=> { context.setModalShow({  show:false,message:"",size:"sm", }); } }>Reintentar</div>
    //                                     </div>
    //                         })
    //   return false
    // }
    let data            =   {}
        data.app        =   JSON.stringify(modulo)
        data.cuota      =   JSON.stringify(row)
        data.monto      =   montopagoCuota
        Functions.PostAsync("GestionInventario","PagoCuota",data,{},{name:"callbackpagoCuota",funct:callbackpagoCuota})
  }

  const callbackpagoCuota=(data)=>{
    if (data.response.message!==undefined && data.response.message.label!==undefined) {
      context.setModalShow({  show:true,
                              size:"sm",
                              message:  <div className="text-center">
                                          <div>{data.response.message.label}</div>
                                          <div className="btn btn-primary mt-3" onClick={()=> { context.setModalShow({  show:false,message:"",size:"sm", }); props.setOpen(false) } }>Cerrar</div>
                                        </div>
                            })
       setTimeout(function(){ context.setModalShow({  show:false,message:"",size:"sm", }); props.setOpen(false) }, 3000);
    }
  }

  let activeInput=true

  return  <>
            {!financiacion?<>
              <div className="row">
                <div className="col-12">
                  <Select
                    required={true}
                    value={0}
                    data={formas_pagos}
                    name="forma_pago"
                    selectDefault="Forma de pago"
                    onChange ={onChange}
                  />
                </div>
                <form id="myForm" className="row p-3">
                  {formas_pagos2?<>
                    <div className="col-12 col-sm-4">
                      <Select
                        required={true}
                        value={0}
                        data={data}
                        name="producto"
                        selectDefault="Artículo o producto"
                        onChange ={onChange}
                      />
                    </div>
                  </>:false}
                  {active?<>
                    <div className="col-12 col-sm-2">
                      <input  className="form-control text-center"
                              type="text"
                              event="solonumeros"
                              name="cantidad"
                              maxlength="4"
                              min="1"
                              max={max}
                              placeholder="Cantidad"
                              onChange={onChange}
                      />
                    </div>
                    <div className="col-12 col-sm-2">
                      <input  className="form-control text-center"
                              type="text"
                              event="solonumeros"
                              name="precio"
                              min="1000"
                              placeholder="Precio"
                              onChange={onChange}
                      />
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="btn btn-danger btn-lg btn-block" onClick={onClickAdd}>
                        <FontAwesomeIcon icon={faPlus} /> Agregar a la lista
                      </div>
                    </div>
                  </>:false}
                </form>
              </div>
            {articulos.length>0?  <>
                                    <div className="card">
                                      <div className="card-body">
                                        <div className="row">
                                          <div className="col-12 col-sm-10 h4 mb-3 border-bottom pb-2">
                                            Datos de facturación
                                          </div>
                                          <div className="col mb-3 border-bottom pb-2">
                                            <div className="btn btn-primary btn-block" onClick={handleGenerate}>
                                              Generar factura
                                            </div>
                                          </div>
                                        </div>
                                        {articulos.map((row,key)=>{
                                          let precio_mostrar        =   (formas_pagos2==='CR')? row.precio_credito:row.precio_decontado
                                          let precio_mostrar_total  =   (formas_pagos2==='CR')? parseFloat(row.precio_credito)*parseInt(row.cantidad):parseFloat(row.precio_decontado)*parseInt(row.cantidad)
                                          return <div className="row mb-4 border-bottom" key={key}>
                                                  <div className="col-12 col-sm-6">
                                                    <div><b>Producto / COD</b></div>
                                                    <div>{row.label} ({row.codigo})</div>
                                                  </div>
                                                  <div className="col-12 col-sm-2">
                                                    <div className="text-sm-center"><b>Cantidad</b></div>
                                                    <div className="text-sm-center">{row.cantidad}</div>
                                                  </div>
                                                  <div className="col-12 col-sm-2">
                                                    <div className="text-sm-center"><b>Precio detal</b></div>
                                                    <div className="text-sm-center">{Functions.format(precio_mostrar)}</div>
                                                  </div>
                                                  <div className="col-12 col-sm-2">
                                                    <div className="text-sm-center"><b>Precio total</b></div>
                                                    <div className="text-sm-center">{Functions.format(precio_mostrar_total)}</div>
                                                  </div>
                                                </div>
                                        })}
                                        <div className="row justify-content-end">
                                          <div className="col-12 col-sm-4">
                                            <div className="row bg-dark text-white p-2">
                                              <div className="col text-center">Total:</div>
                                              <div className="col text-right mr-3">
                                                {Functions.format(subtotal)}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>:false}
            </>:<div className="row">
                  {financiacion && financiacion.op_facturas_id!==undefined && financiacion.financiacion===undefined?<>
                    <div className="col-12 col-sm-3">
                      <div><b>Monto factura:</b></div>
                      <div className="text-left">
                        <input  className="form-control text-center"
                                type="text"
                                event="solonumeros"
                                name="financiacion"
                                placeholder="Monto"
                                defaultValue={financiacion.total}
                                onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-2">
                      <div><b>Inicial</b></div>
                      <div><input  className="form-control text-center"
                              type="text"
                              event="solonumeros"
                              name="inicial"
                              placeholder="Inicial"
                              onChange={(e)=>setInicial(e.target.value)}
                      /></div>
                    </div>
                    <div className="col-12 col-sm-2">
                      <div><b>Cuotas</b></div>
                      <div>
                        <input  className="form-control text-center"
                                type="text"
                                event="solonumeros"
                                name="cuotas"
                                placeholder="Cuotas"
                                onChange={(e)=>setCuotas(e.target.value)}
                        />
                      </div>
                    </div>
                    {itemsCuotas.length>0?<>
                      <div className="col-12 mt-3">
                        <div className="row">
                          <div className="col">
                            <b>Fecha cuotas</b>
                          </div>
                          <div className="col">
                            <b>Montos cuotas</b>
                          </div>
                        </div>
                        {itemsCuotas.map((row2,key2)=>{
                          return  <div className="row mb-2" key={key2}>
                                    <div className="col">
                                      <input type="date" name={"fecha["+key2+"]"} className="form-control" onChange={onChangeFechas}/>
                                    </div>
                                    <div className="col">
                                      {Functions.format(row2)}
                                    </div>
                                  </div>
                        })}

                      </div>
                      <div className="col-12">
                        <div className="btn btn-primary" onClick={generarFinanciamiento}>Generar financiación</div>
                      </div>
                    </>:false}
                  </>:<>
                        <div className="col-12 mb-3">
                          <div className="card">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-12 h4 mb-3 border-bottom pb-2">
                                  Detalles compra facturada
                                </div>
                              </div>
                              {financiacion.itemsFactura.map((row,key)=>{
                                return <div className="row mb-4 border-bottom" key={key}>
                                        <div className="col-12 col-sm-6">
                                          <div><b>Producto</b></div>
                                          <div>{row.label}</div>
                                        </div>
                                        <div className="col-12 col-sm-2">
                                          <div className="text-sm-center"><b>Cantidad</b></div>
                                          <div className="text-sm-center">{row.cantidad}</div>
                                        </div>
                                        <div className="col-12 col-sm-2">
                                          <div className="text-sm-center"><b>Precio detal</b></div>
                                          <div className="text-sm-center">{Functions.format(row.precio_detal)}</div>
                                        </div>
                                        <div className="col-12 col-sm-2">
                                          <div className="text-sm-center"><b>Precio total</b></div>
                                          <div className="text-sm-center">{Functions.format(row.precio_total)}</div>
                                        </div>
                                      </div>
                              })}

                            </div>
                          </div>
                        </div>
                        {financiacion.financiacion.cuotas!==undefined?<>
                          <div className="col-12 col-sm-3">
                            <div><b>Monto financiación:</b></div>
                            <div className="text-left">{Functions.format(parseFloat(financiacion.financiacion.monto_total))}</div>
                          </div>
                          <div className="col-12 col-sm-2">
                            <div><b>Inicial</b></div>
                            <div>{Functions.format(parseFloat(financiacion.financiacion.monto_inicial))}</div>
                          </div>
                          <div className="col-12 col-sm-2 text-center">
                            <div><b>Cuotas</b></div>
                            <div className="text-center">{financiacion.financiacion.cuotas!==undefined?financiacion.financiacion.cuotas.length:0}</div>
                          </div>
                          <hr/>
                          <div className="col-12 mt-3">
                            <div className="row">
                              <div className="col-12 col-sm-2">
                                <b>Fecha cuotas</b>
                              </div>
                              <div className="col-12 col-sm-2">
                                <b>Montos cuotas</b>
                              </div>
                              <div className="col-12 col-sm-2">
                                <b>Montos Pagado</b>
                              </div>
                              <div className="col-12 col-sm-2">
                                <b>Montos Pendiente</b>
                              </div>
                              <div className="col">
                                <b>Pagar</b>
                              </div>
                            </div>
                            {financiacion.financiacion.cuotas!==undefined?<>
                              {financiacion.financiacion.cuotas.map((row2,key2)=>{
                                return  <div className="row mb-2" key={key2}>
                                          <div className="col-12 col-sm-2">
                                            {row2.fecha}
                                          </div>
                                          <div className="col-12 col-sm-2">
                                            {Functions.format(row2.monto)}
                                          </div>
                                          <div className="col-12 col-sm-2 text-right">
                                            <div className="d-none">{Functions.format(row2.monto_pagos_realizados)}</div>
                                            {row2.pagos_realizados.map((row3,key3)=>{
                                              return <div>{Functions.format(row3.monto)} <a target="_blank" href={Config.ConfigApirest+"PDF/imprimir_recibo_cuota?id="+row3.token}><FontAwesomeIcon icon={faFilePdf} /></a> </div>
                                            })}
                                          </div>
                                          <div className="col-12 col-sm-2 text-center">
                                            {row2.deuda_salda==='NO'?<>

                                              {(row2.monto - row2.monto_pagos_realizados<0)?"0.00":Functions.format(row2.monto - row2.monto_pagos_realizados) }

                                            </>:"0,00"}

                                          </div>
                                          <div className="col ">
                                            {row2.deuda_salda==='NO'?<>

                                              {row2.monto-row2.monto_pagos_realizados>0 && activeInput? <>
                                                                                                          <input type="number" placeholder={"monto a cancelar " +Functions.format(row2.monto)+" ó pagos parciales"} name="monto_pago" className="form-control" onChange={(e)=>setMontopagoCuota(e.target.value)}/>
                                                                                                        </>:false}

                                            </>:false}

                                          </div>
                                          <div className="col">
                                            {row2.deuda_salda==='NO'?<>

                                              {row2.monto-row2.monto_pagos_realizados>0 && activeInput? <>
                                                                                                          <div className="btn btn-primary" onClick={()=>pagoCuota(row2)}>Agregar Pago</div>
                                                                                                          {activeInput=false}
                                                                                                        </>:false}

                                            </>:false}
                                          </div>
                                        </div>
                              })}

                            </>:false}
                          </div>
                        </>:false}
                  </> }
            </div>}

          </>
}
export default App
