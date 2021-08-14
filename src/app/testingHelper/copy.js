import React,{useEffect,useState} from 'react';
import Store from "../../helpers/Store";
import StateContext from '../../helpers/ContextState';
import Functions from "../../helpers/Functions";

const App=(props)=>{
  const context = React.useContext(StateContext);
  const [data, setData] = useState({
                                      microcalendario:[],
                                      data:{},
                                      atletas:[],
                                    });
  const [data2, setData2]           = useState({data:[],dias_espanol:[]});

  useEffect(() => {
    getInit()
  },[]);

  function getInit(){
    let data                        =   {tabla:props.tabla}
        data.token                  =   Store.get("user").token
        Functions.PostAsync("TestingHelper","MacrocalendarioEstructuraCalendario",data,context,{name:"callbackInit",funct:callbackInit})
  }

  function callbackInit(data){
    setData(data.response)
  }

  return  <div className="container">
            <div className="row mb-3">
              <div className="col">
                <div className="card">
                  <div className="card-header bg-success text-white">
                    COPY
                  </div>
                  <div className="card-body">
                    ss
                  </div>
                </div>
              </div>
            </div>
          </div>
}

export default App;
