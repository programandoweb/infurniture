import React,{useState,useEffect} from 'react';
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
const App=(props)=>{
  const context =   React.useContext(StateContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    getInit()
  },[props.open])

  const getInit=()=>{
    let data        =   {}
        data.user   =   context.Store.get("user").token
    Functions.PostAsync("Maestros","get_tipo_usuarios_simple",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setData(data.response.data)
  }

  if (context.User.tipo_usuario_id==="1") {
    return  <div className="row mt-5">
              {Object.entries(context.Constants.Modulos).map((row,key)=>{
                if (row[1].public!==undefined && row[1].public && row[0]!=="contrasena") {
                  return  <div key={key} className="col-12 col-sm mb-3">
                            <div className="card">
                              <div className="card-content">
                                <div className="card-header">
                                  <>{row[1].label}</>
                                </div>
                                <div className="card-body">

                                  {row[0]==="usuariosa"?<>

                                    </>:<>
                                    {Array.isArray(row[1].items)? <>
                                                                    {
                                                                      row[1].items.map((row2,key2)=>{
                                                                        let item  = Object.entries(row2);
                                                                        if (item[0][1].public!==undefined && item[0][1].public) {
                                                                          let modulo_ = (item[0][1].modulo!==undefined)?item[0][1].modulo:row[0];
                                                                          let submodulo_ = (item[0][1].submodulo!==undefined)?item[0][1].submodulo:item[0][0];
                                                                          let ext = item[0][1].metodo+"::"+modulo_+"::"+submodulo_+"::"+item[0][1].label+"::"+item[0][1].url+"::"+item[0][1].public
                                                                          return <div key={key2}>
                                                                                    <a href={context.Config.ConfigAppUrl+"apanel/"+item[0][1].url+"?app="+ext}>
                                                                                      {item[0][1].label}
                                                                                    </a>
                                                                                 </div>
                                                                        }else {
                                                                          return false
                                                                        }
                                                                      })
                                                                    }
                                                                  </>:<></>}
                                    </>
                                  }

                                </div>
                              </div>
                            </div>
                          </div>
                }else {
                  return false
                }
              })}
            </div>


  }else if (context.User.tipo_usuario_id!=="1") {
    let privilegios =   context.Store.get("privilegios");
    return  <div className="row mt-5">
              {
                Object.entries(privilegios).map((row,key)=>{
                  return  <div key={key} className="col-12 col-sm mb-3">
                            <div className="card">
                              <div className="card-content">
                                <div className="card-header">
                                  {row[0]}
                                </div>
                                <div className="card-body">
                                  {
                                    row[1].map((row2,key2)=>{
                                      if (row2.public==='1') {
                                        let ext = row2.metodo+"::"+row2.modulo+"::"+row2.submodulo+"::"+row2.label+"::"+row2.url+"::"+row2.public
                                        if (row[0]==="usuarios") {
                                          return data.map((row2,key2)=>{
                                            return <div key={key2}><a href={context.Config.ConfigAppUrl+"apanel/usuarios/lista-"+row2.label+"s?filter="+row2.value+"&app="+ext}>{row2.label}</a></div>
                                          })
                                        }else {
                                          return  <div key={key2}>
                                                    <a href={context.Config.ConfigAppUrl+"apanel/"+row2.url+"?app="+ext}>{row2.label}</a>
                                                  </div>
                                        }
                                      }else {
                                        return false;
                                      }
                                    })
                                  }

                                </div>
                              </div>
                            </div>
                          </div>
                })
              }
            </div>
  }else {
    return <></>
  }

}

export default App
