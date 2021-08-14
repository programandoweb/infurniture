import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import getCroppedImg from '../../helpers/cropImage'
import Input from '../../screens/inputs';
import Textarea from '../../screens/textarea';
import Select from '../../screens/select';
import Cropper from '../../screens/Cropper'
import Comentarios from '../comentarios'
import { faSave,faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);


const test =   false
let id               = 0
let cropperOpen     =  false
let cropperImagenes =  false
const tamano_partes_img = 100000;
let token_temporal
let vuelta_uploadPart   =   0
let partes_imagen       =   [];
let estatus             =   [
                              {
                                label:"Seleccione",
                                value:"",
                              },
                              {
                                label:"Registrado",
                                value:"1",
                              },
                              {
                                label:"En proceso",
                                value:"2",
                              },
                              {
                                label:"Terminado",
                                value:"3",
                              },
                              {
                                label:"Anulado",
                                value:"4",
                              },
                            ];

const App = (props)  =>{

  const context             =   React.useContext(StateContext);
  const modulo              =   Functions.segments_modulos(queryStringParams.app);

  const [inputs, setInputs] = useState({});
  const [reset, setReset]   = useState(false);
  const [image, setImage]   = useState(false);
  const [dependientes, setDependientes]   = useState([]);

  useEffect(() => {
    setInputs(props.open)
    setDependientes(props.open.dependientes_de_mi_object)
  },[props.open])

  const onSubmit=(e)=>{
    e.preventDefault()
    if (!props.isAdmin) {
      return false;
    }
    let data                      =   {...inputs}
        delete data.image_parts
        data.user             =  context.Store.get("user").token
        data.typeElement      =  props.typeElement
        data.table            =   props.caracteristicas[props.typeElement].table
        data.key_name         =   props.caracteristicas[props.typeElement].key_name
        data.key_value        =   inputs[data.key_name]
        data.proyecto_token   =   props.proyecto_token
        data.op_proyectos_tareas_id = props.open.op_proyectos_tareas_id
        data.app        =   JSON.stringify(modulo)
    Functions.PostAsync("Proyectos","setTarea",data,context,{name:"callbackContinue",funct:callbackContinue})
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

  const activarTarea=(row)=>{
    let data                        =   {}
        data.user                   =  context.Store.get("user").token
        data.op_proyectos_tareas_id =   row.value
        data.app                    =   JSON.stringify(modulo)
    Functions.PostAsync("Proyectos","setEstatusTarea",data,context,{name:"callbackActivarTarea",funct:callbackActivarTarea})
  }

  const callbackActivarTarea=(data)=>{
    setDependientes(data.response.dependientes);
  }

  return  <><form onSubmit={onSubmit}>
            <div className="row mb-3">
              <div className="col text-right ">
                {props.isAdmin?<button type="submit" className="btn btn-primary mt-2"><FontAwesomeIcon icon={faSave}/> Guardar</button>:false}
                <div type="buttom" className="btn btn-danger mt-2 ml-1" onClick={()=>props.setOpen(false)}><FontAwesomeIcon icon={faWindowClose}/> {props.isAdmin?"Cancelar":"Volver atrás"}</div>
              </div>
            </div>
            <div className="row pb-2">
              <div className="col">
                {props.open.editable || props.open===true?<Input
                      defaultValue={test?test:inputs.label}
                      autoComplete="off"
                      limiteCaracteres="70"
                      title="Título de la actividad"
                      type="text"
                      name="label"
                      className="form-control"
                      onChange={onChange}
                  />:<h3>{inputs.label}</h3>}
              </div>
              <div className="col">
                <Select
                    disabled={context.Store.get("user").usuario_id!==props.open.usuario_id?true:false}
                    selectDefault="Seleccione el estado de la tarea"
                    defaultValue={test?test:props.open.estatus}
                    data={estatus}
                    readonly={props.open.dependiente_string!=='Independiente' && props.open.dependiente_estatus==="1"?true:false}
                    title="Estado de la tarea"
                    name="estatus"
                    className="form-control"
                    onChange={onChange}
                  />

                  {
                    props.open.dependientes_de_mi_object && props.open.dependiente_estatus!=="1" && context.Store.get("user").usuario_id===props.open.usuario_id?<>
                      <div className="p-2">
                        <div className="text-primary mb-2   ">Tareas dependientes de este proyecto</div>
                        {dependientes.map((row,key)=>{
                          return  <div key={key} className="btn btn-primary btn-sm btn-block mb-2" onClick={()=>activarTarea(row)}>
                                    {row.estatus==='1'?"Activar ":"Desactivar "} {row.label}
                                  </div>
                        })}
                      </div>
                    </>:false
                  }
              </div>
              <div className="col">
                <Select
                    disabled={context.Store.get("user").usuario_id!==props.open.usuario_id?true:false}
                    selectDefault="Seleccione la prioridad"
                    defaultValue={test?test:props.open.prioridad}
                    data={props.prioridad}
                    title="Prioridad"
                    name="prioridad"
                    className="form-control"
                    onChange={onChange}
                  />
              </div>
            </div>
            <div className={props.open.editable || props.open===true?"row pb-2":"d-none"}>
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
              <div className="col">
                <Select
                    selectDefault="Asignar a:"
                    defaultValue={test?test:props.open.asignado_a_id}
                    data={props.empleados}
                    title="Asignar a"
                    name="asignado_a_id"
                    className="form-control"
                    onChange={onChange}
                  />
              </div>
              { (props.open.dependiente_object!==undefined &&
                props.open.dependiente_object.length>0 &&
                props.open.dependiente!==undefined &&
                props.open.dependiente!=='') || props.tareasAll.length>0?<div className="col">
                <Select
                    selectDefault="Tarea dependiente de:"
                    defaultValue={props.open.dependiente}
                    data={props.open.dependiente_object!==undefined?props.open.dependiente_object:props.tareasAll}
                    excepcion={inputs.label}
                    title="Tarea dependiente de"
                    name="dependiente"
                    className="form-control"
                    onChange={onChange}
                  />
              </div>:false}
            </div>
            {props.open.editable || props.open===true?<Textarea
                defaultValue={test?test:inputs.descripcion}
                title="Descripción de la actividad"
                type="text"
                name="descripcion"
                className="form-control"
                onChange={onChange}
            />:<div className="mb-5">Descripción:<b>{inputs.descripcion}</b></div>}
          </form>
          {props.open!==true?<Comentarios id={props.open.token} />:false}
        </>
}

export default App
