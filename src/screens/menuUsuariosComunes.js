import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import StateContext from '../helpers/ContextState'
import Logo from '../assets/images/design/logo.png';
import Store from '../helpers/Store'
import Password from '../screens/edit_password'

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
                  <Nav.Link className="text-white" href={context.Config.ConfigAppUrl+"apanel"}>Home</Nav.Link>
                  {Object.entries(context.Constants.Modulos).map((row,k)=>{
                      if (privilegios[row[0]]===undefined && (row[0]!=='cerrar_sesion' && row[0]!=='contrasena') ) {
                        return false
                      }
                      if (row[0]==="auth") {
                        return false
                      }else {
                        if (row[1].dropdown) {
                          return  <NavDropdown key={k} title={row[1].label} id={row[0]}>
                                    {privilegios[row[0]].map((row2,key2)=>{
                                      if (row2.public==='1') {
                                        return  <NavDropdown.Item key={key2} href={context.Config.ConfigAppUrl+"apanel/"+row2.url+"?app="+row2.metodo+"::"+row2.modulo+"::"+row2.submodulo+"::"+row2.label+"::"+row2.url+"::"+row2.public}>
                                                  {row2.label}
                                                </NavDropdown.Item>
                                      }else {
                                        return false
                                      }
                                    })}
                                  </NavDropdown>
                        }else if(row[1].public && row[1].modal!==undefined){
                          return  <Nav.Link key={k} onClick={()=>{context.setModalShow({  show:true,
                                                                          message:<Password row={{token:Store.get("user").token}} setModalShow={context.setModalShow}/>,
                                                                          size:"sm",
                                                                          header:{  show:true,
                                                                                    label:"Cambio de Password "
                                                                                  }
                                                                        })}}
                                            className="text-white">
                                        {row[1].label}
                                  </Nav.Link>
                        }else {
                          return <Nav.Link className="text-white" key={k} href={context.Config.ConfigAppUrl+"apanel/"+row[1].url}>{row[1].label}</Nav.Link>
                        }
                      }
                  })}
                  {Store.get("user_temp").tipo_usuario_id?<Nav.Link href={context.Config.ConfigAppUrl+"apanel/"+context.Constants.Modulos.cambio_usuario.url}>{context.Constants.Modulos.cambio_usuario.label}</Nav.Link>:<></>}
                </Nav>
              </Navbar.Collapse>
              <Navbar.Brand href={context.Config.ConfigAppUrl} >
                <div className="text-center">
                  <img src={Logo} alt="Logo" height="50"/>
                </div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-primary" />
            </div>
          </Navbar>
}

export default App;
