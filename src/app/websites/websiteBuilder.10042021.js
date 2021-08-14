import React,{useEffect,useState} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import NavElments from './buildElements/navElments';
import SliderElments from './buildElements/sliderElments';
import CarouselElments from './buildElements/carouselElments';
import TiendaElments from './buildElements/tiendaElments';
import NoticiasElments from './buildElements/noticiasElments';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);


const elements = [
  {
    filas:{
      label:"Filas",
      public:true,
      items:[
        {
          value:1,
          className:"row justify-content-center",
          title:"Central 1 Columna",
          parentClass:"col-12 col-sm-6",
          type:"row",
        },
        {
          value:2,
          className:"row justify-content-center",
          title:"Central 2 Columnas",
          parentClass:"col-12 col-sm-3",
          type:"row",
        },
        {
          value:3,
          className:"row justify-content-center",
          title:"Central 3 Columnas",
          parentClass:"col-12 col-sm-2",
          type:"row",
        },
        {
          value:1,
          className:"row",
          title:"1 Columna",
          parentClass:"col-12 col-sm-12",
          type:"row",
        },
        {
          value:2,
          className:"row",
          title:"2 Columnas",
          parentClass:"col-12 col-sm-6",
          type:"row",
        },
        {
          value:3,
          className:"row",
          title:"3 Columnas",
          parentClass:"col-12 col-sm-4",
          type:"row",
        },
      ]
    }
  },
  {
    nav:{
      modulo:"nav",
      label:"Navegación",
      public:false,
      className:"navbar navbar-expand-lg",
      element:{
        html:document.createElement("nav"),
        className:"navbar navbar-expand-lg navbar-light bg-light",
        title:"+",
        parentElement:document.createElement("ul"),
        parentClass:"navbar-nav mr-auto"
      }
    }
  },
  {
    slider:{
      modulo:"slider",
      label:"Sliders",
      public:false,
      className:"",
      element:{
        html:document.createElement("nav"),
        className:"",
        title:"+",
        parentElement:document.createElement("ul"),
        parentClass:"navbar-nav mr-auto"
      }
    }
  },
  {
    carousel:{
      modulo:"carousel",
      label:"Carousel",
      public:false,
      className:"",
      element:{
        html:document.createElement("nav"),
        className:"",
        title:"+",
        parentElement:document.createElement("ul"),
        parentClass:"navbar-nav mr-auto"
      }
    }
  },
  {
    tienda:{
      modulo:"tienda",
      label:"Tienda",
      public:false,
      className:"",
      element:{
        html:document.createElement("nav"),
        className:"",
        title:"+",
        parentElement:document.createElement("ul"),
        parentClass:"navbar-nav mr-auto"
      }
    }
  },
  {
    noticias:{
      modulo:"noticias",
      label:"Noticias",
      public:false,
      className:"",
      element:{
        html:document.createElement("nav"),
        className:"",
        title:"+",
        parentElement:document.createElement("ul"),
        parentClass:"navbar-nav mr-auto"
      }
    }
  },
  {
    textestatico:{
      label:"Texto estático",
      public:false,
      items:[
        {
          value:1,
          className:"row justify-content-center",
          title:"Normal",
          parentClass:"col-12",
          type:"textestatico",
        },
        {
          value:1,
          className:"row justify-content-center",
          title:"Fluido",
          parentClass:"col-12",
          type:"textestatico",
        },
      ]
    }
  },
  {
    banner:{
      label:"Banners",
      public:false,
      items:[
        {
          value:1,
          className:"row justify-content-center",
          title:"Normal",
          parentClass:"col-12",
          type:"banner",
        },
        {
          value:1,
          className:"row justify-content-center",
          title:"Fluido",
          parentClass:"col-12",
          type:"banner",
        },
      ]
    }
  },
  {
    navFooter:{
      label:"Navegación footer",
      public:false,
      items:[
        {
          value:1,
          className:"row justify-content-center",
          title:"1 Columna",
          parentClass:"col-12 col-sm-6",
          type:"navFooter",
        },
        {
          value:2,
          className:"row justify-content-center",
          title:"2 Columnas",
          parentClass:"col-12 col-sm-3",
          type:"navFooter",
        },
        {
          value:3,
          className:"row justify-content-center",
          title:"3 Columnas",
          parentClass:"col-12 col-sm-2",
          type:"navFooter",
        },
      ]
    }
  }
]



const Modulos=(props)=>{
  return <div>
          <div className="row border-bottom mb-2">
            <div className="col h5">
              Módulos
            </div>
          </div>
          <div className="row">
            {
              props.elements.map((row,key)=>{
                let keys  = Object.keys(row)
                if (!row[keys[0]].public) {
                  return <div className="col-12 col-sm-4 mb-2" key={key}>
                            <div className="btn btn-primary btn-block" onClick={(e)=>props.appendEle(props.content,row[keys[0]],props.parent)}>
                              {row[keys[0]].label}
                            </div>
                          </div>
                }else {
                  return false
                }

              }
            )}
          </div>
        </div>
}

let dragElementNow
let arrastraAqui

const App=()=>{
  const context = React.useContext(StateContext);
  const [containers, setContainers] = useState([]);
  const [data, setData] = useState([]);
  const modulo  =   Functions.segments_modulos(queryStringParams.app);
  const onClick=(row)=>{
    let objeto
  }

  useEffect(() => {
    getInit()
  },[])

  // useEffect(() => {
  //   var content             =   document.getElementById("contenedorArrastraAqui")
  //   if (context.modalShow.show===false) {
  //     console.log(content);
  //     getInit()
  //   }
  // },[context.modalShow])



  const getInit=()=>{
    var content           =   document.getElementById("contenedorArrastraAqui")
        content.innerHTML =   ""
    let data        =   {}
        data.id     =   queryStringParams.id
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","getMaquetacion",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    data.response.data.map((row,key)=>{
      return make(row)
    })
  }

  const make=(obj)=>{
    var content             =   document.getElementById("contenedorArrastraAqui")

    switch (obj.type) {
      case "nav":
        let   atributos        =   {
                                      "value": 1,
                                      "className": "row",
                                      "title": "1 Columna",
                                      "parentClass": "col-12 col-sm-12",
                                      "type": "row"
                                    }

        let   content_         =   crearDiv("content-fluid border mb-1")
        let   row_             =   crearDiv(atributos.className + " position-relative")
        // let   plus               =   crearDiv("navbar-brand")

        for (var i = 0; i < atributos.value; i++) {
          let col_            =   crearDiv(atributos.parentClass + "  ")
          let plus            =   crearDiv(" plus cursor-pointer h3 ")
          let plus2           =   crearDiv(" plus cursor-pointer ")
          let items_content   =   crearDiv("collapse navbar-collapse text-center")
          plus.textContent    =   ""
          plus2.textContent   =   ""
          col_.appendChild(plus)
          row_.appendChild(col_)
          //items_content.appendChild(plus2)

          plus.addEventListener("click",(e)=>{openModal(<Modulos
                                                                elements={elements}
                                                                content={e}
                                                                appendEle={appendEle}
                                                                parent={col_}/>)}, false);

          let atributo={}
          for (var i = 0; i < elements.length; i++) {
            if (Object.keys(elements[i])[0]===obj.type) {
              atributo = elements[i][obj.type]
            }
          }

          // console.log(col_);

          let element__             =   atributo.element.html.cloneNode(true)
              element__.className   =   atributo.element.className +" cursor-pointer "
              element__.appendChild(items_content)

          let new_element           =   document.createElement("ul")
              new_element.className =   "navbar-nav"

          let new_element_li              =   document.createElement("li")
              new_element_li.className    =   "ml-2 nav-item"
              new_element_li.textContent  =   obj.type+" ("+obj.details.grupo+")"
              new_element.appendChild(new_element_li)
              items_content.appendChild(new_element)

          col_.appendChild(element__)

          let contador          =   Functions.childNodesByType(col_,"nav")
              element__.id      =   "nav_"+contador.contador;

          plus2.addEventListener("click",(e)=>{
            context.setModalShow({
              show:true,
              message:<NavElments orden={contador.contador}
                                  type={contador.type}
                                  context={context}
                                  element={col_}
                      />
            })
          }, false);



        }
        content_.append(row_)
        content.appendChild(content_);
      break;
      case "slider":
        let   atributos_slider        =   {
                                      "value": 1,
                                      "className": "row",
                                      "title": "1 Columna",
                                      "parentClass": "col-12 col-sm-12",
                                      "type": "row"
                                    }

        let   content_slider   =   crearDiv("content-fluid border mb-1")
        let   row_slider       =   crearDiv(atributos_slider.className + " position-relative bg-white")

        for (var i = 0; i < atributos_slider.value; i++) {
          let col_slider              =   crearDiv(atributos_slider.parentClass + "  ")
              col_slider.textContent  =   obj.type+" ("+obj.details.grupo+")"
              row_slider.appendChild(col_slider)
        }
        content_slider.append(row_slider)
        content.appendChild(content_slider);
      break;
      case "tienda":
        let   atributos_tienda        =   {
                                      "value": 1,
                                      "className": "row",
                                      "title": "1 Columna",
                                      "parentClass": "col-12 col-sm-12",
                                      "type": "row"
                                    }

        let   content_tienda   =   crearDiv("content-fluid border mb-1")
        let   row_tienda       =   crearDiv(atributos_tienda.className + " position-relative bg-white")

        for (var i = 0; i < atributos_tienda.value; i++) {
          let col_tienda              =   crearDiv(atributos_tienda.parentClass + "  ")
              col_tienda.textContent  =   obj.type+" ("+obj.details.grupo+")"
              row_tienda.appendChild(col_tienda)
        }
        content_tienda.append(row_tienda)
        content.appendChild(content_tienda);
      break;
      case "noticias":
        let   atributos_noticias        =   {
                                      "value": 1,
                                      "className": "row",
                                      "title": "1 Columna",
                                      "parentClass": "col-12 col-sm-12",
                                      "type": "row"
                                    }

        let   content_noticias   =   crearDiv("content-fluid border mb-1")
        let   row_noticias       =   crearDiv(atributos_noticias.className + " position-relative bg-white")

        for (var i = 0; i < atributos_noticias.value; i++) {
          let col_noticias              =   crearDiv(atributos_noticias.parentClass + "  ")
              col_noticias.textContent  =   obj.type+" ("+obj.details.grupo+")"
              row_noticias.appendChild(col_noticias)
        }
        content_noticias.append(row_noticias)
        content.appendChild(content_noticias);
      break;
      case "carousel":
        let   atributos_carousel        =   {
                                      "value": 1,
                                      "className": "row",
                                      "title": "1 Columna",
                                      "parentClass": "col-12 col-sm-12",
                                      "type": "row"
                                    }

        let   content_carousel   =   crearDiv("content-fluid border mb-1")
        let   row_carousel       =   crearDiv(atributos_carousel.className + " position-relative bg-white")

        for (var i = 0; i < atributos_carousel.value; i++) {
          let col_carousel              =   crearDiv(atributos_carousel.parentClass + "  ")
              col_carousel.textContent  =   obj.type+" ("+obj.details.grupo+")"
              row_carousel.appendChild(col_carousel)
        }
        content_carousel.append(row_carousel)
        content.appendChild(content_carousel);
      break;
    }


  }

  const crearDiv=(className)=>{
    const div           =   document.createElement("div")
          div.className =   className
          return div;
  }

  /*arrastre*/
  const dropHandler=(ev)=>{
    var content             =   document.getElementById("contenedorArrastraAqui")

    switch (dragElementNow.row.type) {
      case "containerFluid":

      break;
      case "container":

      break;
      case "row":
        let atributos       =   dragElementNow.row
        let content_        =   crearDiv("content-fluid border mb-1")
        let row_            =   crearDiv(atributos.className + " position-relative")

        for (var i = 0; i < atributos.value; i++) {
          let col_            =   crearDiv(atributos.parentClass + "  ")
          let plus            =   crearDiv(" plus cursor-pointer h3 ")
          plus.textContent    =   "+"
          col_.appendChild(plus)
          row_.appendChild(col_)
          plus.addEventListener("click",(e)=>{openModal(<Modulos
                                                                elements={elements}
                                                                content={e}
                                                                appendEle={appendEle}
                                                                parent={col_}/>)}, false);
        }
        content_.append(row_)
        content.appendChild(content_);
      break;
    }

    removeDragData(ev)
  }

  const openModal=(Ventana)=>{
    context.setModalShow({
      show:true,
      message:Ventana
    })
  }

  /*CUANDO LE DAN CLICK A LA PRIMERA CRUZ*/
  const appendEle=(e,parent,parent_content)=>{
    context.setModalShow({
      show:false,
      message:""
    })

    console.log(parent);
    let atributos     =   parent
    let items_content =   crearDiv("collapse navbar-collapse")
    let plus          =   crearDiv("navbar-brand")

        plus.textContent         =   "+"
        items_content.appendChild(plus)

        let element__         =   atributos.element.html.cloneNode(true)
        element__.className   =   atributos.element.className +" cursor-pointer "
        element__.appendChild(items_content)

        let contador          =   Functions.childNodesByType(parent_content,"nav")
            element__.id      =   "nav_"+contador.contador;

        switch (parent.modulo) {
          case "noticias":
            let new_element_noticias              =   document.createElement("div")
                new_element_noticias.className    =   "col cursor-pointer"
                new_element_noticias.textContent  =   "+ Seleccione"
                parent_content.appendChild(new_element_noticias)

            new_element_noticias.addEventListener("click",(e)=>{
              context.setModalShow({
                show:true,
                message:<NoticiasElments orden={contador.contador}
                                    getInit={getInit}
                                    type={contador.type}
                                    context={context}
                                    element={new_element_noticias}
                        />
              })
            }, false);

          break;
          case "tienda":
            let new_element_tienda              =   document.createElement("div")
                new_element_tienda.className    =   "col cursor-pointer"
                new_element_tienda.textContent  =   "+ Seleccione"
                parent_content.appendChild(new_element_tienda)

            new_element_tienda.addEventListener("click",(e)=>{
              context.setModalShow({
                show:true,
                message:<TiendaElments orden={contador.contador}
                                    getInit={getInit}
                                    type={contador.type}
                                    context={context}
                                    element={new_element_tienda}
                        />
              })
            }, false);

          break;
          case "slider":
            let new_element_slider              =   document.createElement("div")
                new_element_slider.className    =   "col cursor-pointer"
                new_element_slider.textContent  =   "+ Seleccione"
                parent_content.appendChild(new_element_slider)

            new_element_slider.addEventListener("click",(e)=>{
              context.setModalShow({
                show:true,
                message:<SliderElments orden={contador.contador}
                                    getInit={getInit}
                                    type={contador.type}
                                    context={context}
                                    element={new_element_slider}
                        />
              })
            }, false);

          break;
          case "carousel":
            let new_element_carousel              =   document.createElement("div")
                new_element_carousel.className    =   "col cursor-pointer"
                new_element_carousel.textContent  =   "+ Seleccione"
                parent_content.appendChild(new_element_carousel)

            new_element_carousel.addEventListener("click",(e)=>{
              context.setModalShow({
                show:true,
                message:<CarouselElments orden={contador.contador}
                                    getInit={getInit}
                                    type={contador.type}
                                    context={context}
                                    element={new_element_carousel}
                        />
              })
            }, false);

          break;
          case "nav":
            let new_element       =   document.createElement("ul")
            new_element.className =   "navbar-nav"

            items_content.appendChild(new_element)

            plus.addEventListener("click",(e)=>{
              context.setModalShow({
                show:true,
                message:<NavElments orden={contador.contador}
                                    getInit={getInit}
                                    type={contador.type}
                                    context={context}
                                    element={new_element}
                        />
              })
            }, false);

            items_content.appendChild(new_element)

          break;
        }

        parent_content.appendChild(element__)
  }

  const dragOverHandler=(ev)=>{
    //console.log(dragElementNow);
    //console.log('File(s) in drop zone',ev.dataTransfer);
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  const ondragstart = (ev,row)=>{
    dragElementNow  = {ev:ev,row:row}
    //ev.preventDefault();
  }

  const ondragend=(ev,row)=>{
    ev.preventDefault();
  }

  const removeDragData=(ev)=>{
    // console.log('Removing drag data')
    // if (ev.dataTransfer.items) {
    //   // Use DataTransferItemList interface to remove the drag data
    //   ev.dataTransfer.items.clear();
    // } else {
    //   // Use DataTransfer interface to remove the drag data
    //   ev.dataTransfer.clearData();
    // }
  }





  return  <div className="container-fluid" id="contenedores">
            <div className="row">
              <div className="col-12 col-sm-9">
                <div id="arrastraAqui" className="border p-4 text-center mb-2" onDrop={dropHandler} onDragOver={dragOverHandler}>
                  Arrastra aqui...
                </div>
                <div id="contenedorArrastraAqui" className="text-center">

                </div>
              </div>
              <div className="col-12 col-sm-3 border-left">
                {elements.map((row,key)=>{
                  let key_  = Object.keys(row);
                  let row_  = row[key_];
                  if (row_.public) {
                    return  <div key={key} className="border p-2 mb-2">
                              <div>
                                  {row_.label}
                              </div>
                              <div className="row">
                                {row_.items.map((row2,key2)=>{
                                  return  <div key={key2} className="col-4">
                                            <div  className="btn btn-primary btn-block mt-2"
                                                  id={key2}
                                                  draggable="true"
                                                  onDragStart={e=>{ondragstart(e,row2)}}>
                                              {row2.title}
                                            </div>
                                          </div>
                                })}
                              </div>
                            </div>
                  }else {
                    return false
                  }
                })}
              </div>
            </div>
          </div>
}

App.propTypes = {

}

export default App
