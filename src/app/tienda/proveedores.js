import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Cropper from '../../screens/Cropper'
import getCroppedImg from '../../helpers/cropImage'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

let id  = 0
let cropperOpen     =  false
let cropperImagenes =  false

const App=(props)=>{
  const context             =   React.useContext(StateContext);
  const modulo              =   props.modulo;
  const [data, setData]     =   useState({});
  const [producto, setProducto] = useState({});
  const [inputs, setInputs] = useState({});
  const [inputs2, setInputs2] = useState({});
  const [reset, setReset]   = useState(false);
  const [image, setImage]   = useState(false);

  const onSubmit=(e)=>{
    e.preventDefault()
    var allControls = e.target.elements;
    let new_input   = {}

    Object.entries(allControls).map((row,key)=>{
      if (row[1].name!=='') {
        if (row[1].checked) {
          new_input[row[1].name]=row[1].value
        }
      }
    })
    let data                          =   {...inputs}
        data                          =   Object.assign(data, new_input)
        data.op_tienda_proveedores_id =   id
        delete data.json
        data.image    =   inputs2.image
        data.user     =   context.Store.get("user").token
        data.app      =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","setProveedor",data,context,{name:"callbackContinue",funct:callbackContinue})
  }


  const callbackContinue=(data)=>{
    id=0
    setInputs({})
    props.setOpen(false)
    props.getInit()
  }

  useEffect(() => {
    setInputs(props.open)
    if (props.open.op_tienda_proveedores_id!==undefined && props.open.op_tienda_proveedores_id>0) {
      id=props.open.op_tienda_proveedores_id
      setInputs2({image:props.open.image})
    }
    let inputs_       =   {...inputs}
        inputs_       =   props.open
    setInputs(props.open)
    getInit()
  },[props.caracteristicas[props.typeElement]])

  const getInit=()=>{
    let data        =   {}
        data.dependencias   =   JSON.stringify(dependencias)
        data.user           =   context.Store.get("user").token
        data.app            =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","getCaracteristicas",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setData(data.response.data);
  }

  const callbackInitProducto=(data)=>{
    setProducto(data.response.data);
  }

  const onChange=(e)=>{
    let inputs_ =   {...inputs};
        inputs_[e.target.name]=e.target.value
        setInputs(inputs_)
  }

  const onChangeInit=(name,value)=>{
    let inputs_ =   {...inputs2};
        inputs_[name]=value
        setInputs2(inputs_)
  }

  const onCropComplete=(croppedArea, croppedAreaPixels,image_)=>{
    let inputs_                   =   inputs2;
        inputs_.croppedArea       =   croppedArea
        inputs_.croppedAreaPixels =   croppedAreaPixels
        inputs_.image             =   image_
        setInputs2(inputs_)
  }

  const subCrop=()=>{
    setReset(false)
    async function croping(){
      let croppedImage = await getCroppedImg(
                                              inputs2.image,
                                              inputs2.croppedAreaPixels
                                            )
      let inputs_ =   inputs2;
          inputs_.image             = croppedImage
          setInputs2(inputs_)
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
                              message:<div style={{height:"500px"}}><Cropper
                                                                              onCropComplete={onCropComplete}
                                                                              aspect={1/1}
                                                                              image={reader.result}
                                                                    /></div>
                            })

    }
    reader.readAsDataURL(file);
  }

  const removeImage=(inputs)=>{
    inputs.image=false
    setInputs(inputs)
    setReset(true)
  }

  const onCropCompleteGalery=(croppedArea, croppedAreaPixels,image_)=>{
    cropperImagenes     =  {
                              src:image_,
                              croppedAreaPixels:croppedAreaPixels,
                              croppedArea:croppedArea,
                            };
  }

  const caracteristicas = props.caracteristicas[props.typeElement]
  const dependencias    = props.caracteristicas[props.typeElement].dependencias



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
                  <b>Nombre</b>
                </div>
                <div>
                  <input  defaultValue={props.open.label}
                          required={true}
                          type="text"
                          name="label"
                          className="form-control"
                          onChange={onChange} placeholder="Nombre del proveedor" />
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Logo</b>
                </div>
                <div>
                  {!inputs2.image || inputs2.image===false || reset===true?<input type="file" name="userfile" accept="image/*"  onChange={cropper} />:<img onClick={()=>setReset(true)} src={inputs2.image} height="70" className="cursor-pointer" alt="" title="Presiona para cambiar"/>}
                </div>
              </div>
            </div>
            <div className="row pb-2">
              <div className="col">
                <div>
                  <b>NIT</b>
                </div>
                <div>
                  <input defaultValue={props.open.nit} required={false} type="text" name="nit" className="form-control" onChange={onChange} placeholder="NIT" />
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Prefijo</b>
                </div>
                <div>
                  <input defaultValue={props.open.prefijo} required={false} type="text" name="prefijo" className="form-control" onChange={onChange} placeholder="Prefijo" />
                </div>
              </div>
            </div>
            <div className="row pb-2">
              <div className="col-12 mb-2">Ubicación</div>
              <div className="col">
                <div>
                  <b>Departamento</b>
                </div>
                <div>
                  <input defaultValue={props.open.departamento} required={false} type="text" name="departamento" className="form-control" onChange={onChange} placeholder="Departamento" />
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Ciudad</b>
                </div>
                <div>
                  <input defaultValue={props.open.ciudad} required={false} type="text" name="ciudad" className="form-control" onChange={onChange} placeholder="Ciudad" />
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Código postal</b>
                </div>
                <div>
                  <input defaultValue={props.open.codigo_postal} required={false} type="text" name="codigo_postal" className="form-control" onChange={onChange} placeholder="Código postal" />
                </div>
              </div>
            </div>
            <div className="row pb-2">
              <div className="col">
                <div>
                  <b>Dirección</b>
                </div>
                <div>
                  <input defaultValue={props.open.direccion} required={false} type="text" name="direccion" className="form-control" onChange={onChange} placeholder="Dirección" />
                </div>
              </div>
            </div>
            <div className="row pb-2">
              <div className="col">
                <div>
                  <b>Contacto</b>
                </div>
                <div>
                  <input defaultValue={props.open.contacto} required={false} type="text" name="contacto" className="form-control" onChange={onChange} placeholder="Contacto" />
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Correo</b>
                </div>
                <div>
                  <input defaultValue={props.open.email} required={false} type="text" name="email" className="form-control" onChange={onChange} placeholder="Correo" />
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Teléfono</b>
                </div>
                <div>
                  <input defaultValue={props.open.telefono} required={false} type="text" name="telefono" className="form-control" onChange={onChange} placeholder="Teléfono" />
                </div>
              </div>
            </div>
          </form>
}

export default App
