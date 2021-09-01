import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Datos from './gestionClientes/datos'
import Descripcion from './gestionClientes/descripcion'
import Gestion from './gestionClientes/gestion'
import Contratos from './gestionClientes/contratos'
import PQRS from './gestionClientes/PQRS'
import Config from '../helpers/Config'
import Visitas from './gestionClientes/visitas'
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const App=(props)=>{

  const onClick=(e)=>{
    window.open(Config.ConfigApirest+"PDF/cliente?id="+props.data.token)
  }

  return  <div className="col p-0">
            <div className="card">
              <div className="card-body">
                <Tabs defaultActiveKey="home"  id="uncontrolled-tab-example">
                  <Tab eventKey="home" title="Datos">
                    <Datos {...props}/>
                  </Tab>
                  <Tab eventKey="fiador" title="Datos Fiador">
                    <Datos fiador={true} {...props}/>
                  </Tab>
                  <Tab eventKey="gestion" title="Gestión comercial">
                    <Gestion {...props}/>
                  </Tab>
                  <Tab eventKey="contratos" title="Facturas y Financiación">
                    <Contratos {...props}/>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
}

export default App
