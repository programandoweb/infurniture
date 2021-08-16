import Config from "./Config";
import Store from "./Store";
import axios from 'axios';
import  queryString from 'query-string';
// import socketIOClient from "socket.io-client";
// const Socket      =   socketIOClient(Config.ConfigSocketUrl);

/*SE DEBE PASAR EL EVENT*/
const InputTypeFilter=(event)=>{
  return event.target.value;
}

function makeblob(dataURL) {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}


function isObject(val) {
    if (val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
}

function Modal(data,context){
  let modal = {
            back:(data.back!==undefined)?data.back:undefined,
            dataForm:(data.dataForm!==undefined)?data.dataForm:undefined,
            status:true,
            title:data.response.title,
            message:data.response.message,
            btnText:data.response.btnText,
            ico:{
                  contentColor:"modal-ico-bg-green",
                  ico:'fas fa-check pl-1',
                },
          }
  context.setState({dialog:modal})
}

// function Loading(context){
//   let modal = {
//             status:true,
//             title:"Loading",
//             message:"Send",
//             btnText:"hide",
//             ico:{
//                   contentColor:"modal-ico-bg-green",
//                   ico:'fas fa-check pl-1',
//                 },
//           }
//   context.setState({dialog:modal})
// }

function segment(num){
  let pathname,segment;
  if (num==="all") {
    pathname      =   window.location.pathname;
    segment       =   pathname.split('/');
    return segment;
  }
  if (num===undefined) {
    num=1
  }
  pathname      =   window.location.pathname;
  segment       =   pathname.split('/');
  let last          =   (segment.length - num);
  return segment[last];
}

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

const CutString=(text,wordsToCut)=>{
    // if (wordsToCut===undefined) {
    //   wordsToCut = 20;
    // }
    // var wordsArray = text.split(" ");
    // if(wordsArray.length>wordsToCut){
    //     var strShort = "";
    //     for(i = 0; i < wordsToCut; i++){
    //         strShort += wordsArray[i] + " ";
    //     }
    //     return strShort+"...";
    // }else{
    //     return text;
    // }
};

const FechaHoy = ()  =>{
  /*FECHA DE HOY*/
  let date    =   new Date( );
  let day     =   date.getDate();
      if (day < 10) {
        day = "0"+day;
      }
  let month  =  date.getUTCMonth();
      if (month < 10) {
        month  =  month+1;
        month  =  "0"+month;
      }else {
        month  =  month+1;
      }

  let year   =  date.getUTCFullYear();
  let newDate = year+"-"+month+"-"+day;
  return newDate;
}

const Convertir_base64 = (result)  =>{
  // return new Promise(resolve => {
  //   let base64;
  //   base64 =  FileSystem.readAsStringAsync(  result.uri,{encoding: FileSystem.EncodingType.Base64,});
  //   resolve(base64)
  // });
}

const ObjectToInputs = (data)  =>{
  let _return = {}
  Object.entries(data).map((v,k)=>{
    return _return[v[0]] = v[1]
  })
  return _return;
}

const Get = (modulo,m,objeto,state,loading) =>{
  let headers   =   new Headers();
  let data      =   new FormData();

  console.log("CALLING");

  Object.entries(objeto).map((v,k) => {
    return data.append (v[0],v[1]);
  })

  data.append ("PUBLIC_KEY", Config.PUBLIC_KEY);

  let cabecera  =   {
                      headers:headers,
                      method: "POST",
                      body: data
                    }
  let url   =       Config.ConfigApirest + "get?modulo="+modulo+"&m="+m+"&formato=json";
  fetch(url,cabecera)
      .then(response  =>  response.json()        )
      .then(data      =>  { state(data.response.data);  loading(false) })
      .catch((error)  =>  { console.log(error);  loading(false)  });
}

const PostAsync =  async (modulo,m,objeto,context,callback,loading) =>  {
  if (loading!==undefined) {
    context.setState({loading:"open"})
  }
  let headers   =   new Headers();
  let data      =   new FormData();
      data.append ("user", Store.get("user").token);
  Object.entries(objeto).map((v,k) => {
    return data.append (v[0],v[1]);
  })

  if (objeto.app === undefined) {
    //data.append ("app",queryString.parse(window.location.search).app);
  }

  data.append ("method", "post");
  data.append ("PUBLIC_KEY", process.env.REACT_APP_PUBLIC_KEY);
  data.append ("REACT_APP_PRIVATE_KEY", process.env.REACT_APP_PRIVATE_KEY);

  if (Store.get("security")===null) {
    data.append ("PRIVATE_KEY", Config.PRIVATE_KEY);
  }else {
    data.append ("tokens_access",Store.get("security"));
  }

  if (callback!==undefined) {
      data.append ("callback",callback.name);
  }

  let cabecera  =   {
                      headers:headers,
                      method: "POST",
                      body: data
                    }

  try {
    const response    =   await fetch(Config.ConfigApirest + capitalizarPrimeraLetra(modulo)+"/"+m,cabecera);
    const json        =   await response.json();
    if (json.response!==undefined && json.response.callback!==undefined) {
      callback.funct(json)
    }
    if(context!==undefined && context!=='' && context!==true && context.setState!==undefined){
      context.setState({loading:false})
    }
    return json;
  }catch (error) {
    console.log(error);
    if (context.setNetworkError!==undefined && error=='TypeError: NetworkError when attempting to fetch resource.') {
      context.setNetworkError(error)
    }
    return error;
  }
}

const PostAsyncAxios =  async (modulo,m,objeto,context,callback,loading) =>  {
  const formData  = new FormData();
  const config    = {
                      headers: {
                        "content-type": "multipart/form-data"
                      },
                    };
  formData.append ("lang", Store.get("lang"));
  formData.append ("method", "post");
  formData.append ("PUBLIC_KEY", process.env.REACT_APP_PUBLIC_KEY);
  formData.append ("REACT_APP_PRIVATE_KEY", process.env.REACT_APP_PRIVATE_KEY);
  formData.append("image",objeto.image);
  console.log(formData);

  axios.post(Config.ConfigApirest+"CMS/UploadRetoJugadorBase64", formData, config).then(function(response) {
    console.log(formData,objeto);
    //_this.GetInit()
    // _this.setState({
    // 	btnDisplay:false,
    // 	btnDisplayUpload:false,
    // 	btnDisplayText:false,
    // 	progressBar:10,
    // 	UploadVideo:false,
    // })
  }).catch(function(error) {
    console.log(error);
  });

  //console.log(formData,objeto);
}

const PostAsyncJson =  async (modulo,m,objeto,context,callback) =>  {
  let headers   =   new Headers();
  let data      =   new FormData();
  let lang      =   (Store.get("lang")===undefined || Store.get("lang")==='')?Store.get("lang"):"es";

  Object.entries(objeto).map((v,k) => {
    return data.append (v[0],v[1]);
  })


  data.append ("lang",lang);
  data.append ("method", "post");
  data.append ("PUBLIC_KEY", process.env.REACT_APP_PUBLIC_KEY);
  data.append ("REACT_APP_PRIVATE_KEY", process.env.REACT_APP_PRIVATE_KEY);

  if (Store.get("security")===null) {
    data.append ("PRIVATE_KEY", Config.PRIVATE_KEY);
  }else {
    data.append ("tokens_access",Store.get("security"));
  }

  if (callback!==undefined) {
      data.append ("callback",callback.name);
  }

  let cabecera  =   {
                      headers:headers,
                      method: "POST",
                      body: data,
                      credentials: "same-origin"
                    }

  try {
    const response    =   await fetch(Config.ConfigApirest + modulo+"/"+m,cabecera);
    const json        =   await response.json();
    if (json.response!==undefined && json.response.callback!==undefined) {
      callback.funct(json)
    }
    return json;
  }catch (error) {
    console.log(error);
    return error;
  }
}

const setSession =  (data)=>{
  Store.set("user",data)
  document.location.href  = Config.ConfigAppUrl+'admin'
}

const setTokenStore=(data)=>{
  Store.set("security",data.data);
}

const segments = (last_bool)  =>{
  let pathname      =   window.location.pathname;
  let segment       =   pathname.split('/');
  let last          =   (segment.length) - 1 ;
  let _return       =   ''
  if (last_bool!==undefined && last_bool!==false) {
      segment.map((v,k)=>{
        if (last===k) {
          return _return = v
        }else {
          return false
        }
      })
      return  _return
  }else{
    return segment
  }
}

const set_segments_modulos  =   (modulo,new_data)  =>{
  let return__= new_data.metodo+"::"+new_data.modulo+"::"+new_data.parent+"::"+new_data.label+"::"+new_data.url+"::"+new_data.public
  //console.log(modulo,new_data,return__);
  return return__
}

const segments_modulos = (path,separator)  =>{
  //modulo::submodulo::label::url::public
  if (separator===undefined) {
    separator='::'
  }
  if (path===undefined) {
    path='prueba::programandoweb'
  }
  let segment       =   path.split(separator);
  segment.push("metodo::modulo::submodulo::label::url::public");
  return segment
}

const capitalizarPrimeraLetra=(str)=>{
  if (str===undefined) {
    str=""
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const resizeTextBox=(e)=>{
  e.target.style.height = 'auto';
  e.target.style.height = e.target.scrollHeight + 'px';
}

const childNodesByType=(e,type)=>{
  let contador  = 0
  for(var i = 0; i < e.childNodes.length; i++){
    if (e.childNodes[i].localName!==undefined && e.childNodes[i].localName===type) {
      contador++;
    }
  }
  return {
            contador:contador,
            type:type
          };
}

function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
}

const openBlank=(e,url)=>{
  e.preventDefault()
  window.open(url)
}

const format_=(x)=>{
  return new Intl.NumberFormat("es-CO").format(x)
  return x.toLocaleString('es-CO');
}

function format (number) {
  var formatted = new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 2
  }).format(number);
  return formatted;
}

function formato(e){
    e = e || window.event;
    e = e.target || e.srcElement;
    var input = this.shadowRoot.getElementById(e.id) ;

    //aquí elimino todo lo que no sea números o comas (,)
    var num = input.value.replace(/\,/g,'');
    if(!isNaN(num)){
    //convierto a string
    num = num.toString();
    //separo los caracteres del string
    num = num.split('');
    //invierto el orden del string
    num = num.reverse();
    //junto todos los caracteres de la cadena
    num = num.join('');
    //busco los dos primeros caracteres y le coloco una coma en la siguiente posición
    num = num.replace(/(?=\d*\.?)(\d{2})/,'$1,');
    //invierto del contenido de la cadena y reemplazo todo lo que no sea números o comas
    num = num.split('').reverse().join('').replace(/^[\,]/,'');
    //asigno la cadena formateada al input
    input.value = num;
    }
}
const numberWithSpace = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1.$2");
    return x;
}

const Inputs=(e,inputs, setInputs)=>{
  let value;
  if(e.target.nodeName !=='SELECT'){
    value = e.target.value.toUpperCase();
    if(e.target.attributes.excepcion !== undefined){
      if(e.target.attributes.excepcion.nodeValue === 'Mayusculas'){
        value = e.target.value;
      }
    }
    if(e.target.attributes.event !== undefined){
      if(e.target.attributes.event.nodeValue === 'solonumeros'){
        value = value.replace(/[^0-9]/g,'');
      }
      if(e.target.attributes.event.nodeValue === 'sololetras'){
        value = value.replace(/[^a-zA-Z ]/g,'');
      }
    }
  }else{
    value = e.target.value;
  }

  let inputs_ = {...inputs}
      inputs_[e.target.name]  = value
      setInputs(inputs_)
  e.target.value = value;
}

const exportar = {numberWithSpace,
                  formato,
                  format,
                  openBlank,
                  resizeTextBox,
                  CutString,
                  FechaHoy,
                  Convertir_base64,
                  Get,
                  InputTypeFilter,
                  setSession,
                  setTokenStore,
                  PostAsync,
                  resolveAfter2Seconds,
                  //Socket,
                  segment,
                  PostAsyncJson,
                  ObjectToInputs,
                  Modal,
                  segments,
                  segments_modulos,
                  set_segments_modulos,
                  capitalizarPrimeraLetra,
                  isObject,
                  childNodesByType,
                  PostAsyncAxios,
                  makeblob,
                  b64toBlob,
                  Inputs
                }

export default exportar
