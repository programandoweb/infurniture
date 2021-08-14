import React,{useState,useEffect} from 'react';
import { Redirect,BrowserRouter, Route, Switch  } from "react-router-dom";
import Format404 from '../../screens/format404';
import Store from '../../helpers/Store'
import Functions from '../../helpers/Functions'
import Config from '../../helpers/Config'
import queryString from 'query-string';
import Cotizaciones from './Listar'
import ListarCotizacionesClientes from './ListarCotizacionesClientes'



const queryStringParams = queryString.parse(window.location.search);

const App=(props)=>{
  const [data, setData]       = useState([]);
  const privilegios =   Store.get("privilegios");
  const modulo      =   Functions.segments_modulos(queryStringParams.app);
  const seccion     =   modulo[1];

  useEffect(() => {
    if (Object.entries(Store.get("privilegios")).length<=0) {
      document.location.href=Config.ConfigAppUrl
    }
    if (privilegios[seccion]===undefined) {
      document.location.href=Config.ConfigAppUrl
    }
    setData(privilegios[seccion])
  },[])

  return  <div className="container">
            <div className="row">
              <div className="col">
                <BrowserRouter>
                 <Switch>
                    <Route exact path={"/apanel/cotizaciones"} component={Cotizaciones} />
                    <Route exact path={"/apanel/cotizaciones/listarCotizacionesClientes"} component={ListarCotizacionesClientes} />
                 </Switch>
                </BrowserRouter>
              </div>
            </div>
          </div>
}

export default App;
