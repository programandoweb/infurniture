import React,{useEffect,useState} from 'react';
import Store from "../../helpers/Store";
import StateContext from '../../helpers/ContextState';
import Functions from "../../helpers/Functions";

const App=(props)=>{

  const context = React.useContext(StateContext);
  const [users, setUsers]   = useState([]);
  const [privilegios, setPrivilegios]   = useState([]);
  const [select, setSelect]   = useState("-1");

  useEffect(() => {
    getInit()
  },[])

  function getInit(){
    let data        = {tabla:props.tabla}
        data.token  = Store.get("user").token
    Functions.PostAsync("Maestros","getUsuarios",data,context,{name:"callback",funct:callback})
  }

  function callback(data){
    setUsers(data.response.usuarios)
    setPrivilegios(data.response.privilegios)
  }

  function onChange(e){
    setSelect(e.target.value)
  }

  function onClick(){
    if (  privilegios[users[select].tipo_usuario_id].privilegios==="any" ) {
      Store.set("user", users[select])
      Store.set("user_temp","")
      Store.set("privilegios",Store.get("privilegios_temp"))
      Store.set("privilegios_temp","")
    }else {
      Store.set("user_temp", Store.get("user"))
      Store.set("user", users[select])
      Store.set("privilegios_temp",Store.get("privilegios"))
      Store.set("privilegios",privilegios[users[select].tipo_usuario_id].privilegios)
    }
    document.location.href  = '../'
  }

  return  <div className="container mt-3">
            <div className="d-flex justify-content-center">
              <div className="col-3">
                <select  className="form-control" onChange={onChange}>
                  <option value="-1">Seleccione el usuario</option>
                  {
                    users.map((row,key)=>{
                      return <option key={key} value={key}>{row.nombres}</option>
                    })
                  }
                </select>
              </div>
              <div className="col-1">
                <div className="btn btn-primary" onClick={onClick}>Seleccionar</div>
              </div>
            </div>
          </div>
}
export default App;
