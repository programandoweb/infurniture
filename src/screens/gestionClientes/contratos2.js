import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Config from '../../helpers/Config';
import Factura from './Factura2';
import { faSearch,faCashRegister } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=(props)=>{
  const context         =   React.useContext(StateContext);
  const modulo          =   Functions.segments_modulos(queryStringParams.app);
  const [cotizaciones, setCotizaciones] = useState(false);
  const [open, setOpen] = useState(false);



  useEffect(() => {
    if (!open) {
      getInit()
    }
  },[open])

  const getInit=()=>{
    let data              =   {}
        data.app          =   JSON.stringify(modulo)
        data.factura_id   =   props.data.factura_id
    Functions.PostAsync("GestionInventario","GetFacturaIndividual",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    if (data.response.data!==undefined) {
      setCotizaciones(data.response.data)
    }
  }

  return  <div className="pt-3">
            <div className="border bg-gray">
              <div className="p-3 ">
                {cotizaciones?<Factura id={props.data.token} row={cotizaciones} setOpen={props.setOpenCliente}/>:false}
              </div>
            </div>
          </div>
}

export default App
