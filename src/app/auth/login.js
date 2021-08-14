import React,{useState} from 'react';
import StateContext from '../../helpers/ContextState'
import Functions from "../../helpers/Functions";
import Logo from '../../assets/images/design/logo.png';
import { faUser,faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App=(props)=>{

  const context = React.useContext(StateContext);

  const [inputs, setInputs] = useState({login:"",password:""});

  function setInput(e){
    let input = inputs
        input[e.target.name]  = e.target.value
        setInputs(input)
  }

  function onSubmit(e){
    e.preventDefault()
    let data  = inputs
    Functions.PostAsync("User","loginPWA",data,context,{name:"callbackContinue",funct:callbackContinue})
  }

  function callbackContinue(data){
    if (data.code===400) {
      //console.log(context.setModalShow);
      context.setModalShow({show:true,size:"sm",message:<div className="text-center">{data.message}</div>})
    }else {
      context.Store.set("privilegios",data.response.store.privilegios)
      context.Store.set("user",data.response.store.user)
      context.setUser(data.response.store.user)
      document.location.href=context.Config.ConfigAppUrl+"apanel"
    }
  }

  return  <div className="container auth">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 mt-3">
                <form onSubmit={onSubmit}>
                  <div className="card-">
                    <div className="card-body-">
                      <div className="text-center mb-3">
                        <img src={Logo} className="img-fluid" alt=""/>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <div className="input-group mb-3 input-group-lg">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="basic-addon1">
                                <FontAwesomeIcon icon={faUser}/>
                              </span>
                            </div>
                            <input  className="form-control"
                                    name="login"
                                    onChange={setInput}
                                    placeholder="Usuario"
                                    required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <div className="input-group mb-3 input-group-lg">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="basic-addon1">
                                <FontAwesomeIcon icon={faLock}/>
                              </span>
                            </div>
                            <input  className="form-control"
                                    name="password"
                                    type="password"
                                    onChange={setInput}
                                    placeholder="Contraseña"
                                    required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3 text-center">
                        <div className="col">
                          <button className="btn btn-primary" type="submit">
                            Ingresar
                          </button>
                          <a href={context.Config.ConfigAppUrl+context.Constants.Modulos.auth.recover.url} className="btn btn-link">Recuperar Contraseña</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
}

export default App;
