import React,{useState,useEffect} from 'react';
import { faUser, faPhone, faIdCard, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
import Store from '../helpers/Store';
import Select from '../screens/select';

const App=(props)=>{
  const context               =   React.useContext(StateContext);
  const [loading, setLoading] =   useState(false);
  const [inputs, setInputs]   =   useState({});
  const modulo                =   props.modulo

  const onChange=(e)=>{
    let input_new     =   inputs
        input_new[e.target.name]=e.target.value
        setInputs(input_new)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    modulo[4]             =   "usuarios/edit"
    let data              =   inputs
        data.user         =   Store.get("user").token
        data.app          =   JSON.stringify(modulo)
        //return console.log(modulo);
        Functions.PostAsync("Usuarios","SetUser",data,context,{name:"callbackSubmit",funct:callbackSubmit})
  }

  const callbackSubmit=(data)=>{
    if (data.response.error===false) {
      props.setModalShow({show:false,
                          message:"",
                          size:"sm"})
    }
  }

  useEffect(() => {
    setInputs(props.row)
  },[loading]);

  return  <>
            {
              !loading?<form onSubmit={onSubmit}>
                <div className="row mb-1">
                  <div className="col-12">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text text-white" id="basic-addon1">
                          <FontAwesomeIcon icon={faUser}/>
                        </span>
                      </div>
                      <input defaultValue={props.row.nombres} type="text" className="form-control" name="nombres" onChange={onChange} placeholder="Nombres..." />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text text-white" id="basic-addon2">
                          <FontAwesomeIcon icon={faUser}/>
                        </span>
                      </div>
                      <input defaultValue={props.row.apellidos} type="text" className="form-control" name="apellidos" onChange={onChange} placeholder="Apellidos..." />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text text-white" id="basic-addon3">
                          <FontAwesomeIcon icon={faPhone}/>
                        </span>
                      </div>
                      <input defaultValue={props.row.telefono} type="text" className="form-control" name="telefono" onChange={onChange} placeholder="Teléfono..." />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 ">
                    <Select
                            data={props.data}
                            name="tipo_usuario_id"
                            required={true}
                            className={"form-control"}
                            defaultValue={props.row.tipo_usuario_id}
                            onChange={onChange}
                            selectDefault={"Tipo de usuario"}
                    />
                  </div>
                  <div className="col-12 ">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text text-white" id="basic-addon4">
                          <FontAwesomeIcon icon={faPhone}/>
                        </span>
                      </div>
                      <input defaultValue={props.row.email} type="text" className="form-control" name="email" onChange={onChange} placeholder="Email..." />
                    </div>
                  </div>
                  <div className="col-12 ">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text text-white" id="basic-addon4">
                          <FontAwesomeIcon icon={faIdCard}/>
                        </span>
                      </div>
                      <input defaultValue={props.row.cedula} type="text" className="form-control" name="cedula" onChange={onChange} placeholder="Identificación..." />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary"><FontAwesomeIcon icon={faSave}/> Guardar</button>
                  </div>
                </div>
              </form>:<></>
            }
          </>
}
export default App
