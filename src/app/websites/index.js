import React from 'react';
import { Redirect,BrowserRouter, Route, Switch  } from "react-router-dom";
import Format404 from '../../screens/format404';
import WebsiteBuilder from "./websiteBuilder";
import WebsiteIndex from "./WebsiteIndex";
import WebsiteSlider from "./WebsiteSlider";
import WebsiteCarousel from "./WebsiteCarousel";
import WebsiteTextoEstatico from "./WebsiteTextoEstatico";
import WebsiteTienda from "./WebsiteTienda";
import WebsiteNoticias from "./WebsiteNoticias";
import WebsiteBanners from "./WebsiteBanners";
import WebsiteCSS from "./WebsiteCSS";
import WebsiteMatriz from "./WebsiteMatriz";
import WebsiteMenu from "./WebsiteMenu";
import WebsiteBuilderList from "./WebsiteBuilderList";
import Websitio from "./Websitio";
import WebsiteMedia from "./WebsiteMedia";




const App=(props)=>{
  return  <BrowserRouter>
             <Switch>
                <Route exact path={"/apanel/websites"} render={()=><WebsiteIndex/>}/>
                <Route exact path={"/apanel/websites/sitio"} render={()=><Websitio/>}/>
                <Route exact path={"/apanel/websites/matriz"} render={()=><WebsiteMatriz/>}/>
                <Route exact path={"/apanel/websites/menu"} render={()=><WebsiteMenu/>}/>
                <Route exact path={"/apanel/websites/matriz"} render={()=><WebsiteMatriz/>}/>
                <Route exact path={"/apanel/websites/matriz/edit*"} render={()=><WebsiteBuilder/>}/>
                <Route exact path={"/apanel/websites/textos"} render={()=><WebsiteTextoEstatico/>}/>
                <Route exact path={"/apanel/websites/slider"} render={()=><WebsiteSlider/>}/>
                <Route exact path={"/apanel/websites/carousel"} render={()=><WebsiteCarousel/>}/>
                <Route exact path={"/apanel/websites/tienda"} render={()=><WebsiteTienda/>}/>
                <Route exact path={"/apanel/websites/noticias"} render={()=><WebsiteNoticias/>}/>
                <Route exact path={"/apanel/websites/banners"} render={()=><WebsiteBanners/>}/>
                <Route exact path={"/apanel/websites/css"} render={()=><WebsiteCSS/>}/>
                <Route exact path={"/apanel/websites/media"} render={()=><WebsiteMedia/>}/>
                <Route path="/404" component={Format404} />
                <Redirect to="/404" />
             </Switch>
         </BrowserRouter>
}

export default App;
