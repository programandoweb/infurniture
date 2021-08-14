import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Table from 'react-bootstrap/Table'
import Matriz from '../../app/matriz/form'
import TablePaginador from '../../screens/tablePaginador';
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

let typeElement="matriz"


const caracteristicas = {
  matriz:{
    label:"maquetación",
    value:"maquetacion",
    table:"op_maquetacion",
    key_name:"op_maquetacion_id",
    component:Matriz
  },
}

const App=(props)=>{
  const context                       =   React.useContext(StateContext);
  const [open, setOpen]               =   useState(false);
  const [inputs, setInputs] = useState({});
  const [data, setData]     = useState([]);
  const [categorias, setCategorias]     = useState([]);

  const modulo  =   Functions.segments_modulos(queryStringParams.app);

  const onChange=(e)=>{
    let inputs_ =   {...inputs};
        inputs_[e.target.name] = e.target.value
        setInputs(inputs_)
  }

  useEffect(() => {
    if (open) {
      setInputs(open)
    }
  },[open])

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    setOpen(false)
    let data        =   {...inputs}
        data.op_maquetacion_id  =   open.op_maquetacion_id
        data.type   =   typeElement
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","getMaquetacionAll",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setCategorias(data.response.maquetacion)
    setData(data.response.data);
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let data              =   {...inputs}
        data.user         =   context.Store.get("user").token
        data.op_maquetacion_id  =   open.op_maquetacion_id
        data.typeElement  =   typeElement
        data.table        =   caracteristicas[typeElement].table
        data.key_name     =   caracteristicas[typeElement].key_name
        data.key_value    =   inputs[data.key_name]
        data.app          =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","setMaquetacion",data,context,{name:"callbackContinue",funct:callbackContinue})
  }
  const callbackContinue=(data)=>{
    setInputs({})
    setOpen(false)
    getInit()
  }

  const SetOpCaracteristicas=()=>{
    return <div></div>
  }

  const setOpenSection=(categoria)=>{
    typeElement=categoria
    getInit()
  }

  const render_=  (Component)  =>{
    return <Component getInit={getInit}
                      caracteristicas={caracteristicas}
                      typeElement={typeElement}
                      modulo={modulo}
                      open={open}
                      categorias={categorias}
                      setOpen={setOpen}/>
  }



  return  <div className="container ">
            <div className="row">
              {open?<div className="col-12 col-sm">
                        <div className="card">
                          <div className="card-body">
                            <Matriz
                              setOpen={setOpen}
                              open={open}
                              onSubmit={onSubmit}
                              onChange={onChange}
                            />
                          </div>
                        </div>
                    </div>:<></>
              }
              {
                !open?<div className="col-12 col-sm">
                        <div className="row mb-2">
                          <div className="col text-right">
                            <div className="btn btn-primary" onClick={()=>setOpen(true)}>
                              Agregar
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="bg-white">
                              <TablePaginador setOpen={setOpen}  data={data} thead={[
                                                    {
                                                      label:"#",
                                                      value:"#",
                                                    },
                                                    {
                                                      label:"Título",
                                                      value:"label",
                                                    },
                                                    {
                                                      label:"Editar",
                                                      value:"editar",
                                                      extra:{
                                                              label:<FontAwesomeIcon icon={faCog}/>,
                                                              url:context.Config.ConfigAppUrl+"apanel/websites/matriz/edit?app="+queryStringParams.app+"&id=",
                                                            }
                                                    },
                                                  ]}
                              />
                            </div>
                          </div>
                        </div>
                      </div>:<></>
              }
            </div>
          </div>
}
export default App
