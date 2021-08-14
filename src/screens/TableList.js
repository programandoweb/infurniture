import React,{useState,useEffect} from 'react';
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
import { faToggleOff,faToggleOn ,faUserFriends, faUserEdit, faLock, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditUser from '../screens/edit_user';
import Password from '../screens/edit_password';
import Cropper from '../screens/cropperComponent';


let start         = 0
let paginacion    = []
let total_rows    = 0;
let limit         = 0;
let filter        = "";
let est           = 1;


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
  const modulo                              =   Functions.segments_modulos(props.app)

  function getInit(){
    limit = parseInt(props.limit)
    if (props.filter!=="3") {
      limit = limit * 4
    }
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
        data.estatus          =   est
        data.tipo_usuario_id  =   (props.filter!==undefined)?props.filter:""
        Functions.PostAsync(modulo[2],modulo[0],data,context,{name:"callbackInit",funct:callbackInit})
  }

  function callbackInit(data){
    setPrivilegios(data.response.privilegios)

    total_rows  =   parseInt(data.response.total_rows)
    paginacion  =   Math.ceil(total_rows/props.limit)

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
  },[paginaActual])

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

  return  <div className="row">
  {modulo[3]?<>
                <div className="col-6 h5 border-bottom pb-2">{modulo[3]} {estatus===0?"(Papelera)":false}</div>
                <div className="col-6 h5 border-bottom pb-2">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className={estatus===1?"input-group-text bg-dark text-white cursor-pointer":"input-group-text bg-waring text-white cursor-pointer"} id="basic-addon1" onClick={onChangeTrash}>
                        <FontAwesomeIcon icon={faTrash} className=""/>
                      </span>
                    </div>
                    <input type="text" className="form-control" placeholder="Filtrar..." name="filter" onChange={onChange}/>
                    {privilegios.registrar!==undefined?<a href={context.Config.ConfigAppUrl+"apanel/usuarios/agregar?filter="+props.filter+"&app=registrar::usuarios::registrar::Registrar::usuarios/registrar::1&id=0"} className="input-group-text text-white text-center"><div className="input-group-append">
                        <FontAwesomeIcon icon={faPlus} className=""/>
                      </div></a>:false
                    }
                  </div>
                </div>
              </>:<></>}
            {data.map((row,key)=>{
              return <div className="col-12 col-sm-3 mb-3 component-table" key={key}>
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            {
                              props.filter==="3"? <div className="col-sm-3">
                                                    <Cropper src={(row.miImg!=='')?row.miImg:""} row={row}/>
                                                  </div>:false
                            }
                            <div className={props.filter==="3"?"col-9":"col-12"}>
                              <div className="title">
                                {row.nombres} {row.apellidos}
                              </div>
                              <div className="subtitle">
                                {row.email}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-right">
                          <div className="row justify-content-end">
                          {
                            privilegios.deactivar!==undefined?<div className="col-2 text-center border-left">
                              <div className=" cursor-pointer" title={row.estatus!=="1"?"Inactivo":"Activo"} onClick={()=>onChangeStatus(row)}>
                                <FontAwesomeIcon icon={row.estatus!=="1"?faToggleOff:faToggleOn}/>
                              </div>
                            </div>:<></>
                          }
                            {
                              privilegios.password!==undefined && props.filter==="3"?<div className="col-2 border-left text-center">
                                <div className="cursor-pointer" onClick={()=>{context.setModalShow({  show:true,
                                                                                                                  message:<Password row={row} setModalShow={context.setModalShow}/>,
                                                                                                                  size:"sm",
                                                                                                                })}}>
                                  <FontAwesomeIcon icon={faLock}/>
                                </div>
                              </div>:<></>
                            }
                            {
                              privilegios.edit_user!==undefined?<div className="col-2 border-left text-center">
                                <a className="cursor-pointer" href={"agregar?filter="+props.filter+"&app=registrar::usuarios::registrar::Registrar::usuarios/registrar::1&id="+row.token}>
                                  <FontAwesomeIcon icon={faUserEdit}/>
                                </a>
                              </div>:<></>
                            }
                            {
                              privilegios.rel_user!==undefined?<div className="col-3 border-left text-center">
                                <div className=" cursor-pointer" onClick={()=>{context.setModalShow({  show:true,
                                                                                                                  message:<Component row={row}/>,
                                                                                                                  size:"lg",
                                                                                                                  header:{  show:true,
                                                                                                                            label:"Relaciones de "+row.nombres+ " " +row.apellidos
                                                                                                                          }
                                                                                                                })}}>
                                  <FontAwesomeIcon icon={faUserFriends}/> {row.parents.length}
                                </div>
                              </div>:<></>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
            })}
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
          </div>
}
export default App
