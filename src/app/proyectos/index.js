import React from 'react';
import { Redirect,BrowserRouter, Route, Switch  } from "react-router-dom";
import ListaProyectos from "./listaProyectos";
import ListaTareas from "./listaTareas";
import ListaComentarios from "../comentarios/listaComentarios";
import Format404 from '../../screens/format404';

const App=(props)=>{
  return  <BrowserRouter>
             <Switch>
                <Route exact path={"/apanel/gestion_proyectos/comments"} render={()=><ListaComentarios/>}/>
                <Route exact path={"/apanel/gestion_proyectos/chores"} render={()=><ListaTareas/>}/>
                <Route exact path={"/apanel/gestion_proyectos"} render={()=><ListaProyectos/>}/>
                <Route path="/404" component={Format404} />
                <Redirect to="/404" />
             </Switch>
         </BrowserRouter>
}

export default App;
