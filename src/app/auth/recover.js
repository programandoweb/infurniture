import React,{useState} from 'react';
import StateContext from '../../helpers/ContextState'
import Functions from "../../helpers/Functions";
import Logo from '../../assets/images/design/logo.png';

const App=(props)=>{

  const context = React.useContext(StateContext);

  const [inputs, setInputs] = useState({login:""});

  function setInput(e){
    let input = inputs
        input[e.target.name]  = e.target.value
        setInputs(input)
  }

  function onSubmit(e){
    e.preventDefault()
    let data  = inputs
    Functions.PostAsync("User","recoverNewPWA",data,context,{name:"callbackContinue",funct:callbackContinue})
  }

  function callbackContinue(data){
    context.setAlert({show:true,message:data.message})
    setTimeout(function(){ document.location.href=context.Config.ConfigAppUrl }, 3000);
  }

  return  <div className="container auth">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 mt-3">
                <form onSubmit={onSubmit}>
                  <div className="card">
                    <div className="card-body">
                      <div className="text-center">
                        <img src={Logo} alt="" className="img-fluid p-5"/>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <input  className="form-control"
                                  name="login"
                                  onChange={setInput}
                                  placeholder="Nombre de usuario o email..."
                                  required
                          />
                        </div>
                      </div>
                      <div className="row mb-3 text-center">
                        <div className="col">
                          <button className="btn btn-primary" type="submit">
                            Recuperar contraseña
                          </button>
                          <a href={context.Config.ConfigAppUrl+context.Constants.Modulos.auth.login.url} className="btn btn-link">
                            Iniciar sesión
                          </a>
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
