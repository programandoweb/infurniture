const App=(props)=>{
  return  <section className={props.row.clases}><div className="container-fluid">
            {props.title? <div className="row">
                            <div className="col-12 mb-3">
                              <h3 className="">
                                {props.title}
                              </h3>
                            </div>
                          </div>:false}
            <div className="row">
              {props.row.data.map((row,key)=>{
                return <img src={row.src} key={key} alt="programandoweb" className="col mb-3"/>
              })}
            </div>
          </div>
          </section>
}
export default App
