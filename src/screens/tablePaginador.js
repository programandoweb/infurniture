import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table'
import Store from '../helpers/Store';
import { faEdit,faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let pagina_data = 1
let totalrows=0
let cantidad_por_paginas  = 5

const App=(props)=>{

  let   data                        =   props.data
  const [result, setResult]         =   useState([]);
  const [totalrows, setTotalrows]   =   useState(0);
  const [pagina, setPagina]         =   useState(0);
  const [paginas, setPaginas]       =   useState([]);

  useEffect(() => {
    paginacion(data);
    setPagina(0);
  },[props.data])

  const paginacion=(data)=>{
    let resultado = []
    const LONGITUD_PEDAZOS = cantidad_por_paginas;
    if (data!==undefined) {
      for (let i = 0; i < data.length; i += LONGITUD_PEDAZOS) {
        let pedazo = data.slice(i, i + LONGITUD_PEDAZOS);
        resultado.push(pedazo);
      }
      setPaginas(resultado);
    }
  }

  return  <>
            <div className="min-height-350">
              <Table striped bordered hover>
              {props.thead!==undefined? <thead><tr>
                                          {props.thead.map((row,key)=>{
                                            return <th key={key}>{row.label}</th>
                                          })}
                                        </tr></thead>:<></>}
              {props.thead!==undefined && paginas.length>0? <tbody>
                                          {
                                            paginas[pagina].map((row,key)=>{
                                              return  <tr key={key} >
                                                        {props.thead.map((row2,key2)=>{
                                                          if (key2===0) {
                                                            return <td style={{backgroundColor:row.prioridad}} width="50" className="text-center" key={key2}>{(key + 1)}</td>
                                                          }else if (key2>0 && row2.value!=='editar') {
                                                            return  <td key={key2}>
                                                                      {row[row2.value]}
                                                                    </td>
                                                          }else {
                                                            let row__           =   {...row}
                                                            row__.dependientes  =   (row2.dependientes!==undefined)?row2.dependientes:[]
                                                            let mostrar         =   row.dependiente_string==='Independiente' ||
                                                                                    Store.get("user").tipo_usuario_id==="0" ||
                                                                                    Store.get("user").tipo_usuario_id==="1" ||
                                                                                    Store.get("user").tipo_usuario_id==="2"  ?true:false

                                                            if (
                                                                  parseInt(Store.get("user").tipo_usuario_id)>2 &&
                                                                  parseInt(Store.get("user").usuario_id)!==parseInt(row.usuario_id)
                                                                ) {
                                                              row__.editable  =   false
                                                              mostrar         =   false
                                                            } else if (  parseInt(Store.get("user").tipo_usuario_id)<3 ||
                                                                  parseInt(Store.get("user").usuario_id)===parseInt(row.usuario_id)
                                                                ) {
                                                              row__.editable  =   true
                                                              mostrar         =   true
                                                            }

                                                            return  <td width="100" className="text-center" key={key2}>
                                                                      {row2.extra!==undefined?<a className="mr-2" target={row2.extra.target?row2.extra.url:"_self"} href={row2.extra.url+row.token}>{row2.extra.label}</a>:<></>}
                                                                      {mostrar?<FontAwesomeIcon className="cursor-pointer" icon={faEdit} onClick={()=>props.setOpen(row__)}/>:<FontAwesomeIcon className="cursor-pointer" icon={faSearch} onClick={()=>props.setOpen(row__)}/>}
                                                                    </td>
                                                          }
                                                        })}
                                                      </tr>
                                            })
                                          }

                                        </tbody>:<tbody><tr><td colSpan={props.thead.length} className="text-center">No hay registros</td></tr></tbody>}
              </Table>
            </div>
            <div className="p-2">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  {paginas.map((row,key)=>{
                    return <li onClick={()=>{setPagina(key)}} key={key} className={(key)===pagina?"page-item active cursor-pointer":"page-item cursor-pointer"}><a className={(key)===pagina?"page-link text-white":"page-link"}>{key+1}</a></li>
                  })}
                </ul>
              </nav>
            </div>
          </>
}

export default App
