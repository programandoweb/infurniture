import React from 'react';
import Maestro from '../../screens/tableClientes';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=(props)=>{
  return  <div className="container-fluid">
            <div className="row mb-3">
              <div className="col">
                <Maestro
                  app={queryStringParams.app}
                  limit="8"
                  classHeader="pgrw-bg-success text-white"
                  className="col-12 col-sm-12"
                />
              </div>
            </div>
          </div>
}

export default App;
