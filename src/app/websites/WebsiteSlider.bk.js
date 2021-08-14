import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Store from '../../helpers/Store';
import Config from '../../helpers/Config';
import Cropper from '../../screens/Cropper'
import Input from '../../screens/inputs';
import getCroppedImg from '../../helpers/cropImage'
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);
const axios = require('axios').default;

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
    let inputs_ =   inputs;
        inputs_[e.target.name]=e.target.value
        setInputs(inputs_)
  }

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    let data        =   inputs
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","getSliders",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setData(data.response.data);
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let data        =   {...inputs}
        // delete  data.image
        // delete  data.imageBlob
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest'
        }
    };
    let formData = new FormData(document.forms[0]);
        formData.append('file', data.imageBlob);
        formData.append ("method", "post");
        formData.append ("PUBLIC_KEY", process.env.REACT_APP_PUBLIC_KEY);
        formData.append ("REACT_APP_PRIVATE_KEY", process.env.REACT_APP_PRIVATE_KEY);

        return console.log(formData);
        axios.post(Config.ConfigApirest+"Websites/setSlider", formData, config)
                  .then(res => console.log(res))
                  .catch(err => {
                      console.log(err);
                      console.log(err.status);
                      console.log(err.code);
                  })


        //     data.user   =   context.Store.get("user").token
        //     data.app    =   JSON.stringify(modulo)
        // Functions.PostAsync("Websites","setSlider",data,context,{name:"callbackContinue",funct:callbackContinue})
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

      var ImageURL = croppedImage;
      // Split the base64 string in data and contentType
      var block = ImageURL.split(";");
      // Get the content type of the image
      var contentType = block[0].split(":")[1];// In this case "image/gif"
      // get the real base64 content of the file
      var realData  = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."
      // Convert it to a blob to upload
      var blob      = Functions.b64toBlob(realData, contentType);

      //b64toBlob
      let inputs_ =   inputs;
          inputs_.image             =   croppedImage
          inputs_.imageBlob         =   blob
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

  return  <div className="container text-center">
            <div className="row">
              <div className="col-12 col-sm-3">
                <div className="card">
                  <div className="card-body">
                    <div className="cursor-pointer" onClick={()=>setOpen(true)}>
                      <h1>+</h1>
                      Agregar Item al Slider
                    </div>
                  </div>
                </div>
              </div>
              {
                !open?<div className="col-12 col-sm">
                        <div className="row">
                          {data.map((row,key)=>{
                            return  <div key={key} className="col-12 col-sm-6">
                                      <div className="card">
                                        <div className="card-header">
                                          {row.label}
                                        </div>
                                        <div className="card-body">
                                          <img src={row.image} alt="PGRW" className="col"/>
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
                                Label
                              </div>
                              <div className="col">
                                <input required={true} type="text" name="label" className="form-control" onChange={onChange} placeholder="Label..." />
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col">
                                Grupo
                              </div>
                              <div className="col">
                                <input required={true} type="text" name="grupo" className="form-control" onChange={onChange} placeholder="Grupo Ej: Home..." />
                              </div>
                            </div>
                            <div className="row mb-5 ">
                              <div className="col">
                                Imagen
                              </div>
                              <div className="col text-left">
                                {!inputs.image || reset==true?<input type="file" name="userfile" accept="image/*"  onChange={cropper} />:<img onClick={()=>setReset(true)} src={inputs.image} className="img-fluid cursor-pointer" alt="" title="Presiona para cambiar"/>}
                              </div>
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
