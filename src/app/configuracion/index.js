import React from 'react';
import { Redirect,BrowserRouter, Route, Switch  } from "react-router-dom";
import ListaTipoDeUsuarios from "./listaTipoDeUsuarios";
import ListaDeTablasMaestras from "./listaDeTablasMaestras";
import ConfiguracionSistema from "./configuracionSistema";
import Format404 from '../../screens/format404';

const App=(props)=>{
  return  <BrowserRouter>
             <Switch>
                <Route exact path={"/apanel/configuracion"} render={()=><ConfiguracionSistema/>}/>
                <Route exact path={"/apanel/configuracion/sistema"} render={()=><ConfiguracionSistema/>}/>
                <Route exact path={"/apanel/configuracion/tipos_de_usuarios"} render={()=><ListaTipoDeUsuarios/>}/>
                <Route exact path={"/apanel/configuracion/tablas_maestras"} render={()=><ListaDeTablasMaestras/>}/>
                <Route path="/404" component={Format404} />
                <Redirect to="/404" />
             </Switch>
         </BrowserRouter>
}

export default App;
