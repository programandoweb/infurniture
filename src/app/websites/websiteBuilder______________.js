import React,{useEffect,useState} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import StateContext from '../../helpers/ContextState';

const Button=(props)=>{
  return  <div  type={props.type}
                className="btn btn-primary mr-1"
                onClick={props.onClick}
          >{props.title}</div>
}

const Bar=(props)=>{
  return  <div className="bar">
            <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
              <div content={props.id} type="row" onClick={props.onClick} className="btn btn-secondary">Row</div>
              <div content={props.id} type="nav" onClick={props.onClick} className="btn btn-secondary">Nav</div>
              <div content={props.id} type="col" onClick={props.onClick} className="btn btn-secondary">Col</div>
              <div content={props.id} type="slider" onClick={props.onClick} className="btn btn-secondary">Slide</div>
            </div>
          </div>
}


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
      label:"Slider",
      public:false,
      items:[
        {
          value:1,
          className:"row justify-content-center",
          title:"Normal",
          parentClass:"col-12",
          type:"slider",
        },
        {
          value:1,
          className:"row justify-content-center",
          title:"Fluido",
          parentClass:"col-12",
          type:"slider",
        },
      ]
    }
  },
  {
    tienda:{
      label:"Tienda",
      public:false,
      items:[
        {
          value:1,
          className:"row justify-content-center",
          title:"Normal",
          parentClass:"col-12",
          type:"tienda",
        },
        {
          value:1,
          className:"row justify-content-center",
          title:"Fluido",
          parentClass:"col-12",
          type:"tienda",
        },
      ]
    }
  },
  {
    noticias:{
      label:"Noticias",
      public:false,
      items:[
        {
          value:1,
          className:"row justify-content-center",
          title:"Normal",
          parentClass:"col-12",
          type:"noticias",
        },
        {
          value:1,
          className:"row justify-content-center",
          title:"Fluido",
          parentClass:"col-12",
          type:"noticias",
        },
      ]
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
    mapa:{
      label:"Mapa",
      public:false,
      items:[
        {
          value:1,
          className:"row justify-content-center",
          title:"Normal",
          parentClass:"col-12",
          type:"mapa",
        },
        {
          value:1,
          className:"row justify-content-center",
          title:"Fluido",
          parentClass:"col-12",
          type:"mapa",
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

const NavElments=(props)=>{
  const [input, setInput] = useState();
  const [url, setUrl] = useState();

  const add=()=>{
    let li            =   document.createElement("li")
        li.className  =   "nav-item"
    let a             =   document.createElement("a")
        a.className   =   "nav-link"
        a.href        =   url
        a.textContent =   input
        li.appendChild(a)
        props.parent_content.appendChild(li)
        setInput("")
        setUrl("")
  }
  return    <div className="row">
              <div className="col">
                <input placeholder="Label" type="text" className="form-control" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
              </div>
              <div className="col">
                <input placeholder="URL" type="text" className="form-control" value={url} onChange={(e)=>{setUrl(e.target.value)}}/>
              </div>
              <div className="col">
                <div className="btn btn-primary btn-block" onClick={add}>Agregar</div>
              </div>
            </div>
}

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

  const onClick=(row)=>{

    let objeto

  }

  const crearDiv=(className)=>{
    const div           =   document.createElement("div")
          div.className =   className
          return div;
  }

  const dropHandler=(ev)=>{
    var content             =   document.getElementById("contenedorArrastraAqui")

    switch (dragElementNow.row.type) {
      case "containerFluid":

      break;
      case "container":

      break;
      case "row":
        let atributos       =   dragElementNow.row
        let tasks           =   crearDiv("tasks")
        let content_        =   crearDiv("content-fluid border mb-1")
        let row_            =   crearDiv(atributos.className + " position-relative")

        for (var i = 0; i < atributos.value; i++) {
          let col_            =   crearDiv(atributos.parentClass + "  prueba"+i)
          let plus            =   crearDiv(" plus cursor-pointer h3 ")
          plus.textContent    =   "+"+i
          col_.appendChild(plus)
          row_.appendChild(col_)
          plus.addEventListener("click",(e)=>{openModal(<Modulos
                                                                elements={elements}
                                                                content={e}
                                                                appendEle={appendEle}
                                                                parent={col_}/>);}, false);
        }
        //row_.appendChild(tasks)
        content_.append(row_)
        content.appendChild(content_);
      break;
      case "nav":

      break;
      case "slider":

      break;
      case "tienda":

      break;
      case "noticias":

      break;
      case "textestatico":

      break;
      case "banner":

      break;
      case "mapa":

      break;
      case "navFooter":

      break;
    }




    //.appendChild(document.createTextNode('Nuevo párrafo.'));
    removeDragData(ev)
  }

  const openModal=(Ventana)=>{
    context.setModalShow({
      show:true,
      message:Ventana
    })
  }

  const appendEle=(e,parent,parent_content)=>{
    context.setModalShow({
      show:false,
      message:""
    })

    //return console.log(parent);
    let atributos     =   parent
    let items_content =   crearDiv("collapse navbar-collapse")
    let plus          =   crearDiv("navbar-brand")

        plus.textContent         =   "+"
        items_content.appendChild(plus)

        let element__ = atributos.element.html.cloneNode(true)
        element__.className  =   atributos.element.className +" cursor-pointer "
        element__.appendChild(items_content)

        switch (parent.modulo) {
          case "nav":

            let new_element       =   document.createElement("ul")

            new_element.className =   "navbar-nav"

            items_content.appendChild(new_element)


            // plus.addEventListener("click",(e)=>{
            //   context.setModalShow({
            //     show:true,
            //     message:<NavElments element={new_element} parent_content={parent_content} />
            //   })
            // }, false);

            parent_content.appendChild(new_element)

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
