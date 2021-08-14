import React from 'react';
import Maestro from '../../screens/maestrosRegistrarEquipos';
import Store from "../../helpers/Store";
import StateContext from '../../helpers/ContextState';
import Functions from "../../helpers/Functions";

const Items=(props)=>{

  const context = React.useContext(StateContext);

  function handlePrivilegeUser(e,row3){

    let data        = {tabla:props.tabla}
        data.token  = Store.get("user").token
    Functions.PostAsync("maestros","privilegeUsers",data,context,{name:"callback",funct:callback})
  }

  function callback(data){
    console.log(data);
  }

  return Object.entries(props.Constants.Modulos).map((row,key)=>{
      if (row[0]!=='auth' && row[0]!=='cerrar_sesion') {
        return  <div className="row mb-3" key={key}>
                  <div className="col-2 bg-secondary">
                    {row[1].label}
                  </div>
                  {
                    row[1].items.map((row2,key2)=>{
                      return  <div key={key2} className="col-3">
                                {
                                  Object.entries(row2).map((row3,key3)=>{
                                    if (row3[1].label!==undefined) {
                                      return <div key={key3} className="text-center">
                                                {row3[1].label}
                                                <div className="text-center"><input type="checkbox" onClick={(e)=>handlePrivilegeUser(e,row3)}/></div>
                                              </div>
                                    }else {
                                      return <></>
                                    }
                                  })
                                }
                              </div>
                    })
                  }
                </div>
      }else {
        return <div key={key}></div>
      }
    })
}

const App=(props)=>{
  return  <div className="container-fluid">
            <div className="row mb-3">
              <Maestro
                title="Registro de equipos"
                modulo="Maestros"
                metodo="tablas_maestras"
                tabla="equipos"
                limit="10"
                classHeader="bg-success text-white"
                className="col-12 col-sm-12"
              />
            </div>
          </div>
}

export default App;
