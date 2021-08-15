import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Grabador from './grabador';
import { faTrash,faImage,faUpload,faFilePdf,faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imgDefault from '../../assets/images/design/avatar.png';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);
const   HtmlToReactParser = require('html-to-react').Parser;
let     htmlToReactParser = new HtmlToReactParser();

const limitUpload = 1000000;
let   audio       = false;

const App =(props)=>{
  const context             =   React.useContext(StateContext);
  const modulo              =   Functions.segments_modulos(queryStringParams.app);
  const [data, setData]     = useState([]);
  const [inputs, setInputs] = useState({});
  const [blockTextarea, setBlockTextarea] = useState(false);
  const [openEditDescription, setOpenEditDescription] = useState(false);

  useEffect(() => {
    getInit()
  },[props.id,openEditDescription])

  const getInit=()=>{
    let data            =   {}
        data.app        =   JSON.stringify(modulo)
        data.id         =   props.id
        Functions.PostAsync("Comentarios","get",data,context,{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{
    //document.getElementById("fecha").value='';
    //document.getElementById("tipos_comentarios").value='';
    setData(data.response.data)
  }

  const onChange=(e)=>{
    e.preventDefault()
    let inputs_={...inputs}
        inputs_[e.target.name]=e.target.value
        setInputs(inputs_)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    setBlockTextarea(true)
    let data            =   {...inputs}
        data.file       =   (Object.is(inputs.file,inputs.file))?JSON.stringify(inputs.file):""
        data.app        =   JSON.stringify(modulo)
        data.user       =   context.Store.get("user").token
        data.id         =   props.id
        if (audio) {
          data.audio    =   JSON.stringify(audio)
        }
        Functions.PostAsync("Comentarios","set",data,context,{name:"callbackContinueSend",funct:callbackContinueSend})
  }

  const callbackContinueSend=(data)=>{
    getInit()
    audio=false
    setBlockTextarea(false)
  }

  const upload=(event)=>{
    let file          =   event.target.files[0];
    let reader        =   new FileReader();

    reader.onload       =   function() {
      if (file.size<limitUpload) {
        let inputs_={...inputs}
            inputs_.file  =   { src:reader.result,
                                name:file.name,
                                lastModified:file.lastModified,
                                size:file.size,
                                type:file.type,
                              }

        let data            =   inputs_
            data.file       =   (Object.is(inputs_.file,inputs_.file))?JSON.stringify(inputs_.file):""
            data.app        =   JSON.stringify(modulo)
            data.user       =   context.Store.get("user").token
            data.id         =   props.id
            Functions.PostAsync("Comentarios","set",data,context,{name:"callbackContinueSend",funct:callbackContinueSend})
      }else {
        context.setModalShow({
                                show:true,
                                message:<div className="text-center text-danger">El Archivo supera el límite permitido de {limitUpload/1000000}MB</div>
                              })
      }
    }
    reader.readAsDataURL(file);
  }

  const openFileTab=(url)=>{
    return window.open(url, '_blank').focus();
  }

  const openFile=(url)=>{

    context.setModalShow({
                            show:true,
                            message:<iframe id="inlineFrameExample"
                                            title="Iframe ProgramandoWeb"
                                            width="100%"
                                            height="400"
                                            src={url}>
                                        </iframe>
                          })
  }

  // const setAudio=(data)=>{
  //   audio = {
  //             src:data,
  //             type:"ogg",
  //           }
  // }

  const deleteAudio=(id_)=>{
    context.setModalShow({
                            show:true,
                            size:"sm",
                            message:<div className="text-center text-danger">
                                      <div className="mb-3">¿Está seguro que desea eliminar este mensaje?</div>
                                      <div className="btn btn-danger mr-1" onClick={()=>submitDeleteAudio(id_)}>Si</div>
                                      <div className="btn btn-primary" onClick={()=>context.setModalShow({show:false,size:"sm",message:""})}>No</div>
                                    </div>
                          })
  }

  const submitDeleteAudio=(id_)=>{
    context.setModalShow({show:false,size:"sm",message:""})
    let data            =   {}
        data.app        =   JSON.stringify(modulo)
        data.user       =   context.Store.get("user").token
        data.id         =   id_
        Functions.PostAsync("Comentarios","deleteAudio",data,context,{name:"callbackDeleteAudio",funct:callbackDeleteAudio})
  }

  const callbackDeleteAudio=()=>{
    getInit()
    audio=false
  }
  const enviar_audio=(base64data,tada)=>{
    let data            =   {}
        data.app        =   JSON.stringify(modulo)
        data.user       =   context.Store.get("user").token
        data.id         =   props.id
        data.audio      =   JSON.stringify({  src:base64data,
                                              name:"notadevoz",
                                              lastModified:"2020202020",
                                              size:1000,
                                              type:"ogg",
                                            })
        Functions.PostAsync("Comentarios","setAudio",data,context,{name:"callbackSetAudio",funct:callbackSetAudio})

  }

  const callbackSetAudio=(data)=>{
    getInit()
  }

  const Reproductor=(props)=>{
    return <audio controls volume="0.5">  <source src={props.src} type="audio/ogg"/></audio>
  }

  const onDoubleClick=(e,row,name)=>{
    setOpenEditDescription(openEditDescription?false:row)
  }

  const onChangeEditOnline=(e,row)=>{
    let inputs_                 =   {};
        inputs_[e.target.name]  =   e.target.value
        inputs_.user            =   context.Store.get("user").token
        inputs_.app             =   JSON.stringify(modulo)
        inputs_.id              =   row.mensaje_token
        Functions.PostAsync("Comentarios","setItemsOnline",inputs_,context,{name:"callbackEditOnline",funct:callbackEditOnline})
  }

  const callbackEditOnline=(dataR)=>{
    //console.log(dataR);
  }

  return  <div className="p-3 bg-gray">
            <div className="row mb-3">
              <div className="col">
                <b>{props.title===undefined?"":props.title}</b>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col mb-3">
                <div className="p-2">
                  <form onSubmit={onSubmit}>
                    {props.date!==undefined?<>
                      <input type="date" name="fecha" id="fecha" onChange={onChange} className="form-control mb-3" />
                    </>:false}
                    {props.tipos_comentarios!==undefined?<>
                      <select id="tipos_comentarios" className="form-control mb-3" name="tipos_comentarios" onChange={onChange} required={true}>
                        <option value="">Seleccione el tipo comentario</option>
                        {props.tipos_comentarios.map((row,key)=>{
                          return <option key={key} value={row.value}>{row.label}</option>
                        })}
                      </select>
                    </>:false}
                    {!blockTextarea?<textarea
                        disabled={blockTextarea}
                        name="mensaje"
                        required="required"
                        placeholder="Comentario"
                        className="form-control"
                        onChange={onChange}></textarea>:<pre className="p-3">Enviando mensaje...</pre>}
                    <div className="row mt-3">
                      <div className="col-6 col-sm-6 p-0 ml-0 ml-sm-3 mb-3">
                        <button type="submit" className="btn btn-primary col-12">
                          Enviar
                        </button>
                      </div>
                      <div className="col-3 col-sm-1 p-0 text-right mr-lg-1">
                        <Grabador
                                  enviar_audio={enviar_audio}
                                  modulo={modulo}
                        />
                      </div>
                      <div className="col-3 col-sm-1 p-0 ">
                        <div className={!blockTextarea?"btn btn-warning uploadFile position-relative":"btn btn-warning uploadFile position-relative disabled"}>
                          <input type="file" className="inputfile position-absolute" onChange={upload} />
                          <FontAwesomeIcon icon={faUpload}/>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              {
                data.map((row,key)=>{
                  let icon  = ""
                  if (row.attachment) {
                    switch (row.attachmentExtension) {
                      case "pdf":
                        icon  = <div className="cursor-pointer" onClick={()=>openFileTab(row.attachment)} href={row.attachment}><FontAwesomeIcon icon={faFilePdf}/></div>
                      break;
                      case "jpg":
                      case "jpeg":
                      case "gif":
                      case "png":
                        icon  = <div className="cursor-pointer" onClick={()=>openFile(row.attachment)} href={row.attachment}>
                                   <img className="col-2" src={row.attachment} alt="pgrw"/>
                                </div>
                      break;
                      default:
                        icon  = <div className="cursor-pointer" onClick={()=>openFile(row.attachment)} href={row.attachment}><FontAwesomeIcon icon={faFile}/></div>
                      break
                    }
                  }
                  //let content_  = "content"+row.mensaje_token
                  //let audio     = ""s.replace(/\r?\n|\r/g, '<br>')
                  let newText       =     row.mensaje.replace(/\r?\n|\r/g, '<br>');
                  let description   =   htmlToReactParser.parse(newText);
                  return  <div key={key} className="col-12 mb-2">
                            <div className="bg-white p-2 item-comenario  border-bottom">
                              <div className="row">
                                <div className="col-12 col-sm-2 border-right">
                                  <div className="row">
                                    <div className="col-3"></div>
                                    {row.miImg===undefined?<div className="col-6">
                                      <img src={imgDefault} className="rounded-circle border bg-white"/>
                                    </div>:<div className="col-6">
                                      <img src={row.miImg} className="img-fluid rounded-circle border bg-white"/>
                                    </div>}
                                  </div>
                                  <div className="text-center date">
                                    {row.nombres} {row.apellidos}
                                  </div>
                                </div>
                                <div className="col-12 col-sm-9">
                                  <div className="position-absolute position-right store-text-description border-left pl-2">
                                    {row.tipos_comentarios!=="Genérico"?<>
                                      <div className="date position-right2 store-text-description">
                                        <b>{row.tipos_comentarios}</b>
                                      </div>
                                    </>:false}
                                  </div>
                                  <div className="date">
                                    {row.fecha}
                                  </div>
                                  <div className="text-justify" onDoubleClick={(e)=>onDoubleClick(e,row,"mensaje")}>
                                    {openEditDescription && openEditDescription.mensaje_id===row.mensaje_id?<>
                                      <div><textarea width="200" onChange={(e)=>onChangeEditOnline(e,row)} className="form-control" type="text" name="mensaje" defaultValue={row.mensaje}/></div>
                                      <div className="btn btn-primary btn-block mt-2" onClick={()=>setOpenEditDescription(false)}>Cerrar</div>
                                    </>:<div>{description}</div>}
                                  </div>
                                  {row.attachment!==undefined && row.attachment!=="0"?<div>
                                    {icon}
                                  </div>:false}
                                  {row.ogg!==undefined && row.ogg!=="0"?<Reproductor src={row.ogg}/>:false}
                                </div>
                                <div className="col-12 col-sm-1 text-center pt-2">
                                  {parseInt(context.Store.get("user").tipo_usuario_id)<=2 ||
                                    context.Store.get("user").usuario_id===row.emisor_id?<>
                                    <div className="store-text-description cursor-pointer" onClick={()=>deleteAudio(row.mensaje_token)}>
                                      <FontAwesomeIcon icon={faTrash} size="2x"/>
                                    </div>
                                  </>:false}
                                </div>
                              </div>
                            </div>
                          </div>
                })
              }

            </div>
          </div>
}
export default App
