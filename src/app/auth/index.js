import React from 'react';
import { Redirect,BrowserRouter, Route, Switch  } from "react-router-dom";
import Login from "./login";
import Recover from "./recover";
import RecoverPass from "./recoverPass";
import Register from "./register";
import Config from "../../helpers/Config";
import Store from '../../helpers/Store'
import Constants from '../../helpers/Constants'
import StateContext from '../../helpers/ContextState';


const App=(props)=>{

  const setState=(data)=>{
    //console.log(data);
  }

  return  <div className="mt-5">
            <StateContext.Provider value={{
                                          Constants:Constants,
                                          Store:Store,
                                          Config:Config,
                                          setState:setState,
                                          setUser:props.setUser,
                                          setAlert:props.setAlert,
                                          setModalShow:props.setModalShow
                                        }}>
              <BrowserRouter>
                <Switch>
                  <Route exact path={"/auth/login"} render={()=><Login/>}/>
                  <Route exact path={"/auth/recover"} render={()=><Recover/>}/>
                  <Route exact path={"/auth/recoverPass*"} render={()=><RecoverPass/>}/>
                  <Route exact path={"/auth/register*"} render={()=><Register/>}/>
                  <Redirect to="./auth/login" />
                </Switch>
              </BrowserRouter>
            </StateContext.Provider>
          </div>

}

export default App;
