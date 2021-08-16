import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Config from '../../helpers/Config';
import Factura from './Factura';
import { faSearch,faCashRegister } from "@fortawesome/free-solid-svg-icons";
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
                        <th width="150" className="text-right">Saldo Pendiente</th>
                        <th width="150" className="text-right">Monto total</th>
                        <th width="50" className="text-right">Acción</th>
                      </thead>
                      <tbody>
                        {cotizaciones.length>0?<>
                            {cotizaciones.map((row,key)=>{
                              return  <tr>
                                        <td>{row.op_facturas_id}</td>
                                        <td className="text-right">{row.financiacion.total_pagos_realizados!==undefined?Functions.format(parseFloat(row.financiacion.total_pagos_realizados) + parseFloat(row.financiacion.monto_inicial)):"-"}</td>
                                        <td className="text-right">{row.financiacion.total_pagos_realizados!==undefined?Functions.format( parseFloat(row.total) -  (parseFloat(row.financiacion.total_pagos_realizados) + parseFloat(row.financiacion.monto_inicial) ) )  :"-"}</td>
                                        <td className="text-right">{Functions.format(row.total)}</td>
                                        <td className="text-center">
                                          <FontAwesomeIcon icon={faSearch} className="cursor-pointer" onClick={()=>setOpen(row)}/>
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
