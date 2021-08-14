import React from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=()=>{
  const context = React.useContext(StateContext);

  return  <div className="container text-center">
            <div className="row mb-2">
              <div className="col-12 col-sm-4 mb-2">
                <div className="card">
                  <div className="card-body">
                    <a href={context.Config.ConfigAppUrl+"apanel/"+Functions.segment()+"/sitio?app="+queryStringParams.app}>
                      Sitio
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4 mb-2">
                <div className="card">
                  <div className="card-body">
                    <a href={context.Config.ConfigAppUrl+"apanel/"+Functions.segment()+"/menu?app="+queryStringParams.app}>
                      Menú
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4 mb-2">
                <div className="card">
                  <div className="card-body">
                    <a href={context.Config.ConfigAppUrl+"apanel/"+Functions.segment()+"/matriz?app="+queryStringParams.app}>
                      Matriz
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4 mb-2">
                <div className="card">
                  <div className="card-body">
                    <a href={context.Config.ConfigAppUrl+"apanel/"+Functions.segment()+"/tienda?app="+queryStringParams.app}>
                      Tienda
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4 mb-2">
                <div className="card">
                  <div className="card-body">
                    <a href={context.Config.ConfigAppUrl+"apanel/"+Functions.segment()+"/media?app="+queryStringParams.app}>
                      Media
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4 mb-2">
                <div className="card">
                  <div className="card-body">
                    <a href={context.Config.ConfigAppUrl+"apanel/"+Functions.segment()+"/noticias?app="+queryStringParams.app}>
                      Noticias
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4 mb-2">
                <div className="card">
                  <div className="card-body">
                    <a href={context.Config.ConfigAppUrl+"apanel/"+Functions.segment()+"/css?app="+queryStringParams.app}>
                      CSS
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
