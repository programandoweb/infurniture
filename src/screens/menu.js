import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import StateContext from '../helpers/ContextState'
import Logo from '../assets/images/design/logo.png';
import Store from '../helpers/Store'
import Password from '../screens/edit_password'


const App=(props)=>{
  const context = React.useContext(StateContext);

  //console.log(Store.get("privilegios"));
  return  <Navbar bg="black" expand="lg" className="mb-0">
            <div className="container">
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link className="text-white" href={context.Config.ConfigAppUrl+"apanel"}>Home</Nav.Link>
                  {Object.entries(context.Constants.Modulos).map((row,k)=>{
                      if (row[0]==="auth") {
                        return false
                      }else {
                        if (row[1].dropdown) {
                          return  <NavDropdown key={k} title={row[1].label} id={row[0]}>
                                    {(row[1].items).map((row2,key2)=>{
                                      let row__ = Object.entries(row2)
                                      if (row__[0][1].public) {
                                        let app  = "?app="+row__[0][1].metodo+"::"+row[0]+"::"+row__[0][0]+"::"+row__[0][1].label+"::"+row__[0][1].url+"::"+row__[0][1].public
                                        return  <NavDropdown.Item key={key2}  href={context.Config.ConfigAppUrl+"apanel/"+row__[0][1].url+app}>
                                                  {row__[0][1].label}
                                                </NavDropdown.Item>
                                      }else {
                                        return <div key={key2}></div>
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
                          return <Nav.Link key={k} className="text-white" href={context.Config.ConfigAppUrl+"apanel/"+row[1].url}>{row[1].label}</Nav.Link>
                        }
                      }
                  })}
                </Nav>

              </Navbar.Collapse>
              <Navbar.Brand href={context.Config.ConfigAppUrl+"apanel"}>
                <img src={Logo} alt="Logo" height="50"/>
                ({ Store.get("privilegios").label })
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-primary"  />
            </div>
          </Navbar>
}

export default App;
