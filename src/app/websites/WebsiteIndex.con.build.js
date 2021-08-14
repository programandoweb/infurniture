import React from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=()=>{
  const context = React.useContext(StateContext);

  return  <div className="container text-center">
            <div className="row mb-2">
              <div className="col-12 col-sm-3">
                <div className="card">
                  <div className="card-body">
                    <a href={context.Config.ConfigAppUrl+Functions.segment()+"/menu?app="+queryStringParams.app}>
                      Menús
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <div className="card">
                  <div className="card-body">
                    <a href={context.Config.ConfigAppUrl+Functions.segment()+"/builder?app="+queryStringParams.app}>
                      Build
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <div className="card">
                  <div className="card-body">
                    <a href={context.Config.ConfigAppUrl+Functions.segment()+"/slider?app="+queryStringParams.app}>
                      Slider
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <div className="card">
                  <div className="card-body">
                    <a href={context.Config.ConfigAppUrl+Functions.segment()+"/tienda?app="+queryStringParams.app}>
                      Tienda
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-3">
                <div className="card">
                  <div className="card-body">
                    <a href={context.Config.ConfigAppUrl+Functions.segment()+"/textos?app="+queryStringParams.app}>
                      Texto estático
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <div className="card">
                  <div className="card-body">
                    <a href={context.Config.ConfigAppUrl+Functions.segment()+"/banners?app="+queryStringParams.app}>
                      Banners
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <div className="card">
                  <div className="card-body">
                    <a href={context.Config.ConfigAppUrl+Functions.segment()+"/noticias?app="+queryStringParams.app}>
                      Noticias
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
