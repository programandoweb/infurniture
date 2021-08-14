import React,{useState,useEffect} from 'react';
import Input from '../../screens/inputs';
import Select from '../../screens/select';
const App=(props)=>{
  const [open, setOpen]  =   useState(false);
  let maquetacion   =   props.maquetacion!==undefined?props.maquetacion:[]
  let maquetacion2  =   maquetacion.concat([{value:"-1",label:"url"}])

  useEffect(() => {
    if (props.open.op_maquetacion_id==='-1') {
      setOpen(true)
    }
  },[props.open])

  const onChange=(e)=>{
    if (e.target.value==='-1') {
      setOpen(true)
    }else {
      setOpen(false)
    }
    props.onChange(e)
  }

  return  <form onSubmit={props.onSubmit}>
            <div className="row mb-2">
              <div className="col-4">
                Título
              </div>
              <div className="col">
                <input defaultValue={props.open.label} required={true} type="text" name="label" className="form-control" onChange={props.onChange} placeholder="Título" />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-4">
                Matriz
              </div>
              <div className="col">
                <Select
                    selectDefault="Seleccione"
                    defaultValue={props.open.op_maquetacion_id}
                    data={ maquetacion2 }
                    title="Matriz"
                    name="op_maquetacion_id"
                    className="form-control"
                    onChange={onChange}
                  />
              </div>
            </div>
            {open?<div className="row mb-2">
              <div className="col-4">
                Dirección web
              </div>
              <div className="col">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-white" id="basic-addon3">https://</span>
                  </div>
                  <input  defaultValue={props.open.url}
                          type="text"
                          name="url"
                          className="form-control"
                          onChange={props.onChange}
                          placeholder="Dirección web Ej: programandoweb.net/para-ejemplo" />
                </div>
              </div>
            </div>:false}

            <div className="row mb-2">
              <div className="col-4">
                Abrir en la misma página
              </div>
              <div className="col">
                <Select
                    selectDefault="Seleccione"
                    defaultValue={props.open.target}
                    data={[{label:"Si",value:"_self"},{label:"No",value:"_blank"}]}
                    title="Abrir en la misma ventada"
                    name="target"
                    className="form-control"
                    onChange={props.onChange}
                  />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col ">
                <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                  <button type="submit" className="btn btn-primary">Guardar</button>
                  <div className="btn btn-danger" onClick={()=>props.setOpen(false)}>Cancelar</div>
                </div>
              </div>
            </div>
          </form>
}

export default App
