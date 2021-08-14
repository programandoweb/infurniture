import React,{useState} from 'react';
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
import Store from '../helpers/Store';

let password

const App=(props)=>{

  const context               =   React.useContext(StateContext);

  const [loading, setLoading] =   useState(false);

  const submit=(e)=>{
    e.preventDefault()
    let data              =   {}
        data.token        =   Store.get("user").token
        data.id           =   props.row.token
        data.password     =   password
        Functions.PostAsync("User","SetPassword",data,context,{name:"callbackSubmit",funct:callbackSubmit})
  }

  const callbackSubmit=(data)=>{
    if (data.response.error===false) {
      props.setModalShow({show:false,
                          message:"",
                          size:"sm"})
    }
  }

  const onChange=(e)=>{
    password=e.target.value
  }

  const  genPass=()=>{
    let stringInclude = '';
    stringInclude += "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
    stringInclude += '0123456789';
    stringInclude += 'abcdefghijklmnopqrstuvwxyz';
    stringInclude += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var password ='';
    for (let i = 0; i < 10; i++) {
        password += stringInclude.charAt(Math.floor(Math.random() * stringInclude.length));
    }
    return password;
  }

  password  = genPass()

  return  <>
            {
              !loading?<form onSubmit={submit}>
                <div className="row mb-1">
                  <div className="col-12 mb-2">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text text-white" id="basic-addon1">
                          <FontAwesomeIcon icon={faLock}/>
                        </span>
                      </div>
                      <input defaultValue={password} type="text" className="form-control" name="password" onChange={onChange} placeholder="Password..." />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary">Cambiar</button>
                  </div>
                </div>
              </form>:<></>
            }
          </>
}
export default App
