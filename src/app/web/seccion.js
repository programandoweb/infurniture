import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Store from '../../helpers/Store';
import Config from '../../helpers/Config';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Banner from '../../screens/bannersAnimados';
import CarouselSet from '../../screens/carouselSet';
import CarouselComponent from '../../screens/Carousel';
import Noticias from '../../screens/Noticias';
import Banners from '../../screens/Banners';
import Tienda from '../../screens/Tienda';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const test  = false


const App=()=>{
  const context = React.useContext(StateContext);
  //const [userWeb, setUserWeb] = useState({});
  const [maquetacion, setMaquetacion] = useState([]);
  const [userWeb, setUserWeb] = useState({});
  const [webData, setWebData] = useState({});
  const [webCSS, setWebCSS] = useState({});

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    var content           =   document.getElementById("contentMain")
    let data          =   {}
        data.domain   =   test?'programandoweb.net':'programandoweb.net'
        data.menu     =   test?'home':Functions.segment()
        data.user     =   Store.get("user").token
        Functions.PostAsync("Web","getMaquetacion",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setUserWeb(data.response.userWeb)
    setWebData(data.response.webData)
    setWebCSS(data.response.webCSS)
    setMaquetacion(data.response.maquetacion)
  }

  const Navigator=(props)=>{
    return   <Navbar bg="light" expand="lg" className={props.row.clases}>
                <Navbar.Brand href="#home">
                  {webData.label}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    {
                        props.row.data.map((row,key)=>{
                          if (key===0) {
                            return  <Nav.Link href={Config.ConfigAppUrl+"web"} key={key}>{row.label}</Nav.Link>
                          }else {
                            return  <Nav.Link href={Config.ConfigAppUrl+"web/"+row.url} key={key}>{row.label}</Nav.Link>
                          }
                        })
                    }
                  </Nav>
                </Navbar.Collapse>
              </Navbar>

  }

  const Slider=(props)=>{
    return  <Banner data={props.row}/>
  }

  const Carousel=(props)=>{
    return  <CarouselComponent classNameMain={"mt-3 container-fluid"} data={props.row}/>
  }

  const openBlank=(e,url)=>{
    e.preventDefault()
    window.open(url)
  }

  return  <div id="contentMain">
            <Helmet>
             <title>{(webData.label)?webData.label:Config.Title}</title>
             {webCSS.css!==undefined?<style type="text/css">{webCSS.css}</style>:false}
            </Helmet>
            <div className="position-absolute-z-index-100-w-100">
              <div className="container-fluid social-network">
                <div className="row justify-content-end">
                  <div className="col-2 text-right">
                    <div className={
                                    ((webData.facebook!==undefined && webData.facebook!=="")||
                                    (webData.twitter!==undefined && webData.twitter!=="")||
                                    (webData.instagram!==undefined && webData.instagram!=="")||
                                    (webData.whatsapp!==undefined && webData.whatsapp!=="")||
                                    (webData.youtube!==undefined && webData.youtube!==""))?" text-center p-1  bg-transparent":"d-none"

                                    }>
                      {webData.whatsapp!==undefined && webData.whatsapp!==""? <a onClick={(e)=>openBlank(e,"https://api.whatsapp.com/send?phone="+webData.whatsapp+"&text=Hola,%20te%20he%20localizado%20por%20tu%20p%C3%A1gina%20Web")} href={"https://api.whatsapp.com/send?phone="+webData.whatsapp+"&text=Hola,%20te%20he%20localizado%20por%20tu%20p%C3%A1gina%20Web"}>
                                                                                <FontAwesomeIcon className="mr-2 cursor-pointer" icon={['fab', 'whatsapp']}/>
                                                                              </a> :false}
                      {webData.facebook!==undefined && webData.facebook!==""? <a onClick={(e)=>openBlank(e,webData.facebook)} href={webData.facebook}>
                                                                                <FontAwesomeIcon className="mr-2 cursor-pointer" icon={['fab', 'facebook']}/>
                                                                              </a> :false}
                      {webData.twitter!==undefined && webData.twitter!==""?   <a onClick={(e)=>openBlank(e,webData.twitter)} href={webData.twitter}>
                                                                                <FontAwesomeIcon className="mr-2 cursor-pointer" icon={['fab', 'twitter']}/>
                                                                              </a> :false}
                      {webData.instagram!==undefined && webData.instagram!==""? <a onClick={(e)=>openBlank(e,webData.instagram)} href={webData.instagram}>
                                                                                  <FontAwesomeIcon className="mr-2 cursor-pointer" icon={['fab', 'instagram']}/>
                                                                                </a> :false}
                      {webData.youtube!==undefined && webData.youtube!==""?     <a onClick={(e)=>openBlank(e,webData.youtube)} href={webData.youtube}>
                                                                                  <FontAwesomeIcon className="mr-2 cursor-pointer" icon={['fab', 'youtube']}/>
                                                                                </a> :false}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {
              maquetacion.map((row,key)=>{
                //console.log(row.type);
                switch (row.type) {
                  case "nav":
                    return <Navigator key={key} row={row}/>
                  break;
                  case "slider":
                    return <Slider key={key} row={row}/>
                  break;
                  case "carousel":
                    return <Carousel key={key} row={row}/>
                  break;
                  case "noticias":
                    return <Noticias key={key} row={row} title="Noticias"/>
                  break;
                  case "banners":
                    return <Banners key={key} row={row} />
                  break;
                  case "tienda":
                    return <Tienda key={key} row={row} title="Tienda"/>
                  break;
                  default:
                    return false
                }
              })
            }
          </div>
}
export default App
