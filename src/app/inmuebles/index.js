import React,{useState,useEffect} from 'react';
import { Redirect,BrowserRouter, Route, Switch  } from "react-router-dom";
import Format404 from '../../screens/format404';
import Store from '../../helpers/Store'
import Functions from '../../helpers/Functions'
import Config from '../../helpers/Config'
import queryString from 'query-string';

import Home from './AgregarClientes'
import AgregarClientes from './AgregarClientes'
import CotizacionesClientes from './CotizacionesClientes'
import EditarClientes from './EditarClientes'
import EnvioPortafolioClientes from './EnvioPortafolioClientes'
import GenerarPDFDelCliente from './GenerarPDFDelCliente'
import GestionVisitaComercialClientes from './GestionVisitaComercialClientes'
import ListarClientes from './ListarClientes'
import OrdenDeServiciosClientes from './OrdenDeServiciosClientes'
import VentasClientes from './VentasClientes'
import VerDatosDelCliente from './VerDatosDelCliente'
import VerHistoricoDeContactosConClientes from './VerHistoricoDeContactosConClientes'
import VerHistoricoDeContratosConClientes from './VerHistoricoDeContratosConClientes'
import VerPropiedadesDeClientes from './VerPropiedadesDeClientes'


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
                    <Route exact path={"/apanel/gestion_Clientes"} component={Home} />
                    <Route exact path={"/apanel/gestion_Clientes/AgregarClientes"} component={AgregarClientes} />
                    <Route exact path={"/apanel/gestion_Clientes/CotizacionesClientes"} component={CotizacionesClientes} />
                    <Route exact path={"/apanel/gestion_Clientes/EditarClientes"} component={EditarClientes} />
                    <Route exact path={"/apanel/gestion_Clientes/EnvioPortafolioClientes"} component={EnvioPortafolioClientes} />
                    <Route exact path={"/apanel/gestion_Clientes/GenerarPDFDelCliente"} component={GenerarPDFDelCliente} />
                    <Route exact path={"/apanel/gestion_Clientes/GestionVisitaComercialClientes"} component={GestionVisitaComercialClientes} />
                    <Route exact path={"/apanel/gestion_Clientes/ListarClientes"} component={ListarClientes} />
                    <Route exact path={"/apanel/gestion_Clientes/OrdenDeServiciosClientes"} component={OrdenDeServiciosClientes} />
                    <Route exact path={"/apanel/gestion_Clientes/VentasClientes"} component={VentasClientes} />
                    <Route exact path={"/apanel/gestion_Clientes/VerDatosDelCliente"} component={VerDatosDelCliente} />
                    <Route exact path={"/apanel/gestion_Clientes/VerHistoricoDeContactosConClientes"} component={VerHistoricoDeContactosConClientes} />
                    <Route exact path={"/apanel/gestion_Clientes/VerHistoricoDeContratosConClientes"} component={VerHistoricoDeContratosConClientes} />
                    <Route exact path={"/apanel/gestion_Clientes/VerPropiedadesDeClientes"} component={VerPropiedadesDeClientes} />
                 </Switch>
                </BrowserRouter>
              </div>
            </div>
          </div>
}

export default App;
