import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Input from '../../screens/inputs';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);


const test                  =   false
const elements              =   {
                                  label:test,
                                  descripcion:test,
                                }

let color                  =   ""

const App =()=>{

  const context               =   React.useContext(StateContext);
  const [inputs, setInputs]   =   useState(elements);
  const [colores, setColores] =   useState([]);
  const [tecnologias, setTecnologias] =   useState([]);
  const modulo                =   Functions.segments_modulos(queryStringParams.app);

  const onChange=(e)=>{
    let inputs_ =   {...inputs};
        inputs_[e.target.name]=e.target.value
        setInputs(inputs_)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let data        =   inputs
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Configuracion","set",data,context,{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{
    context.setModalShow({
      show:true,
      footer:true,
      message:<div className="text-center">Los datos han sido guardados correctamente</div>,
    })
  }

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    let data                =   {}
        data.user           =   context.Store.get("user").token
        data.grupo          =   "default"
        data.app            =   JSON.stringify(modulo)
    Functions.PostAsync("Configuracion","get",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setColores(data.response.colores)
    setInputs({servicios:data.response.data.servicios})
    setTecnologias(data.response.tecnologias)
  }

  const changeColors=(e)=>{
    color = e.target.value
  }

  const onSubmitColor=()=>{
    let data                =   {
                                  color:color,
                                  label:inputs.label
                                }
        data.user           =   context.Store.get("user").token
        data.app            =   JSON.stringify(modulo)
    Functions.PostAsync("Configuracion","setColor",data,context,{name:"callbackColor",funct:callbackColor})
  }

  const callbackColor=()=>{
    getInit()
    var elementos = document.getElementsByClassName("form-control clear");
        elementos.value=""
  }

  const onSubmitTecnologia=()=>{
    let data                =   {...inputs}
        data.user           =   context.Store.get("user").token
        data.color          =   color
        data.app            =   JSON.stringify(modulo)
    Functions.PostAsync("Configuracion","setTecnologia",data,context,{name:"callbackTecnologia",funct:callbackTecnologia})
  }

  const callbackTecnologia=()=>{
    getInit()
    var elementos = document.getElementsByClassName("form-control clear");
        elementos.value=""
  }


  return  <div className="container">
            <div className="row">
              <div className="col">
                <Tabs defaultActiveKey="services" id="uncontrolled-tab-example">
                  <Tab eventKey="colors" title="Colores del sistema">
                    <div className="card">
                      <div className="card-content">
                        <div className="row mt-3  ">
                          <div className="col-3 text-right">
                            <b>Colores del sistema</b>
                          </div>
                          <div className="col-3">
                            <input className="form-control clear" type="text" name="label" onChange={onChange} />
                          </div>
                          <div className="col-1">
                            <input className="form-control clear" type="color" name="color" onChange={changeColors} />
                          </div>
                          <div className="col-3">
                            <div className="btn btn-primary" onClick={onSubmitColor}>
                              Agregar
                            </div>
                          </div>
                        </div>
                        <div className="row mt-3 mb-3 pl-5 pr-5">
                          {colores.map((row,key)=>{
                            return  <div className="col-2 text-center" key={key} style={{
                                                                              borderBottomColor:row.color,
                                                                              borderBottomStyle:"solid",
                                                                              borderBottomWidth:"3px",
                                                                              }}>
                                      {row.label}
                                    </div>
                          })}

                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="colors2" title="Tecnologías implementadas">
                    <div className="card">
                      <div className="card-content">
                        <div className="row mt-3  ">
                          <div className="col-6 text-right">
                            <b>Tecnologías que implementa la empresa en sus proyectos</b>
                          </div>
                          <div className="col-3">
                            <input className="form-control clear" type="text" name="label" onChange={onChange} />
                          </div>
                          <div className="col-1">
                            <input className="form-control clear" type="color" name="color" onChange={changeColors} />
                          </div>
                          <div className="col-2">
                            <div className="btn btn-primary" onClick={onSubmitTecnologia}>
                              Agregar
                            </div>
                          </div>
                        </div>
                        <div className="row mt-3 mb-3 pl-5 pr-5">
                          {tecnologias.map((row,key)=>{
                            return  <div className="col-2 text-center" key={key} style={{
                                                                              borderBottomColor:row.color,
                                                                              borderBottomStyle:"solid",
                                                                              borderBottomWidth:"3px",
                                                                              }}>
                                      {row.label}
                                    </div>
                          })}

                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="services" title="Servicios">
                    <div className="card">
                      <div className="card-content">
                        <form onSubmit={onSubmit}>
                          <div className="card-body">
                            <Input
                                defaultValue={test?test:inputs.servicios}
                                title="¿Qué servicios presta la empresa? colocar cada servicio separados por punto y coma (;)"
                                type="text"
                                name="servicios"
                                className="form-control"
                                onChange={onChange}
                            />
                            <div className="row justify-content-center pt-3">
                              <div className="col-3 text-center">
                                <button className="btn btn-primary btn-block" type="submit">Guardar</button>
                              </div>
                              <div className="col-3 text-center">
                                <a href={context.Config.ConfigAppUrl+"apanel?app=listar::modulos::paginasWeb::Páginas Web::websites::1"} className="btn btn-danger btn-block text-white">
                                  Cerrar
                                </a>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
}
export default App
