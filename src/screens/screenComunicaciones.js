import React,{useState,useEffect} from 'react';
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
import PropTypes from 'prop-types'
import ImgDefault from '../assets/images/design/avatar.png'
const parse   =   require('html-react-parser');

let color = false

const App = (props)=>{

  const context           =   React.useContext(StateContext);
  const modulo            =   Functions.segments_modulos(props.app);
  const [data, setData]   =   useState({});


  const getInit=()=>{
    if (props.privilegios.view_messages_client===undefined) {
      return false;
    }
        modulo[2]         =   props.privilegios.view_messages_client.submodulo
    let data              =   {}
        data.user         =   context.Store.get("user").token
        data.cliente_id   =   props.id
        data.app          =   JSON.stringify(modulo)
        Functions.PostAsync("Clientes",modulo[2],data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setData(data.response.data)
  }

  useEffect(() => {
    getInit()
  },[props.screenClientes])

  useEffect(() => {
    getInit()
    props.setReloadComunicacion(false)
  },[props.reloadComunicacion])

  return   <div className="row mt-4 border-top bg-pgrw-bg-gray-dark pb-5">
              <div className="container mt-4">
                {Object.entries(data).map((row,key)=>{
                  return  <div className="row" key={key}>
                            <div className="col">
                              <div className="o_MessageList_separator o_MessageList_separatorDate o_MessageList_item">
                                <hr className="o_MessageList_separatorLine"/>
                                  <span className="o_MessageList_separatorLabel o_MessageList_separatorLabelDate">{row[0]}</span>
                                <hr className="o_MessageList_separatorLine"/>
                              </div>
                              { Array.isArray(row[1])?<>
                                {row[1].map((row2,key2)=>{
                                  color=color?false:true
                                  return  <div key={key2} className="row messages">
                                            <div className={!color?"col-12 col-sm-1 pgrw-bg-gray pl-4 pr-4 pt-3 pb-1 align-middle":"col-12 col-sm-1 pl-4 pr-4 pt-3 pb-1 align-middle"}>
                                              <img className="img-fluid rounded-circle" src={ImgDefault} alt="PGRW"/>
                                            </div>
                                            <div className={!color?"col-12 col-sm pgrw-bg-gray p-2":"col-12 col-sm p-2"} id={"message_"+row2.token}>
                                              {props.privilegios.view_messages_client_ver_perfil_usuario!==undefined?<>
                                                <div className="titulo cursor-pointer" onClick={()=>props.setPerfil({usuario_login:row2.login_responsable_chat,close:true,hash:"#message_"+row2.token})}>
                                                  <span className="text-uppercase text-bold">{row2.nombre_chat} {row2.apellido_chat}</span> <b>@{row2.login_responsable_chat}</b>
                                                </div>
                                              </>:<>
                                                <div className="titulo">{row2.nombre_chat} {row2.apellido_chat}</div>
                                              </>}

                                              <div className="subtitulo">{row2.accion}</div>
                                              <div className="content border-top mt-2 p-2">
                                                <div className="text-messages parrafo">
                                                  {
                                                    //console.log(parse.default)
                                                    parse.default(row2.descripcion)
                                                    //parse(row2.descripcion)
                                                  }
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                })}
                                </>:<></>}
                            </div>
                          </div>
                })}
              </div>
          </div>
}

App.propTypes = {
  id: PropTypes.string,
  app: PropTypes.string,
  screenClientes: PropTypes.object,
  privilegios:PropTypes.object,
}

export default App
