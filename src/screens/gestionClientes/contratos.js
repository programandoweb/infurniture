import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Config from '../../helpers/Config';
import Factura from './Factura';
import { faSearch,faCashRegister,faTrashAlt,faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=(props)=>{
  const context         =   React.useContext(StateContext);
  const modulo          =   Functions.segments_modulos(queryStringParams.app);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [open, setOpen] = useState(false);



  useEffect(() => {
    if (!open) {
      getInit()
    }
  },[open])

  const getInit=()=>{
    let data        =   {}
        data.app    =   JSON.stringify(modulo)
        data.token  =   props.data.token
    Functions.PostAsync("GestionInventario","GetFacturas",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    if (data.response.data!==undefined) {
      setCotizaciones(data.response.data)
    }
  }

  const deleteFactura=(row)=>{
    let data        =   {...row}
        data.app    =   JSON.stringify(modulo)
        data.token  =   props.data.token
    Functions.PostAsync("GestionInventario","DelFacturas",data,context,{name:"reiniciar",funct:reiniciar})

  }

  const reiniciar=()=>{
    getInit()
  }

  const handlePagoAdelantado=(row)=>{
    context.setModalShow({
      show:true,
      message:<div className="text-center">
                <div>¿Desea saldar esta cuenta?</div>
                <div className="row justify-content-center mt-2">
                  <div className="col" onClick={()=>{subtmitPagoAdelantado(row);context.setModalShow({show:false});}}>
                    <div className="btn btn-danger btn-block mt-3">Si</div>
                  </div>
                  <div className="col" onClick={()=>{context.setModalShow({show:false});}}>
                    <div className="btn btn-primary btn-block mt-3">No</div>
                  </div>
                </div>
              </div>,
      size:""
    })
  }

  const subtmitPagoAdelantado=(row)=>{
    let data        =   {...row}
        data.app    =   JSON.stringify(modulo)
        data.token  =   props.data.token
    Functions.PostAsync("GestionInventario","PagoAdelantado",data,context,{name:"reiniciar",funct:reiniciar})
  }

  return  <div className="pt-3">
            <div className="border bg-gray">
              <div className="p-3 ">
                <>
                  {open?<>
                    <div className="row justify-content-end mb-3">
                      <div className="col-12 col-sm-2">
                        <div className="btn btn-warning btn-block" onClick={()=>setOpen(open?false:true)}>Cerrar</div>
                      </div>
                    </div>
                    <Factura id={props.data.token} row={open} setOpen={setOpen}/>
                    </>:<>
                    <div className="row justify-content-end mb-3">
                      <div className="col-12 col-sm-2">
                        <div className="btn btn-primary btn-block" onClick={()=>setOpen(open?false:true)}>Agregar</div>
                      </div>
                    </div>
                    <table className="table mb-3">
                      <thead>
                        <th>Factura</th>
                        <th width="150" className="text-right">Pagos</th>
                        <th width="150" className="text-right">Saldo pendiente</th>
                        <th width="200" className="text-right">Saldo exonerado</th>
                        <th width="150" className="text-right">Monto total</th>
                        <th width="100" className="text-right">Acción</th>
                      </thead>
                      <tbody>
                        {cotizaciones.length>0?<>
                            {cotizaciones.map((row,key)=>{
                              return  <tr>
                                        <td>{row.op_facturas_id}</td>
                                        <td className="text-right">{row.financiacion.total_pagos_realizados!==undefined?Functions.format( parseFloat(row.financiacion.total_pagos_realizados) )  :"-"}</td>
                                        <td className="text-right">{row.financiacion.total_pagos_realizados!==undefined?Functions.format( parseFloat(row.subtotal) - parseFloat(row.financiacion.total_pagos_realizados) )  :"-"}</td>
                                        <td className="text-right">
                                          {row.financiacion.pagos_exonerados_string!==undefined?row.financiacion.pagos_exonerados_string:"-"}
                                        </td>
                                        <td className="text-right">{Functions.format(row.subtotal)}</td>
                                        <td className="text-center">
                                          {parseFloat(row.subtotal) - parseFloat(row.financiacion.total_pagos_realizados)>0?<FontAwesomeIcon icon={faHandHoldingUsd} className="cursor-pointer mr-2" onClick={()=>handlePagoAdelantado(row)}/>:false}
                                          <FontAwesomeIcon icon={faSearch} className="cursor-pointer mr-2" onClick={()=>setOpen(row)}/>
                                          <FontAwesomeIcon icon={faTrashAlt} className="cursor-pointer" onClick={()=>deleteFactura(row)}/>
                                        </td>
                                      </tr>
                            })}
                          </>:<tr>
                          <td colspan="6" className="text-center">No hay registros</td>
                        </tr>}
                      </tbody>
                    </table>
                  </>}
                </>
              </div>
            </div>
          </div>
}

export default App
