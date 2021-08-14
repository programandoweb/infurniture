import React from 'react';
import { Redirect,BrowserRouter, Route, Switch  } from "react-router-dom";
import Format404 from '../../screens/format404';
import Main from "./main";
import Tienda from "../tienda/frontTienda";
import Seccion from "./seccion";
import Config from "../../helpers/Config";
import Store from '../../helpers/Store'
import Constants from '../../helpers/Constants'
import StateContext from '../../helpers/ContextState';




const App=(props)=>{
  return  <StateContext.Provider value={{
                                          Constants:Constants,
                                          Store:Store,
                                          Config:Config,
                                          User:props.user,
                                          modalShow:props.modalShow,
                                          setModalShow:props.setModalShow,
                                          networkError:props.networkError,
                                          setNetworkError:props.setNetworkError,
                                        }}>
            <BrowserRouter>
               <Switch>
                  <Route exact path={"/"} render={()=><Main/>}/>
                  <Route exact path={"/web"} render={()=><Main/>}/>
                  <Route exact path={"/web/tienda*"} render={()=><Tienda/>}/>
                  <Route exact path={"/web*"} render={()=><Seccion/>}/>
                  <Route path="/404" component={Format404} />
                  <Redirect to="/404" />
               </Switch>
           </BrowserRouter>
        </StateContext.Provider>
}

export default App;
