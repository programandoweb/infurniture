import React from 'react';
import Maestro from '../../screens/tableTiposUsuarios';


const App=(props)=>{
  return  <div className="container-fluid">
            <div className="row mb-3">
              <div className="col">
                <Maestro
                  title="Lista tipos de usuarios"
                  modulo="Maestros"
                  metodo="get_tipo_usuarios"
                  tabla="tipo_usuarios"
                  limit="8"
                  asignar={true}
                  classHeader="pgrw-bg-success text-white"
                  className="col-12 col-sm-12"
                />
              </div>
            </div>
          </div>
}

export default App;
