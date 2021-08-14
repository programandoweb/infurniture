import { faCalendar,faWindowClose,faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Estrellas from "./estrellas";

const App=(props)=>{
  return  <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header bg-white pt-2 pb-1">
                    <div className="row">
                      <div className="col">
                        {props.setScreenClientes!==undefined?<a href="#" onClick={()=>props.setScreenClientes(false)}><FontAwesomeIcon  className="cursor-pointer" icon={faWindowClose}/></a>:<></>}
                      </div>
                      <div className="col-4  border-left">
                      <div className="row">
                        <div className="col cursor-pointer">
                          <FontAwesomeIcon className="mr-1" size="1x" icon={faComment}/>
                          Escribir mensaje
                        </div>
                        <div className="col cursor-pointer">
                          <FontAwesomeIcon className="mr-1" size="1x" icon={faCalendar}/>
                          Crear Evento
                        </div>
                      </div>
                      </div>
                      <div className="col-2  border-left">
                        <div className="row">
                          <div className="col text-center">
                            <FontAwesomeIcon size="1x" icon={faCalendar}/>
                          </div>
                          <div className="col">
                            <div className="title-1x">0</div>
                            <div className="title-1x">Reuniones</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h3>{props.screenClientes.nombres}</h3>
                    <h5>${props.screenClientes.ingreso_estimado}</h5>
                    <h6>{props.screenClientes.oportunidad}</h6>
                    <div className="datos-clientes p-4">
                      <div className="row pb-2">
                        <div className="col-12 col-sm-2 title">
                          Cliente
                        </div>
                        <div className="col-12 col-sm pgrw-text-primary">
                          {props.screenClientes.nombres}
                        </div>
                        <div className="col-12 col-sm-2 title">
                          Puntuación
                        </div>
                        <div className="col-12 col-sm pgrw-text-primary">
                          <Estrellas calificacion={props.screenClientes.calificacion} block={true}/>
                        </div>
                      </div>
                      <div className="row pb-2">
                        <div className="col-12 col-sm-2 title">
                          Correo electrónico
                        </div>
                        <div className="col-12 col-sm pgrw-text-primary">
                          {props.screenClientes.email}
                        </div>
                        <div className="col-12 col-sm-2 title">
                          Comercial
                        </div>
                        <div className="col-12 col-sm pgrw-text-primary">
                          {props.screenClientes.nombre_responsable} {props.screenClientes.apellido_responsable}
                        </div>
                      </div>
                      <div className="row pb-2">
                        <div className="col-12 col-sm-2 title">
                          Teléfono
                        </div>
                        <div className="col-12 col-sm pgrw-text-primary">
                          {props.screenClientes.telefono}
                        </div>
                        <div className="col-12 col-sm-2 title">
                          Oportunidad
                        </div>
                        <div className="col-12 col-sm pgrw-text-primary">
                          {props.screenClientes.oportunidad}
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
