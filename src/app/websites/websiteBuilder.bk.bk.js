import Container from './buildElements/container'
import Rows from './buildElements/rows'
import Col from './buildElements/col'
import Nav from './buildElements/nav'
const App=()=>{
  return  <div className="container-fluid">

              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item active">
                      <a className="nav-link text-success" href="#">Componentes <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                      <Container className="nav-link" title="Container Fluid" type="fluid" content="contenedor"/>
                    </li>
                    <li className="nav-item">
                      <Container className="nav-link" title="Container" type="" content="contenedor"/>
                    </li>
                    <li className="nav-item">
                      <Rows className="nav-link" title="Filas" type="row" content="contenedor"/>
                    </li>
                    <li className="nav-item">
                      <Col className="nav-link" title="Columnas" type="row" content="contenedor"/>
                    </li>
                    <li className="nav-item">
                      <Nav className="nav-link" title="Navegación" type="nav" content="contenedor"/>
                    </li>
                  </ul>
                </div>
                </nav>
            <div className="row mt-3">
              <div className="col">
                <div className="card">
                  <div className="card-content">
                    <div className="card-body">
                      <div className="contenedor" id="contenedor">                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}

export default App
