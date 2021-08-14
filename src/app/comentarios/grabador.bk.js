import React,{useState,useEffect} from 'react';
import { faMicrophone,faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Functions from '../../helpers/Functions';
import StateContext from '../../helpers/ContextState';

const App=(props)=>{
  const context               =   React.useContext(StateContext);
  const [action, setAction]   =   useState(false);
  const [start, setStart]     =   useState(false);

  const ComprobarSoporteAudio=()=>{
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  const AccesoAlDispositivodeGrabacion=()=>{
    require('get-user-media-promise');
  }

  const BtnOpen=()=>{
    if (!action) {
      return <div onClick={handleAction} className="btn btn-success uploadFile position-relative">
        <FontAwesomeIcon id="btn_microfono_iniciar" icon={action?faStop:faMicrophone} className={"text-white"}/>
      </div>
    }else {
      return false
    }
  }

  const BtnClose=()=>{
    if (action) {
      return <div className="btn btn-danger uploadFile position-relative" id="btn_microfono_detener">
        <FontAwesomeIcon icon={action?faStop:faMicrophone} className={"text-white"}/>
      </div>
    }else {
      return false
    }
  }

  const BlobToBase64=(audioBlob)=>{
    var reader = new FileReader();
    var base64data;
    reader.readAsDataURL(audioBlob);
    reader.onloadend  =   function() {
      base64data          =   reader.result;
      let data            =   {}
          data.app        =   JSON.stringify(props.modulo)
          data.user       =   props.user
          data.id         =   props.id
          data.audio      =   JSON.stringify({ src:base64data,
                                name:"notadevoz",
                                lastModified:"2020202020",
                                size:1000,
                                type:"ogg",
                              })
          Functions.PostAsync("Comentarios","setAudio",data,context,{name:"callbackSetAudio",funct:callbackSetAudio})
    }
  }

  const callbackSetAudio=(data)=>{
    props.getInit()
  }


  const grabar=()=>{
    console.log("intento grabación");

    let action_  =  action?false:true;
    setAction(action_);

    if (!action_) {
      console.log("me detuvieron");
      return false;
    }

    if(!start){
      setStart(true);
      navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream)
      {
        console.log("Iniciando Grabación",stream);
        window.streamReference = stream;
        const chunks = [];
        console.log(chunks);
        var mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.addEventListener("dataavailable", event => {
              chunks.push(event.data);
            });
            mediaRecorder.start();

        const btn_microfono_detener = document.getElementById('btn_microfono_detener');
              btn_microfono_detener.addEventListener("click",()=>{
                detener_grabacion()
              });

        const detener_grabacion=()=>{
          mediaRecorder.addEventListener("stop", () => {
            var   audioBlob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
            BlobToBase64(audioBlob)
          });
          if(mediaRecorder.state==='recording'){
            mediaRecorder.stop();
          }
          window.streamReference.getAudioTracks().forEach(function(track) {
            track.stop();
          });
          setAction(false);
        }

      }).catch(function(err) {

      });
    }
  }

  const handleAction=()=>{
    console.log("presioné botón");
    if (ComprobarSoporteAudio()) {
      grabar();
    } else {
      alert('Su navegador no soporta envío de notas');
    }
  }

  return <><BtnOpen/><BtnClose/></>
}

export default App;
