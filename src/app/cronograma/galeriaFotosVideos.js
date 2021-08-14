import React,{useEffect,useState} from 'react';
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import StateContext from '../../helpers/ContextState';
import MacroCronograma from '../../screens/modalMacroCronograma';
import queryString from 'query-string';
import ModalEncuestaAntes from '../../screens/modalEvaluacion';
import ModalEncuestaDespues from '../../screens/modalEvaluacion';
const queryStringParams = queryString.parse(window.location.search);

let colores=0

const App=(props)=>{
  const context = React.useContext(StateContext);
  const [data, setData] = useState({
                                      galeria:[],
                                    });

  useEffect(() => {
    getInit()
  },[]);

  function getInit(){
    let data                        =   {tabla:props.tabla}
        data.token                  =   Store.get("user").token
        data.op_microcalendario_id  =   Store.get("user").token
        Functions.PostAsync("Cronograma","GetGaleria",data,context,{name:"callbackInit",funct:callbackInit})
  }

  function callbackInit(data){
    setData({galeria:data.response.galeria})
  }

  return  <div className="container mt-3">
            <div className="row">
              <div className={props.className?props.className:"col-12 mb-3"}>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col">
                        Galería de fotos y videos
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {data.galeria.map((row,key)=>{
                      colores=(colores===0)?1:0
                      return  <div key={key} className={colores===0?"row mb-3 pb-3 border-bottom":"row bg-gray mb-3 pb-3 border-bottom"} >
                                <div className="col-12 mb-3  border-bottom h3">
                                  <div>{row.nombres} {row.apellidos} - {row.fecha}</div>
                                </div>
                                <div className="col-12 col-sm-6">
                                  <div><b>Foto</b></div>
                                  {row.foto && row.foto!==undefined?<img src={row.foto} alt="" className="img-fluid"/>:'No registra'}
                                </div>
                                <div className="col-12 col-sm-6">
                                  <div><b>Video</b></div>
                                  {row.video && (row.video!==undefined && row.video!==null)?<><a className="d-none" href={row.video} target="_blank">Ver video</a>
                                      <video controls className="img-fluid">
                                        <source src={row.video} type="video/mp4"/>
                                        Tu navegador no implementa el elemento <code>video</code>.
                                      </video>
                                    </>:'No registra'}
                                </div>
                              </div>
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App;
