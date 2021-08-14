import React,{useState,useEffect} from 'react';
import Functions from '../../../helpers/Functions';
import StateContext from '../../../helpers/ContextState';
import Config from '../../../helpers/Config';
import Input from '../../../screens/inputs';
import Select from '../../../screens/select';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);
const App=()=>{
  const context         =   React.useContext(StateContext);
  const modulo          =   Functions.segments_modulos(queryStringParams.app);
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState([]);
  const [tipo_funcionario, setTipo_funcionario] = useState([]);
  const [tipo_identificacion, setTipo_identificacion] = useState([]);
  const [estado_civil, setEstado_civil] = useState([]);
  const [departamento, setDepartamento] = useState([]);
  const [municipio, setMunicipio] = useState([]);
  const [data2, setData2] = useState([]);
  const [privilegios, setPrivilegios] = useState({});
  const [tipos, settipos] = useState([]);
  const [emailNoDisponible, setEmailNoDisponible] = useState(false);

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    let data        =   {}
        data.user   =   context.Store.get("user").token
        data.token  =   queryStringParams.id
        data.app    =   JSON.stringify(modulo)
    //Functions.PostAsync("Usuarios","getUsuario",data,context,{name:"callbackInit",funct:callbackInit})

        data.token  =   context.Store.get("user").token
        data.tabla  =   "ma_tipo_funcionario"
    Functions.PostAsync("Maestros","get_tablas_maestras",data,context,{name:"callbackTablasMaestras",funct:callbackTablasMaestras})
  }

  const callbackInit=(data)=>{
    if (data.response.data.departamento!=='0') {
      getMunicipio(data.response.data.departamento);
    }
    setData(data.response.data)
    setPrivilegios(data.response.privilegios)
    setInputs(data.response.data)
  }

  const callbackTablasMaestras=(data)=>{
    setTipo_funcionario(data.response.data.ma_tipo_funcionario)
    setTipo_identificacion(data.response.data.ma_tipo_identificacion)
    setEstado_civil(data.response.data.ma_estado_civil)
    setDepartamento(data.response.data.ma_departamentos)
    let dataR        =   {}
        dataR.user   =   context.Store.get("user").token
        dataR.token  =   queryStringParams.id
        dataR.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Usuarios","getUsuario",dataR,context,{name:"callbackInit",funct:callbackInit})

  }

  const onChange=(e)=>{
    let inputs_                 =   {...inputs};
        inputs_[e.target.name]  =   e.target.value
        setInputs(inputs_)
      if (e.target.name==="departamento") {
        getMunicipio(e.target.value)
      }
      if (e.target.name==="email" && e.target.value.length>5) {
        setEmailNoDisponible(false)
        getEmail(e.target.value)
      }
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let data        =   {...inputs}
        data.user   =   context.Store.get("user").token
        data.tipo_usuario_id   =   queryStringParams.filter
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Usuarios","registroDeUsuariosClientes",data,context,{name:"callbackContinue",funct:callbackContinue})
  }
  const callbackContinue=(data)=>{
    context.setModalShow({  show:true,
                            size:"sm",
                            message:  <div className="text-center">
                                        Usuario registrado correctamente
                                        <div className="btn btn-primary mt-3" onClick={()=>document.location.href=Config.ConfigAppUrl+"apanel/usuarios/lista?filter="+queryStringParams.filter+"&app=listar::usuarios::todos::Lista::usuarios/lista::1"}>Continuar</div>
                                      </div>
                          })
  }

  const getEmail=(q)=>{
    let datar                =   {}
        datar.user           =   context.Store.get("user").token
        datar.token          =   context.Store.get("user").token
        datar.app            =   JSON.stringify(modulo)
        datar.q              =   q;
    Functions.PostAsync("Usuarios","getEmail",datar,context,{name:"callbackGetEmail",funct:callbackGetEmail})
  }

  const callbackGetEmail=(dataR)=>{
    if (dataR.response.message!=='') {
      setEmailNoDisponible(dataR.response.message)
    }
  }

  const getMunicipio=(departamento_)=>{
    let datar                =   {}
        datar.user           =   context.Store.get("user").token
        datar.token          =   context.Store.get("user").token
        datar.departamento   =   departamento_;
    Functions.PostAsync("Maestros","get_municipios",datar,context,{name:"callbackMunicipios",funct:callbackMunicipios})
  }

  const callbackMunicipios=(dataR)=>{
    setMunicipio(dataR.response.data)
  }
  return  <>{queryStringParams.id==="0" || Object.entries(data).length>0?<div className="container">
                                                                            <div className="row">
                                                                              <div className="col">
                                                                              <div className="card">
                                                                                <div className="card-body">
                                                                                  <h5>Formulario de registro de funcionarios</h5>
                                                                                  <form onSubmit={onSubmit}>
                                                                                    <div className="row pb-2">
                                                                                      <div className="col-12 col-sm-4 mb-2">
                                                                                        <Select
                                                                                            defaultValue={data.tipo_funcionario}
                                                                                            title="Tipo de funcionario"
                                                                                            selectDefault="Tipo de funcionario"
                                                                                            data={tipo_funcionario}
                                                                                            name="tipo_funcionario"
                                                                                            className="form-control"
                                                                                            onChange={onChange}
                                                                                          />
                                                                                      </div>
                                                                                      <div className="col-12 col-sm-4 mb-2">
                                                                                        <Select
                                                                                            defaultValue={data.tipo_identificacion}
                                                                                            title="Tipo de identificación"
                                                                                            selectDefault="Tipo de identificación"
                                                                                            data={tipo_identificacion}
                                                                                            name="tipo_identificacion"
                                                                                            className="form-control"
                                                                                            onChange={onChange}
                                                                                          />
                                                                                      </div>
                                                                                      <div className="col-12 col-sm-4 mb-2">
                                                                                        <Input
                                                                                            defaultValue={data.nro_documento}
                                                                                            title="Nro Documento"
                                                                                            placeholder="Nro. de documento"
                                                                                            type="text"
                                                                                            name="nro_documento"
                                                                                            className="form-control"
                                                                                            onChange={onChange}
                                                                                        />
                                                                                      </div>
                                                                                      <div className="col-12 col-sm-4 mb-2">
                                                                                        <Input
                                                                                            defaultValue={data.fecha_expedicion}
                                                                                            title="Fecha de expedición"
                                                                                            placeholder="Fecha de expedición"
                                                                                            type="date"
                                                                                            name="fecha_expedicion"
                                                                                            className="form-control"
                                                                                            onChange={onChange}
                                                                                        />
                                                                                      </div>
                                                                                      <div className="col-12 col-sm-4 mb-2">
                                                                                        <Input
                                                                                            defaultValue={data.nombres}
                                                                                            title="Nombres"
                                                                                            placeholder="Nombres"
                                                                                            type="text"
                                                                                            name="nombres"
                                                                                            className="form-control"
                                                                                            onChange={onChange}
                                                                                        />
                                                                                      </div>
                                                                                      <div className="col-12 col-sm-4 mb-2">
                                                                                        <Input
                                                                                            defaultValue={data.apellidos}
                                                                                            title="Apellidos"
                                                                                            placeholder="Apellidos"
                                                                                            type="text"
                                                                                            name="apellidos"
                                                                                            className="form-control"
                                                                                            onChange={onChange}
                                                                                        />
                                                                                      </div>
                                                                                      <div className="col-12 col-sm-4 mb-2">
                                                                                        <Input
                                                                                            defaultValue={data.celular}
                                                                                            title="Móvil"
                                                                                            placeholder="Móvil"
                                                                                            type="tel"
                                                                                            name="celular"
                                                                                            className="form-control"
                                                                                            onChange={onChange}
                                                                                        />
                                                                                      </div>
                                                                                      <div className="col-12 col-sm-4 mb-2">
                                                                                        <Input
                                                                                            defaultValue={data.email}
                                                                                            title="Email"
                                                                                            placeholder="Email"
                                                                                            type="text"
                                                                                            name="email"
                                                                                            className={!emailNoDisponible?"form-control":"form-control border border-danger"}
                                                                                            onChange={onChange}
                                                                                        />
                                                                                        {emailNoDisponible?<label className="title p-2 bg-danger text-white text-center" for="basic-url">{emailNoDisponible}</label>:false}
                                                                                      </div>
                                                                                      <div className="col-12 col-sm-4 mb-2">
                                                                                        <Select
                                                                                            defaultValue={data.estado_civil}
                                                                                            title="Estado Civil"
                                                                                            selectDefault="Estado Civil"
                                                                                            data={estado_civil}
                                                                                            name="estado_civil"
                                                                                            className="form-control"
                                                                                            onChange={onChange}
                                                                                          />
                                                                                      </div>
                                                                                      <div className="col-12 mb-2">
                                                                                        <Input
                                                                                            defaultValue={data.direccion}
                                                                                            title="Dirección"
                                                                                            placeholder="Dirección"
                                                                                            type="text"
                                                                                            name="direccion"
                                                                                            className="form-control"
                                                                                            onChange={onChange}
                                                                                        />
                                                                                      </div>
                                                                                      <div className="col-12 col-sm-6 mb-2">
                                                                                        <Select
                                                                                            defaultValue={data.departamento}
                                                                                            title="Departamento"
                                                                                            selectDefault="Departamento"
                                                                                            data={departamento}
                                                                                            name="departamento"
                                                                                            className="form-control"
                                                                                            onChange={onChange}
                                                                                          />
                                                                                      </div>
                                                                                      <div className="col-12 col-sm-6 mb-2">
                                                                                        {data.departamento!=='0' && municipio.length>0?<>
                                                                                          <Select
                                                                                              defaultValue={data.municipio}
                                                                                              title="Municipio"
                                                                                              selectDefault="Municipio"
                                                                                              data={municipio}
                                                                                              name="municipio"
                                                                                              className="form-control"
                                                                                              onChange={onChange}
                                                                                            />
                                                                                        </>:<div>
                                                                                                Por favor espere...
                                                                                                <input type="hidden" name="municipio" value={data.municipio} />
                                                                                            </div>}
                                                                                      </div>
                                                                                      <div className="col-12 col-sm-6 mb-2">
                                                                                        {!emailNoDisponible?<button type="submit" className="btn btn-primary mr-2">Guardar</button>:false}
                                                                                        <button type="button" className="btn btn-primary2" onClick={()=>document.location.href=Config.ConfigAppUrl+"apanel/usuarios/lista?filter="+queryStringParams.filter+"&app=listar::usuarios::todos::Lista::usuarios/lista::1"}>Cancelar</button>
                                                                                      </div>
                                                                                    </div>
                                                                                  </form>
                                                                                </div>
                                                                              </div>
                                                                              </div>
                                                                            </div>
                                                                          </div>:false}</>

}

export default  App
