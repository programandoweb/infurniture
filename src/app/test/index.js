import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Store from '../../helpers/Store';
//import Banner from './banner';
import Banner from '../../screens/bannersAnimados';

const test  = true

const data  = [
                {
                  src:"https://vilmanunez.com/wp-content/uploads/2018/07/como-hacer-un-banner.png",
                  alt:"Prueba",
                  title:"Prueba",
                  text1:"Hola esto es un texto",
                  text2:"Hola esto es un texto2",
                  TweenOne:"Este texto es un TweenOne"
                },
                {
                  src:"https://cdn2.hubspot.net/hubfs/156214/blog/Que%20es%20un%20banner-1.jpg",
                  alt:"Prueba",
                  title:"Prueba",
                  text1:"Hola esto es un texto",
                  text2:"Hola esto es un texto2",
                  TweenOne:"Este texto es un TweenOne 2222"
                },
              ]

const App=()=>{

  const context = React.useContext(StateContext);
  //const [userWeb, setUserWeb] = useState({});
  const [maquetacion, setMaquetacion] = useState([]);

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    var content           =   document.getElementById("contentMain")
    let data          =   {}
        data.domain   =   test?'programandoweb.net':'programandoweb.net'
        data.section  =   test?'home':'home'
        data.user     =   Store.get("user").token
        Functions.PostAsync("Web","getMaquetacion",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    //setUserWeb(data.response.userweb)
    setMaquetacion(data.response.maquetacion)
  }

  return  <div id="contentMain">
            <Banner data={data}/>

          </div>
}
export default App
