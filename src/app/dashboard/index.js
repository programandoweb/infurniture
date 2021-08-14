import React from 'react';
//import Store from '../../helpers/Store'
//import { faSearch,faChalkboardTeacher,faVolleyballBall,faCalendarAlt,faCalendarCheck,faUsers } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import StateContext from '../../helpers/ContextState';
import AccesoDirecto from '../../screens/acceso_directo_home';



const App=(props)=>{

  //const context =   React.useContext(StateContext);

  return  <>
            <div className="container min-height-dashboard">
              <div className="row">
                <div className="col-12">
                  <AccesoDirecto/>
                </div>
              </div>
            </div>
          </>
}

export default App;
