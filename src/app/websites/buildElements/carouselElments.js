import React,{useState,useEffect} from 'react';
import Functions from '../../../helpers/Functions';
import Select from '../../../screens/select';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

let si_no   =   [
                  {label:"Si",value:true},
                  {label:"No",value:false}
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
    Functions.PostAsync("Websites","getCarouselByGroup",data,context,{name:"callbackInit",funct:callbackInit})
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
        data.type         =   "carousel"
        data.tabla        =   "op_carousel"
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
    //setData(data.response.data);
  }

  const onChange=(e)=>{
    let inputs_ =   inputs;
        inputs_[e.target.name]=e.target.value
        setInputs(inputs_)
  }

  //console.log(props);

  return    <>{data.length>0?<form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-12 mb-3">
                  <select name="key_id" className="form-control"
                          onChange={onChange} defaultValue={(props.data!==undefined)?props.data.key_id:false}>
                    <option value="">Seleccione</option>
                    {data.map((row,key)=>{
                      return <option key={key}>{row.grupo}</option>
                    })}
                  </select>
                </div>
                <div className="col-12 col-sm-3 mb-2">
                  <Select
                      defaultValue={(props.data!==undefined)?props.data.draggable:false}
                      data={si_no}
                      title="Arrastrable"
                      name="draggable"
                      className="form-control"
                      onChange={onChange}
                      selectDefault={"Seleccione"}
                    />
                </div>
                <div className="col-12 col-sm-3 mb-2">
                  <Select
                      defaultValue={(props.data!==undefined)?props.data.showDots:false}
                      data={si_no}
                      title="Mostrar punto"
                      name="showDots"
                      className="form-control"
                      onChange={onChange}
                      selectDefault={"Seleccione"}
                    />
                </div>
                <div className="col-12 col-sm-3 mb-2">
                  <Select
                      defaultValue={(props.data!==undefined)?props.data.infinite:false}
                      data={si_no}
                      title="Infinito"
                      name="infinite"
                      className="form-control"
                      onChange={onChange}
                      selectDefault={"Seleccione"}
                    />
                </div>
                <div className="col-12 col-sm-3 mb-2">
                  <Select
                      defaultValue={(props.data!==undefined)?props.data.autoPlay:false}
                      data={si_no}
                      title="Autoplay"
                      name="autoPlay"
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
