import React,{useState} from 'react';
import StateContext from '../../helpers/ContextState'
import Functions from "../../helpers/Functions";
import Logo from '../../assets/images/design/logo.png';

const App=(props)=>{

  const context = React.useContext(StateContext);

  const [inputs, setInputs] = useState({login:"",password:""});
  const [tipo_usuario_id, setTipo_usuario_id] = useState([]);

  function getInit(){
    let data        = {}
        data.token  = Functions.segment()
    Functions.PostAsync("Maestros","getTiposUsuarios",data,context,{name:"callbackGetInit",funct:callbackGetInit})
  }

  function callbackGetInit(data){
    setTipo_usuario_id(data.response.tipo_usuario_id)
  }

  function setInput(e){
    let input = inputs
        input[e.target.name]  = e.target.value
        setInputs(input)
  }

  function onSubmit(e){
    e.preventDefault()
    let data  = inputs
    Functions.PostAsync("User","registerUser",data,context,{name:"callbackContinue",funct:callbackContinue})
  }

  function callbackContinue(data){
    if (data.code===403) {
      context.setAlert({show:true,message:data.response.message})
    }else {
      if (data.response.store!==undefined) {
        context.Store.set("user",data.response.store.user)
        context.setUser(data.response.store.user)
        document.location.href=context.Config.ConfigAppUrl
      }
    }
  }

  if (tipo_usuario_id.length===0) {
    getInit()
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
                          <select className="form-control" name="tipo_usuario_id" onChange={setInput} required>
                            <option value="">Tipo de Usuario</option>
                            {
                              tipo_usuario_id.map((row,key)=>{
                                  return <option value={row.tipo_usuario_id} key={key}>{row.label}</option>
                              })
                            }
                          </select>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <input  className="form-control"
                                  name="nombres"
                                  onChange={setInput}
                                  placeholder="Nombres"
                                  required
                          />
                        </div>
                        <div className="col">
                          <input  className="form-control"
                                  name="apellidos"
                                  onChange={setInput}
                                  placeholder="Apellidos"
                                  required
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <input  className="form-control"
                                  name="login"
                                  onChange={setInput}
                                  placeholder="Email..."
                                  required
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <input  className="form-control"
                                  name="password"
                                  type="password"
                                  onChange={setInput}
                                  placeholder="Password"
                                  required
                          />
                        </div>
                      </div>
                      <div className="row mb-3 text-center">
                        <div className="col">
                          <button className="btn btn-primary" type="submit">
                            Registrar
                          </button>
                          <a href={context.Config.ConfigAppUrl+context.Constants.Modulos.auth.recover.url} className="btn btn-link">Recuperar Contraseña</a>
                          <a href={context.Config.ConfigAppUrl+context.Constants.Modulos.auth.login.url} className="btn btn-link">Iniciar Sesión</a>
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
