import React from 'react';
import { Redirect,BrowserRouter, Route, Switch  } from "react-router-dom";
import Format404 from '../../screens/format404';
import ListaUsuarios from "./listaClientes";


const App=(props)=>{
  return  <BrowserRouter>
             <Switch>
                <Route exact path={"/apanel/clientes"} render={()=><ListaUsuarios/>}/>
                <Route exact path={"/apanel/clientes/lista"} render={()=><ListaUsuarios/>}/>
                <Route path="/404" component={Format404} />
                <Redirect to="/404" />
             </Switch>
         </BrowserRouter>
}

export default App;
