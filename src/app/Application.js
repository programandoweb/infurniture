import { BrowserRouter, Route, Switch  } from "react-router-dom";
import Config from "../helpers/Config";
import Functions from "../helpers/Functions";
import Store from '../helpers/Store'
import Constants from '../helpers/Constants'
import StateContext from '../helpers/ContextState';
import Dashboard from '../app/dashboard';
import Menu from '../screens/menu';
import MenuUsuariosComunes from '../screens/menuUsuariosComunes';
import Usuarios from '../app/usuarios';
import Configuracion from '../app/configuracion';
import Clientes from '../app/clientes';
import Cotizaciones from '../app/cotizaciones';
import Ordenes from '../app/ordenes';
import Proyectos from '../app/proyectos';
import Breadcrumb from '../screens/breadcrumb';
import Format404 from '../screens/format404';
import Footer from '../screens/footer';
import Evento from '../app/eventos/evento';
import WebsiteBuilder from '../app/websites';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import Inmuebles from '../app/inmuebles';
import GestionInventario from '../app/inventario';
import GestionCartera from '../app/cartera';
import Informes from '../app/informes';
const queryStringParams = queryString.parse(window.location.search);



const App=(props)=>{

  const modulo  =   Functions.segments_modulos(queryStringParams.app);

  const SeleccionMenu=()=>{
    if (props.user && props.user.tipo_usuario_id==="1") {
      return <Menu/>
    }else {
      return <MenuUsuariosComunes/>
    }
  }

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
           {<SeleccionMenu/>}
           {queryStringParams.app!==undefined && queryStringParams.app!==''?<Helmet>
            <title>{Config.Title} | {modulo[3]}</title>
           </Helmet>:false}

           <BrowserRouter>
            <Breadcrumb/>
            <Switch>
              <Route exact path={"/"} render={()=><Dashboard/>}/>
              <Route exact path={"/apanel"} render={()=><Dashboard/>}/>
              <Route exact path={"/apanel/informes*"} render={()=><Informes/>}/>
              <Route exact path={"/apanel/cotizaciones*"} render={()=><Cotizaciones/>}/>
              <Route exact path={"/apanel/ordenes*"} render={()=><Ordenes/>}/>
              <Route exact path={"/apanel/gestion_Clientes*"} render={()=><Inmuebles/>}/>
              <Route exact path={"/apanel/gestionInventario*"} render={()=><GestionInventario/>}/>
              <Route exact path={"/apanel/GestionCartera*"} render={()=><GestionCartera/>}/>
              <Route exact path={"/apanel/usuarios*"} render={()=><Usuarios/>}/>
              <Route exact path={"/apanel/Evento*"} render={()=><Evento/>}/>
              <Route exact path={"/apanel/gestion_proyectos*"} render={()=><Proyectos/>}/>
              <Route exact path={"/apanel/configuracion*"} render={()=><Configuracion/>}/>
              <Route exact path={"/apanel/clientes*"} render={()=><Clientes/>}/>
              <Route exact path={"/apanel/websites*"} render={()=><WebsiteBuilder/>}/>
              <Route exact path={"/404"} render={()=><Format404/>}/>
            </Switch>
          </BrowserRouter>
          {<Footer/>}
        </StateContext.Provider>
}

export default App;
