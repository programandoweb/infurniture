import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import getCroppedImg from '../../helpers/cropImage'
import Input from '../../screens/inputs';
import Textarea from '../../screens/textarea';
import Select from '../../screens/select';
import TextareaEnriquecido from '../../screens/textareaEnriquecido';
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
let input_nuevo         =   {}

const App = (props)  =>{

  const context             =   React.useContext(StateContext);
  const modulo              =   Functions.segments_modulos(queryStringParams.app);

  const [inputs, setInputs] = useState({
                                          op_noticia_id:0,
                                          label:"",
                                          noticia_corta:"",
                                          noticia_completa:"<p></p>",
                                        });
  const [reset, setReset]       = useState(false);
  const [image, setImage]       = useState(false);
  const [inputs2, setInputs2]   = useState(false);

  useEffect(() => {
    if (props.open.op_noticia_id!==undefined) {
      setInputs(props.open)
    }

  },[props.open])

  const onSubmit=(e)=>{
    e.preventDefault()
    let data              =   {...inputs}
        data.user         =  context.Store.get("user").token
        data.typeElement  =  props.typeElement
        data.image        =  inputs2?inputs2:""
        data.table      =   props.caracteristicas[props.typeElement].table
        data.key_name   =   props.caracteristicas[props.typeElement].key_name
        data.key_value  =   inputs[data.key_name]
        data.app        =   JSON.stringify(modulo)
    Functions.PostAsync("Noticias","setNoticia",data,context,{name:"callbackContinue",funct:callbackContinue})
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

  const onChangeTextarea=(value,name)=>{
    let inputs_ =   {...inputs};
        inputs_[name] = value
        setInputs(inputs_)
  }

  const onCropComplete=(croppedArea, croppedAreaPixels,image_)=>{
    let inputs_ =   {...inputs};
        inputs_.croppedArea       = croppedArea
        inputs_.croppedAreaPixels = croppedAreaPixels
        inputs_.image             = image_

        setInputs(inputs_)

        input_nuevo.croppedArea       = croppedArea
        input_nuevo.croppedAreaPixels = croppedAreaPixels
        input_nuevo.image             = image_
  }

  const subCrop=()=>{
    setReset(false)
    async function croping(){
      //return console.log(input_nuevo);
      let croppedImage = await getCroppedImg(
                                              input_nuevo.image,
                                              input_nuevo.croppedAreaPixels
                                            )

      setInputs2(croppedImage)
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

  return  <form onSubmit={onSubmit}>
            <div className="row mb-3">
              <div className="col text-right ">
                <button type="submit" className="btn btn-primary mt-2">Guardar</button>
                <div type="buttom" className="btn btn-danger mt-2 ml-1" onClick={()=>props.setOpen(false)}>Cancelar</div>
              </div>
            </div>
            <Select
                defaultValue={test?test:props.open.grupo}
                data={props.categorias}
                title="Categoría"
                name="grupo"
                className="form-control"
                onChange={onChange}
              />

            <Input
                defaultValue={test?test:inputs.label}
                autoComplete="off"
                limiteCaracteres="70"
                title="Título de la noticia"
                type="text"
                name="label"
                className="form-control"
                onChange={onChange}
            />
            <Textarea
                defaultValue={test?test:inputs.noticia_corta}
                autoComplete="off"
                limiteCaracteres="70"
                title="Intro de la noticia"
                type="text"
                name="noticia_corta"
                className="form-control"
                onChange={onChange}
            />
            <TextareaEnriquecido
                defaultValue={test?test:props.open.noticia_completa}
                autoComplete="off"
                title="Noticia completa"
                type="text"
                name="noticia_completa"
                className="form-control"
                onChange={onChangeTextarea}
            />
            <div className="row mb-5 ">
              <div className="col">
                Imagen
              </div>
              <div className="col text-left">
                {!props.open.image || reset==true?<input type="file" name="userfile" accept="image/*"  onChange={cropper} />:<img onClick={()=>setReset(true)} src={props.open.image} className="img-fluid cursor-pointer" alt="" title="Presiona para cambiar"/>}
              </div>
            </div>
          </form>
}

export default App
