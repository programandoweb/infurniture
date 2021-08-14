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
    contenedores:{
      label:"Contenedores",
      public:false,
      items:[
        {
          value:1,
          className:"container position-relative",
          title:"Normal",
          type:"container",
        },
        {
          value:2,
          className:"container-fluid position-relative",
          title:"Fluido",
          type:"containerFluid",
        },
      ]
    }
  },
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
      label:"Navegación",
      public:false,
      items:[
        {
          value:1,
          className:"row justify-content-center",
          title:"Normal",
          parentClass:"col-12",
          type:"nav",
        },
        {
          value:1,
          className:"row justify-content-center",
          title:"Fluido",
          parentClass:"col-12",
          type:"nav",
        },
      ]
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
                  return <div className="col-12 col-sm-4" key={key}>
                            {row[keys[0]].label}
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
    var element             =   document.createElement("div");
        //element.className   =   dragElementNow.row.className + " border mb-2"

    switch (dragElementNow.row.type) {
      case "containerFluid":
        // element.addEventListener('dropHandler', ev => {}, false)
        // element.textContent =   dragElementNow.row.type + " " + dragElementNow.row.title
        // let tasks           =   crearDiv("tasks")
        // console.log(dragElementNow.row);
        //
        // element.append(tasks)
      break;
      case "container":
        // element.addEventListener('dropHandler', ev => {}, false)
        // element.textContent = dragElementNow.row.type + " " + dragElementNow.row.title
      break;
      case "row":
        let atributos       =   dragElementNow.row
        let tasks           =   crearDiv("tasks")
        let content_        =   crearDiv("content-fluid border mb-1")
        let row_            =   crearDiv(atributos.className + " position-relative")

        for (var i = 0; i < atributos.value; i++) {
          let col_            =   crearDiv(atributos.parentClass + " h3 cursor-pointer")
          col_.textContent    =   "+"
          col_.addEventListener("click", openModal, false);
          row_.appendChild(col_)
        }
        row_.appendChild(tasks)
        content_.append(row_)
        content.appendChild(content_);
      break;
      case "nav":
        element.addEventListener('dropHandler', ev => {}, false)
        element.textContent = dragElementNow.row.type + " " + dragElementNow.row.title
      break;
      case "slider":
        element.addEventListener('dropHandler', ev => {}, false)
        element.textContent = dragElementNow.row.type + " " + dragElementNow.row.title
      break;
      case "tienda":
        element.addEventListener('dropHandler', ev => {}, false)
        element.textContent = dragElementNow.row.type + " " + dragElementNow.row.title
      break;
      case "noticias":
        element.addEventListener('dropHandler', ev => {}, false)
        element.textContent = dragElementNow.row.type + " " + dragElementNow.row.title
      break;
      case "textestatico":
        element.addEventListener('dropHandler', ev => {}, false)
        element.textContent = dragElementNow.row.type + " " + dragElementNow.row.title
      break;
      case "banner":
        element.addEventListener('dropHandler', ev => {}, false)
        element.textContent = dragElementNow.row.type + " " + dragElementNow.row.title
      break;
      case "mapa":
        element.addEventListener('dropHandler', ev => {}, false)
        element.textContent = dragElementNow.row.type + " " + dragElementNow.row.title
      break;
      case "navFooter":
        element.addEventListener('dropHandler', ev => {}, false)
        element.textContent = dragElementNow.row.type + " " + dragElementNow.row.title
      break;
    }




    //.appendChild(document.createTextNode('Nuevo párrafo.'));
    removeDragData(ev)
  }

  const openModal=(e)=>{

    context.setModalShow({
      show:true,
      message:<Modulos elements={elements}/>
    })
    // console.log(e);
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
