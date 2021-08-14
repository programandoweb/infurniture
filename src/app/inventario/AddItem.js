import React,{useState,useEffect} from 'react';
import Functions from '../../helpers/Functions';
import { NavLink, useParams, useHistory  } from "react-router-dom";
import Config from '../../helpers/Config';
import Input from '../../screens/inputs';
import StateContext from '../../helpers/ContextState'
import  queryString from 'query-string';

const App=()=>{
  let   history             =   useHistory();
  const params              =   useParams();
  const context             =   React.useContext(StateContext);
  const [inputs, setInputs] =   useState(false);
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
      setTimeout(function(){ context.setModalShow({  show:false, }); history.goBack(); }, 3000);
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
            {modulo?<div className="card">
                <div className="card-body">
                  <h5>Formulario {modulo[3]}</h5>
                  <form onSubmit={onSubmit}>
                    <div className="row pb-2">
                      <div className="col-12 col-sm-6 mb-2">
                        <Input
                            defaultValue={inputs.label}
                            title="Nombre del item"
                            placeholder="Nombre del item"
                            type="text"
                            name="label"
                            className="form-control"
                            onChange={onChange}
                        />
                      </div>
                      <div className="col-12 col-sm-6 mb-2">
                        <Input
                            defaultValue={inputs.codigo}
                            title="Código Interno"
                            placeholder="Código Interno"
                            type="text"
                            name="codigo"
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
              </div>:false}
        </>

}

export default App
