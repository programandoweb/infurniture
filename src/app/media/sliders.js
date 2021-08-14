import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import getCroppedImg from '../../helpers/cropImage'
import Input from '../../screens/inputs';
import Cropper from '../../screens/Cropper'
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);


const test =   false
let id  = 0
let cropperOpen     =  false
let cropperImagenes =  false
const tamano_partes_img = 100000;
let token_temporal
let vuelta_uploadPart   =   0
let partes_imagen       =   [];

const App = (props)  =>{

  const context             =   React.useContext(StateContext);
  const modulo              =   Functions.segments_modulos(queryStringParams.app);

  const [inputs, setInputs] = useState({});
  const [reset, setReset]   = useState(false);
  const [image, setImage]   = useState(false);

  useEffect(() => {
    setInputs(props.open)
  },[props.open])

  const onSubmit=(e)=>{
    e.preventDefault()
    let data                      =   {...inputs}
        delete data.image_parts   //=   JSON.stringify(inputs.image_parts)
        //delete data.image;
        data.user         =  context.Store.get("user").token
        data.typeElement  =  props.typeElement
        data.table      =   props.caracteristicas[props.typeElement].table
        data.key_name   =   props.caracteristicas[props.typeElement].key_name
        data.key_value  =   inputs[data.key_name]
        data.app        =   JSON.stringify(modulo)
        //return console.log(data);
    Functions.PostAsync("Media","set",data,context,{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{
    props.getInit()
    setInputs({})
    props.setOpen(false)
  }

  const onChange=(e)=>{
    let inputs_ =   {...inputs};
      inputs_[e.target.name]=e.target.value
      setInputs(inputs_)
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
      //return console.log(inputs);
      let croppedImage = await getCroppedImg(
                                              inputs.image,
                                              inputs.croppedAreaPixels
                                            )

      let inputs_                   =   {...inputs};
          inputs_.image             =   croppedImage
          setInputs(inputs_)
      context.setModalShow({
        show:false,
        message:"",
      })
    }
    croping(this)
  }

  const uploadPart_=()=>{
    let part  =   partes_imagen
    let data  =   {
      part:part[vuelta_uploadPart],
      i:vuelta_uploadPart,
      total:part.length,
      token_temporal:token_temporal,
    }
    data.app  =   JSON.stringify(modulo)
    data.user =   context.Store.get("user").token
    Functions.PostAsync("Media","uploadPart",data,context,{name:"callbackUploadPart",funct:callbackUploadPart})
  }

  const callbackUploadPart=(data)=>{
    if (vuelta_uploadPart!==(partes_imagen.length - 1)) {
      vuelta_uploadPart++
      uploadPart_()
    }else {
      vuelta_uploadPart=0
    }
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

  return  <form onSubmit={onSubmit}>
            <div className="row mb-3">
              <div className="col text-right ">
                <button type="submit" className="btn btn-primary mt-2">Guardar</button>
                <div type="buttom" className="btn btn-danger mt-2 ml-1" onClick={()=>props.setOpen(false)}>Cancelar</div>
              </div>
            </div>
            <div className="row pb-2">
              <div className="col">
                <div>
                  <b>Título</b>
                </div>
                <div>
                  <Input
                      defaultValue={test?test:inputs.label}
                      autoComplete="off"
                      limiteCaracteres="70"
                      title="Título del slider"
                      type="text"
                      name="label"
                      className="form-control"
                      onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className="row pb-2">
              <div className="col">
                <div>
                  <b>Primera línea</b>
                </div>
                <div>
                  <Input
                      defaultValue={test?test:inputs.text1}
                      autoComplete="off"
                      limiteCaracteres="40"
                      title="Texto primera línea"
                      type="text"
                      name="text1"
                      className="form-control"
                      onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className="row pb-2">
              <div className="col">
                <div>
                  <b>Segunda línea</b>
                </div>
                <div>
                  <Input
                      defaultValue={test?test:inputs.text2}
                      autoComplete="off"
                      limiteCaracteres="50"
                      title="Texto segunda línea"
                      type="text"
                      name="text2"
                      className="form-control"
                      onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className="row pb-2">
              <div className="col">
                <div>
                  <b>TweenOne</b>
                </div>
                <div>
                  <Input
                      defaultValue={test?test:inputs.TweenOne}
                      autoComplete="off"
                      limiteCaracteres="50"
                      title="Texto confirmativo"
                      type="text"
                      name="TweenOne"
                      className="form-control"
                      onChange={onChange}
                  />
                </div>
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
          </form>
}

export default App
