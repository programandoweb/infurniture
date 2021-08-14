const App =(props)=>{
  return  <div className="row pb-2">
            <div className={props.classNameMain!==undefined?props.classNameMain:"col"}>
              <div className={props.classNameLabel!==undefined?props.classNameLabel:""}>
                {props.title}
              </div>
              <select name={props.name}
                  required={(props.required!==undefined && props.required===true)?"required":false}
                  className={props.className + " form-control"}
                  defaultValue={props.defaultValue}
                  onChange={props.onChange}
              >
                <option value="">{props.selectDefault}</option>
                {props.data.map((row,key)=>{
                  if (  props.excepcion!==undefined &&
                        props.excepcion!=='' &&
                        props.excepcion!==row.label) {
                          let op_proyectos_tareas_id=row.value
                          if (row.op_proyectos_tareas_id!==undefined &&
                                row.op_proyectos_tareas_id===props.defaultValue
                              ) {
                            op_proyectos_tareas_id=row.op_proyectos_tareas_id
                          }
                    console.log(op_proyectos_tareas_id);
                    return <option value={op_proyectos_tareas_id} key={key}>{row.label}</option>
                  }else if (  props.excepcion!==undefined &&
                        props.excepcion!=='' &&
                        props.excepcion===row.label) {
                    return false
                  }else {
                    return <option value={row.value} key={key}>{row.label}</option>
                  }

                })}
              </select>
            </div>
          </div>
}

export default App
