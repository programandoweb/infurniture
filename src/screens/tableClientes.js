import React,{useState,useEffect} from 'react';
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
import Draggable from './draggable';
import ClienteFormulario from './ClienteFormulario';
import ScreenClientes from './screenClientes';
import Comunicaciones from './screenComunicaciones';
import Perfiles from "../app/usuarios/perfiles";
import BarraMensajes from "../app/mensajes/barraMensajes";

let filter    = "";

const App=(props)=>{
  const context                         =   React.useContext(StateContext);
  const [categorias, setCategorias]     =   useState([]);
  const [data, setData]                 =   useState({});
  const [open, setOpen]                 =   useState(false);
  const [openData, setOpenData]         =   useState({});
  const [loading, setLoading]           =   useState(false);
  const [screenClientes, setScreenClientes] = useState(false);
  const [privilegios, setPrivilegios]   =   useState([]);
  const modulo                          =   Functions.segments_modulos(props.app);
  const [perfil, setPerfil]             =   useState(false);
  const [reloadComunicacion, setReloadComunicacion] =   useState(false);


  const getInit=()=>{
    setLoading(true)
    let data              =   {}
        data.user         =   context.Store.get("user").token
        data.app          =   JSON.stringify(modulo)
        data.filter       =   filter
        Functions.PostAsync(modulo[2],modulo[0],data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setPrivilegios(data.response.privilegios)
    setCategorias(data.response.categorias)
    setData(data.response.clientes)
    setLoading(false)
  }


  useEffect(() => {
    getInit()
  },[])

  const reloadTheDoors=(token)=>{
    setOpen(false);
    setTimeout(function(){ setOpen(token); },200);
  }


  return    <>
              {!loading && !screenClientes?<div className="row position-vertical">
                      {categorias.map((row,key)=>{

                        return  <div className="col-12 col-sm-3" key={key}>
                                  <ClienteFormulario
                                                      privilegios={privilegios}
                                                      {...props}
                                                      row={row}
                                                      getInit={getInit}
                                                      open={open}
                                                      setOpen={setOpen}
                                                      openData={openData}/>

                                  <Draggable privilegios={privilegios}
                                                      modulo={modulo}
                                                      row={row}
                                                      data={data}
                                                      getInit={getInit}
                                                      loading={loading}
                                                      setOpen={reloadTheDoors}
                                                      setOpenData={setOpenData}
                                                      setScreenClientes={setScreenClientes}/>
                                </div>
                      })}
                    </div>:<></>}
              {
                screenClientes?<>
                                <div className={perfil?"d-none":""}>
                                  <ScreenClientes
                                    setScreenClientes={setScreenClientes}
                                    screenClientes={screenClientes}
                                    privilegios={privilegios}
                                    modulo={modulo}/>
                                  <BarraMensajes
                                    modulo={modulo}
                                    privilegios={privilegios}
                                    cliente={screenClientes}
                                    reloadComunicacion={reloadComunicacion}
                                    setReloadComunicacion={setReloadComunicacion}/>
                                  <Comunicaciones
                                    perfil={perfil}
                                    setPerfil={setPerfil}
                                    privilegios={privilegios}
                                    id={screenClientes.token}
                                    app={props.app}
                                    screenClientes={screenClientes}
                                    reloadComunicacion={reloadComunicacion}
                                    setReloadComunicacion={setReloadComunicacion}/>
                                </div>
                              </>:<></>
              }
              {
                perfil?<Perfiles modulo={modulo}  perfil={perfil} setPerfil={setPerfil}/>:<></>
              }
            </>

}

export default App
