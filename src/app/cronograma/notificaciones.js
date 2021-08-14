import React,{useEffect,useState} from 'react';
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import StateContext from '../../helpers/ContextState';
import MacroCronograma from '../../screens/modalMacroCronograma';
import { faSms } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Maestro from '../../screens/maestrosUsuariosNotificaciones';

const App=(props)=>{
  const context = React.useContext(StateContext);
  const [data, setData] = useState({
                                      galeria:[],
                                    });

  useEffect(() => {
    //console.log(props.sendNotificationNow);
  },[]);

  return  <div className="container mt-3">
            <div className="row">
              <div className={props.className?props.className:"col-12 mb-3"}>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col">
                        Sistema de notificaciones
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Maestro
                      title="Lista de usuarios"
                      modulo="Maestros"
                      metodo="tablas_usuarios"
                      tabla="usuarios"
                      limit="10"
                      sendNotificationNow={props.sendNotificationNow}
                      ico={<FontAwesomeIcon className="cursor-pointer" icon={faSms}/>}
                      classHeader="bg-success text-white"
                      className="col-12 col-sm-12"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App;
