const App=(props)=>{
  return  <>
            <h5 className="mt-3">Historial inventario {props.title}</h5>
            <div className="pl-sm-3">
              <div className="card mb-1 d-none d-sm-block">
                <div className="card-body p-2">
                  <div className="row">
                    <div className="col-4 col-sm-2">
                      Fecha
                    </div>
                    <div className="col-12 col-sm-2 text-sm-center">
                      Cantidad
                    </div>
                    <div className="col-12 col-sm-2 ">
                      Acción
                    </div>
                    <div className="col-12 col-sm-2">
                      Observación
                    </div>
                  </div>
                </div>
              </div>
              {props.data.map((row,key)=>{
                return  <div className="card mb-1 " key={key}>
                          <div className="card-body p-2">
                            <div className="row fs-2">
                              <div className="col-6 col-sm-2">
                                <span className="d-block d-sm-none">Fecha: </span>{row.fecha}
                              </div>
                              <div className="col-6 col-sm-2 text-center">
                                <span className="d-block d-sm-none">Cantidad: </span><b>{row.cantidad}</b>
                              </div>
                              <div className="col-12 col-sm-2 ">
                                <span className="d-block d-sm-none">Acción: </span><b>{parseInt(row.cantidad)<0?"Resta":"Suma"}</b>
                              </div>
                              {row.observacion!==''?<div className="col-12 col-sm-2">
                                <span className="d-block d-sm-none">Observación: </span><b>{row.observacion}</b>
                              </div>:false}
                            </div>
                          </div>
                        </div>
              })}
            </div>
          </>
}
export default App
