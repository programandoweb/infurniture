import React from 'react';
import { Redirect,BrowserRouter, Route, Switch  } from "react-router-dom";
import ListaUsuarios from "./listaUsuarios";
import Format404 from '../../screens/format404';
import Perfiles from "./perfiles";
import AddPerfiles from "./addPerfiles";



const App=(props)=>{
  return  <BrowserRouter>
             <Switch>
                <Route exact path={"/apanel/usuarios"} render={()=><ListaUsuarios/>}/>
                <Route exact path={"/apanel/usuarios/lista*"} render={()=><ListaUsuarios/>}/>
                <Route exact path={"/apanel/usuarios/agregar"} render={()=><AddPerfiles/>}/>
                <Route exact path={"/apanel/usuarios/*"} render={()=><Perfiles/>}/>
                <Route path="/404" component={Format404} />
                <Redirect to="/404" />
             </Switch>
         </BrowserRouter>
}

export default App;
