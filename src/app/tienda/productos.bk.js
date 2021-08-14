import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Cropper from '../../screens/Cropper'
import getCroppedImg from '../../helpers/cropImage'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

let id  = 0

const App=(props)=>{
  const context             =   React.useContext(StateContext);
  const modulo              =   props.modulo;
  const [data, setData]         = useState({});
  const [producto, setProducto] = useState({});
  const [inputs, setInputs] = useState({});
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
    //return console.log(new_input);
    let data                          =   {...inputs,...new_input}
        data.op_tienda_productos_id   =   id
        delete data.json
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
        //return console.log(data);
    Functions.PostAsync("Websites","setProduct",data,context,{name:"callbackContinue",funct:callbackContinue})
  }


  const callbackContinue=(data)=>{
    id=0
    setInputs({})
    props.setOpen(false)
    props.getInit()
  }

  useEffect(() => {
    setInputs(props.open)
    if (props.open.op_tienda_productos_id!==undefined && props.open.op_tienda_productos_id>0) {
      id=props.open.op_tienda_productos_id
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
    let inputs_ =   {...inputs};
        inputs_[name]=value
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

  const caracteristicas = props.caracteristicas[props.typeElement]
  const dependencias    = props.caracteristicas[props.typeElement].dependencias

  return  <form onSubmit={onSubmit}>
            <div className="row pb-2">
              <div className="col">
                <div>
                  <b>Título</b>
                </div>
                <div>
                  <input defaultValue={props.open.label} required={true} type="text" name="label" className="form-control" onChange={onChange} placeholder="Título..." />
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Imagen</b>
                </div>
                <div>
                  {console.log(inputs.image)}
                  {!inputs.image || inputs.image===false || reset===true?<input type="file" name="userfile" accept="image/*"  onChange={cropper} />:<img onClick={()=>setReset(true)} src={inputs.image} height="70" className="cursor-pointer" alt="" title="Presiona para cambiar"/>}
                </div>
              </div>
            </div>
            <div className="row pb-2">
              <div className="col">
                <div>
                  <b>Descripción completa</b>
                </div>
                <div>
                  <textarea name="descripcion" defaultValue={props.open.descripcion} className="form-control" onChange={onChange}></textarea>
                </div>
              </div>
            </div>
            <div className="row  pb-2">
              <div className="col">
                <div>
                  <b>Código de referencia</b>
                </div>
                <div>
                  <input defaultValue={props.open.codigo_referencia} required={true} type="text" name="codigo_referencia" className="form-control" onChange={onChange} placeholder="Código de referencia" />
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Precio</b>
                </div>
                <div>
                  <input defaultValue={props.open.precio} required={true} type="text" name="precio" className="form-control" onChange={onChange} placeholder="Precio de venta" />
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Oferta</b>
                </div>
                <div>
                  <input defaultValue={props.open.oferta} required={true} type="text" name="oferta" className="form-control" onChange={onChange} placeholder="Oferta" />
                </div>
              </div>
            </div>
            <div className="row border-bottom pb-5">
              <div className="col">
                <div>
                  <b>Peso (Gr)</b>
                </div>
                <div>
                  <input defaultValue={props.open.peso} type="number" name="peso" className="form-control" onChange={onChange} placeholder="Peso" />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Guardar</button>
                <div type="buttom" className="btn btn-danger mt-2 ml-1" onClick={()=>props.setOpen(false)}>Cancelar</div>
              </div>
              <div className="col">
                <div>
                  <b>Alto (cm)</b>
                </div>
                <div>
                  <input defaultValue={props.open.alto}  type="number" name="alto" className="form-control" onChange={onChange} placeholder="Alto" />
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Ancho (cm)</b>
                </div>
                <div>
                  <input defaultValue={props.open.ancho} type="number" name="ancho" className="form-control" onChange={onChange} placeholder="Ancho" />
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Largo (cm)</b>
                </div>
                <div>
                  <input defaultValue={props.open.largo} type="number" name="largo" className="form-control" onChange={onChange} placeholder="Largo" />
                </div>
              </div>
            </div>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="home" title="Home">

              </Tab>
              <Tab eventKey="profile" title="Profile">

              </Tab>
              <Tab eventKey="contact" title="Contact">

              </Tab>
            </Tabs>
            {
              dependencias.map((row,key)=>{
                let json    =   {}
                if (props.open.json!==undefined && props.open.json!=='' && props.open.json!=='{}') {
                    json    =   JSON.parse(props.open.json)
                }


                if (props.caracteristicas[row] !==undefined && props.caracteristicas[row].label!==undefined) {
                  return  <div className="row border-bottom pb-2" key={key}>
                            <div className="col-12 mb-2 pt-2">
                              <b>{props.caracteristicas[row].label}</b>
                            </div>
                            {data[props.caracteristicas[row].value]!==undefined?<>
                              { data[props.caracteristicas[row].value].map((row2,key2)=>{

                                  let check   =  false
                                  if (json[row]!==undefined && json[row].includes(row2.token)) {
                                     check=true
                                  }
                                  return  <div key={key2} className="col-12 col-sm-4 mb-2 border-left bg-gray">
                                            <div className="form-check">
                                              <input  onChange={onChange}
                                                      defaultValue={row2.token}
                                                      name={"json["+row+"]["+key2+"]"}
                                                      type="checkbox"
                                                      className="form-check-input"
                                                      id={"defaultCheck"+key2}
                                                      defaultChecked={check}
                                                      />

                                              <label className="form-check-label" for={"defaultCheck"+key2}>
                                                {row2.label}
                                              </label>
                                            </div>
                                          </div>
                                })
                              }</>:<></>}
                          </div>
                }else {
                  return false
                }
              })
            }
          </form>
}

export default App
