import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Config from '../../helpers/Config';
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=(props)=>{
  const context         =   React.useContext(StateContext);
  const modulo          =   Functions.segments_modulos(queryStringParams.app);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    let data        =   {}
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
        data.token  =   props.data.token
    Functions.PostAsync("GetionClientes","getContratos",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setCotizaciones(data.response.cotizaciones)
    setOrdenes(data.response.ordenes)
  }

  return  <div className="pt-3">
            <div className="border bg-gray">
              <div className="p-3 text-white">
                <table className="table mb-3">
                  <thead>
                    <th width="50">#</th>
                    <th>Cotización</th>
                    <th width="150" className="text-right">Monto total</th>
                    <th width="50" className="text-right"></th>
                  </thead>
                  <tbody>
                    {cotizaciones.length>0?<>
                        {cotizaciones.map((row,key)=>{
                          return  <tr>
                                    <td>{row.consecutivo}</td>
                                    <td>{row.label}</td>
                                    <td className="text-right">{row.total_str}</td>
                                    <td className="text-center">
                                      <a target="_blank" href={context.Config.ConfigApirest+"PDF/cotizacion?id="+row.token}>
                                        <FontAwesomeIcon icon={faFilePdf}/>
                                      </a>
                                    </td>
                                  </tr>
                        })}
                      </>:<tr>
                      <td colspan="4">No hay registros</td>
                    </tr>}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="border bg-gray mt-3">
              <div className="p-3 text-white">
                <table className="table">
                  <thead>
                    <th width="50">#</th>
                    <th>Ordenes de servicio</th>
                    <th width="150" className="text-right">Monto total</th>
                    <th width="50" className="text-right"></th>
                  </thead>
                  <tbody>
                    {ordenes.length>0?<>
                        {ordenes.map((row,key)=>{
                          return  <tr>
                                    <td>{row.consecutivo}</td>
                                    <td>{row.label}</td>
                                    <td className="text-right">{row.total_str}</td>
                                    <td className="text-center">
                                      <a target="_blank" href={context.Config.ConfigApirest+"PDF/cotizacion?os=true&id="+row.token}>
                                        <FontAwesomeIcon icon={faFilePdf}/>
                                      </a>
                                    </td>
                                  </tr>
                        })}
                      </>:<tr>
                      <td colspan="4">No hay registros</td>
                    </tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
}

export default App
