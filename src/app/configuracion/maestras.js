import React from 'react';
import Maestro from '../../screens/maestros';


const App=(props)=>{
  return  <div className="container-fluid">
            <div className="row mb-3">
              <Maestro
                title="Selección"
                modulo="Maestros"
                metodo="tablas_maestras"
                tabla="ma_categorias"
                limit="10"
                classHeader="pgrw-bg-success text-white"
              />
              <Maestro
                title="Ciclos"
                modulo="Maestros"
                metodo="tablas_maestras"
                tabla="ma_ciclos"
                limit="10"
                classHeader="pgrw-bg-success text-white"
              />
              <Maestro
                title="Componetes Cargas"
                modulo="Maestros"
                metodo="tablas_maestras"
                tabla="ma_componentes_cargas"
                limit="10"
                classHeader="pgrw-bg-success text-white"
              />
            </div>
          </div>
}

export default App;
