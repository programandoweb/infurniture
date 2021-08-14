import React,{useState,useEffect} from 'react';
import Functions from '../../../helpers/Functions';
import Select from '../../../screens/select';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

let si_no   =   [
                  {label:"Si",value:true},
                  {label:"No",value:false}
                ]

let numeros =   [
                  {label:"2",value:2},
                  {label:"3",value:3},
                  {label:"4",value:4},
                  {label:"5",value:5},
                  {label:"6",value:6},
                  {label:"7",value:7},
                  {label:"8",value:8},
                ]

let temas =   [
                  {label:"Básico",value:'basico'},
                  {label:"Tienda con menú",value:'tienda'},
                  {label:"Carousel",value:'carousel'},
                ]

const App=(props)=>{
  const context             =   props.context;
  const modulo              =   Functions.segments_modulos(queryStringParams.app);
  const [open, setOpen]     =   useState(false);
  const [data, setData]     =   useState([]);
  const [inputs, setInputs] =   useState({});

  const getInit=()=>{
    let data        =   {}
        data.user         =   context.Store.get("user").token
        data.app          =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","getTiendaByGroup",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setData(data.response.data);
  }

  useEffect(() => {
    getInit()
    let inputs_ = {...props.data}
        setInputs(inputs_)
  },[])

  const onSubmit=(e)=>{
    e.preventDefault()
    let data              =   inputs
        data.user         =   context.Store.get("user").token
        data.token        =   props.id
        data.maquetacion_token  = (props.data!==undefined)?props.data.token:""
        data.orden        =   props.orden
        data.type         =   "tienda"
        data.tabla        =   "op_tienda"
        data.key          =   "grupo"
        data.app          =   JSON.stringify(modulo)
        Functions.PostAsync("Websites","setElements",data,context,{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{
    context.setModalShow({
      show:false,
      message:"",
    })
    props.getInit()
  }

  const onChange=(e)=>{
    let inputs_ =   inputs;
        inputs_[e.target.name]=e.target.value
        setInputs(inputs_)
  }

  //console.log(props);

  return    <>{data.length>0?<form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-12 col-sm-6 mb-2">
                  <Select
                      defaultValue={(props.data!==undefined)?props.data.plantilla:false}
                      data={temas}
                      title="Plantilla"
                      name="plantilla"
                      className="form-control"
                      onChange={onChange}
                      selectDefault={"Seleccione"}
                    />
                </div>
                <div className="col-12 col-sm-3 mb-2">
                  <Select
                      defaultValue={(props.data!==undefined)?props.data.key_id:false}
                      data={data}
                      title="Categorías"
                      name="key_id"
                      className="form-control"
                      onChange={onChange}
                      selectDefault={"Todas"}
                    />
                </div>
                <div className="col-12 col-sm-3 mb-2">
                  <Select
                      defaultValue={(props.data!==undefined)?props.data.destacados:false}
                      data={si_no}
                      title="Destacados"
                      name="destacados"
                      className="form-control"
                      onChange={onChange}
                      selectDefault={"Seleccione"}
                    />
                </div>
                <div className="col-12 col-sm-3 mb-2">
                  <Select
                      defaultValue={(props.data!==undefined)?props.data.cantidad:false}
                      data={numeros}
                      title="Cantidad"
                      name="cantidad"
                      className="form-control"
                      onChange={onChange}
                      selectDefault={"Seleccione"}
                    />
                </div>
                <div className="col-12 col-sm-3 mb-2">
                  <Select
                      defaultValue={(props.data!==undefined)?props.data.tiempo:false}
                      data={numeros}
                      title="Tiempo de transición"
                      name="tiempo"
                      className="form-control"
                      onChange={onChange}
                      selectDefault={"Seleccione"}
                    />
                </div>
                <div className="col-12">
                  <button className="btn btn-primary btn-block" type="submit" >Agregar</button>
                </div>
              </div>
            </form>:false}</>
}


export default App
