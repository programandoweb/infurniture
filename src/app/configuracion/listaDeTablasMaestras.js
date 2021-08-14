import React from 'react';
import Maestro from '../../screens/tableTablasMaestras';


const App=(props)=>{
  return  <div className="container-fluid">
            <div className="row mb-3">
              <div className="col">
                <Maestro
                  title="Lista de tablas maestras"
                  modulo="Maestros"
                  metodo="get_tablas_maestras"
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
