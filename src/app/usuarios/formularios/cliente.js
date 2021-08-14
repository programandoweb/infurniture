import React,{useState,useEffect} from 'react';
import Functions from '../../../helpers/Functions';
import Config from '../../../helpers/Config';
import StateContext from '../../../helpers/ContextState';
import Input from '../../../screens/inputs';
import Select from '../../../screens/select';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);
const App=()=>{
  const context         =   React.useContext(StateContext);
  const modulo          =   Functions.segments_modulos(queryStringParams.app);
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [departamento, setDepartamento] = useState([]);
  const [municipio, setMunicipio] = useState([]);
  const [data2, setData2] = useState([]);
  const [privilegios, setPrivilegios] = useState({});
  const [funcionarios, setFuncionarios] = useState([]);
  const [tipos, settipos] = useState([]);
  const [errorApellidos, setErrorApellidos] = useState(false);
  const [errorNombres, setErrorNombres] = useState(false);


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
        data.tabla               =   "ma_tipo_funcionario"
        data.get_funcionarios    =   "ma_tipo_funcionario"
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
    setFullData(data.response.data)
    setFuncionarios(data.response.funcionarios)
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
      if (e.target.name==="apellidos") {
        setErrorApellidos(false)
        getVerificacion(e.target.value,"apellidos")

      }
      if (e.target.name==="nombres") {
        setErrorNombres(false)
        getVerificacion(e.target.value,"nombres")
      }
  }

  const getVerificacion=(q,verificando)=>{

    let datar                =   {}
        datar.user           =   context.Store.get("user").token
        datar.token          =   context.Store.get("user").token
        datar.q              =   q;
        datar.verificando    =   verificando;
        datar.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Usuarios","get_nombres",datar,context,{name:"callbackVerificacion",funct:callbackVerificacion})
  }

  const callbackVerificacion=(dataR)=>{
    if (dataR.response.error!=='false' && dataR.response.error!==false) {
      if (dataR.response.verificando==='nombres') {
        setErrorNombres(dataR.response.error)
      }else {
        setErrorApellidos(dataR.response.error)
      }
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
                  <h5>Formulario de registro de clientes</h5>
                  <form onSubmit={onSubmit}>
                    <div className="row pb-2">
                      <div className="col-12 col-sm-3 mb-2">
                        <Select
                            defaultValue={data.naturaleza}
                            title="Naturaleza"
                            selectDefault="Naturaleza"
                            data={(fullData.ma_naturaleza!==undefined)?fullData.ma_naturaleza:[]}
                            name="naturaleza"
                            className="form-control"
                            onChange={onChange}
                          />
                      </div>
                      <div className="col-12 col-sm-3 mb-2">
                        <Select
                            defaultValue={data.tipo_identificacion}
                            title="Tipo de identificación"
                            selectDefault="Tipo de identificación"
                            data={(fullData.ma_tipo_identificacion!==undefined)?fullData.ma_tipo_identificacion:[]}
                            name="tipo_identificacion"
                            className="form-control"
                            onChange={onChange}
                          />
                      </div>
                      <div className="col-12 col-sm-3 mb-2">
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
                      <div className="col-12 col-sm-3 mb-2">
                        <Input
                            defaultValue={data.nombres}
                            title="Nombres"
                            placeholder="Nombres"
                            type="text"
                            name="nombres"
                            className="form-control"
                            onChange={onChange}
                        />
                        <div className={errorNombres?"bg-danger p-2 text-white":'d-none'}>{errorNombres}</div>
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
                        <div className={errorApellidos?"bg-danger p-2 text-white":'d-none'}>{errorApellidos}</div>
                      </div>
                      <div className="col-12 col-sm-4 mb-2">
                        <Input
                            defaultValue={data.email}
                            title="Email"
                            placeholder="Email"
                            type="text"
                            name="email"
                            className="form-control"
                            onChange={onChange}
                        />
                      </div>
                      <div className="col-12 col-sm-4 mb-2">
                        <Input
                            defaultValue={data.telefono}
                            title="Teléfono"
                            placeholder="Teléfono"
                            type="text"
                            name="telefono"
                            className="form-control"
                            onChange={onChange}
                        />
                      </div>
                      <div className="col-12 col-sm-4 mb-2">
                        <Input
                            defaultValue={data.celular}
                            title="Celular"
                            placeholder="Celular"
                            type="text"
                            name="celular"
                            className="form-control"
                            onChange={onChange}
                        />
                      </div>
                      <div className="col-12 col-sm-4 mb-2">
                        <Select
                            defaultValue={data.departamento}
                            title="Departamento"
                            selectDefault="Departamento"
                            data={(fullData.ma_departamentos!==undefined)?fullData.ma_departamentos:[]}
                            name="departamento"
                            className="form-control"
                            onChange={onChange}
                          />
                      </div>
                      <div className="col-12 col-sm-4 mb-2">
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
                        <Input
                            defaultValue={data.sector}
                            title="Sector"
                            placeholder="Sector"
                            type="text"
                            name="sector"
                            className="form-control"
                            onChange={onChange}
                        />
                      </div>
                      <div className="col-12 col-sm-6 mb-2">
                        <Select
                            defaultValue={data.estrato_economico}
                            title="Estrato social"
                            selectDefault="Estrato social"
                            data={fullData.ma_estrato_economico}
                            name="estrato_economico"
                            className="form-control"
                            onChange={onChange}
                          />
                      </div>

                      <div className="col-12 col-sm-6 mb-2">
                        <button type="submit" className="btn btn-primary mr-2">Guardar</button>
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
