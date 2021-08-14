const App =(props)=>{
  return  <div className="row pb-2">
            <div className={props.classNameMain!==undefined?props.classNameMain:"col"}>
              <div className={props.classNameLabel!==undefined?props.classNameLabel:""}>
                <b>{props.title}</b>
              </div>
              <select name={props.name}
                  required={(props.required!==undefined && props.required===true)?"required":false}
                  className={props.className + " form-control"}
                  defaultValue={props.defaultValue}
                  onChange={props.onChange}
                  readOnly={(props.readonly!==undefined && props.readonly===true)?"readonly":false}
                  disabled={(props.disabled!==undefined && props.disabled===true)?"disabled":false}
              >
                <option value="">{props.selectDefault}</option>
                {props.data!==undefined?<>
                  {props.data.map((row,key)=>{
                    if (props.valuesIguales===undefined) {
                      return <option value={row.value} key={key}>{row.label}</option>
                    }else {
                      return <option value={row.label} key={key}>{row.label}</option>
                    }                    
                  })}
                </>:false}
              </select>
            </div>
          </div>
}

export default App
