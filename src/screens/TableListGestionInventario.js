import React,{useState,useEffect} from 'react';
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
import { NavLink } from "react-router-dom";
import { faPlusCircle,faSearch,faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClienteTabs from '../screens/ClienteTabs';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);


let start         = 0
let paginacion    = []
let total_rows    = 0;
let limit         = 0;
let filter        = "";
let est           = 1;

let verificado2   = 1;


const Component=(props)=>{
  return  <div className="row">
            <div className="col h6">
              {props.row.parents.map((row,key)=>{
                return  <div key={key} className="h6">
                          {key+1}) <b>({row.login})</b> {row.nombres} {row.apellidos}
                        </div>
              })}
              {props.row.parents.length===0?<div>No hay relacionados</div>:<></>}
            </div>
          </div>
}



const App=(props)=>{
  const context                             =   React.useContext(StateContext);
  const [data, setData]                     =   useState([]);
  const [paginas, setPaginas]               =   useState([]);
  const [paginaActual, setPaginaActual]     =   useState(1);
  const [privilegios, setPrivilegios]       =   useState([]);
  const [tipo_usuarios, setTipo_usuarios]   =   useState([]);
  const [estatus, setEstatus]               =   useState(1);
  const [verificados, setVerificados]       =   useState(verificado2);
  const [openCliente, setOpenCliente]       =   useState(false);
  const modulo                              =   Functions.segments_modulos(props.app)


  function getInit(){
    limit = parseInt(props.limit)
    // if (props.filter!=="3") {
    //   limit = limit * 4
    // }
    if (paginaActual>1) {
      start = ((paginaActual-1)*limit)-1 ;
    }else {
      start = 0;
    }
    let data                  =   {}
        data.user             =   context.Store.get("user").token
        data.app              =   JSON.stringify(modulo)
        data.limit            =   limit
        data.start            =   start
        data.filter           =   filter
        data.estatus          =   estatus
        data.verificado       =   verificado2
        data.tipo_usuario_id  =   (props.filter!==undefined)?props.filter:""
        Functions.PostAsync(modulo[2],modulo[0],data,context,{name:"callbackInit",funct:callbackInit})
  }

  function callbackInit(data){
    setPrivilegios(data.response.privilegios)

    total_rows  =   parseInt(data.response.total_rows)
    paginacion  =   Math.ceil(total_rows/limit)

    setData(data.response.data)
    if (data.response.tipo_usuarios) {
      setTipo_usuarios(data.response.tipo_usuarios)
    }

    let pages   = []
    for (var i = 0; i < paginacion; i++) {
      pages.push(i)
    }
    setPaginas(pages)
  }

  useEffect(() => {
    getInit()
  },[paginaActual,openCliente])

  const onChange=(e)=>{
    e.preventDefault()
    filter=e.target.value
    getInit()
  }

  const onChangeStatus=(row)=>{
    let data              =   {}
        data.user         =   context.Store.get("user").token
        data.app          =   JSON.stringify(modulo)
        data.token        =   row.token
        Functions.PostAsync(modulo[1],"changeStatus",data,context,{name:"callbackChangeStatus",funct:callbackChangeStatus})
  }

  const callbackChangeStatus=()=>{
    getInit()
  }

  const onChangeTrash=()=>{
    est = est===1?0:1
    setEstatus(estatus===1?0:1)
    getInit()
  }

  const open=(e,row)=>{
    //return false
    setOpenCliente(row)
  }

  const onClickChangeVerificados=(estatus)=>{
    verificado2=estatus
    setVerificados(estatus)
    getInit()
  }
  //console.log(modulo[3],openCliente );
  return  <div className="row">
            <>
              <div className="col-6 h5 border-bottom pb-2">{modulo[3]} {estatus===0?"(Papelera)":false}</div>
              <div className="col-6 h5 border-bottom pb-2">
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="Filtrar..." name="filter" onChange={onChange}/>
                </div>
              </div>
            </>
            {data.length && !openCliente>0 && privilegios.AgregarItems!==undefined?<>
              <div className="container mb-3">
                <div className="row justify-content-end">
                  <div className="col-12 col-sm-3">
                    <NavLink to={"/apanel/"+privilegios.AgregarItems.url+"/0?app="+Functions.set_segments_modulos(modulo,privilegios.AgregarItems)} className={"btn btn-warning btn-block"} >
                      Agregar Item
                    </NavLink>
                  </div>
                </div>
              </div>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Artículo</th>
                    <th>Código</th>
                    <th className="text-center">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row,key)=>{
                    return  <tr className="col-12 col-sm-3 mb-3 component-table" key={key}>
                              <td>{row.label}</td>
                              <td>{row.codigo}</td>
                              <td className="text-center">
                                <NavLink to={"/apanel/gestionInventario/rechargeIventaryItem?app="+queryStringParams.app+"&id="+row.token} >
                                  <FontAwesomeIcon title="Agregar al inventario" onClick={(e)=>{open(e,row)}} icon={faPlusCircle} className="cursor-pointer mr-2"/>
                                </NavLink>
                                {privilegios.EditarItems!==undefined?<NavLink to={"/apanel/"+privilegios.AgregarItems.url+"/"+row.token+"?app="+Functions.set_segments_modulos(modulo,privilegios.AgregarItems)}>
                                  <FontAwesomeIcon title="Ver movimientos" icon={faSearch} className="cursor-pointer"/>
                                </NavLink>:false}
                              </td>
                            </tr>
                  })}
                </tbody>
              </table>
            </>:false}
            {!openCliente?<>
              <div className="col-12 mt-3">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {
                      paginas.map((row,key)=>{
                        let thisPage  = row+1
                        return  <li key={key} className={thisPage===paginaActual?"page-item active":"page-item "} onClick={()=>{setPaginaActual(thisPage) }}>
                                  <a className={thisPage===paginaActual?"page-link text-white":"page-link "} href={"#"+thisPage}>{thisPage}</a>
                                </li>
                      })
                    }
                  </ul>
                </nav>
              </div>
            </>:false}
          </div>
}
export default App
