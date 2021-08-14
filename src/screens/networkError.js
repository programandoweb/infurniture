import Config from '../helpers/Config'

const App=(props)=>{
  return  <div className="container">
            <div className="row justify-content-center mt-5 text-center">
              <div className="col-5">
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    Error de conexión de la aplicación {Config.Title}
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      Compruebe la conexión a internet
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}

export default App
