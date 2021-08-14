import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Cropper from '../../screens/Cropper'
import TextareaEnriquecido from '../../screens/textareaEnriquecido';
import getCroppedImg from '../../helpers/cropImage'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


let id  = 0
let cropperOpen     =  false
let cropperImagenes =  false
let totalSeoTitle       =  70
let totalSeoDescripcion =  170
const fisico_virtual    =   ["Físico","Virtual"]
const si_no             =   ["Sí","No"]
let dragElementNow
let arrastraAqui
var token_temporal

const App=(props)=>{
  const context             =   React.useContext(StateContext);
  const modulo              =   props.modulo;
  const [data, setData]     =   useState({});
  const [producto, setProducto] = useState({});
  const [inputs, setInputs] = useState({});
  const [seoTitle, setSeoTitle] = useState(70);
  const [seoDescripcion, setSeoDescripcion] = useState(170);
  const [fotos, setFotos]   = useState([
                                          "",
                                        ]);
  const [compradosEnConjunto, setCompradosEnConjunto]   = useState([
                                          "",
                                        ]);
  const [todosLosProductos, setTodosLosProductos]   = useState([]);
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
        data.op_tienda_productos_id   =   id
        delete data.json
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","setProduct",data,context,{name:"callbackContinue",funct:callbackContinue})
  }


  const callbackContinue=(data)=>{
    id=0
    setInputs({})
    props.setOpen(false)
    props.getInit()
  }

  useEffect(() => {
    //setInputs(props.open)
    if (props.open.op_tienda_productos_id!==undefined && props.open.op_tienda_productos_id>0) {
      id=props.open.op_tienda_productos_id
    }
    let inputs_       =   {...inputs}
        inputs_       =   props.open
    if (props.open===true) {
      token_temporal  =   Math.random()
      setInputs({token_temporal:Math.random()})
    }else {
      token_temporal=props.open.token_temporal
      setInputs(props.open)
    }
    getInit()
    getMisProductos()
  },[props.caracteristicas[props.typeElement]])

  const getInit=()=>{
    setFotos(["",])
    let data                =   {}
        data.dependencias   =   JSON.stringify(dependencias)
        data.op_tienda_productos_id  = (props.open.op_tienda_productos_id!==undefined)?props.open.op_tienda_productos_id:"NUEVO"
        data.user           =   context.Store.get("user").token
        data.token_temporal =   token_temporal
        data.app            =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","getCaracteristicas",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setCompradosEnConjunto([""])
    let fotos_    =   [""];
    data.response.images.map((row,key)=>{
      let data__    =   {
                          image:row.image,
                          image_path:row.image_path,
                          image_token:row.token,
                          color:row.op_tienda_colores_id,
                          estilos:row.op_tienda_estilos_id,
                          color_token:row.color,
                          estilos_token:row.estilos,
                          color_string:row.color_string,
                          estilos_string:row.estilos_string
                        }
          fotos_.push(data__)
          setFotos(fotos_)
    })

    let productosEnConjunto_    =   [""];
    data.response.productosCompradosEnConjunto.map((row,key)=>{
      let data__    =   row
          productosEnConjunto_.push(data__)
          setCompradosEnConjunto(productosEnConjunto_)
    })
    setData(data.response.data);
  }

  const callbackInitProducto=(data)=>{
    setProducto(data.response.data);
  }

  const onChange=(e)=>{
    if (e.target.name==='SEO_label') {
      let totalL=totalSeoTitle-e.target.value.length
      setSeoTitle(totalL)
      if (totalL<0) {
        e.target.className='bg-danger form-control text-white'
      }else {
        e.target.className=' form-control '
      }
    }
    if (e.target.name==='SEO_descripcion') {
      let totalD=totalSeoDescripcion-e.target.value.length
      setSeoDescripcion(totalD)
      if (totalD<0) {
        e.target.className='bg-danger form-control text-white'
      }else {
        e.target.className=' form-control '
      }
    }

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
        //return console.log(croppedArea);
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
      //console.log(croppedImage);
      //b64toBlob
      let inputs_ =   inputs;
          inputs_.image  = croppedImage
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

  const openGaleria=(event,num)=>{
    cropperOpen       =   num
    let file          =   event.target.files[0];
    let reader        =   new FileReader();

    reader.onload     =   function() {
      setImage(reader.result)
      context.setModalShow({
                              footer:true,
                              footer_btn:subCropGalery,
                              show:true,
                              message:<div style={{height:"500px"}}><Cropper onCropComplete={onCropCompleteGalery} image={reader.result}/></div>
                            })

    }
    reader.readAsDataURL(file);
  }

  const openCompradosEnConjunto=(event,num)=>{
    context.setModalShow({
                            footer:true,
                            show:true,
                            message:<div style={{minHeight:"300px"}}><CompradosEnConjunto
                                                                      submitCompradosEnConjunto={submitCompradosEnConjunto}
                                                                      todosLosProductos={todosLosProductos}
                                                                  /></div>
                          })

  }

  const subCropGalery=()=>{
    async function croping(){
      let croppedImage = await getCroppedImg(
                                              cropperImagenes.src,
                                              cropperImagenes.croppedAreaPixels
                                            )
      let data                =   {}
          data.op_tienda_productos_image_id = 0
          data.op_tienda_productos_id       = (props.open.op_tienda_productos_id!==undefined)?props.open.op_tienda_productos_id:0
          data.name           =   context.Store.get("user").usuario_id+'_gallery_';
          data.image          =   croppedImage;
          data.token_temporal =   inputs.token_temporal;
          data.user           =   context.Store.get("user").token
          data.app            =   JSON.stringify(modulo)
      Functions.PostAsync("Websites","uploadProductos",data,context,{name:"callbackUpload",funct:callbackUpload})
    }
    croping(this)
  }

  const callbackUpload =(data)=>{
    let fotos_  =   fotos;
    let data__   =   {
                        image:data.response.image,
                        image_path:data.response.image_path,
                      }
        fotos_.push(data__)
        setFotos(fotos_)
        context.setModalShow({
                                show:false,
                                message:""
                              })
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



  const Alert=(props)=>{
    return  <div className="row">
              <div className="col-12 mb-3 text-center">¿Estás seguro que deseas eliminar esta foto?</div>
              <div className="col-6">
                <div className="btn btn-primary btn-block" onClick={()=>context.setModalShow({
                                                                                                show:false,
                                                                                                message:"",
                                                                                              })}>
                  No
                </div>
              </div>
              <div className="col-6">
                <div className="btn btn-danger btn-block" onClick={()=>props.deleteFile(props.src)}>
                  Si
                </div>
              </div>
            </div>
  }

  const getMisProductos=()=>{
    setTodosLosProductos([])
    let data        =   {}
        data.user           =   context.Store.get("user").token
        data.app            =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","getMisProductos",data,context,{name:"callbackGetMisProductos",funct:callbackGetMisProductos})
  }

  const callbackGetMisProductos=(data)=>{
    //console.log(data.response.data);
    setTodosLosProductos(data.response.data)
  }

  const CompradosEnConjunto=(props)=>{
    return  <div className="row">
              <div className="col-12 mb-3 text-center">
                Seleccione los productos
              </div>
              {todosLosProductos.map((row,key)=>{
                return  <div key={key} className="col-4 mb-3" >
                          <div className="text-center border m-2 color-gray" onClick={()=>{props.submitCompradosEnConjunto(row)}}>
                            <div>{row.label}</div>
                          </div>
                        </div>
              })}
            </div>
  }

  const submitCompradosEnConjunto=(row)=>{
    let data                =   row
        data.token_temporal =   token_temporal
        data.user           =   context.Store.get("user").token
        data.app            =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","setProductosCompradosEnConjunto",data,context,{name:"callbackSubmitCompradosEnConjunto",funct:callbackSubmitCompradosEnConjunto})
  }

  const callbackSubmitCompradosEnConjunto=(data)=>{
    getInit()
  }

  const deleteFile=(src)=>{
    let data                =   {}
        data.src            =   src.image_path
        data.user           =   context.Store.get("user").token
        data.app            =   JSON.stringify(modulo)
        //return console.log(src);
    Functions.PostAsync("Websites","deleteFile",data,context,{name:"callbackDeleteFile",funct:callbackDeleteFile})
  }

  const callbackDeleteFile=(data)=>{
    getInit()
    context.setModalShow({
      show:false,
      message:"",
    })
  }

  const deleteProductPic=(src)=>{
    context.setModalShow({
      show:true,
      size:"sm",
      message:<Alert src={src} deleteFile={deleteFile} />,
    })
  }

  const openColors=(src,props)=>{
    context.setModalShow({
      show:true,
      footer:true,
      size:"sm",
      message:<Colors src={src}
                      getInit={getInit}
                      setColor={setColor}
                      caracteristicas={props.caracteristicas}
                      open={props.open} />,
    })
  }

  const setColor=(src)=>{
    console.log(src);
  }

  const Colors=(props)=>{
    //console.log(props.src);
    const onChange=(e)=>{
      let data                =   {}
          data.src            =   props.src.image_path
          data.user           =   context.Store.get("user").token
          data[e.target.name] =   e.target.value
          data.app            =   JSON.stringify(modulo)
          //return console.log(data);
      Functions.PostAsync("Websites","setFile",data,context,{name:"callbackSetFile",funct:callbackSetFile})
    }

    const callbackSetFile=(data)=>{
      props.getInit()
    }

    let json =  JSON.parse(props.open.json)

    return  <div className="row">
              <div className="col-12 text-center mb-3">
                Seleccione el color y estilo
              </div>
              <div className="col-12 mb-3">
                <select className="form-control" name="color" onChange={onChange} defaultValue={props.src.color_token}>
                  <option value="">Seleccione el color</option>
                  {data.colores.map((row,key)=>{
                    return <option key={key} value={row.token}>{row.label}</option>
                  })}
                </select>
              </div>
              <div className="col-12 mb-3">
                <select className="form-control" name="estilos" onChange={onChange} defaultValue={props.src.estilos_token}>
                  <option value="">Seleccione el color</option>
                  {data.estilos.map((row,key)=>{
                    return <option key={key} value={row.token}>{row.label}</option>
                  })}
                </select>
              </div>
            </div>
  }

  const dropHandler=(ev)=>{
    ev.preventDefault();
    let elementId = ev.dataTransfer.getData("my_element_id");
        ev.target.appendChild(document.getElementById(elementId));
    let data                =   {}
        data.principal      =   ev.target.childNodes[0].getAttribute("data-token")
        data.reemplazo      =   ev.target.childNodes[1].getAttribute("data-token")
        data.user           =   context.Store.get("user").token
        data.app            =   JSON.stringify(modulo)
        //return console.log(data);
        Functions.PostAsync("Websites","setPositionFile",data,context,{name:"callbackSetPositionFile",funct:callbackSetPositionFile})
        // console.log(ev.target.childNodes[0].getAttribute("data-token"),
        //             ev.target.childNodes[1].getAttribute("data-token"));
  }

  const callbackSetPositionFile=(data)=>{
    getInit()
  }

  const dragOverHandler=(ev)=>{
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
  }

  const ondragstart = (ev,row)=>{
    ev.dataTransfer.setData("my_element_id", ev.target.id);

  }

  const deleteCompradosEnConjunto=(row)=>{
    let data                =   row
        data.user           =   context.Store.get("user").token
        data.app            =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","deleteCompradosEnConjunto",data,context,{name:"callbackDeleteCompradosEnConjunto",funct:callbackDeleteCompradosEnConjunto})
  }

  const callbackDeleteCompradosEnConjunto=(data)=>{
    getInit()
  }

  const onChangeTextarea=(value,name)=>{
    let inputs_ =   {...inputs};
        inputs_[name] = value
        setInputs(inputs_)
  }

  //console.log(inputs);

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
                  <input defaultValue={props.open.label} required={true} type="text" name="label" className="form-control" onChange={onChange} placeholder="Título..." />
                </div>
              </div>
            </div>
            <div className="row pb-2 bg-gray pt-3 sombra" onDrop={dropHandler} onDragOver={dragOverHandler}>
              <div className="col-12">
                <div>
                  <b>Galería</b>
                </div>
              </div>
              <div className="col-12">
                <div className="row prueba"  id="arrastra_aqui">
                  {fotos.map((row,key)=>{
                    return <div className="col-2 text-center" key={key} data-token={row.image_token} data-key={key}>
                              <div className="p-3 h4 border position-relative item-producto-gallery"  draggable={key>0?true:false} onDragStart={e=>{ondragstart(e,row)}} id={key} data-token={row.image_token}>
                                {row.image===undefined?<><input type="file" name={row} accept="image/*"  onChange={(e)=>openGaleria(e,key)} className="filecontent" />+</>:<>
                                    <img src={row.image} className="img-fluid" alt="PGRW"/><div onClick={()=>deleteProductPic(row)} className="deleteProductPic cursor-pointer">x</div>
                                    <div className="mt-2 cursor-pointer" onClick={()=>openColors(row,props)} ><FontAwesomeIcon size="1x" icon={faCog}/></div>
                                    <div className=" color-gray">
                                      {row.color_string}
                                    </div>
                                    <div className=" color-gray">
                                      {row.estilos_string}
                                    </div>
                                  </>
                                }
                              </div>
                            </div>
                  })}
                </div>
              </div>
            </div>
            <div className="row pb-2 mt-3">
              <div className="col">
                <div>
                  <b>Descripción completa</b>
                </div>
                <div>
                  <TextareaEnriquecido
                      defaultValue={props.open.descripcion}
                      autoComplete="off"
                      title="Descripción completa"
                      type="text"
                      name="descripcion"
                      className="form-control"
                      onChange={(e)=>{onChangeTextarea(e,"descripcion")}}
                  />
                </div>
              </div>
            </div>
            <div className="row  pb-2 border-top mt-3 bg-warning p-2 pt-4 pb-4 sombra">
              <div className="col-12 mb-3">
                <b>SEO título (<span>{seoTitle}</span>)</b>
                <div>
                  <input defaultValue={props.open.SEO_label} required={true} type="text" name="SEO_label" className="form-control" onChange={onChange} placeholder="SEO título" />
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Descripción SEO max 170 Caracteres (<span>{seoDescripcion}</span>)</b>
                </div>
                <div>
                  <textarea name="SEO_descripcion" defaultValue={props.open.SEO_descripcion} className="form-control" onChange={onChange}></textarea>
                </div>
              </div>
            </div>
            <div className="row  pb-2 border-top mt-3 ">
              <div className="col-12 mb-3">
                <b>Comprados en conjunto</b>
              </div>
              <div className="col-12">
                <div className="row prueba"  id="arrastra_aqui">
                  {compradosEnConjunto.map((row,key)=>{
                    if (row==='') {
                      return <div className="col-2 text-center" key={key} data-token={row.image_token} data-key={key}>
                                <div className="p-3 h4 border position-relative item-producto-gallery cursor-pointer" onClick={openCompradosEnConjunto}>
                                  <div>+</div>
                                </div>
                              </div>
                    }else {
                      return  <div className="col-4 text-center" key={key} data-token={row.image_token} data-key={key}>
                                <div className="p-3 h4 border position-relative item-producto-gallery">
                                  <div onClick={()=>deleteCompradosEnConjunto(row)} className="deleteProductPic cursor-pointer">x</div>
                                  <div className="color-gray">{row.label}</div>
                                </div>
                              </div>
                    }

                  })}
                </div>
              </div>
            </div>
            <div className="row  pb-2 border-top mt-3 ">
              <div className="col">
                <b>Visualizar</b>
              </div>
            </div>
            <div className="row  pb-2 border-bottom  mb-3">
              <div className="col">
                <div>
                  <b>Activar Preguntas</b>
                </div>
                <div>
                  <select name="activar_preguntas" className="form-control" defaultValue={props.open.activar_preguntas} onChange={onChange}>
                    <option value="">Seleccione</option>
                    <option value="0">No</option>
                    <option value="1">Si</option>
                  </select>
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Producto más vendido</b>
                </div>
                <div>
                  <select name="mas_vendido" className="form-control" defaultValue={props.open.mas_vendido} onChange={onChange}>
                    <option value="">Seleccione</option>
                    <option value="0">No</option>
                    <option value="1">Si</option>
                  </select>
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Inventario</b>
                </div>
                <div>
                  <select name="ver_inventario" className="form-control" defaultValue={props.open.ver_inventario} onChange={onChange}>
                    <option value="">Seleccione</option>
                    <option value="0">No</option>
                    <option value="1">Si</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row  pb-2 border-top mt-3 ">
              <div className="col">
                <b>Características</b>
              </div>
            </div>
            <div className="row  pb-2">
              <div className="col">
                <div>
                  <b>Producto físico o virtual</b>
                </div>
                <div>
                  <select defaultValue={props.open.producto_fisico_virtual} className="form-control" name="producto_fisico_virtual" onChange={onChange}>
                    <option value="">Seleccione</option>
                    {fisico_virtual.map((row,key)=>{
                      return <option key={key} value={row}>{row}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Se puede retirar personalmente</b>
                </div>
                <div>
                  <select defaultValue={props.open.se_puede_retirar_personalmente} className="form-control" name="se_puede_retirar_personalmente" onChange={onChange}>
                    <option value="">Seleccione</option>
                    {si_no.map((row,key)=>{
                      return <option key={key} value={row}>{row}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Se hacen envíos internacionales</b>
                </div>
                <div>
                  <select defaultValue={props.open.envio_internacional} className="form-control" name="envio_internacional" onChange={onChange}>
                    <option value="">Seleccione</option>
                    {si_no.map((row,key)=>{
                      return <option key={key} value={row}>{row}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="row  pb-2">
              <div className="col">
                <div>
                  <b>Código de referencia</b>
                </div>
                <div>
                  <input defaultValue={props.open.codigo_referencia} type="text" name="codigo_referencia" className="form-control" onChange={onChange} placeholder="Código de referencia" />
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Precio</b>
                </div>
                <div>
                  <input defaultValue={props.open.precio===undefined||props.open.precio===''?0:props.open.precio} type="text" name="precio" className="form-control" onChange={onChange} placeholder="Precio de venta" />
                </div>
              </div>
              <div className="col">
                <div>
                  <b>Oferta</b>
                </div>
                <div>
                  <input defaultValue={props.open.oferta===undefined || props.open.oferta===''?0:props.open.oferta} type="text" name="oferta" className="form-control" onChange={onChange} placeholder="Oferta" />
                </div>
              </div>
            </div>

            <div className="row pb-5">
              <div className="col">
                <div>
                  <b>Peso (Gr)</b>
                </div>
                <div>
                  <input defaultValue={props.open.peso} type="number" name="peso" className="form-control" onChange={onChange} placeholder="Peso" />
                </div>
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
            <Tabs defaultActiveKey="home0" id="uncontrolled-tab-example">
            {
              dependencias.map((row,key)=>{
                let json    =   {}
                if (props.open.json!==undefined && props.open.json!=='' && props.open.json!=='{}') {
                    json    =   JSON.parse(props.open.json)
                }
                if (props.caracteristicas[row] !==undefined && props.caracteristicas[row].label!==undefined) {
                  return  <Tab eventKey={"home"+key} title={props.caracteristicas[row].label} key={key}>
                            <div className="row pt-4 pb-4 bg-light">
                              {data[props.caracteristicas[row].value]!==undefined?<>
                                { data[props.caracteristicas[row].value].map((row2,key2)=>{

                                    let check   =  false
                                    if (json[row]!==undefined && json[row].includes(row2.token)) {
                                       check=true
                                    }
                                    return  <div key={key2} className="col-12 col-sm-4 mb-2 border-left bg-gray">
                                              <div className="form-check">
                                                <input
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
                          </Tab>
                }else {
                  return false
                }
              })
            }
            </Tabs>
          </form>
}

export default App
