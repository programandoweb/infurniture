import React,{useState,useEffect} from 'react';
import Functions from '../../helpers/Functions';
import { NavLink, useParams, useHistory  } from "react-router-dom";
import Config from '../../helpers/Config';
import Input from '../../screens/inputs';
import Select from '../../screens/select';
import Table from '../../screens/table_sub_resultados';
import StateContext from '../../helpers/ContextState'
import  queryString from 'query-string';

const accion  = [{label:"Agregar al inventario",value:"+"},{label:"Restar al inventario",value:"-"}]

const App=()=>{
  let   history             =   useHistory();
  const params              =   useParams();
  const context             =   React.useContext(StateContext);
  const [inputs, setInputs] =   useState(false);
  const [record, setRecord] =   useState([]);
  const [modulo, setModulo] =   useState(false);
  const [privilegios, setPrivilegios]       =   useState({});


  const onSubmit=(e)=>{
    e.preventDefault()
    let data        =   {...inputs}
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync(modulo[2],"Set_"+modulo[0],data,{},{name:"callbackOnSubmit",funct:callbackOnSubmit})
  }

  const callbackOnSubmit=(data)=>{
    if (data.response!==undefined && data.response.message!==undefined && data.response.message.label!==undefined) {
      context.setModalShow({  show:true,
                              size:"sm",
                              message:  <div className="text-center">
                                          {data.response.message.label}
                                          <div className="btn btn-primary mt-3" onClick={()=> { context.setModalShow({  show:false,message:"",size:"sm", }); } }>Cerrar</div>
                                        </div>
                            })
      //setTimeout(function(){ context.setModalShow({  show:false, }); history.goBack(); }, 3000);
    }
  }

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs);
  }

  const getInit=()=>{
    let data_      =   {id:params.id}
        data_.app  =   JSON.stringify(modulo)
    Functions.PostAsync(modulo[2],"Get_"+modulo[0],data_,{},{name:"callbackGetInit",funct:callbackGetInit})
  }

  const callbackGetInit=(data)=>{
    if (data.response.data!==undefined) {
      setInputs(data.response.data)
    }
    if (data.response.record!==undefined) {
      setRecord(data.response.record)
    }
    setPrivilegios(data.response.privilegios)
  }

  useEffect(() => {
    const mod = Functions.segments_modulos(queryString.parse(window.location.search).app)
    setModulo(mod)
  },[window.location.search])

  useEffect(() => {
    if (params.id!=="0" && modulo) {
      getInit()
    }
  },[modulo])

  return <>
            {modulo?<><div className="card">
                <div className="card-body">
                  <h5>{modulo[3]} <b>{inputs.label} ({inputs.codigo})</b></h5>
                  <form onSubmit={onSubmit}>
                    <div className="row pb-2">
                      <div className="col-12 col-sm-6 mb-2">
                        <Select
                            defaultValue={inputs.accion}
                            title="Acción"
                            selectDefault="Acción"
                            data={accion}
                            name="accion"
                            className="form-control"
                            onChange={onChange}
                          />
                      </div>
                      <div className="col-12 col-sm-6 mb-2">
                        <Input
                            autocomplete={false}
                            defaultValue={inputs.cantidad}
                            title="Cantidad"
                            placeholder="Cantidad"
                            type="number"
                            event="solonumeros"
                            name="cantidad"
                            className="form-control"
                            onChange={onChange}
                        />
                      </div>
                      <div className="col-12 col-sm-6 mb-2">
                        <Input
                            autocomplete={false}
                            defaultValue={inputs.observacion}
                            title="Observación"
                            placeholder="Observación"
                            name="observacion"
                            className="form-control"
                            onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-end pb-2">
                      <div className="col-12 col-sm-4 mb-2 text-right">
                        {privilegios.AgregarItems!==undefined || privilegios.EditarItems!==undefined || params.id==="0"?<>
                            <button type="submit" className="btn btn-warning mr-2">Guardar</button>
                        </>:false}
                        {privilegios.ListarItemsArticulos!==undefined || params.id==="0"?<div className="btn btn-primary" onClick={history.goBack}>Cancelar</div>:false}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
                {record.length>0?<Table title={inputs.label} data={record}/>:false}
              </>:false}
        </>

}

export default App
