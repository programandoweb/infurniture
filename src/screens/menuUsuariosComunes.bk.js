import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import StateContext from '../helpers/ContextState'
import Logo from '../assets/images/design/logo.png';
import Store from '../helpers/Store'

let privilegios = {}

const App=(props)=>{
  const context = React.useContext(StateContext);
  //console.log(JSON.parse(Store.get("privilegios")));
  //return false;
  if (Store.get("privilegios")==="") {
    return <></>
  }else if (Store.get("privilegios").privilegios!==undefined) {
    privilegios = JSON.parse(Store.get("privilegios").privilegios);
  }else {
    //console.log(Store.get("privilegios").privilegios);
    //privilegios = JSON.parse(Store.get("privilegios"));
    privilegios = Store.get("privilegios");
  }


  return  <Navbar bg="black" expand="lg" className="mb-0">
            <div className="container">
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link className="text-white" href={context.Config.ConfigAppUrl}>Home</Nav.Link>
                  {Object.entries(context.Constants.Modulos).map((row,k)=>{
                      if (privilegios[row[0]]===undefined && row[0]!=='cerrar_sesion' ) {
                        return <></>
                      }
                      if (row[0]==="auth") {
                        return <div key={k}></div>
                      }else {
                        if (row[1].dropdown) {
                          return  <NavDropdown key={k} title={row[1].label} id={row[0]}>
                                    {(row[1].items).map((row2,key2)=>{
                                      let row__ = Object.entries(row2)
                                      if (privilegios[row__[0][0]]===undefined) {
                                        return <></>
                                      }
                                      if (row__[0][1].public) {
                                        return  <NavDropdown.Item key={key2} href={context.Config.ConfigAppUrl+row__[0][1].url}>
                                                  {row__[0][1].label}
                                                </NavDropdown.Item>
                                      }else {
                                        return <></>
                                      }
                                    })}
                                  </NavDropdown>
                        }else {
                          return <Nav.Link key={k} href={context.Config.ConfigAppUrl+row[1].url}>{row[1].label}</Nav.Link>
                        }
                      }
                  })}
                  {Store.get("user_temp").tipo_usuario_id?<Nav.Link href={context.Config.ConfigAppUrl+context.Constants.Modulos.cambio_usuario.url}>{context.Constants.Modulos.cambio_usuario.label}</Nav.Link>:<></>}
                </Nav>
              </Navbar.Collapse>
              <Navbar.Brand href={context.Config.ConfigAppUrl}>
                <img src={Logo} alt="Logo" height="80"/>
                ({ (Store.get("privilegios").label)?Store.get("privilegios").label:"Cambio temporal" })
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-primary" />
            </div>
          </Navbar>
}

export default App;
