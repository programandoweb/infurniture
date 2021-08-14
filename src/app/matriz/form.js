import Input from '../../screens/inputs';
import Select from '../../screens/select';
const App=(props)=>{
  return  <form onSubmit={props.onSubmit}>
            <div className="row mb-2">
              <div className="col">
                Título
              </div>
              <div className="col">
                <input defaultValue={props.open.label} required={true} type="text" name="label" className="form-control" onChange={props.onChange} placeholder="Título" />
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
