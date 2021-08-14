import React,{useState,useEffect} from 'react';
import Input from '../../screens/inputs';
import Select from '../../screens/select';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Config from '../../helpers/Config';
import Comentarios from '../../app/comentarios';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);


const sino    =   [
  {
    label:"Si",
    value:"Si",
  },
  {
    label:"No",
    value:"No",
  },
]

const anos_construccion    =   [
  {
    label:"Uno (1) - Cinco (5) años",
    value:"Uno (1) - Cinco (5) años",
  },
  {
    label:"Cinco (5) - Diez (10) años",
    value:"Cinco (5) - Diez (10) años",
  },
  {
    label:"Diez (10) - Quince (15) años",
    value:"Diez (10) - Quince (15) años",
  },
  {
    label:"más de Quince (15) años",
    value:"más de Quince (15) años",
  },
]



const tipo_propiedad    =   [
  {
    label:"Apartamento",
    value:"Apartamento",
  },
  {
    label:"Casa",
    value:"Casa",
  },
  {
    label:"Edificio PH",
    value:"Edificio PH",
  },
  {
    label:"Casa PH",
    value:"Casa PH",
  },
  {
    label:"Parcelación",
    value:"Parcelación",
  },
  {
    label:"Bodegas",
    value:"Bodegas",
  },
  {
    label:"Oficinas",
    value:"Oficinas",
  },
]

const App=(props)=>{
  const context         =   React.useContext(StateContext);
  const modulo          =   Functions.segments_modulos(queryStringParams.app);
  const [privilegios, setPrivilegios] = useState({});
  const [inputs, setInputs] = useState({});
  const [departamento, setDepartamento] = useState([]);
  const [municipio, setMunicipio] = useState([]);
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setData(props.data)
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
    setData(data.response.data)
    setPrivilegios(data.response.privilegios)
    setInputs(data.response.data)
    setOpen(true)
  }

  const callbackTablasMaestras=(data)=>{
    setFullData(data.response.data)
    setDepartamento(data.response.data.ma_departamentos)
    let dataR        =   {}
        dataR.user   =   context.Store.get("user").token
        dataR.token  =   props.data.token
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

  const onSubmit=(e)=>{
    e.preventDefault()
    let dataR                =   {...inputs}
        dataR.user           =   context.Store.get("user").token
        dataR.token          =   props.data.token
        dataR.app            =   JSON.stringify(modulo)
    Functions.PostAsync("Usuarios","setUsuarios",dataR,context,{name:"callbackSubmit",funct:callbackSubmit})
  }

  const callbackSubmit=(dataR)=>{
      context.setModalShow({show:true,size:"sm",message:<div className="text-center">{dataR.response.message}</div>})
  }

  return  <>  {open?<div className="row">
                      <div className="col pt-3">
                        <form onSubmit={onSubmit}>
                          <div className="row pb-2">
                            <div className="col-12 col-sm-3 mb-2">
                              <Select
                                  defaultValue={data.tipo_propiedad_2}
                                  title="Sub tipo de propiedad"
                                  selectDefault="Tipo de propiedad"
                                  data={tipo_propiedad}
                                  name="tipo_propiedad_2"
                                  className="form-control"
                                  onChange={onChange}
                                />
                            </div>
                            <div className="col-12 col-sm-2 mb-2">
                              <Input
                                  defaultValue={data.cantidad}
                                  title="Cantidad"
                                  placeholder="Cantidad"
                                  type="number"
                                  name="cantidad"
                                  className="form-control"
                                  onChange={onChange}
                              />
                            </div>
                            <div className="col-12 col-sm-2 mb-2">
                              <Select
                                  defaultValue={data.piscina}
                                  title="Piscina"
                                  selectDefault="Tiene piscina"
                                  data={sino}
                                  name="piscina"
                                  className="form-control"
                                  onChange={onChange}
                                />
                            </div>
                            <div className="col-12 col-sm-2 mb-2">
                              <Select
                                  defaultValue={data.salon}
                                  title="Salón social"
                                  selectDefault="Tiene salón"
                                  data={sino}
                                  name="salon"
                                  className="form-control"
                                  onChange={onChange}
                                />
                            </div>
                            <div className="col-12 col-sm-3 mb-2">
                              <Select
                                  defaultValue={data.anos_construccion}
                                  title="Años de construcción"
                                  selectDefault="Años de construcción"
                                  data={anos_construccion}
                                  name="anos_construccion"
                                  className="form-control"
                                  onChange={onChange}
                                />
                            </div>
                            <div className="col-12 mb-2 mt-0">
                              <button type="submit" className="btn btn-primary mr-2">Grabar</button>
                            </div>
                          </div>
                        </form>
                        <div>
                          <Comentarios title="Descripción propiedad" id={"Descripcion_"+props.data.usuario_id+"data"}/>
                        </div>
                      </div>
                    </div>:false}
          </>
}

export default App
