import React,{useEffect,useState} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

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

const types = [
  {
    contenedores:{
      label:"Contenedores",
      public:true,
      items:[
        {
          value:1,
          className:"container-fluid",
          title:"Normal",
          type:"containerFluid",
        },
        {
          value:2,
          className:"container",
          title:"Fluido",
          type:"container",
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
          className:"row justify-content-center",
          title:"Normal 1 Columna",
          parentClass:"col-12 col-sm-6",
          type:"rowCenter",
        },
        {
          value:2,
          className:"row justify-content-center",
          title:"Normal 2 Columnas",
          parentClass:"col-12 col-sm-3",
          type:"rowCenter",
        },
        {
          value:3,
          className:"row justify-content-center",
          title:"Normal 3 Columnas",
          parentClass:"col-12 col-sm-2",
          type:"rowCenter",
        },
      ]
    }
  },
  {
    nav:{
      label:"Navegación",
      public:true,
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
      public:true,
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
      public:true,
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
      public:true,
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
      public:true,
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
      public:true,
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
      public:true,
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
      public:true,
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

const Containers=()=>{
  return <div>Container</div>
}

const Filas=()=>{
  return <div>Filas</div>
}

const Navs=()=>{
  return <div>Filas</div>
}

const Slider=()=>{
  return <div>Slider</div>
}

const Tienda=()=>{
  return <div>Slider</div>
}

const Noticias=()=>{
  return <div>Slider</div>
}

const TextosEstatico=()=>{
  return <div>Slider</div>
}

const Banner=()=>{
  return <div>Slider</div>
}

const Map=()=>{
  return <div>Slider</div>
}

const NavFooter=()=>{
  return <div>Slider</div>
}


const App=()=>{

  const [containers, setContainers] = useState([]);

  const onClick=(row)=>{

    let objeto

    switch (row.type) {
      case "row":
        var element           = document.createElement("div");
            element.className = "container";
        setContainers(containers=>[...containers,element])
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

    // let attr      =   e.target.getAttribute("type");
    // let content   =   parseInt(e.target.getAttribute("content"));
    // let objeto    =   {
    //                     type:attr,
    //                     className:types[attr].className,
    //                     title:types[attr].title
    //                   }
    // if (content===true) {
    //   containers[content].parents = [objeto]
    //   setContainers(containers)
    // }else {
    //   setContainers(containers=>[...containers,objeto])
    // }
  }

  return  <div className="container-fluid">


            <Navbar bg="dark" variant="dark" expand="lg">
              <Navbar.Brand className="text-white" onClick={onClick} href="#home">
                Componentes
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  {

                    types.map((row,key)=>{
                      let key_  = Object.keys(row);
                      let row_  = row[key_];
                      if (row_.public) {
                        return  <NavDropdown  title={row_.label}
                                              id={key_+"-dropdown-"+key}
                                              key={key}
                                >
                                  {
                                    row_.items.map((row2,key2)=>{
                                      return <NavDropdown.Item  key={key2}
                                                                onClick={()=>onClick(row2)}
                                                                href={"#"+key_+"-"+key2}>
                                                {row2.title}
                                              </NavDropdown.Item>
                                    })
                                  }
                                </NavDropdown>
                      }else {
                        return false
                      }
                    })
                  }
                </Nav>
              </Navbar.Collapse>
            </Navbar>

            <div className="row mt-3">
              <div className="col">
                <div className="card">
                  <div className="card-content ">
                    <div className="card-body">
                      <div className="contenedor" id="contenedor">
                        {containers.map((row,key)=>{
                            return  <div key={key} className={row.className}>
                                      {row.title}
                                      <Bar id={key} onClick={onClick}/>
                                    </div>
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}

App.propTypes = {

}

export default App
