import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Store from '../../helpers/Store';
import Config from '../../helpers/Config';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const HtmlToReactParser = require('html-to-react').Parser;
let htmlToReactParser = new HtmlToReactParser();

const test  = true

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


const Precio=(props)=>{
  if (props.data.oferta!==undefined && props.data.oferta!=="" && props.data.oferta!=="0" ) {
    return  <div className="row">
              <div className="col-5">
                <div className="precio h5 pl-4">
                  Antes {props.data.precio}
                </div>
              </div>
              <div className="col">
                <div className="oferta h5 text-danger">
                  Ahora {props.data.oferta}
                </div>
              </div>
            </div>
  }
  return false
}

const App=()=>{

  const context = React.useContext(StateContext);
  const [maquetacion, setMaquetacion] = useState([]);
  const [userWeb, setUserWeb] = useState({});
  const [webData, setWebData] = useState({});
  const [webCSS, setWebCSS] = useState({});
  const [extraWeb, setExtraWeb] = useState(false);

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    var content           =   document.getElementById("contentMain")
    let data          =   {}
        data.domain   =   test?'programandoweb.net':'programandoweb.net'
        data.menu     =   test?'home':'home'
        data.user     =   Store.get("user").token
        data.extraData=   'getProducto::'+Functions.segment(1)
        Functions.PostAsync("Web","getMaquetacion",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setExtraWeb(data.response.extra)
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

  const openBlank=(e,url)=>{
    e.preventDefault()
    window.open(url)
  }
  let description   =  htmlToReactParser.parse(extraWeb.descripcion);

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
                switch (row.type) {
                  case "nav":
                    return <Navigator key={key} row={row}/>
                  break;
                  default:
                    return false
                }
              })
            }

            <section className="tienda">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div className="">
                      {extraWeb.images!==undefined?<>
                          <Carousel
                            responsive={responsive}
                            showDots={true}
                            draggable={true}
                            infinite={true}
                            autoPlay={true}
                          >
                            {extraWeb.images.map((row,key)=>{
                              return  <div className="col" key={key}>
                                        <div className="card border-secondary mb-3">
                                          <img className="card-img-top" src={row.image} alt="PGRW"/>
                                        </div>
                                      </div>
                            })}
                          </Carousel>
                        </>:false
                      }
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="bg-white border-bottom p-2">
                      <h1 className="h4">{extraWeb.label}</h1>
                      <h2 className="h6 p-2">Precio:<Precio data={extraWeb}/></h2>
                      <div className="col-11">
                        <div className="titulo mb-2">Descripción del producto</div>
                        <div className="store-text-description">
                          {description}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-2">
                    <div className="bg-white border-bottom p-2">
                      <h4 className="h6 text-center">
                        <b>Compra segura</b>
                      </h4>
                      <div className="store-text-description">
                        
                      </div>
                      <div className="btn btn-warning btn-block mt-3 ">
                        Comprar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
}
export default App
