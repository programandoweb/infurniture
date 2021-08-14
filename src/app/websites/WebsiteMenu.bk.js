import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Cropper from '../../screens/Cropper'
import { faCog,faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getCroppedImg from '../../helpers/cropImage'
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=(props)=>{
  const context = React.useContext(StateContext);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState({});
  const [image, setImage] = useState(false);
  const [reset, setReset] = useState(false);
  const [data, setData] = useState([]);

  const modulo  =   Functions.segments_modulos(queryStringParams.app);
  const onChange=(e)=>{
    let inputs_ =   {...inputs};
        inputs_[e.target.name] = e.target.value
        setInputs(inputs_)
  }

  useEffect(() => {
    if (open) {
      setInputs(open)
    }
  },[open])

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    let data            =   inputs
        data.user       =   context.Store.get("user").token
        data.op_menu_id =   open.op_menu_id
        data.app        =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","getMenu",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setData(data.response.data);
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let data        =   inputs
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","setMenu",data,context,{name:"callbackContinue",funct:callbackContinue})
  }
  const callbackContinue=(data)=>{
    setInputs({})
    setOpen(false)
    getInit()
  }

  const onCropComplete=(croppedArea, croppedAreaPixels,image_)=>{
    let inputs_ =   inputs;
        inputs_.croppedArea       = croppedArea
        inputs_.croppedAreaPixels = croppedAreaPixels
        inputs_.image             = image_
        setInputs(inputs_)
  }

  const subCrop=()=>{
    setReset(false)
    async function croping(){
      let croppedImage = await getCroppedImg(
                                              inputs.image,
                                              inputs.croppedAreaPixels
                                            )
      let inputs_ =   inputs;
          inputs_.image             = croppedImage
          setInputs(inputs_)
      context.setModalShow({
        show:false,
        message:"",
      })
    }
    croping(this)
  }

  const cropper=(event)=>{
    let file          =   event.target.files[0];
    let reader        =   new FileReader();

    reader.onload     =   function() {
      setImage(reader.result)
      context.setModalShow({
                              footer:true,
                              footer_btn:subCrop,
                              show:true,
                              message:<div style={{height:"500px"}}><Cropper onCropComplete={onCropComplete} image={reader.result}/></div>
                            })

    }
    reader.readAsDataURL(file);
  }

  const removeImage=(inputs)=>{
    inputs.image=false
    setInputs(inputs)
    setReset(true)
  }

  return  <div className="container text-center">
            <div className="row">
              <div className="col-12 col-sm-3">
                <div className="card">
                  <div className="card-body">
                    <div className="cursor-pointer" onClick={()=>setOpen(true)}>
                      <h1>+</h1>
                      Agregar Item al Matriz
                    </div>
                  </div>
                </div>
              </div>
              {
                !open?<div className="col-12 col-sm">
                        <div className="row">
                          {data.map((row,key)=>{
                            return  <div key={key} className="col-6 mb-3">
                                      <div className="card">
                                        <div className="card-body text-left">
                                          <div className="row">
                                            <div className="col-8">
                                              <div className="h5">{row.label}</div>
                                              <div>Grupo: <b>{row.grupo}</b></div>
                                              <div>SEO: <b>{row.descripcion}</b></div>
                                            </div>
                                            <div className="col-4">
                                              <img src={row.image} alt="PGRW" className="col"/>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="card-footer text-left">
                                          <a className="mr-2 " href={context.Config.ConfigAppUrl+"websites/builder/edit?app="+queryStringParams.app+"&id="+row.token}>
                                            <FontAwesomeIcon icon={faCog}/>
                                          </a>
                                          <FontAwesomeIcon className="cursor-pointer" icon={faEdit} onClick={()=>setOpen(row)}/>
                                        </div>
                                      </div>
                                    </div>
                          })}
                        </div>
                      </div>:<></>
              }
              {open?<div className="col-12 col-sm">
                      <div className="card">
                        <form onSubmit={onSubmit}>
                          <div className="card-body">
                            <div className="row mb-2">
                              <div className="col">
                                Título
                              </div>
                              <div className="col">
                                <input defaultValue={open.label} required={true} type="text" name="label" className="form-control" onChange={onChange} placeholder="Título" />
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col">
                                Grupo
                              </div>
                              <div className="col">
                                <input defaultValue={open.grupo} required={true} type="text" name="grupo" className="form-control" onChange={onChange} placeholder="Grupo Ej: Celulares, mascotas, etc.." />
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col">
                                Texto extendido descriptivo (SEO)
                              </div>
                              <div className="col">
                                <textarea defaultValue={open.descripcion} name="descripcion" className="form-control" onChange={onChange} placeholder="descripción">
                                </textarea>
                              </div>
                            </div>
                            <div className="row mb-5 ">
                              <div className="col">
                                Imagen
                              </div>
                              <div className="col text-left">
                                {!inputs.image || inputs.image===false || reset===true?<input type="file" name="userfile" accept="image/*"  onChange={cropper} />:<img onClick={()=>setReset(true)} src={inputs.image} className="img-fluid cursor-pointer" alt="" title="Presiona para cambiar"/>}
                              </div>
                              {inputs.image?<div className="col-12 mt-2 text-right cursor-pointer" onClick={()=>removeImage(inputs)}>Cambiar</div>:<></>}
                            </div>
                            <div className="row mb-2">
                              <div className="col ">
                                <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                  <button type="submit" className="btn btn-primary">Guardar</button>
                                  <div className="btn btn-danger" onClick={()=>setOpen(false)}>Cancelar</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>:<></>
              }
            </div>
          </div>
}
export default App
