import React from 'react';
import axios from 'axios';
import Config from '../helpers/Config'
import Estrellas from "./estrellas";
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
import Store from '../helpers/Store';
import { faEdit,faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let enviando  = false;

function App(props) {

  var   elementoArrastrado;
  const context               =   React.useContext(StateContext);
  const modulo                =   (props.modulo!==undefined)?props.modulo:Functions.segments_modulos(props.app)

  document.addEventListener("drag", function( event ) {
  //console.log("drag")
  }, false);

  document.addEventListener("dragstart", function( event ) {
    // guarda información acerca del objeto arrastrado
    event.dataTransfer.setData('text/plain',null)
      // guarda una referéncia del elemento arrastrado
      elementoArrastrado = event.target;
      // cambia la opacidad del elemento a medio transparente
      event.target.style.opacity = .5;
  }, false);


  document.addEventListener("dragend", function( event ) {
      // reestablece el valor de la opacidad
      event.target.style.opacity = 1;
  }, false);


  document.addEventListener("dragover", function( event ) {
      // previene el comportamiento por defecto del elemento arrastrado
     event.preventDefault();
  }, false);

  document.addEventListener("dragenter", function( event ) {
      // comprueba si el event.target es una zona de soltar
      if ( event.target.className === "zona-de-soltar" ) {
        //console.log(3000);
        // y di lo és cambia el color de fondo
          event.target.style.background = "purple";
      }

  }, false);

  document.addEventListener("dragleave", function( event ) {
      // comprueba si el event.target es una zona de soltar
      if ( event.target.className === "zona-de-soltar"  ) {
        //console.log(4000);
        // y si lo és, reestablece el valor inicial
          event.target.style.background = "";
      }
  }, false);

  document.addEventListener("drop", function( event ) {
      // Si el elemento arrastrado es un link, este se abre en una nueve página.
      // Para que esto no pase hay que utilizar:
      event.preventDefault();
      // comprueba si el event.target es una zona de soltar
      if ( event.target.className === "zona-de-soltar"  ) {

          let data  = {
            categoria_id:event.target.getAttribute("id"),
            cliente_id:elementoArrastrado.getAttribute("id"),
          }

          sendData(data)
          //console.log(hora,hora_pautada_unix,cita_id,numero_dia,fecha_inicial);

          // reestablece el valor inicial para el background
          event.target.style.background = "";
          // elimina el elemento arrastrado del del elemento padre
          elementoArrastrado.parentNode.removeChild( elementoArrastrado );
          // y lo agrega al elemento de destino
          event.target.appendChild( elementoArrastrado );
      }

  }, false);

  function sendData(data){
    if (!enviando) {
      enviando          =   true;
      data.user         =   Store.get("user").token
      data.app          =   JSON.stringify(modulo)
      data.skip         =   "96933.1"
      Functions.PostAsync("Clientes","SetCategoria",data,context,{name:"callbackSubmit",funct:callbackSubmit})
    }
  }

  const callbackSubmit=(data)=>{
    if (data.response.error===false) {
      enviando          =   false;
      props.getInit()
    }
  }

  return (
    <div className={props.privilegios.cambiar!==undefined || props.privilegios===true?"zona-de-soltares":''}>
        <>
          {
            props.data[props.row.token]!==undefined && !props.row.loading?<>
            {
              props.data[props.row.token].map((row,key)=>{
                return <div className={props.privilegios.cambiar!==undefined || props.privilegios===true?"arrastrable":''} draggable={props.privilegios.cambiar!==undefined || props.privilegios===true ?"true":''} key={key} id={row.token}>
                        <div className={props.privilegios.cambiar!==undefined || props.privilegios===true?"item-cita mt-0 p-1 cursor-move":"item-cita mt-0 p-1"} >
                          <div className="card">
                            <div className="card-content p-1">
                              <div className="card-body p-1 pb-1">
                                <div className="row">
                                  <div className="col-12">
                                    <div className="title">
                                      {row.nombres} {row.apellidos} ({row.cliente_id})
                                    </div>
                                    <div className="subtitle">
                                      Oportunidad <b>{row.oportunidad}</b>
                                    </div>
                                    <div className="subtitle d-none">
                                      Registro <b>{row.fecha_registro}</b>
                                    </div>
                                    <div className="subtitle">
                                      Calificación <Estrellas block={true} calificacion={row.calificacion}/>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="card-footer text-right pt-1 pb-1">
                                <div className="subtitle">
                                  <div className="row">
                                    <div className="col">
                                      Asignado a <b>{row.nombre_responsable} {row.apellido_responsable}</b>
                                    </div>
                                    {
                                      props.privilegios.editar!==undefined || props.privilegios===true?<>
                                          <div className="col-2 text-center">
                                            <div className="cursor-pointer" onClick={()=>{props.setOpen(props.row.token); props.setOpenData(row)}}>
                                              <FontAwesomeIcon icon={faEdit}/>
                                            </div>
                                          </div>
                                        </>:<></>
                                    }
                                    {
                                      props.privilegios.cliente_search!==undefined || props.privilegios===true?<>
                                        <div className="col-2 text-center">
                                            <div className="cursor-pointer" onClick={()=>{props.setScreenClientes(row)}}>
                                              <FontAwesomeIcon icon={faSearch}/>
                                            </div>
                                        </div>
                                      </>:<></>
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
              })
            }
            </>:<></>
          }
        </>
      {props.privilegios.cambiar!==undefined || props.privilegios===true?<div  className="zona-de-soltar" id={props.row.token}>
        Mueve aquí
      </div>:<></>}

    </div>

  );
}

export default App;
