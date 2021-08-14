import React,{useState,useEffect} from 'react';
import Functions from '../../../helpers/Functions';
import StateContext from '../../../helpers/ContextState';
import Input from '../../../screens/inputs';
import Select from '../../../screens/select';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);


const tipo_contratista= [
                          {
                            label:"Arquitectura",
                            value:"Arquitectura",
                          },
                          {
                            label:"Diseño",
                            value:"Diseño",
                          },
                          {
                            label:"Carpintería",
                            value:"Carpintería",
                          },
                          {
                            label:"Cerrajería",
                            value:"Cerrajería",
                          },
                          {
                            label:"Electricidad",
                            value:"Electricidad",
                          },
                          {
                            label:"Pintura",
                            value:"Pintura",
                          },
                          {
                            label:"Obra civil",
                            value:"Obra civil",
                          },{
                            label:"Vidriería",
                            value:"Vidriería",
                          },
                        ]

const App=()=>{
  const context         =   React.useContext(StateContext);
  const modulo          =   Functions.segments_modulos(queryStringParams.app);
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState([]);
  const [tipo_funcionario, setTipo_funcionario] = useState([]);
  const [tipo_identificacion, setTipo_identificacion] = useState([]);
  const [estado_civil, setEstado_civil] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [departamento, setDepartamento] = useState([]);
  const [municipio, setMunicipio] = useState([]);
  const [data2, setData2] = useState([]);
  const [privilegios, setPrivilegios] = useState({});
  const [tipos, settipos] = useState([]);

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    let data        =   {}
        data.user   =   context.Store.get("user").token
        data.token  =   queryStringParams.id
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Usuarios","getUsuario",data,context,{name:"callbackInit",funct:callbackInit})

        data.token  =   context.Store.get("user").token
        data.tabla  =   "ma_tipo_funcionario"
    Functions.PostAsync("Maestros","get_tablas_maestras",data,context,{name:"callbackTablasMaestras",funct:callbackTablasMaestras})
  }

  const callbackInit=(data)=>{
    setData(data.response.data)
    setPrivilegios(data.response.privilegios)
    setFullData(data.response.data)
  }

  const callbackTablasMaestras=(data)=>{
    setTipo_funcionario(data.response.data.ma_tipo_funcionario)
    setTipo_identificacion(data.response.data.ma_tipo_identificacion)
    setEstado_civil(data.response.data.ma_estado_civil)
    setDepartamento(data.response.data.ma_departamentos)
  }

  const onChange=(e)=>{
    let inputs_                 =   {...inputs};
        inputs_[e.target.name]  =   e.target.value
        setInputs(inputs_)
      if (e.target.name==="departamento") {
        getMunicipio(e.target.value)
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
                                        <div className="btn btn-primary mt-3" onClick={()=>window.history.back()}>Continuar</div>
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

  return  <div className="container">
            <div className="row">
              <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5>Formulario de registro de funcionarios</h5>
                  <form onSubmit={onSubmit}>
                    <div className="row pb-2">
                      <div className="col-12 col-sm-4 mb-2">
                        <Select
                            title="Tipo de servicio"
                            selectDefault="Tipo de servicio"
                            data={tipo_contratista}
                            name="tipo_contratista"
                            className="form-control"
                            onChange={onChange}
                          />
                      </div>
                      <div className="col-12 col-sm-4 mb-2">
                        <Select
                            title="Naturaleza"
                            selectDefault="Naturaleza"
                            data={(fullData.ma_naturaleza!==undefined)?fullData.ma_naturaleza:[]}
                            name="naturaleza"
                            className="form-control"
                            onChange={onChange}
                          />
                      </div>
                      <div className="col-12 col-sm-4 mb-2">
                        <Input
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
                            title="Móvil"
                            placeholder="Móvil"
                            type="text"
                            name="celular"
                            className="form-control"
                            onChange={onChange}
                        />
                      </div>
                      <div className="col-12 col-sm-4 mb-2">
                        <Input
                            title="Email"
                            placeholder="Email"
                            type="text"
                            name="email"
                            className="form-control"
                            onChange={onChange}
                        />
                      </div>
                      <div className="col-12 col-sm-4 mb-2">
                        <Select
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
                            title="Departamento"
                            selectDefault="Departamento"
                            data={departamento}
                            name="departamento"
                            className="form-control"
                            onChange={onChange}
                          />
                      </div>
                      <div className="col-12 col-sm-6 mb-2">
                        <Select
                            title="Municipio"
                            selectDefault="Municipio"
                            data={municipio}
                            name="municipio"
                            className="form-control"
                            onChange={onChange}
                          />
                      </div>
                      <div className="col-12 col-sm-6 mb-2">
                        <button type="submit" className="btn btn-primary mr-2">Guardar</button>
                        <button type="button" className="btn btn-primary2" onClick={()=>window.history.back()}>Cancelar</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              </div>
            </div>
          </div>
}

export default  App
