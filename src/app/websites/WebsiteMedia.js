import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Sliders from '../../app/media/sliders'
import Table from 'react-bootstrap/Table'
import TablePaginador from '../../screens/tablePaginador';
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

let typeElement="sliders"


const caracteristicas = {
  sliders:{
    label:"Sliders",
    value:"sliders",
    table:"op_sliders",
    key_name:"op_slider_id",
    component:Sliders
  },
  carousel:{
    label:"Carousel",
    value:"carousel",
    table:"op_carousel",
    key_name:"op_carousel_id",
    component:Sliders,
  },
  banners:{
    label:"Banners",
    value:"banners",
    table:"op_banners",
    key_name:"op_banners_id",
    component:Sliders
  },
}

const App=(props)=>{
  const context                       =   React.useContext(StateContext);
  const [open, setOpen]               =   useState(false);
  const [inputs, setInputs] = useState({});
  const [data, setData]     = useState([]);

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
        data.type   =   typeElement
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Media","getOpSectionMedia",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setData(data.response.data);
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let data                                    =   inputs
        data.["op_tienda_"+typeElement+"_id"]   =   open["op_tienda_"+typeElement+"_id"]
        data.type   =   typeElement
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Media","setOpSectionMedia",data,context,{name:"callbackContinue",funct:callbackContinue})
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
                      setOpen={setOpen}/>
  }

  return  <div className="container ">
            <div className="row">
              <div className="col-12 col-sm-3 d-none d-md-block">
                {Object.entries(caracteristicas).map((row,key)=>{
                  let caracteristica=row[1]
                  return  <div className="card mb-2" key={key} id={row[0]}>
                            <div className={typeElement===caracteristica.value?"card-body text-left p-1 bg-dark text-white":"card-body text-left p-1"}>
                              <div className="cursor-pointer pl-2" onClick={()=>setOpenSection(caracteristica.value)}>
                                {caracteristica.label}
                              </div>
                            </div>
                          </div>
                })}
              </div>
              <div className="col-12 col-sm-12 d-block d-md-none">
                <select className="form-control" defaultValue={typeElement}>
                  <option value="productos">Seleccione el módulo</option>
                  {Object.entries(caracteristicas).map((row,key)=>{
                    let caracteristica=row[1]
                    return  <option key={key} onClick={()=>setOpenSection(caracteristica.value)}>
                              {caracteristica.label}
                            </option>

                  })}
                </select>
              </div>
              {open?<div className="col-12 col-sm">
                        <div className="card">
                          <div className="card-body">
                            {caracteristicas[typeElement]!==undefined && caracteristicas[typeElement].component===undefined?<><form onSubmit={onSubmit}>
                                <div className="row mb-2">
                                  <div className="col">
                                    Título
                                  </div>
                                  <div className="col">
                                    <input defaultValue={open.label} required={true} type="text" name="label" className="form-control" onChange={onChange} placeholder="Título" />
                                  </div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col ">
                                    <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                      <button type="submit" className="btn btn-primary">Guardar</button>
                                      <div className="btn btn-danger" onClick={()=>setOpen(false)}>Cancelar</div>
                                    </div>
                                  </div>
                                </div>
                                </form>
                              </>:render_(caracteristicas[typeElement].component)
                            }
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
