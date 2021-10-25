import React,{useState,useEffect} from 'react';
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
import Config from '../helpers/Config';
import { faSearch,faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClienteTabs from '../screens/ClienteTabsDos';


let start         = 0
let paginacion    = []
let total_rows    = 0;
let limit         = 0;
let filter        = "";
let est           = 1;

let verificado2   = 1;
const meses       =  [
                        {label:"Ene",value:"01"},
                        {label:"Feb",value:"02"},
                        {label:"Mar",value:"03"},
                        {label:"Abr",value:"04"},
                        {label:"May",value:"05"},
                        {label:"Jun",value:"06"},
                        {label:"Jul",value:"07"},
                        {label:"Ago",value:"08"},
                        {label:"Sep",value:"09"},
                        {label:"Oct",value:"10"},
                        {label:"Nov",value:"11"},
                        {label:"Dic",value:"12"}
                      ]

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
  const [sumas, setSumas]                     =   useState([]);
  const [paginas, setPaginas]               =   useState([]);
  const [paginaActual, setPaginaActual]     =   useState(1);
  const [privilegios, setPrivilegios]       =   useState([]);
  const [tipo_usuarios, setTipo_usuarios]   =   useState([]);
  const [estatus, setEstatus]               =   useState(1);
  const [verificados, setVerificados]       =   useState(verificado2);
  const [openCliente, setOpenCliente]       =   useState(false);
  const [mesActual, setMesActual]           =   useState(0);
  const [totalDeuda, setTotalDeuda]         =   useState(0);
  const [totalPagado, setPagado]            =   useState(0);
  const [totalDebe, setDebe]                =   useState(0);
  const [totalAbonos, setTotalAbonos]       =   useState(0);
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
        data.limit            =   50000
        data.start            =   start
        data.filter           =   filter
        data.estatus          =   estatus
        data.mes              =   meses[mesActual].value
        data.verificado       =   verificado2
        data.tipo_usuario_id  =   (props.filter!==undefined)?props.filter:""
        Functions.PostAsync(modulo[2],modulo[0],data,context,{name:"callbackInit",funct:callbackInit})
  }

  function callbackInit(data){
    setPrivilegios(data.response.privilegios)

    total_rows  =   parseInt(data.response.total_rows)
    paginacion  =   Math.ceil(total_rows/limit)

    //setData(data.response.data)

    let lista_nueva     = []
    let totalDeuda_     = 0;
    let totalPagado_    = 0;
    let totalDebe_      = 0;
    let totalAbonos_     = 0;

    data.response.data.map((row,key)=>{
      lista_nueva.push(row)
      totalDeuda_+=row.monto_total_facturado;
      totalPagado_+=row.monto_total_pagado;
      if (row.deuda_salda==='NO') {
        totalDebe_+=  (row.monto_total_facturado - row.monto_total_pagado<0)?0:row.monto_total_facturado - row.monto_total_pagado;
      }
      totalAbonos_+=  (row.monto_total_facturado - row.monto_total_pagado<0)?row.monto_total_pagado-row.monto_total_facturado :0;
    })

    setTotalDeuda(totalDeuda_)
    setPagado(totalPagado_)
    setDebe(totalDebe_)
    setTotalAbonos(totalAbonos_)
    setData(lista_nueva)

    setSumas(data.response.sumas)
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

  useEffect(() => {
    getInit()
  },[mesActual])

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
    setOpenCliente(row)
  }

  const onClickChangeVerificados=(estatus)=>{
    verificado2=estatus
    setVerificados(estatus)
    getInit()
  }

  return  <div className="row">
  {modulo[3] && !openCliente?<>
                <div className="col-12 h5 border-bottom pb-2">{modulo[3]} {estatus===0?"(Papelera)":false}</div>
                {meses.map((row,key)=>{
                  return  <div className="col-1 mb-2">
                            <div className={mesActual===key?"btn btn-primary btn-block":"btn btn-warning btn-block"} onClick={(row)=>setMesActual(key)}>
                              {row.label}
                            </div>
                          </div>
                })}
                {data.length>0?<div className="p-3 text-center col-12">
                  <a target="_blank" href={Config.ConfigApirest+"PDF/GestionCartera/listar?mes="+meses[mesActual].value} className="btn btn-danger mr-2">
                    Imprimir Gestión de Cartera
                  </a>
                  <a target="_blank" href={Config.ConfigApirest+"PDF/GestionInventarioXMes/listar?mes="+meses[mesActual].value} className="btn btn-dark">
                    Imprimir Inventario
                  </a>
                </div>:false}
              </>:<>
                    <div className="col-12">
                      <div className="ml-sm-5">
                        <div className="btn btn-secondary btn-sm mr-2">
                          <FontAwesomeIcon onClick={(e)=>{open(e,false)}} icon={faWindowClose} className="cursor-pointer "/>
                        </div>
                        <b>{openCliente.apellidos}</b> ({openCliente.nombres} )
                      </div>
                    </div>
                    <div className="col">
                      <div className="p-0 pt-2 p-sm-3 ">
                        <ClienteTabs data={openCliente} setOpenCliente={setOpenCliente}  />
                      </div>
                    </div>
                  </>}
            {data.length && !openCliente>0?<>

              <table className="table table-striped">
                <thead className="thead-dark">
                  <td>#Factura</td>
                  <td>Nombres y apellidos</td>
                  <td>Fechas</td>
                  <td>Monto cuota</td>
                  <td>Monto Pagado</td>
                  <td>Monto Debe</td>
                  <td className="text-center">Acción</td>
                </thead>
                <tbody>
                  {data.map((row,key)=>{
                    console.log(row.mes_efectuo_pago,mesActual);
                    return  <tr className="col-12 col-sm-3 mb-3 component-table" key={key}>
                              <td>{row.factura_id}</td>
                              <td><b>{row.nombres} {row.apellidos}</b></td>
                              <td>{row.fecha_factura_string}</td>
                              <td className="text-center">{Functions.format(row.monto_total_facturado)}</td>
                              <td className="text-center">
                                {parseInt(row.mes_efectuo_pago)===mesActual?<>
                                  {Functions.format(row.monto_total_pagado)}
                                </>:<>
                                  0,00
                                </>}
                              </td>
                              <td className="text-center">
                                {row.deuda_salda==='NO'?<>

                                  {row.mes_efectuo_pago!==null && parseInt(row.mes_efectuo_pago)===mesActual?<>
                                    {(row.monto_total_facturado-row.monto_total_pagado>0)?Functions.format(row.monto_total_facturado-row.monto_total_pagado):"0,00"}
                                  </>:row.mes_efectuo_pago===null?<>
                                    {(row.monto_total_facturado-row.monto_total_pagado>0)?Functions.format(row.monto_total_facturado-row.monto_total_pagado):"0,00"}
                                  </>:<>
                                    Pago realizado en fecha posterior
                                  </>}
                                </>:<>
                                  0,00
                                </>}

                              </td>
                              <td className="text-center"><FontAwesomeIcon onClick={(e)=>{open(e,row)}} icon={faSearch} className="cursor-pointer"/></td>
                            </tr>
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Total</td>
                    <td className="text-center"><b>{Functions.format(totalDeuda)}</b></td>
                    <td className="text-center"><b>{Functions.format(totalPagado)}</b></td>
                    <td className="text-center"><b>{Functions.format(totalDebe)}</b></td>
                    <td className="text-center"></td>
                  </tr>
                </tfoot>
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
