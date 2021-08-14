import React,{useState} from 'react';
import {Redirect, BrowserRouter, Route, Switch  } from "react-router-dom";
import './App.css';
import Store from './helpers/Store'
import Functions from './helpers/Functions'
import Config from './helpers/Config'
import Auth from './app/auth';
import Application from './app/Application';
import Alert from './screens/alert';
import Modal from './screens/modal';
import NetworkError from './screens/networkError'
import Web from './app/web';
//import Test from './app/test';
import Format404 from './screens/format404';
import initFontAwesome from "./helpers/initFontAwesome";
initFontAwesome();



const App=(props)=>{

  const [user, setUser]                 =   useState(false);
  const [alert, setAlert]               =   useState({show:false,message:""});
  const [modalShow, setModalShow]       =   useState({show:false,message:""});
  const [networkError, setNetworkError] =   useState(false);


  if (Store.get("user").token!==undefined && !user) {
    setUser(Store.get("user"))
  }else if ((
                Store.get("user").token===undefined ) &&
                (document.location.href  !== Config.ConfigAppUrl+'auth/login' && Functions.segment()!=='web') &&
                Functions.segment()==="Cerrar"
            ){
    document.location.href  = Config.ConfigAppUrl+'auth/login'
  }

  if (Functions.segment()==='Cerrar') {
    Store.clear()
  }

  const Cerrar=()=>{
    return <></>
  }
  return <>
            {!networkError?<>
              <BrowserRouter>
                <Switch>
                  <Route exact path={"/web*"} render={()=><Web networkError={networkError} setNetworkError={setNetworkError} alert={alert} setAlert={setAlert} user={user} setUser={setUser} modalShow={modalShow} setModalShow={setModalShow}/>}/>
                  <Route exact path={"/"} render={()=><>
                    <Modal modalShow={modalShow} setModalShow={setModalShow}/>
                    <Alert alert={alert} setAlert={setAlert} />
                    {user?<Application networkError={networkError} setNetworkError={setNetworkError} alert={alert} setAlert={setAlert} user={user} setUser={setUser} modalShow={modalShow} setModalShow={setModalShow}/>:<Auth user={user} setUser={setUser} alert={alert} setAlert={setAlert} setModalShow={setModalShow}/>}
                    </>
                  }/>
                  <Route exact path={"/apanel*"} render={()=><>
                    <Modal modalShow={modalShow} setModalShow={setModalShow}/>
                    <Alert alert={alert} setAlert={setAlert} />
                    {user?<Application networkError={networkError} setNetworkError={setNetworkError} alert={alert} setAlert={setAlert} user={user} setUser={setUser} modalShow={modalShow} setModalShow={setModalShow}/>:<Auth user={user} setUser={setUser} alert={alert} setAlert={setAlert} setModalShow={setModalShow}/>}
                    </>
                  }/>
                  <Route exact path={"/auth*"} render={()=><>
                      <Modal modalShow={modalShow} setModalShow={setModalShow}/>
                      <Auth user={user} setUser={setUser} alert={alert} setAlert={setAlert} setModalShow={setModalShow}/>
                  </>
                  }/>
                  <Route path="/apanel/Cerrar" component={<Cerrar/>} />
                  <Route path="/404" component={Format404} />
                  <Redirect to="/404" />
                </Switch>
              </BrowserRouter></>:<NetworkError networkError={networkError}/>
            }
          </>
}
export default App;
