import React,{useState,useEffect} from 'react';
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
import { faPlus,faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


let start         = 0
let paginacion    = []
let total_rows    = 0;
let limit         = 0;
let filter        = "";

const Component=(props)=>{
  let modulos                         =   props.context.Constants.Modulos
  const [modulo, setModulo]           =   useState("");

  const add=(item,modulo)=>{
    //return console.log(item,modulo);
    let data              =   {}
        data.token            =   props.context.Store.get("user").token
        data.item             =   JSON.stringify(item)
        data.modulo           =   modulo
        data.tipo_usuario_id  =   props.row.tipo_usuario_id
        Functions.PostAsync(props.modulo,props.metodo+"Add",data,props.context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
     if (!data.response.error) {
       props.getInit()
     }
   }

  return  <div className="row">
            <div className="col">
              <select onChange={(e)=>setModulo(e.target.value)} className="form-control">
                <option value="">Tipo de Módulo</option>
                {Object.entries(modulos).map((row,key)=>{
                  if (row[1].public!==undefined && row[1].public) {
                    return <option key={key} value={row[0]}>{row[1].label}</option>
                  }else {
                    return false
                  }
                })}
              </select>
              {modulo!==''? <>
                              {
                                modulos[modulo]!==undefined && modulos[modulo].items!==undefined?<>
                                  {modulos[modulo].items.map((row,key)=>{
                                    //let item  =   Object.values(row)[0]
                                    let items = Object.entries(row)
                                    return items.map((row2,key2)=>{
                                      row2[1].parent  = row2[0]
                                      return  <>
                                                <div key={key2} className="p-1 mb-2">{row2[1].label}
                                                  {
                                                    row2[1].items===undefined?<FontAwesomeIcon className="ml-1" onClick={()=>add(row2,modulo)} icon={faPlus}/>:<>
                                                      <div className="mt-2 ml-2 pl-3 border-left">
                                                        {row2[1].items.map((row3,key3)=>{
                                                          let row3_ = Object.entries(row3)
                                                          row3_[0][1].parent  = row2[0]
                                                          return <div key={key3}>{row3_[0][1].label}<FontAwesomeIcon className="ml-1" onClick={()=>{add(row3_[0],modulo); add(row2,modulo); }} icon={faPlus}/></div>
                                                        })}
                                                      </div>
                                                    </>
                                                  }
                                                </div>
                                              </>
                                    })
                                  })}
                                </>:<></>
                              }
                            </>:<></>}
            </div>
          </div>
}

const App=(props)=>{
  const context                         =   React.useContext(StateContext);
  const [data, setData]                 =   useState([]);
  const [paginas, setPaginas]           =   useState([]);
  const [paginaActual, setPaginaActual] =   useState(1);

  function getInit(){
    limit = parseInt(props.limit)
    if (paginaActual>1) {
      start = ((paginaActual-1)*limit)-1 ;
    }else {
      start = 0;
    }
    let data              =   {}
        data.token        =   context.Store.get("user").token
        data.tabla        =   props.tabla
        data.limit        =   limit
        data.start        =   start
        data.filter       =   filter
        Functions.PostAsync(props.modulo,props.metodo,data,context,{name:"callbackInit",funct:callbackInit})
  }

  function callbackInit(data){
    total_rows  =   parseInt(data.response.total_rows)
    paginacion  =   Math.ceil(total_rows/props.limit)
    setData(data.response.data)
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

  const Delete=(row)=>{
    let data              =   {}
        data.token        =   context.Store.get("user").token
        data.id           =   row.tipo_usuario_privilegios_id
        Functions.PostAsync(props.modulo,props.metodo+"Delete",data,context,{name:"callbackDelete",funct:callbackDelete})
  }

  const callbackDelete=(data)=>{
    if (!data.response.error) {
      getInit()
    }
  }

  return  <div className="row">
            {props.title?<>
                          <div className="col-6 h5 border-bottom pb-2">{props.title}</div>
                          <div className="col-6 h5 border-bottom pb-2">
                            <input type="text" className="form-control" placeholder="Filtrar..." name="filter" onChange={onChange}/>
                          </div>
                        </>:<></>}
            {data.map((row,key)=>{
              if (row.label==='Root') {
                return false;
              }
              return <div className="col-12 col-sm-3 mb-3 component-table" key={key}>
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-12 mb-2">
                              <div className="title">
                                {row.label}
                              </div>
                            </div>
                            {row.privilegios.map((row2,key2)=>{
                              return  <div className="col-12" key={key2}>
                                        <div className="title pl-3">
                                          {row2.modulo} + {row2.submodulo} + {row2.label} <FontAwesomeIcon className="cursor-pointer" onClick={()=>Delete(row2)} icon={faTrash}/>
                                        </div>
                                      </div>
                            })}
                          </div>
                        </div>
                        <div className="card-footer text-right">
                          <div className="row justify-content-end">
                            <div className="col-12">
                              <div className="border-left cursor-pointer" onClick={()=>{context.setModalShow({  show:true,
                                                                                                                message:<Component {...props} context={context} row={row} getInit={getInit}/>,
                                                                                                                size:"md",
                                                                                                                header:{  show:true,
                                                                                                                        label:"Privilegio "+row.label
                                                                                                                      }
                                                                                                            })}}>
                                <FontAwesomeIcon icon={faPlus}/>
                              </div>
                            </div>
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
