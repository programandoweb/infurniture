import React,{useEffect,useState} from 'react';

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

const types = {
    containers:{
      className:"container border p-2 mb-2 text-center position-relative",
      title:"Container",
    },
    containersFluid:{
      className:"container-fluid border p-2 mb-2 text-center position-relative",
      title:"Container fluido",
    },
    row:{
      className:"row",
      title:"Fila",
    },
    nav:{
      className:"nav",
      title:"Fila",
    },
    col:{
      className:"col-12 col-sm",
      title:"Columna",
    },
    slider:{
      className:"col-12 col-sm",
      title:"Columna",
    }
  }



const App=()=>{

  const [containers, setContainers] = useState([]);

  const onClick=(e)=>{
    let attr      =   e.target.getAttribute("type");
    let content   =   parseInt(e.target.getAttribute("content"));
    let objeto    =   {
                        type:attr,
                        className:types[attr].className,
                        title:types[attr].title
                      }
    if (content===true) {
      containers[content].parents = [objeto]
      setContainers(containers)
    }else {
      setContainers(containers=>[...containers,objeto])
    }
  }

  return  <div className="container-fluid">

              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item active">
                      <a className="nav-link text-success" href="#">Componentes <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                      <Button
                          className="nav-link"
                          title="Container Fluid"
                          type="containersFluid"
                          onClick={onClick}
                      />
                    </li>
                    <li className="nav-item">
                      <Button
                          className="nav-link"
                          title="Container"
                          type="containers"
                          onClick={onClick}
                      />
                    </li>
                  </ul>
                </div>
                </nav>
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
