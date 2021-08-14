import React,{useState,useEffect} from 'react';
import StateContext from '../helpers/ContextState'
import Functions from '../helpers/Functions'
import getCroppedImg from '../helpers/cropImage'
import avatar  from '../assets/images/design/avatar.png'
import Cropper from './Cropper'
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

let input_nuevo  =   {}
let openImage    =   false

const App=(props)=>{

  const context = React.useContext(StateContext);
  const modulo  =   Functions.segments_modulos(queryStringParams.app);
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);
  const [inputs, setInputs] = useState({  miImg:"" });
  const [image, setImage]  = useState(props.src!==undefined && props.src!==''?props.src:false );


  const onCropComplete=(croppedArea, croppedAreaPixels,image_)=>{
        input_nuevo.croppedArea       = croppedArea
        input_nuevo.croppedAreaPixels = croppedAreaPixels
        input_nuevo.image             = image_
  }

  const subCrop=()=>{
    setReset(false)
    async function croping(){
      let inputs_ = {...inputs}
      let croppedImage = await getCroppedImg(
                                              input_nuevo.image,
                                              input_nuevo.croppedAreaPixels
                                            )
      setImage(croppedImage)
      onSubmit(croppedImage,openImage)
      openImage=false;
      context.setModalShow({
        show:false,
        message:"",
      })
    }
    croping(this)
  }

  const cropper=(event,deposito)=>{
    let file          =   event.target.files[0];
    let reader        =   new FileReader();


    openImage         =   deposito

    reader.onload     =   function() {
      setImage(reader.result)
      context.setModalShow({
                              footer:true,
                              footer_btn:subCrop,
                              show:true,
                              message:<div style={{height:"500px"}}><Cropper aspect={1} onCropComplete={onCropComplete} image={reader.result}/></div>
                            })

    }

    reader.readAsDataURL(file);
  }

  const onSubmit=(croppedImage,deposito)=>{
    let data              =   {}
        data.image        =   croppedImage
        data.deposito     =   deposito
        data.user         =   context.Store.get("user").token
        data.cliente      =   props.row.usuario_id
        data.app          =   JSON.stringify(modulo)
    Functions.PostAsync("Usuarios","uploadPics",data,context,{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{

  }

  return  <div className="position-relative">
            <input  type="file"
                    name="userfile"
                    accept="image/*"
                    onChange={(e)=>cropper(e,"miImg")}
                    className="position-absolute inputfile" />
            {
              props.src!==undefined && props.src==="" && !image?<>
                <img src={avatar} className="img-fluid rounded cursor-pointer" alt="pgrw" />
              </>:<>
                <img src={(image)?image:props.src} className="img-fluid rounded cursor-pointer" alt="pgrw" />
              </>
            }
          </div>
}
export default App
