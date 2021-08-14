import React,{useState,useEffect} from 'react';
import { faComments,faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Estrellas from "../../screens/estrellas";
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';


const App=(props)=>{
  const modulo                          =   props.modulo
  const context                         =   React.useContext(StateContext);
  const [data, setData]                 =   useState([]);

  const location  = document.location
  const referrer   = document.referrer

  function getInit(){
    let data                =   {}
        data.user           =   context.Store.get("user").token
        data.usuario_login  =   props.perfil.usuario_login
        data.app            =   JSON.stringify(modulo)
        Functions.PostAsync("Usuarios","get",data,context,{name:"callbackInit",funct:callbackInit})
  }

  function callbackInit(data){
    setData(data.response.data)
  }

  useEffect(() => {
    getInit()
  },[props.perfil])



  return  <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header bg-white pt-2 pb-1">
                    <div className="row">
                      <div className="col">
                        {props.perfil===undefined&&location.hash!=='' && referrer!==''?<>
                            <a href={referrer+location.hash}>
                            <FontAwesomeIcon className="cursor-pointer" size="1x" icon={faWindowClose}/>
                            </a>
                          </>:<></>}
                        {props.perfil!==undefined && props.perfil.close!==undefined && props.perfil.close===true?<>
                            <a href={props.perfil.hash}>
                            <FontAwesomeIcon onClick={()=>props.setPerfil(false)} className="cursor-pointer" size="1x" icon={faWindowClose}/>
                            </a>
                          </>:<></>}
                      </div>
                      <div className="col-2  border-left">
                        <div className="row">
                          <div className="col text-center">
                            <FontAwesomeIcon className="cursor-pointer" size="2x" icon={faComments}/>
                          </div>
                          <div className="col">
                            <div className="title-1x">0</div>
                            <div className="title-1x">Interacciones</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h3>
                      {data.nombres} {data.apellidos}
                    </h3>
                    <div className="datos-clientes p-4">
                      <div className="row pb-2">
                        <div className="col-12 col-sm-2 title">
                          Teléfono del trabajo
                        </div>
                        <div className="col-12 col-sm pgrw-text-primary">
                          {data.telefono}
                        </div>
                        <div className="col-12 col-sm-2 title">
                          Puntuación
                        </div>
                        <div className="col-12 col-sm pgrw-text-primary">
                          <Estrellas calificacion={3} block={true}/>
                        </div>
                      </div>
                      <div className="row pb-2">
                        <div className="col-12 col-sm-2 title">
                          Correo electrónico
                        </div>
                        <div className="col-12 col-sm pgrw-text-primary">
                          {data.email}
                        </div>
                        <div className="col-12 col-sm-2 title">
                          Perfil
                        </div>
                        <div className="col-12 col-sm pgrw-text-primary">
                          {data.tipo_usuario}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}

export default App
