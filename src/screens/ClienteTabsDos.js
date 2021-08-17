import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Datos from './gestionClientes/datos'
import Descripcion from './gestionClientes/descripcion'
import Gestion from './gestionClientes/gestion'
import Contratos from './gestionClientes/contratos2'
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
                <Tabs defaultActiveKey="contratos"  id="uncontrolled-tab-example">
                  <Tab eventKey="contratos" title="Financiación">
                    <Contratos {...props}/>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
}

export default App
