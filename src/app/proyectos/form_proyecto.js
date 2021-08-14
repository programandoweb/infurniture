import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import getCroppedImg from '../../helpers/cropImage'
import Input from '../../screens/inputs';
import Textarea from '../../screens/textarea';
import Select from '../../screens/select';
import Cropper from '../../screens/Cropper'
import Carpetas from '../carpetas';
import { faSave,faWindowClose,faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);


const test =   false
let id  = 0
let token_temporal
let tecnologias_implementadas  =   [];

const App = (props)  =>{

  const context             =   React.useContext(StateContext);
  const modulo              =   Functions.segments_modulos(queryStringParams.app);

  const [inputs, setInputs] = useState({});
  const [inputTecnologias, setInputTecnologias] = useState({});
  const [reset, setReset]   = useState(false);
  const [image, setImage]   = useState(false);

  useEffect(() => {
    setInputs(props.open)
    if (props.open.fecha_inicio_proyecto!=='') {
      document.getElementById("fecha_tentativa_entrega_proyecto").min   =   props.open.fecha_inicio_proyecto;
    }
  },[props.open])

  const onSubmit=(e)=>{
    e.preventDefault()
    let data                      =   {...inputs}
        delete data.image_parts
        data.user         =   context.Store.get("user").token
        data.typeElement  =   props.typeElement
        data.table        =   props.caracteristicas[props.typeElement].table
        data.key_name     =   props.caracteristicas[props.typeElement].key_name
        data.key_value    =   inputs[data.key_name]
        data.app          =   JSON.stringify(modulo)
    Functions.PostAsync("Proyectos","set",data,context,{name:"callbackContinue",funct:callbackContinue})
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
      if (e.target.name==="fecha_inicio_proyecto") {
        document.getElementById("fecha_tentativa_entrega_proyecto").min   =   e.target.value;
      }
  }

  const onChangeTecnologias=(e)=>{
    tecnologias_implementadas = e.target.value
  }

  const onClickTecnologias=()=>{
    let inputs_                   =   {...inputs};
        if (inputs_.tecnologias===undefined) {
          inputs_.tecnologias     =   []
        }
        inputs_.tecnologias.push(tecnologias_implementadas)
        setInputs(inputs_)
        tecnologias_implementadas =   ''
  }

  return  <form onSubmit={onSubmit}>
            <div className="row mb-3">
              <div className="col text-right ">
                <button type="submit" className="btn btn-primary mt-2"><FontAwesomeIcon icon={faSave}/> Guardar</button>
                <div type="buttom" className="btn btn-danger mt-2 ml-1" onClick={()=>props.setOpen(false)}><FontAwesomeIcon icon={faWindowClose}/> Cancelar</div>
              </div>
            </div>
            <div className="row mb-3 sombra">
              <div className="col-12 mb-3">
                <div className="bg-primary p-3">
                  <b className="text-white">Información del proyecto</b>
                  {
                    props.open.tareas!==undefined && Array.isArray(props.open.tareas)?<>
                      {props.open.tareas.map((row,key)=>{
                        return <div key={key} className=" row text-white">
                                  <div className="col-12 col-sm-4">
                                    {row.label}
                                  </div>
                                  <div className="col-12 col-sm-6">
                                    Responsable:<b>{row.asignado_a.nombres}</b>
                                  </div>
                                </div>
                      })}
                    </>:false
                  }
                </div>
              </div>
              <div className="col-12 mb-3">
                <Carpetas id={props.open.token}/>
              </div>
            </div>
            <div className="row pb-2">
              <div className="col">
                  <Input
                      defaultValue={test?test:inputs.label}
                      autoComplete="off"
                      limiteCaracteres="70"
                      title="Título del proyecto"
                      type="text"
                      name="label"
                      className="form-control"
                      onChange={onChange}
                  />
              </div>
            </div>
            <div className="row pb-2">
              <div className="col">
                <Select
                    selectDefault="Cliente"
                    defaultValue={test?test:props.open.cliente_id}
                    data={props.clientes}
                    title="Cliente"
                    name="cliente_id"
                    className="form-control"
                    onChange={onChange}
                  />
              </div>
              <div className="col">
                <Select
                    selectDefault="Servicio prestado"
                    defaultValue={test?test:props.open.servicio}
                    data={props.servicios}
                    title="Servicio prestado"
                    name="servicio"
                    className="form-control"
                    onChange={onChange}
                  />
              </div>
            </div>
            <div className="row pb-2">
              <div className="col">
                  <Input
                      defaultValue={test?test:inputs.fecha_inicio_proyecto}
                      autoComplete="off"
                      title="Fecha de inicio del proyecto"
                      type="date"
                      name="fecha_inicio_proyecto"
                      className="form-control"
                      onChange={onChange}
                  />
              </div>
              <div className="col">
                  <Input
                      id="fecha_tentativa_entrega_proyecto"
                      defaultValue={test?test:inputs.fecha_tentativa_entrega_proyecto}
                      autoComplete="off"
                      title="Fecha tentativa de entrega del proyecto"
                      type="date"
                      name="fecha_tentativa_entrega_proyecto"
                      className="form-control"
                      onChange={onChange}
                  />
              </div>
              <div className="col">
                  <Input
                      defaultValue={test?test:inputs.fecha_entrega_proyecto}
                      autoComplete="off"
                      title="Fecha final entrega del proyecto"
                      type="date"
                      name="fecha_entrega_proyecto"
                      disabled={true}
                      className="form-control"
                      onChange={onChange}
                  />
              </div>
            </div>
            <div className="row">
              <div className="col">
                  <Textarea
                      defaultValue={test?test:inputs.descripcion}
                      autoComplete="off"
                      title="Descripción del proyecto"
                      name="descripcion"
                      className="form-control"
                      onChange={onChange}
                  />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Select
                    selectDefault="Selecciene la tecnología utilizada"
                    defaultValue={test?test:props.open.servicio}
                    data={props.tecnologias}
                    title="Tecnologías utilizadas"
                    name="tecnologias"
                    className="form-control"
                    onChange={(e)=>onChangeTecnologias(e)}
                  />
                <div className="btn btn-primary mr-2" onClick={onClickTecnologias}>Agregar</div>
                <a className="btn btn-warning" href={context.Config.ConfigAppUrl+"apanel/configuracion/sistema?app=listar::configuracion::tablas_maestras::Configuración del sistema::configuracion/sistema::1"}>Crear Tecnologías</a>
              </div>
              <div className="col">
                {
                  inputs.tecnologias!==undefined && Array.isArray(inputs.tecnologias)?<>
                    <div className="border-bottom">Tecnologías</div>
                    {inputs.tecnologias.map((row,key)=>{
                      let indice = props.tecnologias.findIndex(buscar => buscar.value === row);
                      return <div key={key} className="badge mb-2 mr-1" style={{backgroundColor:(props.tecnologias[indice]!==undefined?props.tecnologias[indice].color:"")}}>{(props.tecnologias[indice]!==undefined)?props.tecnologias[indice].label:""}</div>
                    })}
                  </>:false
                }
                {props.open.tecnologias_implementadas!==undefined && props.open.tecnologias_implementadas.length>0?<div className="border-bottom">Tecnologías en la base de datos</div>:false}
                {props.open.tecnologias_implementadas!==undefined && props.open.tecnologias_implementadas.length>0?<>
                  {props.open.tecnologias_implementadas.map((row,key)=>{
                    return <div key={key} className="badge mb-2 mr-1" style={{backgroundColor:(props.tecnologias[row.op_tecnologias_id]!==undefined?props.tecnologias[row.op_tecnologias_id].color:"")}}>{row.label}</div>
                  })}
                </>:false}
              </div>
            </div>
          </form>
}

export default App
