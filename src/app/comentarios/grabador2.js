import React, { Component } from 'react';

class Grabador extends Component {
  constructor(props){
    super(props);
    this.state =  {
      start: false,
      ico_microfono:this.btn_microfono_grabar()
    }
  }

  btn_microfono_grabar(){
    return <i id="btn-microfono" onClick={this.handleAction} className="fa fa-microphone fa-2x">a</i>
  }

  btn_microfono_detener(){
    return <i id="btn_microfono_detener" onClick={this.handleAction} className="fa fa-microphone-slash fa-2x">b</i>
  }

  ComprobarSoporteAudio() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  AccesoAlDispositivodeGrabacion(){
    require('get-user-media-promise');
    if(!this.state.start){
      this.setState({
        start:true,
        ico_microfono:this.btn_microfono_detener()
      })

      let props_padre = this

      navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream)
      {
        window.streamReference = stream;
        const chunks = [];
        var mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.addEventListener("dataavailable", event => {
              chunks.push(event.data);
            });
            mediaRecorder.start();
            console.log('chunks1:', chunks);

        /*DETENER TODO*/
        let btn_microfono_detener = document.getElementById('btn_microfono_detener');
        btn_microfono_detener.addEventListener("click",()=>{
          detener_grabacion();
        });

        function detener_grabacion(){
          mediaRecorder.addEventListener("stop", () => {
            var   audioBlob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
            //console.log('chunks:', chunks);
            //console.log('audioBlob:', audioBlob);
            props_padre.props.enviar_audio(audioBlob,props_padre);
          });
          if(mediaRecorder.state==='recording'){
            mediaRecorder.stop();
          }
          window.streamReference.getAudioTracks().forEach(function(track) {
            track.stop();
          });
        }
      }).catch(function(err) {

      });

    }else{
      this.setState({
        start:false,
        ico_microfono:this.btn_microfono_grabar()
      })
    }
  }

  handleAction=()=>{
    if (this.ComprobarSoporteAudio()) {
      this.AccesoAlDispositivodeGrabacion();
    } else {
      alert('Su navegador no soporta envío de notas');
    }
  }

  render() {
    return  <div id="action" className="ico-content btn btn-primary btn-sm m-0 ml-1">
              {this.state.ico_microfono}
            </div>


  }
}
export default Grabador;
