import React from 'react';
import Maestro from '../../screens/tableRegistroCronograma';


const App=(props)=>{
  return  <div className="container">
            <div className="row mb-3">
              <Maestro
                title="Macro calendarios"
                modulo="Maestros"
                metodo="tablas_maestras"
                tabla="op_macrocalendario"
                limit="10"
                classHeader="bg-success text-white"
              />
            </div>
          </div>
}

export default App;
