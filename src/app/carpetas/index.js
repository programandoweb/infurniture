import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);


const App=(props)=>{
  const context   =   React.useContext(StateContext);
  const modulo    =   Functions.segments_modulos(queryStringParams.app);
  const [directorios, setDirectorios] = useState(false);

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    let data              =   {}
        data.user         =   context.Store.get("user").token
        data.app          =   JSON.stringify(modulo)
        data.token        =   props.id
        Functions.PostAsync("Carpetas","getEstructura",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setDirectorios(data.response.data)
  }

  const makeDirectorios=()=>{
    let data              =   {}
        data.user         =   context.Store.get("user").token
        data.app          =   JSON.stringify(modulo)
        data.token        =   props.id
        Functions.PostAsync("Carpetas","makeDirectorios",data,context,{name:"callbackMakeDirectorio",funct:callbackMakeDirectorio})
  }

  const callbackMakeDirectorio=(data)=>{
    getInit()
  }

  return  <div className="row">
            <div className={!directorios?"col-12":"d-none"}>
              <div className="btn btn-warning mb-2" onClick={makeDirectorios}>
                <FontAwesomeIcon icon={faFolder}/> Generar estructura de carpetas
              </div>
            </div>
            {Object.entries(directorios).map((row,key)=>{
              //let row_  = row[1]
              return  <>
                        <div key={key} className="col-12 mb-2">
                          <div className="row border-bottom">
                            <div className="col-3">
                              {row[0]}
                            </div>
                            <div className="col-3">
                              {row[1].map((row2,key2)=>{
                                return  <div key={key2}>
                                          {row2}
                                        </div>
                              })}
                            </div>
                          </div>
                        </div>
                      </>
            })}
          </div>
}
export default App
