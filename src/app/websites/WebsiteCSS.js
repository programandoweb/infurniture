import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Cropper from '../../screens/Cropper'
import Textarea from '../../screens/textarea';
import getCroppedImg from '../../helpers/cropImage'
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=(props)=>{
  const context = React.useContext(StateContext);
  const [inputs, setInputs] = useState({});
  const [data, setData]     = useState([]);
  const modulo  =   Functions.segments_modulos(queryStringParams.app);

  const onChange=(e)=>{
    let inputs_ =   inputs;
        inputs_[e.target.name]=e.target.value
        setInputs(inputs_)
  }

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    let data        =   inputs
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","getCSS",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setData(data.response.data);
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let data        =   inputs
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","setCSS",data,context,{name:"callbackContinue",funct:callbackContinue})
  }
  const callbackContinue=(data)=>{
    setInputs({})
    getInit()
  }

  return  <form onSubmit={onSubmit}>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      Editar de hojas de estilo
                    </div>
                    <div className="card-body">
                      <Textarea
                          defaultValue={data.css}
                          title="Hoja de estilo"
                          name="css"
                          className="form-control min-h-textarea"
                          onChange={onChange}
                      />
                      <button className="btn btn-primary" type="submit">Guardar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
}
export default App
